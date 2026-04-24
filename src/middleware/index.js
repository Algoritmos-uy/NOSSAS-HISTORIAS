// ═══════════════════════════════════════════════════════════════
//  MIDDLEWARE — Logger & Rate Limiter
//  Nossas Histórias
// ═══════════════════════════════════════════════════════════════

// ── Logger de requisições ────────────────────────────────────

export function logger(req, res, next) {
  const inicio = Date.now();
  const { method, url } = req;

  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    const status  = res.statusCode;
    const cor     = status >= 500 ? '\x1b[31m'   // vermelho
                  : status >= 400 ? '\x1b[33m'   // amarelo
                  : status >= 300 ? '\x1b[36m'   // ciano
                  : '\x1b[32m';                  // verde
    const reset   = '\x1b[0m';
    const hora    = new Date().toLocaleTimeString('pt-BR');

    console.log(`${cor}[${hora}] ${method} ${url} → ${status} (${duracao}ms)${reset}`);
  });

  next();
}

// ── Rate Limiter simples (sem dependência externa) ────────────
// Janela deslizante por IP

const registros = new Map();

const JANELA_MS  = parseInt(process.env.RATE_LIMIT_JANELA_MS  || '900000'); // 15 min
const MAX_REQS   = parseInt(process.env.RATE_LIMIT_MAX        || '100');

// Limpeza periódica do mapa para evitar memory leak
setInterval(() => {
  const agora = Date.now();
  for (const [ip, dados] of registros) {
    if (agora - dados.inicio > JANELA_MS) registros.delete(ip);
  }
}, JANELA_MS);

export function rateLimiter(req, res, next) {
  // Só aplica em rotas de API
  if (!req.path.startsWith('/api')) return next();

  const ip    = req.ip || req.socket.remoteAddress || 'desconhecido';
  const agora = Date.now();

  if (!registros.has(ip)) {
    registros.set(ip, { inicio: agora, count: 1 });
    return next();
  }

  const dados = registros.get(ip);

  // Reinicia janela se expirou
  if (agora - dados.inicio > JANELA_MS) {
    dados.inicio = agora;
    dados.count  = 1;
    return next();
  }

  dados.count++;

  if (dados.count > MAX_REQS) {
    const resetEm = Math.ceil((dados.inicio + JANELA_MS - agora) / 1000);
    res.setHeader('Retry-After', resetEm);
    return res.status(429).json({
      sucesso: false,
      mensagem: `Muitas requisições! Tente novamente em ${resetEm}s. 🛑`
    });
  }

  next();
}

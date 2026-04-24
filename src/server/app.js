// ═══════════════════════════════════════════════════════════════
//  NOSSAS HISTÓRIAS — Servidor Principal
//  Ricardo e Tami | Do Brasil ao Alasca
// ═══════════════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import rotasHistorias from '../routes/historias.js';
import rotasLugares from '../routes/lugares.js';
import rotasLoja from '../routes/loja.js';
import rotasChatbot from '../routes/chatbot.js';
import rotasContato from '../routes/contato.js';
import { logger, rateLimiter } from '../middleware/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const raiz = join(__dirname, '../../');

const app = express();
const PORTA = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiter);
app.use(express.static(join(raiz, 'public')));

// ── Rotas de API ─────────────────────────────────────────────
app.use('/api/historias', rotasHistorias);
app.use('/api/lugares',   rotasLugares);
app.use('/api/loja',      rotasLoja);
app.use('/api/chatbot',   rotasChatbot);
app.use('/api/contato',   rotasContato);

// ── Rotas de Página (SPA com HTML estático) ──────────────────
const paginas = ['/', '/historias', '/lugares', '/curiosidades', '/loja', '/contato'];
paginas.forEach(rota => {
  app.get(rota, (_req, res) => {
    res.sendFile(join(raiz, 'public', 'index.html'));
  });
});

// ── 404 e Erros ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada — ainda não chegamos aí!' });
});

app.use((err, _req, res, _next) => {
  console.error('[ERRO]', err.stack);
  res.status(500).json({ erro: 'Algo deu errado na estrada... tente novamente.' });
});

// ── Inicializa ────────────────────────────────────────────────
app.listen(PORTA, () => {
  console.log(`\n🚙 Nossas Histórias rodando em http://localhost:${PORTA}`);
  console.log(`📍 Ricardo e Tami — Do Brasil ao Alasca\n`);
});

export default app;

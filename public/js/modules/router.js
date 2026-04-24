// ═══════════════════════════════════════════════════════════════
//  MÓDULO: Router — SPA client-side
//  Gerencia navegação sem recarregar a página
// ═══════════════════════════════════════════════════════════════

/** @type {Map<string, () => Promise<string>>} */
const rotas = new Map();

/**
 * Registra uma rota no router
 * @param {string} caminho
 * @param {() => Promise<string>} renderizador - função que retorna HTML
 */
export function registrarRota(caminho, renderizador) {
  rotas.set(caminho, renderizador);
}

/**
 * Resolve o renderizador para um dado caminho,
 * suportando rotas dinâmicas com wildcard (ex: /historias/*)
 * @param {string} caminho
 */
function resolverRota(caminho) {
  // Busca exata primeiro
  if (rotas.has(caminho)) return rotas.get(caminho);

  // Busca por padrão wildcard (ex: '/historias/*' casa '/historias/slug-qualquer')
  for (const [padrao, fn] of rotas) {
    if (padrao.endsWith('/*')) {
      const base = padrao.slice(0, -2); // remove '/*'
      if (caminho.startsWith(base + '/')) {
        // Passa o caminho completo para a função renderizadora
        return () => fn(caminho);
      }
    }
  }

  // Fallback 404
  return rotas.get('/404') || rotas.get('/');
}

/**
 * Navega para um caminho sem recarregar a página
 * @param {string} caminho
 * @param {boolean} [pushState=true]
 */
export async function navegar(caminho, pushState = true) {
  const app      = document.getElementById('app');
  const renderFn = resolverRota(caminho);

  if (!renderFn) return;

  app.style.opacity    = '0.5';
  app.style.transition = 'opacity 0.15s ease';

  try {
    const html = await renderFn();
    app.innerHTML    = html;
    app.style.opacity = '1';

    if (pushState) history.pushState({ caminho }, '', caminho);

    atualizarNavAtiva(caminho);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.dispatchEvent(new CustomEvent('pagina-carregada', { detail: { caminho } }));

  } catch (err) {
    console.error('[Router] Erro ao carregar rota:', caminho, err);
    app.innerHTML    = '<div class="container secao"><p class="t-suave">Erro ao carregar. Tente novamente.</p></div>';
    app.style.opacity = '1';
  }
}

/**
 * Atualiza classe ativo dos links da nav
 * @param {string} caminho
 */
function atualizarNavAtiva(caminho) {
  document.querySelectorAll('[data-link]').forEach(link => {
    const href = link.getAttribute('href');
    const ativo = href === caminho || (caminho === '/' && href === '/');
    link.classList.toggle('nav__link--ativo', ativo);
  });
}

/** Intercepta todos os links [data-link] via delegação */
export function iniciarRouter() {
  // Clique em links internos
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href && href !== window.location.pathname) {
      navegar(href);
    }
  });

  // Botões voltar/avançar do browser
  window.addEventListener('popstate', e => {
    const caminho = e.state?.caminho || window.location.pathname;
    navegar(caminho, false);
  });

  // Primeira carga
  navegar(window.location.pathname, false);
}

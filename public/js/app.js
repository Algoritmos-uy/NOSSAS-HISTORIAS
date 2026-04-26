// ═══════════════════════════════════════════════════════════════
//  APP.JS — Ponto de entrada da aplicação SPA — COMPLETO
//  Nossas Histórias | Ricardo e Tami
// ═══════════════════════════════════════════════════════════════

import { registrarRota, iniciarRouter, navegar } from './modules/router.js';
import { iniciarHeader }                          from './modules/header.js';
import { iniciarHistorinha }                      from './modules/historinha.js';
import { initializeI18n }                         from './modules/i18n.js';
import { reiniciarScrollReveal }                  from './modules/scroll-reveal.js';
import { renderHome }                             from './pages/home.js';
import { render404 }                              from './pages/404.js';
import { renderHistoria }                         from './pages/historia.js';
import {
  renderHistorias,
  renderCuriosidades,
  renderLugares,
  renderLoja,
  renderContato,
  iniciarPaginaHistorias,
  iniciarPaginaLoja,
  iniciarPaginaContato
} from './pages/paginas.js';

// ── Registrar rotas estáticas ────────────────────────────────

registrarRota('/',             renderHome);
registrarRota('/historias',    renderHistorias);
registrarRota('/curiosidades', renderCuriosidades);
registrarRota('/lugares',      renderLugares);
registrarRota('/loja',         renderLoja);
registrarRota('/contato',      renderContato);
registrarRota('/404',          () => Promise.resolve(render404()));

// ── Router dinâmico para /historias/:slug ────────────────────
// Sobrescreve o comportamento padrão para rotas desconhecidas

const _navegar = navegar;

// Patch no router para suportar rotas dinâmicas
import { registrarRota as _registrar } from './modules/router.js';

// Registrar padrão de história individual
_registrar('/historias/*', async (caminho) => {
  const slug = caminho.replace('/historias/', '');
  return renderHistoria(slug);
});

// ── Ouvinte global pós-renderização ─────────────────────────

document.addEventListener('pagina-carregada', e => {
  const { caminho } = e.detail;

  // Delegação global para botões de navegação
  document.querySelectorAll('[data-link-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const destino = btn.getAttribute('data-link-btn');
      if (destino) navegar(destino);
    });
  });

  // Inicializadores específicos por página
  switch (true) {
    case caminho === '/historias':
      iniciarPaginaHistorias();
      // Tornar cards de história clicáveis
      document.querySelectorAll('#grid-historias article').forEach(card => {
        const slugEl = card.dataset.slug;
        if (slugEl) {
          card.style.cursor = 'pointer';
          card.addEventListener('click', () => navegar(`/historias/${slugEl}`));
        }
      });
      break;

    case caminho === '/curiosidades':
      document.getElementById('abrir-historinha-btn')
        ?.addEventListener('click', () => document.getElementById('historinha-toggle')?.click());
      break;

    case caminho === '/loja':
      iniciarPaginaLoja();
      break;

    case caminho === '/contato':
      iniciarPaginaContato();
      document.getElementById('contato-historinha-btn')
        ?.addEventListener('click', ev => {
          ev.preventDefault();
          document.getElementById('historinha-toggle')?.click();
        });
      break;
  }

  reiniciarScrollReveal();
});

document.addEventListener('idioma-alterado', () => {
  navegar(window.location.pathname, false);
});

// ── Inicialização ────────────────────────────────────────────

function iniciarApp() {
  initializeI18n();
  iniciarHeader();
  iniciarHistorinha();
  iniciarRouter();

  console.log('%c🚙 Nossas Histórias', 'font-size:20px;font-weight:bold;color:#C1440E;');
  console.log('%cRicardo e Tami — Do Brasil ao Alasca', 'font-size:12px;color:#D4A853;');
  console.log('%c🇲🇽 Agora no México! Alasca no horizonte 🏔️', 'font-size:12px;color:#52B788;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
  iniciarApp();
}

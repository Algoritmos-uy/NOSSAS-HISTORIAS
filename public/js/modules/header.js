// ═══════════════════════════════════════════════════════════════
//  MÓDULO: Header — Scroll behavior + menu mobile
// ═══════════════════════════════════════════════════════════════

import { t } from './i18n.js';

export function iniciarHeader() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('nav');
  const temaToggle = document.getElementById('tema-toggle');
  const raiz = document.documentElement;
  const TEMA_KEY = 'nossas-historias-tema';

  if (!header) return;

  aplicarTextosHeader();
  document.addEventListener('idioma-alterado', aplicarTextosHeader);

  // ── Tema claro/escuro ─────────────────────────────────────
  inicializarTema();

  temaToggle?.addEventListener('click', () => {
    const atual = raiz.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    aplicarTema(atual === 'light' ? 'dark' : 'light', true);
  });

  // ── Scroll ──────────────────────────────────────────────────
  let ultimoScroll = 0;

  const aoRolar = () => {
    const scrollAtual = window.scrollY;
    header.classList.toggle('header--scrolled', scrollAtual > 20);
    ultimoScroll = scrollAtual;
  };

  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar(); // estado inicial

  // ── Menu mobile ─────────────────────────────────────────────
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const aberto = nav.classList.toggle('nav--aberta');
    toggle.classList.toggle('menu-toggle--aberto', aberto);
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? t('header.closeMenu') : t('header.openMenu'));
    document.body.style.overflow = aberto ? 'hidden' : '';
  });

  // Fecha ao clicar num link
  nav.addEventListener('click', e => {
    if (e.target.closest('[data-link]')) {
      fecharMenu();
    }
  });

  // Fecha ao clicar fora
  document.addEventListener('click', e => {
    if (!header.contains(e.target) && nav.classList.contains('nav--aberta')) {
      fecharMenu();
    }
  });

  // Fecha com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav--aberta')) {
      fecharMenu();
      toggle.focus();
    }
  });

  // Em SPA, garante estado limpo do menu a cada troca de página
  document.addEventListener('pagina-carregada', () => {
    fecharMenu();
  });

  // Evita estado inconsistente ao alternar breakpoints
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      fecharMenu();
    }
  });

  function fecharMenu() {
    nav.classList.remove('nav--aberta');
    toggle.classList.remove('menu-toggle--aberto');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', t('header.openMenu'));
    document.body.style.overflow = '';
  }

  function aplicarTextosHeader() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      const aberto = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-label', aberto ? t('header.closeMenu') : t('header.openMenu'));
    }
  }

  function inicializarTema() {
    let salvo = null;
    try {
      salvo = window.localStorage.getItem(TEMA_KEY);
    } catch {
      salvo = null;
    }

    const temaInicial = salvo === 'light' || salvo === 'dark' ? salvo : 'dark';
    aplicarTema(temaInicial, false);
  }

  function aplicarTema(tema, persistir) {
    raiz.setAttribute('data-theme', tema);
    atualizarBotaoTema(tema);

    if (persistir) {
      try {
        window.localStorage.setItem(TEMA_KEY, tema);
      } catch {
        // storage indisponível: segue sem persistência
      }
    }
  }

  function atualizarBotaoTema(tema) {
    if (!temaToggle) return;

    const icone = temaToggle.querySelector('.tema-toggle__icone');
    const texto = temaToggle.querySelector('.tema-toggle__texto');
    const claroAtivo = tema === 'light';

    temaToggle.setAttribute('aria-pressed', String(claroAtivo));
    temaToggle.setAttribute('aria-label', claroAtivo ? 'Alternar para tema escuro' : 'Alternar para tema claro');
    temaToggle.title = claroAtivo ? 'Trocar para tema escuro' : 'Trocar para tema claro';

    if (icone) icone.textContent = claroAtivo ? '☀️' : '🌙';
    if (texto) texto.textContent = claroAtivo ? 'Claro' : 'Escuro';
  }
}

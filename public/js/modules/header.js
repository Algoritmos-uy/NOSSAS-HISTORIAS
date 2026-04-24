// ═══════════════════════════════════════════════════════════════
//  MÓDULO: Header — Scroll behavior + menu mobile
// ═══════════════════════════════════════════════════════════════

export function iniciarHeader() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('nav');

  if (!header) return;

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
    document.body.style.overflow = '';
  }
}

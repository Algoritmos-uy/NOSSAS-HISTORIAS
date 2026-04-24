// ═══════════════════════════════════════════════════════════════
//  MÓDULO: Scroll Reveal — Animações ao entrar na viewport
//  Usa IntersectionObserver (sem dependências)
// ═══════════════════════════════════════════════════════════════

/**
 * Inicia o observer de scroll reveal.
 * Observa todos os elementos com [data-reveal] ou classes .animar-surgir
 * que ainda não foram animados.
 */
export function iniciarScrollReveal() {
  if (!('IntersectionObserver' in window)) return; // fallback gracioso

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        el.classList.add('revelado');
        el.style.animationPlayState = 'running';
        observer.unobserve(el); // observa só uma vez
      });
    },
    {
      rootMargin: '0px 0px -60px 0px', // dispara 60px antes do fim da tela
      threshold: 0.1
    }
  );

  // Pausa todas as animações inicialmente e observa
  document.querySelectorAll(
    '.animar-surgir, [data-reveal], .card, .card-curiosidade, .card-produto, .faixa-rota'
  ).forEach(el => {
    // Só aplica se ainda não foi revelado
    if (el.classList.contains('revelado')) return;

    el.style.animationPlayState = 'paused';
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/**
 * Re-inicializa o reveal após troca de página (SPA).
 * Chamado automaticamente no evento 'pagina-carregada'.
 */
export function reiniciarScrollReveal() {
  // Pequeno delay para o DOM ser pintado
  requestAnimationFrame(() => {
    setTimeout(iniciarScrollReveal, 50);
  });
}

// ═══════════════════════════════════════════════════════════════
//  PÁGINA: 404 — Não encontrado
// ═══════════════════════════════════════════════════════════════

import { renderFooter } from './home.js';
import { getCurrentLanguage } from '../modules/i18n.js';

const I18N_404 = {
  'pt-BR': {
    title: 'Perdidos na Estrada!',
    desc1: 'Essa página não existe... mas não se preocupe — Ricardo e Tami já se perderam em lugares muito piores e sempre acharam o caminho de volta.',
    desc2: 'A bússola da Historinha não encontrou nada aqui. Tente uma das rotas abaixo! 🗺️',
    goHome: '🏠 Ir para o Início',
    goStories: '📖 Ver Histórias'
  },
  es: {
    title: '¡Perdidos en la Ruta!',
    desc1: 'Esta página no existe... pero no te preocupes: Ricardo y Tami ya se perdieron en lugares peores y siempre encontraron el camino de regreso.',
    desc2: 'La brújula de Frederico no encontró nada aquí. ¡Prueba una de las rutas de abajo! 🗺️',
    goHome: '🏠 Ir al Inicio',
    goStories: '📖 Ver Historias'
  },
  en: {
    title: 'Lost on the Road!',
    desc1: 'This page does not exist... but do not worry — Ricardo and Tami have been lost in worse places and always found their way back.',
    desc2: 'Frederico’s compass found nothing here. Try one of the routes below! 🗺️',
    goHome: '🏠 Go Home',
    goStories: '📖 View Stories'
  }
};

export function render404() {
  const locale = getCurrentLanguage();
  const t = I18N_404[locale] || I18N_404['pt-BR'];
  return /* html */`
    <div style="padding-top: var(--header-h);">
      <section class="secao" style="min-height: 80vh; display:flex; align-items:center;">
        <div class="container">
          <div style="text-align:center; max-width:560px; margin-inline:auto;">

            <!-- Animação bússola perdida -->
            <div style="margin-bottom:var(--esp-6); animation: rodando 8s linear infinite; display:inline-block;" aria-hidden="true">
              <img src="/assets/img/frederico.png" alt="" style="width:6rem; height:6rem; border-radius:50%; object-fit:cover; display:block;" />
            </div>

            <p style="
              font-family: var(--fonte-titulo);
              font-size: var(--text-5xl);
              color: var(--cor-terra);
              opacity: 0.3;
              line-height: 1;
              margin-bottom: var(--esp-4);
              font-weight: 900;
            ">404</p>

            <h1 style="font-family:var(--fonte-titulo); color:var(--cor-neve); font-size:var(--text-3xl); margin-bottom:var(--esp-4);">
              ${t.title}
            </h1>

            <p style="font-size:var(--text-lg); margin-bottom:var(--esp-4);">
              ${t.desc1}
            </p>

            <p style="color:var(--cor-cinza-quente); margin-bottom:var(--esp-10);">
              ${t.desc2}
            </p>

            <div style="display:flex; gap:var(--esp-4); justify-content:center; flex-wrap:wrap;">
              <button class="btn btn--primario btn--lg" data-link-btn="/">
                ${t.goHome}
              </button>
              <button class="btn btn--secundario btn--lg" data-link-btn="/historias">
                ${t.goStories}
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
    ${renderFooter()}
  `;
}

// ═══════════════════════════════════════════════════════════════
//  PÁGINA: 404 — Não encontrado
// ═══════════════════════════════════════════════════════════════

import { renderFooter } from './home.js';

export function render404() {
  return /* html */`
    <div style="padding-top: var(--header-h);">
      <section class="secao" style="min-height: 80vh; display:flex; align-items:center;">
        <div class="container">
          <div style="text-align:center; max-width:560px; margin-inline:auto;">

            <!-- Animação bússola perdida -->
            <div style="font-size:6rem; margin-bottom:var(--esp-6); animation: rodando 8s linear infinite; display:inline-block;" aria-hidden="true">
              🦫
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
              Perdidos na Estrada!
            </h1>

            <p style="font-size:var(--text-lg); margin-bottom:var(--esp-4);">
              Essa página não existe... mas não se preocupe — Ricardo e Tami já se perderam em lugares muito piores e sempre acharam o caminho de volta.
            </p>

            <p style="color:var(--cor-cinza-quente); margin-bottom:var(--esp-10);">
              A bússola da Historinha não encontrou nada aqui. Tente uma das rotas abaixo! 🗺️
            </p>

            <div style="display:flex; gap:var(--esp-4); justify-content:center; flex-wrap:wrap;">
              <button class="btn btn--primario btn--lg" data-link-btn="/">
                🏠 Ir para o Início
              </button>
              <button class="btn btn--secundario btn--lg" data-link-btn="/historias">
                📖 Ver Histórias
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
    ${renderFooter()}
  `;
}

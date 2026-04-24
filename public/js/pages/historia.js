// ═══════════════════════════════════════════════════════════════
//  PÁGINA: História Individual — Detalhe completo de um capítulo
// ═══════════════════════════════════════════════════════════════

import { historias as apiHistorias } from '../modules/api.js';
import { renderFooter } from './home.js';
import { navegar } from '../modules/router.js';

/**
 * Renderiza a página de detalhe de uma história
 * @param {string} slug
 */
export async function renderHistoria(slug) {
  let historia;

  try {
    const res = await apiHistorias.buscarPorSlug(slug);
    historia = res.dados;
  } catch {
    return /* html */`
      <div style="padding-top:var(--header-h);">
        <section class="secao" style="min-height:60vh;display:flex;align-items:center;">
          <div class="container" style="text-align:center;">
            <p style="font-size:4rem;margin-bottom:var(--esp-4);">📭</p>
            <h1 style="font-family:var(--fonte-titulo);color:var(--cor-neve);margin-bottom:var(--esp-4);">História não encontrada</h1>
            <p style="margin-bottom:var(--esp-8);">Essa história ainda não foi publicada ou o endereço está incorreto.</p>
            <button class="btn btn--primario" data-link-btn="/historias">← Ver todas as histórias</button>
          </div>
        </section>
      </div>
      ${renderFooter()}
    `;
  }

  const categoriaLabel = formatarCategoria(historia.categoria);
  const emoji = obterEmoji(historia.categoria);
  const dataFormatada = new Date(historia.data).toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // Conteúdo simulado do artigo (em produção viria do banco de dados / CMS)
  const conteudo = gerarConteudoSimulado(historia);

  return /* html */`
    <article style="padding-top:var(--header-h);" itemscope itemtype="https://schema.org/Article">

      <!-- ── Hero da história ── -->
      <header style="
        min-height: 55vh;
        display: flex;
        align-items: flex-end;
        position: relative;
        overflow: hidden;
        padding-bottom: var(--esp-16);
      ">
        <!-- Fundo com gradiente -->
        <div style="
          position:absolute; inset:0;
          background: linear-gradient(
            to bottom,
            rgba(15,25,35,0.3) 0%,
            rgba(15,25,35,0.7) 60%,
            var(--cor-noite) 100%
          ), linear-gradient(135deg, rgba(193,68,14,0.15), rgba(45,106,79,0.1));
        " aria-hidden="true"></div>

        <!-- Emoji / imagem -->
        <div style="
          position:absolute; inset:0;
          display:flex; align-items:center; justify-content:center;
          font-size:12rem; opacity:0.08; user-select:none;
          animation: ondular 6s ease-in-out infinite;
        " aria-hidden="true">${emoji}</div>

        <div class="container" style="position:relative;z-index:1;">
          <!-- Breadcrumb -->
          <nav aria-label="Você está em" style="margin-bottom:var(--esp-6);">
            <ol style="display:flex;gap:var(--esp-2);align-items:center;list-style:none;font-size:var(--text-sm);color:var(--cor-areia-escura);">
              <li><button class="btn btn--secundario btn--sm" data-link-btn="/" style="padding:var(--esp-1) var(--esp-3);">Início</button></li>
              <li style="opacity:0.4;">›</li>
              <li><button class="btn btn--secundario btn--sm" data-link-btn="/historias" style="padding:var(--esp-1) var(--esp-3);">Histórias</button></li>
              <li style="opacity:0.4;">›</li>
              <li style="color:var(--cor-areia);">${historia.titulo}</li>
            </ol>
          </nav>

          <div style="display:flex;gap:var(--esp-3);margin-bottom:var(--esp-4);flex-wrap:wrap;">
            <span class="badge">${categoriaLabel}</span>
            <span class="badge badge--verde">📍 ${historia.pais}</span>
            ${historia.destaque ? '<span class="badge badge--ouro">⭐ Destaque</span>' : ''}
          </div>

          <h1
            itemprop="headline"
            style="
              font-family:var(--fonte-titulo);
              font-size:clamp(var(--text-2xl),5vw,var(--text-4xl));
              color:var(--cor-neve);
              max-width:800px;
              line-height:1.2;
              margin-bottom:var(--esp-4);
            "
          >${historia.titulo}</h1>

          <p style="
            font-family:var(--fonte-titulo);
            font-size:var(--text-xl);
            color:var(--cor-ouro);
            font-style:italic;
            margin-bottom:var(--esp-6);
            max-width:640px;
          ">${historia.subtitulo}</p>

          <div style="display:flex;align-items:center;gap:var(--esp-6);flex-wrap:wrap;">
            <!-- Autores -->
            <div style="display:flex;align-items:center;gap:var(--esp-3);">
              <div style="
                width:44px;height:44px;border-radius:50%;
                background:linear-gradient(135deg,var(--cor-terra),var(--cor-ouro));
                display:flex;align-items:center;justify-content:center;
                font-size:1.4rem;
              " aria-hidden="true">🚙</div>
              <div>
                <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-xs);letter-spacing:0.1em;text-transform:uppercase;color:var(--cor-ouro);">Por</p>
                <p itemprop="author" style="font-size:var(--text-sm);color:var(--cor-neve);font-weight:700;">Ricardo e Tami</p>
              </div>
            </div>

            <div style="width:1px;height:32px;background:rgba(245,230,200,0.15);" aria-hidden="true"></div>

            <div>
              <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-xs);letter-spacing:0.1em;text-transform:uppercase;color:var(--cor-cinza-quente);">Publicado em</p>
              <time itemprop="datePublished" datetime="${historia.data}" style="font-size:var(--text-sm);color:var(--cor-areia);">${dataFormatada}</time>
            </div>

            <div style="width:1px;height:32px;background:rgba(245,230,200,0.15);" aria-hidden="true"></div>

            <div>
              <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-xs);letter-spacing:0.1em;text-transform:uppercase;color:var(--cor-cinza-quente);">Leitura</p>
              <p style="font-size:var(--text-sm);color:var(--cor-areia);">${historia.leitura} minutos</p>
            </div>
          </div>
        </div>
      </header>

      <!-- ── Conteúdo do artigo ── -->
      <div class="container" style="padding-block:var(--esp-16);">
        <div style="display:grid;grid-template-columns:1fr 320px;gap:var(--esp-16);align-items:start;" class="artigo-grid">

          <!-- Corpo do texto -->
          <div class="artigo-corpo" itemprop="articleBody" style="max-width:var(--largura-texto);">
            ${conteudo}
          </div>

          <!-- Sidebar -->
          <aside style="position:sticky;top:calc(var(--header-h) + var(--esp-8));">

            <!-- Card resumo -->
            <div style="
              background:var(--cor-noite-clara);
              border:1px solid rgba(245,230,200,0.08);
              border-radius:var(--raio-lg);
              padding:var(--esp-6);
              margin-bottom:var(--esp-6);
            ">
              <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-xs);letter-spacing:0.15em;text-transform:uppercase;color:var(--cor-ouro);margin-bottom:var(--esp-4);">
                Resumo
              </p>
              <p style="font-size:var(--text-sm);line-height:1.7;color:var(--cor-areia-escura);">${historia.resumo}</p>
            </div>

            <!-- Canal YouTube CTA -->
            <div style="
              background:linear-gradient(135deg,rgba(193,68,14,0.15),rgba(212,168,83,0.1));
              border:1px solid rgba(193,68,14,0.2);
              border-radius:var(--raio-lg);
              padding:var(--esp-6);
              margin-bottom:var(--esp-6);
              text-align:center;
            ">
              <p style="font-size:2rem;margin-bottom:var(--esp-3);" aria-hidden="true">🎥</p>
              <p style="font-family:var(--fonte-titulo);color:var(--cor-neve);margin-bottom:var(--esp-2);">Veja em vídeo!</p>
              <p style="font-size:var(--text-sm);color:var(--cor-areia-escura);margin-bottom:var(--esp-4);">Essa história também está no nosso canal do YouTube.</p>
              <a href="https://youtube.com/@canalnossashistorias" class="btn btn--primario" style="width:100%;justify-content:center;" target="_blank" rel="noopener">
                Assistir agora
              </a>
            </div>

            <!-- Navegação entre histórias -->
            <div style="
              background:var(--cor-noite-clara);
              border:1px solid rgba(245,230,200,0.08);
              border-radius:var(--raio-lg);
              padding:var(--esp-6);
            ">
              <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-xs);letter-spacing:0.15em;text-transform:uppercase;color:var(--cor-cinza-quente);margin-bottom:var(--esp-4);">
                Mais histórias
              </p>
              <button class="btn btn--secundario" style="width:100%;justify-content:center;" data-link-btn="/historias">
                ← Ver todas
              </button>
            </div>
          </aside>
        </div>
      </div>

    </article>

    <!-- CSS inline para responsividade do artigo -->
    <style>
      @media (max-width: 900px) {
        .artigo-grid {
          grid-template-columns: 1fr !important;
        }
        .artigo-corpo {
          max-width: 100% !important;
        }
      }
    </style>

    ${renderFooter()}
  `;
}

// ── Helpers ──────────────────────────────────────────────────

function obterEmoji(cat) {
  const m = { origem:'🏠', sudamerica:'🌎', veiculo:'🚙', centroamerica:'🌴', mexico:'🇲🇽', natureza:'🏔️', cidade:'🏙️' };
  return m[cat] || '✨';
}

function formatarCategoria(cat) {
  const m = { origem:'Origem', sudamerica:'América do Sul', veiculo:'Veículo', centroamerica:'América Central', mexico:'México 🇲🇽' };
  return m[cat] || cat;
}

/** Gera conteúdo de artigo simulado com boa tipografia */
function gerarConteudoSimulado(h) {
  const estiloP    = `font-size:var(--text-md);line-height:1.9;color:var(--cor-areia-escura);margin-bottom:var(--esp-6);`;
  const estiloH2   = `font-family:var(--fonte-titulo);font-size:var(--text-2xl);color:var(--cor-neve);margin:var(--esp-12) 0 var(--esp-6);line-height:1.2;`;
  const estiloH3   = `font-family:var(--fonte-titulo);font-size:var(--text-xl);color:var(--cor-neve);margin:var(--esp-8) 0 var(--esp-4);`;
  const estiloBloco = `
    border-left:3px solid var(--cor-terra);
    padding:var(--esp-4) var(--esp-6);
    margin:var(--esp-8) 0;
    background:rgba(193,68,14,0.07);
    border-radius:0 var(--raio-md) var(--raio-md) 0;
    font-family:var(--fonte-titulo);
    font-style:italic;
    font-size:var(--text-lg);
    color:var(--cor-neve);
    line-height:1.6;
  `;

  return `
    <p style="${estiloP}">
      ${h.resumo} Essa é a história completa de como tudo aconteceu — cada detalhe, cada emoção, cada quilômetro vivido na pele.
    </p>

    <blockquote style="${estiloBloco}">
      "A estrada não é apenas o caminho — ela é o destino em si."
      <footer style="font-size:var(--text-sm);color:var(--cor-ouro);margin-top:var(--esp-2);font-style:normal;">— Ricardo</footer>
    </blockquote>

    <h2 style="${estiloH2}">Como tudo começou</h2>

    <p style="${estiloP}">
      Cada história tem um ponto de partida. No nosso caso, foi uma decisão tomada numa noite comum, olhando o mapa e percebendo que a vida estava passando rápido demais entre quatro paredes. A pergunta foi simples: e se a gente for?
    </p>

    <p style="${estiloP}">
      Preparar a ${h.categoria === 'veiculo' ? 'Frontier' : 'Vitara'} levou semanas. Cada detalhe foi pensado: compartimentos de armazenamento, sistema elétrico solar, cama que se desdobra, cozinha compacta mas funcional. A Tamires cuidou da organização interior enquanto o Ricardo tratava da mecânica e do itinerário.
    </p>

    <h2 style="${estiloH2}">O momento em que chegamos</h2>

    <p style="${estiloP}">
      Quando as rodas pararam e a gente saiu do veículo, houve um silêncio entre nós. Aquele tipo de silêncio que vale mais do que qualquer palavra. <strong>${h.pais}</strong> nos recebia com tudo que tinha — beleza, caos, calor humano e uma profundidade cultural que levaria meses para absorver completamente.
    </p>

    <h3 style="${estiloH3}">O que mais surpreendeu</h3>

    <p style="${estiloP}">
      Nenhuma pesquisa prévia substitui a experiência real. A gastronomia local superou qualquer expectativa. A gente que encontramos na estrada — motoristas, moradores locais, outros viajantes — foram os personagens mais ricos dessa narrativa. Cada conversa acrescentou uma camada nova à nossa visão de mundo.
    </p>

    <!-- Destaque visual -->
    <div style="
      background:var(--cor-noite-clara);
      border:1px solid rgba(245,230,200,0.08);
      border-radius:var(--raio-xl);
      padding:var(--esp-8);
      margin:var(--esp-10) 0;
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:var(--esp-6);
      text-align:center;
    " role="list">
      ${[
        { emoji:'📍', num: h.pais, label:'Destino' },
        { emoji:'⏱️', num: h.leitura + ' min', label:'Leitura' },
        { emoji:'🛣️', num:'Épico', label:'Nível da aventura' }
      ].map(s => `
        <div role="listitem">
          <p style="font-size:2rem;margin-bottom:var(--esp-2);" aria-hidden="true">${s.emoji}</p>
          <p style="font-family:var(--fonte-titulo);font-size:var(--text-xl);color:var(--cor-neve);margin-bottom:var(--esp-1);">${s.num}</p>
          <p style="font-size:var(--text-xs);color:var(--cor-cinza-quente);font-family:var(--fonte-subtitulo);letter-spacing:0.1em;text-transform:uppercase;">${s.label}</p>
        </div>
      `).join('')}
    </div>

    <h2 style="${estiloH2}">O que fica na memória</h2>

    <p style="${estiloP}">
      Algumas imagens ficam gravadas para sempre. O pôr do sol que parou o tempo. A criança que acenou da beira da estrada. O café feito no fogareiro às 6 da manhã com vista para algo incrível. São esses momentos pequeninhos que fazem valer cada quilômetro rodado.
    </p>

    <p style="${estiloP}">
      A viagem segue. O mapa continua aberto. Cada nova fronteira é um novo capítulo — e esse aqui foi um dos mais importantes que já vivemos juntos.
    </p>

    <blockquote style="${estiloBloco}">
      "Viajar não é fugir da vida. É vivê-la de um ângulo que a maioria nunca vai ver."
      <footer style="font-size:var(--text-sm);color:var(--cor-ouro);margin-top:var(--esp-2);font-style:normal;">— Tamires</footer>
    </blockquote>

    <!-- Compartilhar -->
    <div style="
      border-top:1px solid rgba(245,230,200,0.1);
      padding-top:var(--esp-8);
      margin-top:var(--esp-10);
      display:flex;
      align-items:center;
      gap:var(--esp-4);
      flex-wrap:wrap;
    ">
      <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-sm);letter-spacing:0.1em;text-transform:uppercase;color:var(--cor-cinza-quente);">Gostou? Compartilhe:</p>
  <a href="https://youtube.com/@canalnossashistorias" class="btn btn--secundario btn--sm" target="_blank" rel="noopener">🎥 YouTube</a>
  <a href="https://instagram.com/nossashistoriasoficial" class="btn btn--secundario btn--sm" target="_blank" rel="noopener">📷 Instagram</a>
      <button class="btn btn--secundario btn--sm" onclick="navigator.share && navigator.share({title:'${h.titulo}',url:window.location.href})">🔗 Compartilhar</button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
//  PÁGINA: Home — Início
// ═══════════════════════════════════════════════════════════════

import { historias as apiHistorias } from '../modules/api.js';
import { navegar } from '../modules/router.js';

export async function renderHome() {
  const { dados: destaques } = await apiHistorias.listar({ destaque: true }).catch(() => ({ dados: [] }));

  return /* html */`
    <!-- BANNER INICIAL -->
    <section class="home-banner" aria-label="Banner principal Nossas Histórias">
      <div class="container">
        <img
          class="home-banner__imagem"
          src="/assets/img/banner-N-H-1200.png"
          alt="Banner Nossas Histórias"
          width="1200"
          height="441"
          loading="eager"
          decoding="async"
        />
      </div>
    </section>

    <!-- HERO -->
    <section class="hero" aria-labelledby="hero-titulo">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__grade" aria-hidden="true"></div>
      <div class="hero__rota" aria-hidden="true"></div>

      <div class="container">
        <div class="hero__conteudo">
          <p class="hero__etiqueta">Uma aventura real na América</p>
          <h1 class="hero__titulo" id="hero-titulo">
            Nossas<br>
            <em>Histórias</em>
          </h1>
          <p class="hero__descricao">
            Ricardo e Tami largaram a rotina e pegaram a estrada. Do Brasil à Patagônia na Grande Vitara. Agora numa Frontier com motor home, já entraram no México rumo ao Alasca.
          </p>
          <div class="hero__acoes">
            <button class="btn btn--primario btn--lg" data-link-btn="/historias">
              Ver as Histórias
            </button>
            <a class="btn btn--secundario btn--lg" href="https://youtube.com/@canalnossashistorias" target="_blank" rel="noopener">
              🎥 YouTube
            </a>
          </div>
        </div>
      </div>

      <!-- Indicador de rota -->
      <div class="hero__indicador" aria-label="Rota da aventura">
        <div class="hero__ponto hero__ponto--passado">
          <span class="hero__ponto-dot"></span>
          <span>Brasil</span>
        </div>
        <div class="hero__ponto hero__ponto--passado">
          <span class="hero__ponto-dot"></span>
          <span>América do Sul</span>
        </div>
        <div class="hero__ponto hero__ponto--passado">
          <span class="hero__ponto-dot"></span>
          <span>América Central</span>
        </div>
        <div class="hero__ponto hero__ponto--atual">
          <span class="hero__ponto-dot"></span>
          <span>México 🇲🇽</span>
        </div>
        <div class="hero__ponto hero__ponto--futuro">
          <span class="hero__ponto-dot"></span>
          <span>América do Norte</span>
        </div>
        <div class="hero__ponto hero__ponto--futuro">
          <span class="hero__ponto-dot"></span>
          <span>Alasca 🏔️</span>
        </div>
      </div>
    </section>

    <!-- ESTATÍSTICAS DA AVENTURA -->
    <section class="secao secao--compacta" aria-label="Números da aventura" style="background: var(--cor-noite-media); border-top: 1px solid rgba(245,230,200,0.06);">
      <div class="container">
        <div class="grid grid--4" role="list">
          ${[
            { num: '14+', label: 'Países Visitados', emoji: '🌎' },
            { num: '60.000+', label: 'Km Percorridos', emoji: '🛣️' },
            { num: '2', label: 'Aventureiros', emoji: '💑' },
            { num: '🇲🇽', label: 'Agora no México!', emoji: '📍' }
          ].map(stat => `
            <div class="faixa-rota" role="listitem">
              <span class="faixa-rota__numero" aria-hidden="true">${stat.emoji}</span>
              <div class="faixa-rota__info">
                <p class="faixa-rota__label">${stat.label}</p>
                <p class="faixa-rota__valor">${stat.num}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- HISTÓRIAS EM DESTAQUE -->
    <section class="secao" aria-labelledby="destaques-titulo">
      <div class="container">
        <div class="secao__cabecalho">
          <p class="secao__etiqueta">Capítulos da Aventura</p>
          <h2 class="secao__titulo" id="destaques-titulo">Histórias em Destaque</h2>
          <p class="secao__descricao">Da Vitara à Frontier — os momentos que marcaram nossa jornada pelas Américas.</p>
        </div>

        <div class="grid grid--auto" role="list">
          ${destaques.length > 0 ? destaques.map((h, i) => `
            <article class="card animar-surgir animar-delay-${i + 1}" role="listitem">
              <div class="card__imagem-wrapper">
                <div class="img-placeholder ratio ratio--16-9" aria-label="Imagem: ${h.titulo}" style="font-size:4rem;">
                  ${obterEmoji(h.categoria)}
                </div>
              </div>
              <div class="card__corpo">
                <p class="card__etiqueta">
                  <span class="badge">${formatarCategoria(h.categoria)}</span>
                  ${h.pais}
                </p>
                <h3 class="card__titulo">${h.titulo}</h3>
                <p class="card__subtitulo">${h.subtitulo}</p>
                <p class="card__texto">${h.resumo}</p>
                <div class="card__rodape">
                  <span class="card__meta">${h.leitura} min de leitura</span>
                  <button class="btn btn--primario btn--sm" data-link-btn="/historias">
                    Ler história
                  </button>
                </div>
              </div>
            </article>
          `).join('') : `<p class="t-suave">Histórias sendo carregadas... voltamos já! 🚙</p>`}
        </div>

        <div style="text-align:center; margin-top: var(--esp-12);">
          <button class="btn btn--secundario btn--lg" data-link-btn="/historias">
            Ver todas as histórias
          </button>
        </div>
      </div>
    </section>

    <!-- SOBRE O CASAL -->
    <section class="secao" style="background: var(--cor-noite-media); border-top: 1px solid rgba(245,230,200,0.06);" aria-labelledby="sobre-titulo">
      <div class="container">
        <div class="sobre-grid">
          <div class="sobre-grid__texto">
            <p class="secao__etiqueta" style="text-align:left; margin-bottom:var(--esp-4);">
              <span style="font-family:var(--fonte-subtitulo);font-size:var(--text-sm);letter-spacing:0.2em;text-transform:uppercase;color:var(--cor-terra-clara);">Quem somos</span>
            </p>
            <h2 class="secao__titulo" id="sobre-titulo" style="text-align:left;">
              Ricardo &amp; Tamires
            </h2>
            <p style="margin-bottom:var(--esp-6);">
              Ele tem 40 anos, ela tem 32. Juntos, decidiram que a vida cabia mais na estrada do que dentro de quatro paredes. Começaram percorrendo o Brasil inteiro numa <strong>Grand Vitara</strong>, depois avançaram por toda a América do Sul e a América Central.
            </p>
            <p style="margin-bottom:var(--esp-8);">
              Hoje vivem numa <strong>Frontier com motor home artesanal</strong> — casa e veículo ao mesmo tempo — e já estão no <strong>México</strong>, próximos de cruzar para os Estados Unidos rumo ao destino final: <em>o Alasca</em>.
            </p>
            <div class="sobre-grid__acoes" style="display:flex; gap:var(--esp-4); flex-wrap:wrap;">
              <a href="https://youtube.com/@canalnossashistorias" class="btn btn--primario" target="_blank" rel="noopener">
                🎥 Canal no YouTube
              </a>
              <button class="btn btn--secundario" data-link-btn="/contato">
                Falar com eles
              </button>
            </div>
          </div>

          <div class="sobre-grid__cards">
            ${[
              { emoji: '🚙', titulo: 'A Frontier', desc: 'Motor home artesanal — casa e veículo numa coisa só' },
              { emoji: '🌎', titulo: 'As Américas', desc: 'Do Brasil ao Alasca pela Panamericana — já no México!' },
              { emoji: '📸', titulo: 'Memórias reais', desc: 'Nada encenado. Vida real na estrada, com tudo que isso tem' },
              { emoji: '🎥', titulo: 'No YouTube', desc: 'Toda a aventura documentada em vídeo, episódio por episódio' }
            ].map((item, i) => `
              <div class="card-curiosidade animar-surgir animar-delay-${i+1}">
                <span class="card-curiosidade__emoji">${item.emoji}</span>
                <p class="card-curiosidade__pergunta">${item.titulo}</p>
                <p class="card-curiosidade__resposta">${item.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="secao" aria-label="Chamada para ação">
      <div class="container">
        <div style="text-align:center; max-width:600px; margin-inline:auto;">
          <p class="hero__etiqueta" style="justify-content:center;">A aventura continua</p>
          <h2 style="font-size:clamp(var(--text-2xl),4vw,var(--text-4xl)); color:var(--cor-neve); margin-bottom:var(--esp-6);">
            Venha viajar com a gente
          </h2>
          <p style="font-size:var(--text-lg); margin-bottom:var(--esp-10);">
            Acompanhe cada quilômetro, cada fronteira e cada pôr do sol — já estamos no México e o Alasca está cada vez mais perto!
          </p>
          <div style="display:flex;gap:var(--esp-4);justify-content:center;flex-wrap:wrap;">
            <button class="btn btn--primario btn--lg" data-link-btn="/historias">Explorar Histórias</button>
            <button class="btn btn--ouro btn--lg" data-link-btn="/loja">Visitar a Loja</button>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

// ── Helpers ──────────────────────────────────────────────────

function obterEmoji(categoria) {
  const mapa = {
    origem: '🏠', sudamerica: '🌎', veiculo: '🚙',
    centroamerica: '🌴', mexico: '🇲🇽', natureza: '🏔️', cidade: '🏙️'
  };
  return mapa[categoria] || '✨';
}

function formatarCategoria(cat) {
  const mapa = {
    origem: 'Origem', sudamerica: 'América do Sul',
    veiculo: 'Veículo', centroamerica: 'América Central', mexico: 'México 🇲🇽'
  };
  return mapa[cat] || cat;
}

export function renderFooter() {
  return /* html */`
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div>
            <p class="footer__logo">Nossas <span>Histórias</span></p>
            <p class="footer__descricao">
              A aventura de Ricardo e Tami percorrendo as Américas. Do Brasil ao Alasca numa Frontier com motor home — já estão no México e o destino final se aproxima!
            </p>
            <div class="footer__social" aria-label="Redes sociais">
              <a href="https://youtube.com/@canalnossashistorias" class="footer__social-link" target="_blank" rel="noopener" aria-label="YouTube">▶</a>
              <a href="https://instagram.com/nossashistoriasoficial" class="footer__social-link" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
            </div>
          </div>

          <nav aria-label="Links rápidos">
            <p class="footer__titulo-col">Páginas</p>
            <ul class="footer__links">
              <li><a href="/"             class="footer__link" data-link>Início</a></li>
              <li><a href="/historias"    class="footer__link" data-link>Histórias</a></li>
              <li><a href="/lugares"      class="footer__link" data-link>Lugares</a></li>
              <li><a href="/curiosidades" class="footer__link" data-link>Curiosidades</a></li>
              <li><a href="/loja"         class="footer__link" data-link>Loja</a></li>
              <li><a href="/contato"      class="footer__link" data-link>Contato</a></li>
            </ul>
          </nav>

          <div>
            <p class="footer__titulo-col">A Rota</p>
            <ul class="footer__links">
              <li><span class="footer__link">🇧🇷 Brasil — Origem ✓</span></li>
              <li><span class="footer__link">🌎 América do Sul ✓</span></li>
              <li><span class="footer__link">🌴 América Central ✓</span></li>
              <li><span class="footer__link">🇲🇽 México — Agora! →</span></li>
              <li><span class="footer__link">🗽 América do Norte</span></li>
              <li><span class="footer__link">🏔️ Alasca — Destino</span></li>
            </ul>
          </div>
        </div>

        <div class="footer__rodape">
          <p class="footer__copy">© 2024 Nossas Histórias • Ricardo e Tami • Feito com ❤️ na estrada</p>
          <p class="footer__copy">Conversa com a Historinha 🦫 — nossa guia virtual</p>
        </div>
      </div>
    </footer>
  `;
}

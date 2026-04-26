// ═══════════════════════════════════════════════════════════════
//  PÁGINA: Home — Início
// ═══════════════════════════════════════════════════════════════

import { historias as apiHistorias } from '../modules/api.js';
import { navegar } from '../modules/router.js';
import { getCurrentLanguage } from '../modules/i18n.js';

const HOME_I18N = {
  'pt-BR': {
    bannerAria: 'Banner principal Nossas Histórias',
    bannerAlt: 'Banner Nossas Histórias',
    heroTag: 'Uma aventura real na América',
    heroTitleMain: 'Nossas',
    heroTitleEm: 'Histórias',
    heroDesc: 'Ricardo e Tami largaram a rotina e pegaram a estrada. Do Brasil à Patagônia na Grande Vitara. Agora numa Frontier com motor home, já entraram no México rumo ao Alasca.',
    heroBtnStories: 'Ver as Histórias',
    routeAria: 'Rota da aventura',
    routePoints: ['Brasil', 'América do Sul', 'América Central', 'México 🇲🇽', 'América do Norte', 'Alasca 🏔️'],
    statsAria: 'Números da aventura',
    stats: [
      { num: '19', label: 'Países Visitados', emoji: '🌎' },
      { num: '60.000+', label: 'Km Percorridos', emoji: '🛣️' },
      { num: '3', label: 'Aventureiros', avatar: '/assets/img/ricardo-tami-2.png', avatarDireita: '/assets/img/frederico-mochila.png' },
      { num: '🇲🇽', label: 'Agora no México!', avatar: '/assets/img/mexico.png' }
    ],
    highlightsTag: 'Capítulos da Aventura',
    highlightsTitle: 'Histórias em Destaque',
    highlightsDesc: 'Da Vitara à Frontier — os momentos que marcaram nossa jornada pelas Américas.',
    readStory: 'Ler história',
    readingTimeSuffix: 'min de leitura',
    loadingStories: 'Histórias sendo carregadas... voltamos já! 🚙',
    allStories: 'Ver todas as histórias',
    aboutTag: 'Quem somos',
    aboutTitle: 'Ricardo &amp; Tamires',
    aboutP1: 'Ele tem 40 anos, ela tem 32. Juntos, decidiram que a vida cabia mais na estrada do que dentro de quatro paredes. Começaram percorrendo o Brasil inteiro numa <strong>Grand Vitara</strong>, depois avançaram por toda a América do Sul e a América Central.',
    aboutP2: 'Hoje vivem numa <strong>Frontier com motor home artesanal</strong> — casa e veículo ao mesmo tempo — e já estão no <strong>México</strong>, próximos de cruzar para os Estados Unidos rumo ao destino final: <em>o Alasca</em>.',
    aboutYoutube: '🎥 Canal no YouTube',
    aboutContact: 'Falar com eles',
    aboutCards: [
      { emoji: '🚙', titulo: 'A Frontier', desc: 'Motor home artesanal — casa e veículo numa coisa só' },
      { emoji: '🌎', titulo: 'As Américas', desc: 'Do Brasil ao Alasca pela Panamericana — já no México!' },
      { emoji: '📸', titulo: 'Memórias reais', desc: 'Nada encenado. Vida real na estrada, com tudo que isso tem' },
      { emoji: '🎥', titulo: 'No YouTube', desc: 'Toda a aventura documentada em vídeo, episódio por episódio' }
    ],
    ctaAria: 'Chamada para ação',
    ctaTag: 'A aventura continua',
    ctaTitle: 'Venha viajar com a gente',
    ctaDesc: 'Acompanhe cada quilômetro, cada fronteira e cada pôr do sol — já estamos no México e o Alasca está cada vez mais perto!',
    ctaStories: 'Explorar Histórias',
    ctaShop: 'Visitar a Loja'
  },
  es: {
    bannerAria: 'Banner principal Nossas Historias',
    bannerAlt: 'Banner Nossas Historias',
    heroTag: 'Una aventura real en América',
    heroTitleMain: 'Nossas',
    heroTitleEm: 'Historias',
    heroDesc: 'Ricardo y Tami dejaron la rutina y salieron a la carretera. De Brasil a la Patagonia en la Gran Vitara. Ahora, en una Frontier con motorhome, ya entraron a México rumbo a Alaska.',
    heroBtnStories: 'Ver Historias',
    routeAria: 'Ruta de la aventura',
    routePoints: ['Brasil', 'América del Sur', 'América Central', 'México 🇲🇽', 'América del Norte', 'Alaska 🏔️'],
    statsAria: 'Números de la aventura',
    stats: [
      { num: '19', label: 'Países visitados', emoji: '🌎' },
      { num: '60.000+', label: 'Km recorridos', emoji: '🛣️' },
      { num: '3', label: 'Aventureros', avatar: '/assets/img/ricardo-tami-2.png', avatarDireita: '/assets/img/frederico-mochila.png' },
      { num: '🇲🇽', label: '¡Ahora en México!', avatar: '/assets/img/mexico.png' }
    ],
    highlightsTag: 'Capítulos de la aventura',
    highlightsTitle: 'Historias destacadas',
    highlightsDesc: 'De la Vitara a la Frontier — momentos que marcaron nuestra ruta por América.',
    readStory: 'Leer historia',
    readingTimeSuffix: 'min de lectura',
    loadingStories: 'Cargando historias... ¡ya volvemos! 🚙',
    allStories: 'Ver todas las historias',
    aboutTag: 'Quiénes somos',
    aboutTitle: 'Ricardo &amp; Tamires',
    aboutP1: 'Él tiene 40 años y ella 32. Juntos decidieron que la vida cabía mejor en la ruta que entre cuatro paredes. Recorrieron todo Brasil en una <strong>Grand Vitara</strong> y luego avanzaron por Sudamérica y Centroamérica.',
    aboutP2: 'Hoy viven en una <strong>Frontier con motorhome artesanal</strong> — casa y vehículo al mismo tiempo — y ya están en <strong>México</strong>, cerca de cruzar a Estados Unidos rumbo a su destino final: <em>Alaska</em>.',
    aboutYoutube: '🎥 Canal en YouTube',
    aboutContact: 'Hablar con ellos',
    aboutCards: [
      { emoji: '🚙', titulo: 'La Frontier', desc: 'Motorhome artesanal: casa y vehículo en uno' },
      { emoji: '🌎', titulo: 'Las Américas', desc: 'De Brasil a Alaska por la Panamericana — ¡ya en México!' },
      { emoji: '📸', titulo: 'Memorias reales', desc: 'Nada actuado. Vida real en la ruta, con todo lo que eso implica' },
      { emoji: '🎥', titulo: 'En YouTube', desc: 'Toda la aventura documentada en video, episodio por episodio' }
    ],
    ctaAria: 'Llamado a la acción',
    ctaTag: 'La aventura continúa',
    ctaTitle: 'Viaja con nosotros',
    ctaDesc: 'Acompaña cada kilómetro, frontera y atardecer — ya estamos en México y Alaska está cada vez más cerca.',
    ctaStories: 'Explorar historias',
    ctaShop: 'Visitar la tienda'
  },
  en: {
    bannerAria: 'Main Nossas Histórias banner',
    bannerAlt: 'Nossas Histórias banner',
    heroTag: 'A real adventure in the Americas',
    heroTitleMain: 'Nossas',
    heroTitleEm: 'Stories',
    heroDesc: 'Ricardo and Tami left routine behind and hit the road. From Brazil to Patagonia in the Grand Vitara. Now, in a Frontier motorhome, they are already in Mexico heading to Alaska.',
    heroBtnStories: 'View Stories',
    routeAria: 'Adventure route',
    routePoints: ['Brazil', 'South America', 'Central America', 'Mexico 🇲🇽', 'North America', 'Alaska 🏔️'],
    statsAria: 'Adventure numbers',
    stats: [
      { num: '19', label: 'Countries visited', emoji: '🌎' },
      { num: '60,000+', label: 'Kilometers traveled', emoji: '🛣️' },
      { num: '3', label: 'Adventurers', avatar: '/assets/img/ricardo-tami-2.png', avatarDireita: '/assets/img/frederico-mochila.png' },
      { num: '🇲🇽', label: 'Now in Mexico!', avatar: '/assets/img/mexico.png' }
    ],
    highlightsTag: 'Adventure chapters',
    highlightsTitle: 'Featured Stories',
    highlightsDesc: 'From Vitara to Frontier — key moments from our journey through the Americas.',
    readStory: 'Read story',
    readingTimeSuffix: 'min read',
    loadingStories: 'Loading stories... be right back! 🚙',
    allStories: 'See all stories',
    aboutTag: 'Who we are',
    aboutTitle: 'Ricardo &amp; Tamires',
    aboutP1: 'He is 40 and she is 32. Together, they decided life fits better on the road than within four walls. They crossed all of Brazil in a <strong>Grand Vitara</strong>, then continued through South and Central America.',
    aboutP2: 'Today they live in a <strong>Frontier with a handcrafted motorhome</strong> — home and vehicle in one — and are already in <strong>Mexico</strong>, close to crossing into the US toward their final destination: <em>Alaska</em>.',
    aboutYoutube: '🎥 YouTube Channel',
    aboutContact: 'Contact them',
    aboutCards: [
      { emoji: '🚙', titulo: 'The Frontier', desc: 'Handcrafted motorhome — home and vehicle in one' },
      { emoji: '🌎', titulo: 'The Americas', desc: 'From Brazil to Alaska via the Pan-American — already in Mexico!' },
      { emoji: '📸', titulo: 'Real memories', desc: 'Nothing staged. Real road life, with everything it brings' },
      { emoji: '🎥', titulo: 'On YouTube', desc: 'The whole adventure documented on video, episode by episode' }
    ],
    ctaAria: 'Call to action',
    ctaTag: 'The adventure continues',
    ctaTitle: 'Come travel with us',
    ctaDesc: 'Follow every kilometer, border, and sunset — we are already in Mexico and Alaska is getting closer.',
    ctaStories: 'Explore Stories',
    ctaShop: 'Visit Shop'
  }
};

const FOOTER_I18N = {
  'pt-BR': {
    logoDesc: 'A aventura de Ricardo e Tami percorrendo as Américas. Do Brasil ao Alasca numa Frontier com motor home — já estão no México e o destino final se aproxima!',
    socialLabel: 'Redes sociais',
    pagesTitle: 'Páginas',
    pages: { home: 'Início', historias: 'Histórias', lugares: 'Lugares', curiosidades: 'Curiosidades', loja: 'Loja', contato: 'Contato' },
    routeTitle: 'A Rota',
    routeList: ['🇧🇷 Brasil — Origem ✓', '🌎 América do Sul ✓', '🌴 América Central ✓', '🇲🇽 México — Agora! →', '🗽 América do Norte', '🏔️ Alasca — Destino'],
    copy: '© 2024 Nossas Histórias • Ricardo e Tami • Feito com ❤️ na estrada',
    chatLine1: 'Conversa com o Frederico',
    chatLine2: '— nosso guia virtual'
  },
  es: {
    logoDesc: 'La aventura de Ricardo y Tami por las Américas. De Brasil a Alaska en una Frontier con motorhome — ya están en México y el destino final se acerca.',
    socialLabel: 'Redes sociales',
    pagesTitle: 'Páginas',
    pages: { home: 'Inicio', historias: 'Historias', lugares: 'Lugares', curiosidades: 'Curiosidades', loja: 'Tienda', contato: 'Contacto' },
    routeTitle: 'La Ruta',
    routeList: ['🇧🇷 Brasil — Origen ✓', '🌎 América del Sur ✓', '🌴 América Central ✓', '🇲🇽 México — ¡Ahora! →', '🗽 América del Norte', '🏔️ Alaska — Destino'],
    copy: '© 2024 Nossas Histórias • Ricardo y Tami • Hecho con ❤️ en la ruta',
    chatLine1: 'Habla con Frederico',
    chatLine2: '— nuestro guía virtual'
  },
  en: {
    logoDesc: 'Ricardo and Tami’s adventure across the Americas. From Brazil to Alaska in a Frontier motorhome — they are already in Mexico and the final destination is getting closer.',
    socialLabel: 'Social networks',
    pagesTitle: 'Pages',
    pages: { home: 'Home', historias: 'Stories', lugares: 'Places', curiosidades: 'Curiosities', loja: 'Shop', contato: 'Contact' },
    routeTitle: 'The Route',
    routeList: ['🇧🇷 Brazil — Origin ✓', '🌎 South America ✓', '🌴 Central America ✓', '🇲🇽 Mexico — Now! →', '🗽 North America', '🏔️ Alaska — Destination'],
    copy: '© 2024 Nossas Histórias • Ricardo and Tami • Made with ❤️ on the road',
    chatLine1: 'Chat with Frederico',
    chatLine2: '— our virtual guide'
  }
};

export async function renderHome() {
  const locale = getCurrentLanguage();
  const t = HOME_I18N[locale] || HOME_I18N['pt-BR'];
  const { dados: destaques } = await apiHistorias.listar({ destaque: true }).catch(() => ({ dados: [] }));

  return /* html */`
    <!-- BANNER INICIAL -->
  <section class="home-banner" aria-label="${t.bannerAria}">
      <div class="container">
        <img
          class="home-banner__imagem"
          src="/assets/img/banner-N-H-1200.png"
          alt="${t.bannerAlt}"
          width="1200"
          height="460"
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
          <p class="hero__etiqueta">${t.heroTag}</p>
          <h1 class="hero__titulo" id="hero-titulo">
            ${t.heroTitleMain}<br>
            <em>${t.heroTitleEm}</em>
          </h1>
          <p class="hero__descricao">${t.heroDesc}</p>
          <div class="hero__acoes">
            <button class="btn btn--primario btn--lg" data-link-btn="/historias">
              ${t.heroBtnStories}
            </button>
            <a class="btn btn--secundario btn--lg" href="https://youtube.com/@canalnossashistorias" target="_blank" rel="noopener">
              🎥 YouTube
            </a>
          </div>
        </div>
      </div>

      <!-- Indicador de rota -->
      <div class="hero__indicador" aria-label="${t.routeAria}">
        <div class="hero__ponto hero__ponto--passado">
          <span class="hero__ponto-dot"></span>
          <span>${t.routePoints[0]}</span>
        </div>
        <div class="hero__ponto hero__ponto--passado">
          <span class="hero__ponto-dot"></span>
          <span>${t.routePoints[1]}</span>
        </div>
        <div class="hero__ponto hero__ponto--passado">
          <span class="hero__ponto-dot"></span>
          <span>${t.routePoints[2]}</span>
        </div>
        <div class="hero__ponto hero__ponto--atual">
          <span class="hero__ponto-dot"></span>
          <span>${t.routePoints[3]}</span>
        </div>
        <div class="hero__ponto hero__ponto--futuro">
          <span class="hero__ponto-dot"></span>
          <span>${t.routePoints[4]}</span>
        </div>
        <div class="hero__ponto hero__ponto--futuro">
          <span class="hero__ponto-dot"></span>
          <span>${t.routePoints[5]}</span>
        </div>
      </div>
    </section>

    <!-- ESTATÍSTICAS DA AVENTURA -->
    <section class="secao secao--compacta" aria-label="${t.statsAria}" style="background: var(--cor-noite-media); border-top: 1px solid rgba(245,230,200,0.06);">
      <div class="container">
  <div class="grid grid--4 grid--numeros-aventura" role="list">
          ${t.stats.map(stat => `
            <div class="faixa-rota ${stat.avatarDireita ? 'faixa-rota--duplo-icone' : ''}" role="listitem">
              ${stat.avatar
                ? `<img src="${stat.avatar}" alt="" aria-hidden="true" class="faixa-rota__icone" />`
                : `<span class="faixa-rota__numero" aria-hidden="true">${stat.emoji}</span>`}
              <div class="faixa-rota__info">
                <p class="faixa-rota__label">${stat.label}</p>
                <p class="faixa-rota__valor">${stat.num}</p>
              </div>
              ${stat.avatarDireita
                ? `<img src="${stat.avatarDireita}" alt="" aria-hidden="true" class="faixa-rota__icone faixa-rota__icone--direita" />`
                : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- HISTÓRIAS EM DESTAQUE -->
    <section class="secao" aria-labelledby="destaques-titulo">
      <div class="container">
        <div class="secao__cabecalho">
          <p class="secao__etiqueta">${t.highlightsTag}</p>
          <h2 class="secao__titulo" id="destaques-titulo">${t.highlightsTitle}</h2>
          <p class="secao__descricao">${t.highlightsDesc}</p>
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
                  <span class="card__meta">${h.leitura} ${t.readingTimeSuffix}</span>
                  <button class="btn btn--primario btn--sm" data-link-btn="/historias">
                    ${t.readStory}
                  </button>
                </div>
              </div>
            </article>
          `).join('') : `<p class="t-suave">${t.loadingStories}</p>`}
        </div>

        <div style="text-align:center; margin-top: var(--esp-12);">
          <button class="btn btn--secundario btn--lg" data-link-btn="/historias">
            ${t.allStories}
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
              <span style="font-family:var(--fonte-subtitulo);font-size:var(--text-sm);letter-spacing:0.2em;text-transform:uppercase;color:var(--cor-terra-clara);">${t.aboutTag}</span>
            </p>
            <h2 class="secao__titulo" id="sobre-titulo" style="text-align:left;">
              ${t.aboutTitle}
            </h2>
            <p style="margin-bottom:var(--esp-6);">${t.aboutP1}</p>
            <p style="margin-bottom:var(--esp-8);">${t.aboutP2}</p>
            <div class="sobre-grid__acoes" style="display:flex; gap:var(--esp-4); flex-wrap:wrap;">
              <a href="https://youtube.com/@canalnossashistorias" class="btn btn--primario" target="_blank" rel="noopener">
                ${t.aboutYoutube}
              </a>
              <button class="btn btn--secundario" data-link-btn="/contato">
                ${t.aboutContact}
              </button>
            </div>
          </div>

          <div class="sobre-grid__cards">
            ${t.aboutCards.map((item, i) => `
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
    <section class="secao" aria-label="${t.ctaAria}">
      <div class="container">
        <div style="text-align:center; max-width:600px; margin-inline:auto;">
          <p class="hero__etiqueta" style="justify-content:center;">${t.ctaTag}</p>
          <h2 style="font-size:clamp(var(--text-2xl),4vw,var(--text-4xl)); color:var(--cor-neve); margin-bottom:var(--esp-6);">
            ${t.ctaTitle}
          </h2>
          <p style="font-size:var(--text-lg); margin-bottom:var(--esp-10);">${t.ctaDesc}</p>
          <div style="display:flex;gap:var(--esp-4);justify-content:center;flex-wrap:wrap;">
            <button class="btn btn--primario btn--lg" data-link-btn="/historias">${t.ctaStories}</button>
            <button class="btn btn--ouro btn--lg" data-link-btn="/loja">${t.ctaShop}</button>
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
  const locale = getCurrentLanguage();
  const mapas = {
    'pt-BR': {
      origem: 'Origem', sudamerica: 'América do Sul',
      veiculo: 'Veículo', centroamerica: 'América Central', mexico: 'México 🇲🇽'
    },
    es: {
      origem: 'Origen', sudamerica: 'América del Sur',
      veiculo: 'Vehículo', centroamerica: 'América Central', mexico: 'México 🇲🇽'
    },
    en: {
      origem: 'Origin', sudamerica: 'South America',
      veiculo: 'Vehicle', centroamerica: 'Central America', mexico: 'Mexico 🇲🇽'
    }
  };
  const mapa = mapas[locale] || mapas['pt-BR'];
  return mapa[cat] || cat;
}

export function renderFooter() {
  const locale = getCurrentLanguage();
  const t = FOOTER_I18N[locale] || FOOTER_I18N['pt-BR'];
  return /* html */`
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div>
            <p class="footer__logo">Nossas <span>Histórias</span></p>
            <p class="footer__descricao">${t.logoDesc}</p>
            <div class="footer__social" aria-label="${t.socialLabel}">
              <a href="https://youtube.com/@canalnossashistorias" class="footer__social-link" target="_blank" rel="noopener" aria-label="YouTube">▶</a>
              <a href="https://instagram.com/nossashistoriasoficial" class="footer__social-link" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
            </div>
          </div>

          <nav aria-label="Links rápidos">
            <p class="footer__titulo-col">${t.pagesTitle}</p>
            <ul class="footer__links">
              <li><a href="/"             class="footer__link" data-link>${t.pages.home}</a></li>
              <li><a href="/historias"    class="footer__link" data-link>${t.pages.historias}</a></li>
              <li><a href="/lugares"      class="footer__link" data-link>${t.pages.lugares}</a></li>
              <li><a href="/curiosidades" class="footer__link" data-link>${t.pages.curiosidades}</a></li>
              <li><a href="/loja"         class="footer__link" data-link>${t.pages.loja}</a></li>
              <li><a href="/contato"      class="footer__link" data-link>${t.pages.contato}</a></li>
            </ul>
          </nav>

          <div>
            <p class="footer__titulo-col">${t.routeTitle}</p>
            <ul class="footer__links">
              ${t.routeList.map(item => `<li><span class="footer__link">${item}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="footer__rodape">
          <h2 style="text-align:center; margin:0 0 var(--esp-4); font-size:clamp(1rem, 2.2vw, 1.25rem); font-family:var(--fonte-subtitulo); letter-spacing:0.04em;">
            Developed By: <a href="https://algoritmos.uy" target="_blank" rel="noopener" style="color:var(--cor-ouro); text-decoration:underline;">Willans Junes</a>
          </h2>
          <p class="footer__copy">${t.copy}</p>
          <p class="footer__copy" style="display:flex; align-items:center; justify-content:center; gap:0.4rem; flex-wrap:wrap;">
            ${t.chatLine1}
            <img src="/assets/img/frederico.png" alt="Frederico" style="width:1.1rem; height:1.1rem; border-radius:50%; object-fit:cover;" />
            ${t.chatLine2}
          </p>
        </div>
      </div>
    </footer>
  `;
}

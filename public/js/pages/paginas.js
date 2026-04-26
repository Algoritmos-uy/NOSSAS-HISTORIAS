// ═══════════════════════════════════════════════════════════════
//  PÁGINAS: Histórias, Curiosidades, Lugares, Loja, Contato
// ═══════════════════════════════════════════════════════════════

import { historias as apiHistorias, lugares as apiLugares, loja as apiLoja, contato as apiContato } from '../modules/api.js';
import { renderFooter } from './home.js';
import { gerarMapaRota } from '../modules/mapa-rota.js';
import { getCurrentLanguage } from '../modules/i18n.js';

function getPaginasI18n() {
  const locale = getCurrentLanguage();
  const i18n = {
    'pt-BR': {
      common: { all: 'Todas', loading: 'Carregando...', minRead: 'min', featured: '⭐ Destaque', secureNotice: '🔒 Compra segura • Entrega para todo o Brasil • Produtos digitais com acesso imediato' },
      historias: { tag: 'Capítulos da aventura', title: 'Nossas Histórias', desc: 'Cada história é um capítulo real de uma vida vivida na estrada.', filterAria: 'Filtrar histórias', listAria: 'Lista de histórias', readStory: 'Ler história: ' },
      curiosidades: { tag: 'Você não sabia mas vai querer saber', title: 'Curiosidades da Estrada', desc: 'As perguntas que mais chegam pra gente — respondidas com tudo que temos.', sectionAria: 'Curiosidades', ctaTitle: 'Tem mais dúvidas?', ctaDesc: 'Fala com o Frederico — nosso guia virtual que sabe de tudo sobre a aventura!', ctaBtn: '🗺️ Conversar com o Frederico' },
      lugares: {
        tag: 'Marcados no mapa do coração', title: 'Lugares Incríveis', desc: 'Os destinos que nos deixaram sem fôlego — e que recomendamos de olhos fechados.',
        sectionAria: 'Lugares visitados', routeTag: 'A rota completa', routeTitle: 'Do Brasil ao Alasca', routeDesc: 'Uma rota épica que já soma mais de <strong>60.000 km</strong> — cruzando climas, culturas, idiomas e fronteiras.',
        stageNow: '← Agora!', ratingAria: 'Avaliação', routeStages: [
          { flag: '🇧🇷', etapa: 'Brasil', status: 'percorrido', desc: 'Origem — todo o país percorrido' },
          { flag: '🌎', etapa: 'América do Sul', status: 'percorrido', desc: 'Patagônia, Andes, Amazônia e mais' },
          { flag: '🌴', etapa: 'América Central', status: 'percorrido', desc: 'Colômbia, Panamá, Costa Rica...' },
          { flag: '🇲🇽', etapa: 'México', status: 'atual', desc: 'Agora! Cruzamos a fronteira 🎉' },
          { flag: '🗽', etapa: 'América do Norte', status: 'futuro', desc: 'EUA — a próxima etapa' },
          { flag: '🏔️', etapa: 'Alasca', status: 'futuro', desc: 'Destino final da aventura' }
        ]
      },
      loja: { tag: 'Leve um pedaço da aventura', title: 'Nossa Loja', desc: 'Produtos com a cara da nossa jornada — para quem ama a estrada tanto quanto a gente.', sectionAria: 'Produtos disponíveis', filterAria: 'Filtrar produtos', all: 'Todos', digital: '📱 Digitais', fisico: '📦 Físicos', typeDigital: '📱 Digital', typeFisico: '📦 Físico', buy: 'Comprar Agora', buyAria: 'Comprar ' },
      contato: {
        tag: 'A estrada não nos cala', title: 'Fala com a Gente', desc: 'Seja pra parceria, dúvida ou só pra mandar um oi — a gente responde assim que tiver sinal! 📡',
        heading: 'Como nos encontrar', formAria: 'Formulário de contato',
        cards: [
          { emoji: '🎥', titulo: 'YouTube', desc: 'Canal Nossas Histórias<br>Novos vídeos toda semana', link: 'https://youtube.com/@canalnossashistorias', label: 'Acessar canal' },
          { emoji: '📷', titulo: 'Instagram', desc: 'Fotos e stories do dia a dia<br>na estrada', link: 'https://instagram.com/nossashistoriasoficial', label: 'Seguir no Instagram' },
          { avatar: '/assets/img/frederico.png', titulo: 'Frederico', desc: 'Nossa IA guia está sempre<br>disponível no site', link: '#', label: 'Conversar agora', id: 'contato-historinha-btn' }
        ],
        labels: { nome: 'Nome *', email: 'E-mail *', assunto: 'Assunto', mensagem: 'Mensagem *' },
        placeholders: { nome: 'Seu nome', email: 'seu@email.com', assunto: 'Parceria, dúvida, salve...', mensagem: 'Oi Ricardo e Tami! Queria dizer que...' },
        send: 'Enviar Mensagem 🚀', sending: 'Enviando... 📡', required: '⚠️ Preencha os campos obrigatórios.', error: '❌ Erro ao enviar. Tente novamente!'
      }
    },
    es: {
      common: { all: 'Todas', loading: 'Cargando...', minRead: 'min', featured: '⭐ Destacada', secureNotice: '🔒 Compra segura • Envíos a todo Brasil • Productos digitales con acceso inmediato' },
      historias: { tag: 'Capítulos de la aventura', title: 'Nuestras Historias', desc: 'Cada historia es un capítulo real de una vida en la ruta.', filterAria: 'Filtrar historias', listAria: 'Lista de historias', readStory: 'Leer historia: ' },
      curiosidades: { tag: 'Lo que no sabías pero quieres saber', title: 'Curiosidades del Camino', desc: 'Las preguntas que más recibimos — respondidas con todo lo que sabemos.', sectionAria: 'Curiosidades', ctaTitle: '¿Tienes más dudas?', ctaDesc: 'Habla con Frederico, nuestro guía virtual que sabe todo sobre la aventura.', ctaBtn: '🗺️ Hablar con Frederico' },
      lugares: {
        tag: 'Marcados en el mapa del corazón', title: 'Lugares Increíbles', desc: 'Destinos que nos dejaron sin aliento y que recomendamos con los ojos cerrados.',
        sectionAria: 'Lugares visitados', routeTag: 'La ruta completa', routeTitle: 'De Brasil a Alaska', routeDesc: 'Una ruta épica que ya supera los <strong>60.000 km</strong>, cruzando climas, culturas e idiomas.',
        stageNow: '← Ahora!', ratingAria: 'Valoración', routeStages: [
          { flag: '🇧🇷', etapa: 'Brasil', status: 'percorrido', desc: 'Origen — todo el país recorrido' },
          { flag: '🌎', etapa: 'América del Sur', status: 'percorrido', desc: 'Patagonia, Andes, Amazonía y más' },
          { flag: '🌴', etapa: 'América Central', status: 'percorrido', desc: 'Colombia, Panamá, Costa Rica...' },
          { flag: '🇲🇽', etapa: 'México', status: 'atual', desc: '¡Ahora! Cruzamos la frontera 🎉' },
          { flag: '🗽', etapa: 'América del Norte', status: 'futuro', desc: 'EE.UU. — la próxima etapa' },
          { flag: '🏔️', etapa: 'Alaska', status: 'futuro', desc: 'Destino final de la aventura' }
        ]
      },
      loja: { tag: 'Llévate un pedazo de la aventura', title: 'Nuestra Tienda', desc: 'Productos con la esencia de nuestro viaje — para quienes aman la ruta.', sectionAria: 'Productos disponibles', filterAria: 'Filtrar productos', all: 'Todos', digital: '📱 Digitales', fisico: '📦 Físicos', typeDigital: '📱 Digital', typeFisico: '📦 Físico', buy: 'Comprar ahora', buyAria: 'Comprar ' },
      contato: {
        tag: 'La ruta no nos calla', title: 'Habla con nosotros', desc: 'Sea para alianzas, dudas o un saludo — respondemos cuando tengamos señal 📡',
        heading: 'Cómo encontrarnos', formAria: 'Formulario de contacto',
        cards: [
          { emoji: '🎥', titulo: 'YouTube', desc: 'Canal Nossas Histórias<br>Nuevos videos cada semana', link: 'https://youtube.com/@canalnossashistorias', label: 'Ir al canal' },
          { emoji: '📷', titulo: 'Instagram', desc: 'Fotos e historias del día a día<br>en la ruta', link: 'https://instagram.com/nossashistoriasoficial', label: 'Seguir en Instagram' },
          { avatar: '/assets/img/frederico.png', titulo: 'Frederico', desc: 'Nuestra IA guía siempre está<br>disponible en el sitio', link: '#', label: 'Hablar ahora', id: 'contato-historinha-btn' }
        ],
        labels: { nome: 'Nombre *', email: 'Correo *', assunto: 'Asunto', mensagem: 'Mensaje *' },
        placeholders: { nome: 'Tu nombre', email: 'tu@email.com', assunto: 'Alianza, duda, saludo...', mensagem: '¡Hola Ricardo y Tami! Quería decir que...' },
        send: 'Enviar mensaje 🚀', sending: 'Enviando... 📡', required: '⚠️ Completa los campos obligatorios.', error: '❌ Error al enviar. ¡Inténtalo nuevamente!' }
    },
    en: {
      common: { all: 'All', loading: 'Loading...', minRead: 'min', featured: '⭐ Featured', secureNotice: '🔒 Secure checkout • Shipping across Brazil • Instant-access digital products' },
      historias: { tag: 'Adventure chapters', title: 'Our Stories', desc: 'Each story is a real chapter of life on the road.', filterAria: 'Filter stories', listAria: 'Stories list', readStory: 'Read story: ' },
      curiosidades: { tag: 'Things you did not know (but should)', title: 'Road Curiosities', desc: 'The questions we get the most — answered with everything we know.', sectionAria: 'Curiosities', ctaTitle: 'Got more questions?', ctaDesc: 'Talk to Frederico, our virtual guide who knows everything about the trip.', ctaBtn: '🗺️ Chat with Frederico' },
      lugares: {
        tag: 'Pinned on our heart map', title: 'Amazing Places', desc: 'Destinations that took our breath away — and we highly recommend.',
        sectionAria: 'Visited places', routeTag: 'The full route', routeTitle: 'From Brazil to Alaska', routeDesc: 'An epic route already above <strong>60,000 km</strong>, crossing climates, cultures and languages.',
        stageNow: '← Now!', ratingAria: 'Rating', routeStages: [
          { flag: '🇧🇷', etapa: 'Brazil', status: 'percorrido', desc: 'Origin — whole country covered' },
          { flag: '🌎', etapa: 'South America', status: 'percorrido', desc: 'Patagonia, Andes, Amazon and more' },
          { flag: '🌴', etapa: 'Central America', status: 'percorrido', desc: 'Colombia, Panama, Costa Rica...' },
          { flag: '🇲🇽', etapa: 'Mexico', status: 'atual', desc: 'Now! We crossed the border 🎉' },
          { flag: '🗽', etapa: 'North America', status: 'futuro', desc: 'USA — next stage' },
          { flag: '🏔️', etapa: 'Alaska', status: 'futuro', desc: 'Final destination' }
        ]
      },
      loja: { tag: 'Take a piece of the adventure', title: 'Our Shop', desc: 'Products inspired by our journey — for everyone who loves road life.', sectionAria: 'Available products', filterAria: 'Filter products', all: 'All', digital: '📱 Digital', fisico: '📦 Physical', typeDigital: '📱 Digital', typeFisico: '📦 Physical', buy: 'Buy now', buyAria: 'Buy ' },
      contato: {
        tag: 'The road keeps us talking', title: 'Talk to us', desc: 'For partnerships, questions, or just to say hi — we reply as soon as we get signal 📡',
        heading: 'How to reach us', formAria: 'Contact form',
        cards: [
          { emoji: '🎥', titulo: 'YouTube', desc: 'Nossas Histórias channel<br>New videos every week', link: 'https://youtube.com/@canalnossashistorias', label: 'Visit channel' },
          { emoji: '📷', titulo: 'Instagram', desc: 'Daily road photos and stories', link: 'https://instagram.com/nossashistoriasoficial', label: 'Follow on Instagram' },
          { avatar: '/assets/img/frederico.png', titulo: 'Frederico', desc: 'Our AI guide is always<br>available on the site', link: '#', label: 'Chat now', id: 'contato-historinha-btn' }
        ],
        labels: { nome: 'Name *', email: 'Email *', assunto: 'Subject', mensagem: 'Message *' },
        placeholders: { nome: 'Your name', email: 'your@email.com', assunto: 'Partnership, question, hello...', mensagem: 'Hi Ricardo and Tami! I wanted to say...' },
        send: 'Send message 🚀', sending: 'Sending... 📡', required: '⚠️ Please fill required fields.', error: '❌ Failed to send. Please try again!' }
    }
  };

  return i18n[locale] || i18n['pt-BR'];
}

// ── HISTÓRIAS ─────────────────────────────────────────────────

export async function renderHistorias() {
  const t = getPaginasI18n();
  const { dados } = await apiHistorias.listar().catch(() => ({ dados: [] }));

  const categorias = ['__all', ...new Set(dados.map(h => formatarCategoria(h.categoria)))];

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <!-- Cabeçalho da página -->
      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:var(--esp-4);">
            <p class="secao__etiqueta">${t.historias.tag}</p>
            <h1 class="secao__titulo">${t.historias.title}</h1>
            <p class="secao__descricao">${t.historias.desc}</p>
          </div>

          <!-- Filtros -->
          <div style="display:flex; gap:var(--esp-3); flex-wrap:wrap; justify-content:center;" role="group" aria-label="${t.historias.filterAria}">
            ${categorias.map((cat, i) => `
              <button class="btn ${i === 0 ? 'btn--primario' : 'btn--secundario'} btn--sm filtro-btn" data-filtro="${cat}">
                ${cat === '__all' ? t.common.all : cat}
              </button>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Grid de histórias -->
  <section class="secao" aria-label="${t.historias.listAria}">
        <div class="container">
          <div class="grid grid--auto" id="grid-historias" role="list">
            ${dados.map((h, i) => `
              <article
                class="card animar-surgir animar-delay-${Math.min(i+1,5)}"
                role="listitem"
                data-categoria="${formatarCategoria(h.categoria)}"
                data-slug="${h.slug}"
                style="cursor:pointer;"
                tabindex="0"
                aria-label="${t.historias.readStory}${h.titulo}"
              >
                <div class="card__imagem-wrapper">
                  <div class="img-placeholder ratio ratio--16-9" style="font-size:4rem;" aria-hidden="true">
                    ${obterEmoji(h.categoria)}
                  </div>
                </div>
                <div class="card__corpo">
                  <p class="card__etiqueta">
                    <span class="badge">${formatarCategoria(h.categoria)}</span>
                    ${h.pais}
                  </p>
                  <h2 class="card__titulo">${h.titulo}</h2>
                  <p class="card__subtitulo">${h.subtitulo}</p>
                  <p class="card__texto">${h.resumo}</p>
                  <div class="card__rodape">
                    <time class="card__meta" datetime="${h.data}">${formatarData(h.data)} • ${h.leitura} ${t.common.minRead}</time>
                    ${h.destaque ? `<span class="badge badge--ouro">${t.common.featured}</span>` : ''}
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

    </div>
    ${renderFooter()}
  `;
}

// ── CURIOSIDADES ─────────────────────────────────────────────

export async function renderCuriosidades() {
  const t = getPaginasI18n();
  const { dados } = await apiHistorias.curiosidades().catch(() => ({ dados: [] }));

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">${t.curiosidades.tag}</p>
            <h1 class="secao__titulo">${t.curiosidades.title}</h1>
            <p class="secao__descricao">${t.curiosidades.desc}</p>
          </div>
        </div>
      </section>

  <section class="secao" aria-label="${t.curiosidades.sectionAria}">
        <div class="container">
          <div class="grid grid--3" role="list">
            ${dados.map((c, i) => `
              <div class="card-curiosidade animar-surgir animar-delay-${Math.min(i+1,5)}" role="listitem">
                <span class="card-curiosidade__emoji" aria-hidden="true">${c.emoji}</span>
                <p class="card-curiosidade__pergunta">${c.titulo}</p>
                <p class="card-curiosidade__resposta">${c.resposta}</p>
                <span class="badge badge--verde" style="margin-top:var(--esp-4);">${c.categoria}</span>
              </div>
            `).join('')}
          </div>

          <!-- CTA para o chatbot -->
          <div style="text-align:center; margin-top:var(--esp-16); padding:var(--esp-12); background:var(--cor-noite-media); border-radius:var(--raio-xl); border:1px solid rgba(245,230,200,0.08);">
            <p style="font-size:3rem; margin-bottom:var(--esp-4);" aria-hidden="true">🤖</p>
            <h2 style="font-family:var(--fonte-titulo); color:var(--cor-neve); margin-bottom:var(--esp-4);">
              ${t.curiosidades.ctaTitle}
            </h2>
            <p style="margin-bottom:var(--esp-8);">
              ${t.curiosidades.ctaDesc}
            </p>
            <button class="btn btn--primario" id="abrir-historinha-btn">
              ${t.curiosidades.ctaBtn}
            </button>
          </div>
        </div>
      </section>

    </div>
    ${renderFooter()}
  `;
}

// ── LUGARES ───────────────────────────────────────────────────

export async function renderLugares() {
  const t = getPaginasI18n();
  const { dados } = await apiLugares.listar().catch(() => ({ dados: [] }));

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">${t.lugares.tag}</p>
            <h1 class="secao__titulo">${t.lugares.title}</h1>
            <p class="secao__descricao">${t.lugares.desc}</p>
          </div>
        </div>
      </section>

  <section class="secao" aria-label="${t.lugares.sectionAria}">
        <div class="container">

          <!-- Mapa SVG da Rota -->
          <div style="margin-bottom:var(--esp-16);">
            <div style="text-align:center; margin-bottom:var(--esp-8);">
              <p class="secao__etiqueta">${t.lugares.routeTag}</p>
              <h2 style="font-family:var(--fonte-titulo);color:var(--cor-neve);font-size:var(--text-2xl);">${t.lugares.routeTitle}</h2>
            </div>
            <div class="mapa-layout" style="display:grid;grid-template-columns:1fr 1.8fr;gap:var(--esp-8);align-items:start;">
              ${gerarMapaRota()}
              <div>
                <p style="font-size:var(--text-lg);margin-bottom:var(--esp-6);">${t.lugares.routeDesc}</p>
                <div style="display:flex;flex-direction:column;gap:var(--esp-4);">
                  ${t.lugares.routeStages.map(e => `
                    <div style="display:flex;align-items:center;gap:var(--esp-4);padding:var(--esp-3) var(--esp-4);border-radius:var(--raio-md);background:${e.status === 'atual' ? 'rgba(193,68,14,0.1)' : e.status === 'percorrido' ? 'rgba(45,106,79,0.08)' : 'rgba(26,43,60,0.5)'};border:1px solid ${e.status === 'atual' ? 'rgba(193,68,14,0.3)' : e.status === 'percorrido' ? 'rgba(45,106,79,0.2)' : 'rgba(245,230,200,0.06)'};">
                      <span style="font-size:1.5rem;flex-shrink:0;">${e.flag}</span>
                      <div>
                        <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-sm);color:${e.status === 'atual' ? 'var(--cor-terra-clara)' : e.status === 'percorrido' ? 'var(--cor-verde-clara)' : 'var(--cor-cinza-quente)'};letter-spacing:0.05em;">
                          ${e.etapa} ${e.status === 'percorrido' ? '✓' : e.status === 'atual' ? t.lugares.stageNow : ''}
                        </p>
                        <p style="font-size:var(--text-xs);color:var(--cor-areia-escura);">${e.desc}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
            <style>
              @media (max-width: 768px) {
                .mapa-layout { grid-template-columns: 1fr !important; }
              }
            </style>
          </div>

          <!-- Cards de lugares -->
          <div class="grid grid--auto" role="list">
            ${dados.map((l, i) => `
              <div class="card animar-surgir animar-delay-${Math.min(i+1,5)}" role="listitem">
                <div class="img-placeholder ratio ratio--16-9" style="font-size:4rem;" aria-hidden="true">
                  ${obterEmojiLugar(l.categoria)}
                </div>
                <div class="card__corpo">
                  <p class="card__etiqueta">
                    <span class="badge badge--verde">${l.categoria}</span>
                    ${l.pais}
                  </p>
                  <h2 class="card__titulo">${l.nome}</h2>
                  <p class="card__texto">${l.descricao}</p>
                  <div class="card__rodape">
                    <span class="card__meta" aria-label="${t.lugares.ratingAria} ${l.nota} de 5">${'⭐'.repeat(l.nota)}</span>
                    <span class="badge badge--ouro">📍 ${l.pais}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

    </div>
    ${renderFooter()}
  `;
}

// ── LOJA ──────────────────────────────────────────────────────

export async function renderLoja() {
  const t = getPaginasI18n();
  const { dados: produtos } = await apiLoja.listar().catch(() => ({ dados: [] }));

  const emojis = { 1: '📖', 2: '👕', 3: '☕', 4: '🔖' };

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">${t.loja.tag}</p>
            <h1 class="secao__titulo">${t.loja.title}</h1>
            <p class="secao__descricao">${t.loja.desc}</p>
          </div>
        </div>
      </section>

  <section class="secao" aria-label="${t.loja.sectionAria}">
        <div class="container">

          <!-- Filtros tipo -->
          <div style="display:flex; gap:var(--esp-3); justify-content:center; margin-bottom:var(--esp-12); flex-wrap:wrap;" role="group" aria-label="${t.loja.filterAria}">
            <button class="btn btn--primario btn--sm loja-filtro" data-tipo="">${t.loja.all}</button>
            <button class="btn btn--secundario btn--sm loja-filtro" data-tipo="digital">${t.loja.digital}</button>
            <button class="btn btn--secundario btn--sm loja-filtro" data-tipo="fisico">${t.loja.fisico}</button>
          </div>

          <div class="grid grid--4" id="grid-produtos" role="list">
            ${produtos.map((p, i) => `
              <article class="card-produto animar-surgir animar-delay-${Math.min(i+1,5)}" role="listitem" data-tipo="${p.tipo}">
                <div class="card-produto__img img-placeholder" aria-label="${p.nome}" style="font-size:5rem;">
                  ${emojis[p.id] || '✨'}
                </div>
                <div class="card-produto__corpo">
                  <p class="card-produto__tipo">${p.tipo === 'digital' ? t.loja.typeDigital : t.loja.typeFisico}</p>
                  <h2 class="card-produto__nome">${p.nome}</h2>
                  <p class="card-produto__desc">${p.descricao}</p>
                  <p class="card-produto__preco">
                    R$ ${p.preco.toFixed(2).replace('.', ',')}
                    <span>BRL</span>
                  </p>
                  <button class="btn btn--ouro" style="width:100%;" aria-label="${t.loja.buyAria}${p.nome}">
                    ${t.loja.buy}
                  </button>
                </div>
              </article>
            `).join('')}
          </div>

          <!-- Aviso -->
          <div style="text-align:center; margin-top:var(--esp-16);">
            <p style="color:var(--cor-cinza-quente); font-size:var(--text-sm);">
              ${t.common.secureNotice}
            </p>
          </div>
        </div>
      </section>

    </div>
    ${renderFooter()}
  `;
}

// ── CONTATO ───────────────────────────────────────────────────

export async function renderContato() {
  const t = getPaginasI18n();
  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">${t.contato.tag}</p>
            <h1 class="secao__titulo">${t.contato.title}</h1>
            <p class="secao__descricao">${t.contato.desc}</p>
          </div>
        </div>
      </section>

      <section class="secao" aria-labelledby="form-titulo">
        <div class="container">
          <div class="contato-layout">

            <!-- Info lateral -->
            <div>
              <h2 id="form-titulo" style="font-family:var(--fonte-titulo); color:var(--cor-neve); font-size:var(--text-2xl); margin-bottom:var(--esp-8);">
                ${t.contato.heading}
              </h2>

              ${t.contato.cards.map(item => `
                <div style="display:flex; gap:var(--esp-4); padding:var(--esp-6); background:var(--cor-noite-clara); border-radius:var(--raio-lg); border:1px solid rgba(245,230,200,0.08); margin-bottom:var(--esp-4); transition: border-color var(--trans-media);">
                  ${item.avatar
                    ? `<img src="${item.avatar}" alt="" aria-hidden="true" style="width:2.25rem; height:2.25rem; border-radius:50%; object-fit:cover; flex-shrink:0;" />`
                    : `<span style="font-size:2rem; flex-shrink:0;" aria-hidden="true">${item.emoji}</span>`}
                  <div>
                    <p style="font-family:var(--fonte-titulo); color:var(--cor-neve); margin-bottom:var(--esp-1);">${item.titulo}</p>
                    <p style="font-size:var(--text-sm); color:var(--cor-areia-escura); margin-bottom:var(--esp-3);">${item.desc}</p>
                    <a href="${item.link}" class="btn btn--secundario btn--sm" ${item.id ? `id="${item.id}"` : ''} ${item.link.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
                      ${item.label}
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Formulário -->
            <div>
              <form class="form-contato" id="form-contato" novalidate aria-label="${t.contato.formAria}">
                <div class="form__grid">
                  <div class="form__grupo">
                    <label class="form__label" for="nome">${t.contato.labels.nome}</label>
                    <input class="form__input" type="text" id="nome" name="nome" placeholder="${t.contato.placeholders.nome}" required autocomplete="given-name" />
                  </div>
                  <div class="form__grupo">
                    <label class="form__label" for="email">${t.contato.labels.email}</label>
                    <input class="form__input" type="email" id="email" name="email" placeholder="${t.contato.placeholders.email}" required autocomplete="email" />
                  </div>
                </div>

                <div class="form__grupo">
                  <label class="form__label" for="assunto">${t.contato.labels.assunto}</label>
                  <input class="form__input" type="text" id="assunto" name="assunto" placeholder="${t.contato.placeholders.assunto}" />
                </div>

                <div class="form__grupo">
                  <label class="form__label" for="mensagem">${t.contato.labels.mensagem}</label>
                  <textarea class="form__textarea" id="mensagem" name="mensagem" placeholder="${t.contato.placeholders.mensagem}" required></textarea>
                </div>

                <button type="submit" class="btn btn--primario btn--lg" style="width:100%;" id="btn-enviar">
                  ${t.contato.send}
                </button>

                <div id="form-feedback" role="alert" aria-live="polite" style="display:none; padding:var(--esp-4); border-radius:var(--raio-md); text-align:center; font-weight:700;"></div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
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

function obterEmojiLugar(categoria) {
  const mapa = { natureza: '🏔️', paisagem: '🌅', cidade: '🏙️', rota: '🛣️' };
  return mapa[categoria] || '📍';
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

function formatarData(iso) {
  const locale = getCurrentLanguage();
  const localeMap = { 'pt-BR': 'pt-BR', es: 'es-ES', en: 'en-US' };
  return new Date(iso).toLocaleDateString(localeMap[locale] || 'pt-BR', { month: 'short', year: 'numeric' });
}

// ── Inicializadores de página (eventos pós-render) ───────────

export function iniciarPaginaHistorias() {
  const t = getPaginasI18n();
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filtro = btn.dataset.filtro;
      document.querySelectorAll('.filtro-btn').forEach(b => {
        b.classList.toggle('btn--primario', b === btn);
        b.classList.toggle('btn--secundario', b !== btn);
      });
      document.querySelectorAll('#grid-historias article').forEach(card => {
        const mostrar = !filtro || filtro === '__all' || card.dataset.categoria === filtro;
        card.style.display = mostrar ? '' : 'none';
      });
    });
  });
}

export function iniciarPaginaLoja() {
  document.querySelectorAll('.loja-filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = btn.dataset.tipo;
      document.querySelectorAll('.loja-filtro').forEach(b => {
        b.classList.toggle('btn--primario', b === btn);
        b.classList.toggle('btn--secundario', b !== btn);
      });
      document.querySelectorAll('#grid-produtos article').forEach(card => {
        const mostrar = !tipo || card.dataset.tipo === tipo;
        card.style.display = mostrar ? '' : 'none';
      });
    });
  });
}

export function iniciarPaginaContato() {
  const t = getPaginasI18n();
  const form     = document.getElementById('form-contato');
  const feedback = document.getElementById('form-feedback');
  const btnEnv   = document.getElementById('btn-enviar');

  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const dados = {
      nome:     form.nome.value.trim(),
      email:    form.email.value.trim(),
      assunto:  form.assunto.value.trim(),
      mensagem: form.mensagem.value.trim()
    };

    if (!dados.nome || !dados.email || !dados.mensagem) {
      mostrarFeedback(t.contato.required, 'erro');
      return;
    }

    btnEnv.disabled = true;
    btnEnv.textContent = t.contato.sending;

    try {
      const res = await apiContato.enviar(dados);
      mostrarFeedback('✅ ' + res.mensagem, 'sucesso');
      form.reset();
    } catch {
      mostrarFeedback(t.contato.error, 'erro');
    } finally {
      btnEnv.disabled = false;
      btnEnv.textContent = t.contato.send;
    }
  });

  function mostrarFeedback(msg, tipo) {
    feedback.style.display = 'block';
    feedback.textContent = msg;
    feedback.style.background = tipo === 'sucesso'
      ? 'rgba(45,106,79,0.2)' : 'rgba(193,68,14,0.2)';
    feedback.style.color = tipo === 'sucesso'
      ? 'var(--cor-verde-clara)' : 'var(--cor-terra-clara)';
    feedback.style.border = `1px solid ${tipo === 'sucesso' ? 'rgba(45,106,79,0.3)' : 'rgba(193,68,14,0.3)'}`;
  }
}

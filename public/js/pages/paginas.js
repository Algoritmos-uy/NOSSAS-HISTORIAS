// ═══════════════════════════════════════════════════════════════
//  PÁGINAS: Histórias, Curiosidades, Lugares, Loja, Contato
// ═══════════════════════════════════════════════════════════════

import { historias as apiHistorias, lugares as apiLugares, loja as apiLoja, contato as apiContato } from '../modules/api.js';
import { renderFooter } from './home.js';
import { gerarMapaRota } from '../modules/mapa-rota.js';

// ── HISTÓRIAS ─────────────────────────────────────────────────

export async function renderHistorias() {
  const { dados } = await apiHistorias.listar().catch(() => ({ dados: [] }));

  const categorias = ['Todas', ...new Set(dados.map(h => formatarCategoria(h.categoria)))];

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <!-- Cabeçalho da página -->
      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:var(--esp-4);">
            <p class="secao__etiqueta">Capítulos da aventura</p>
            <h1 class="secao__titulo">Nossas Histórias</h1>
            <p class="secao__descricao">Cada história é um capítulo real de uma vida vivida na estrada.</p>
          </div>

          <!-- Filtros -->
          <div style="display:flex; gap:var(--esp-3); flex-wrap:wrap; justify-content:center;" role="group" aria-label="Filtrar histórias">
            ${categorias.map((cat, i) => `
              <button class="btn ${i === 0 ? 'btn--primario' : 'btn--secundario'} btn--sm filtro-btn" data-filtro="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Grid de histórias -->
      <section class="secao" aria-label="Lista de histórias">
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
                aria-label="Ler história: ${h.titulo}"
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
                    <time class="card__meta" datetime="${h.data}">${formatarData(h.data)} • ${h.leitura} min</time>
                    ${h.destaque ? '<span class="badge badge--ouro">⭐ Destaque</span>' : ''}
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
  const { dados } = await apiHistorias.curiosidades().catch(() => ({ dados: [] }));

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">Você não sabia mas vai querer saber</p>
            <h1 class="secao__titulo">Curiosidades da Estrada</h1>
            <p class="secao__descricao">As perguntas que mais chegam pra gente — respondidas com tudo que temos.</p>
          </div>
        </div>
      </section>

      <section class="secao" aria-label="Curiosidades">
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
            <p style="font-size:3rem; margin-bottom:var(--esp-4);" aria-hidden="true">�</p>
            <h2 style="font-family:var(--fonte-titulo); color:var(--cor-neve); margin-bottom:var(--esp-4);">
              Tem mais dúvidas?
            </h2>
            <p style="margin-bottom:var(--esp-8);">
              Fala com o Frederico — nosso guia virtual que sabe de tudo sobre a aventura!
            </p>
            <button class="btn btn--primario" id="abrir-historinha-btn">
              🗺️ Conversar com o Frederico
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
  const { dados } = await apiLugares.listar().catch(() => ({ dados: [] }));

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">Marcados no mapa do coração</p>
            <h1 class="secao__titulo">Lugares Incríveis</h1>
            <p class="secao__descricao">Os destinos que nos deixaram sem fôlego — e que recomendamos de olhos fechados.</p>
          </div>
        </div>
      </section>

      <section class="secao" aria-label="Lugares visitados">
        <div class="container">

          <!-- Mapa SVG da Rota -->
          <div style="margin-bottom:var(--esp-16);">
            <div style="text-align:center; margin-bottom:var(--esp-8);">
              <p class="secao__etiqueta">A rota completa</p>
              <h2 style="font-family:var(--fonte-titulo);color:var(--cor-neve);font-size:var(--text-2xl);">Do Brasil ao Alasca</h2>
            </div>
            <div class="mapa-layout" style="display:grid;grid-template-columns:1fr 1.8fr;gap:var(--esp-8);align-items:start;">
              ${gerarMapaRota()}
              <div>
                <p style="font-size:var(--text-lg);margin-bottom:var(--esp-6);">
                  Uma rota épica que já soma mais de <strong>60.000 km</strong> — cruzando climas, culturas, idiomas e fronteiras.
                </p>
                <div style="display:flex;flex-direction:column;gap:var(--esp-4);">
                  ${[
                    { flag:'🇧🇷', etapa:'Brasil', status:'percorrido', desc:'Origem — todo o país percorrido' },
                    { flag:'🌎', etapa:'América do Sul', status:'percorrido', desc:'Patagônia, Andes, Amazônia e mais' },
                    { flag:'🌴', etapa:'América Central', status:'percorrido', desc:'Colômbia, Panamá, Costa Rica...' },
                    { flag:'🇲🇽', etapa:'México', status:'atual', desc:'Agora! Cruzamos a fronteira 🎉' },
                    { flag:'🗽', etapa:'América do Norte', status:'futuro', desc:'EUA — a próxima etapa' },
                    { flag:'🏔️', etapa:'Alasca', status:'futuro', desc:'Destino final da aventura' },
                  ].map(e => `
                    <div style="display:flex;align-items:center;gap:var(--esp-4);padding:var(--esp-3) var(--esp-4);border-radius:var(--raio-md);background:${e.status === 'atual' ? 'rgba(193,68,14,0.1)' : e.status === 'percorrido' ? 'rgba(45,106,79,0.08)' : 'rgba(26,43,60,0.5)'};border:1px solid ${e.status === 'atual' ? 'rgba(193,68,14,0.3)' : e.status === 'percorrido' ? 'rgba(45,106,79,0.2)' : 'rgba(245,230,200,0.06)'};">
                      <span style="font-size:1.5rem;flex-shrink:0;">${e.flag}</span>
                      <div>
                        <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-sm);color:${e.status === 'atual' ? 'var(--cor-terra-clara)' : e.status === 'percorrido' ? 'var(--cor-verde-clara)' : 'var(--cor-cinza-quente)'};letter-spacing:0.05em;">
                          ${e.etapa} ${e.status === 'percorrido' ? '✓' : e.status === 'atual' ? '← Agora!' : ''}
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
                    <span class="card__meta" aria-label="Avaliação ${l.nota} de 5">${'⭐'.repeat(l.nota)}</span>
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
  const { dados: produtos } = await apiLoja.listar().catch(() => ({ dados: [] }));

  const emojis = { 1: '📖', 2: '👕', 3: '☕', 4: '🔖' };

  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">Leve um pedaço da aventura</p>
            <h1 class="secao__titulo">Nossa Loja</h1>
            <p class="secao__descricao">Produtos com a cara da nossa jornada — para quem ama a estrada tanto quanto a gente.</p>
          </div>
        </div>
      </section>

      <section class="secao" aria-label="Produtos disponíveis">
        <div class="container">

          <!-- Filtros tipo -->
          <div style="display:flex; gap:var(--esp-3); justify-content:center; margin-bottom:var(--esp-12); flex-wrap:wrap;" role="group" aria-label="Filtrar produtos">
            <button class="btn btn--primario btn--sm loja-filtro" data-tipo="">Todos</button>
            <button class="btn btn--secundario btn--sm loja-filtro" data-tipo="digital">📱 Digitais</button>
            <button class="btn btn--secundario btn--sm loja-filtro" data-tipo="fisico">📦 Físicos</button>
          </div>

          <div class="grid grid--4" id="grid-produtos" role="list">
            ${produtos.map((p, i) => `
              <article class="card-produto animar-surgir animar-delay-${Math.min(i+1,5)}" role="listitem" data-tipo="${p.tipo}">
                <div class="card-produto__img img-placeholder" aria-label="${p.nome}" style="font-size:5rem;">
                  ${emojis[p.id] || '✨'}
                </div>
                <div class="card-produto__corpo">
                  <p class="card-produto__tipo">${p.tipo === 'digital' ? '📱 Digital' : '📦 Físico'}</p>
                  <h2 class="card-produto__nome">${p.nome}</h2>
                  <p class="card-produto__desc">${p.descricao}</p>
                  <p class="card-produto__preco">
                    R$ ${p.preco.toFixed(2).replace('.', ',')}
                    <span>BRL</span>
                  </p>
                  <button class="btn btn--ouro" style="width:100%;" aria-label="Comprar ${p.nome}">
                    Comprar Agora
                  </button>
                </div>
              </article>
            `).join('')}
          </div>

          <!-- Aviso -->
          <div style="text-align:center; margin-top:var(--esp-16);">
            <p style="color:var(--cor-cinza-quente); font-size:var(--text-sm);">
              🔒 Compra segura • Entrega para todo o Brasil • Produtos digitais com acesso imediato
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
  return /* html */`
    <div style="padding-top: var(--header-h);">

      <section class="secao secao--compacta" style="background:var(--cor-noite-media); border-bottom:1px solid rgba(245,230,200,0.06);">
        <div class="container">
          <div class="secao__cabecalho" style="margin-bottom:0;">
            <p class="secao__etiqueta">A estrada não nos cala</p>
            <h1 class="secao__titulo">Fala com a Gente</h1>
            <p class="secao__descricao">Seja pra parceria, dúvida ou só pra mandar um oi — a gente responde assim que tiver sinal! 📡</p>
          </div>
        </div>
      </section>

      <section class="secao" aria-labelledby="form-titulo">
        <div class="container">
          <div class="contato-layout">

            <!-- Info lateral -->
            <div>
              <h2 id="form-titulo" style="font-family:var(--fonte-titulo); color:var(--cor-neve); font-size:var(--text-2xl); margin-bottom:var(--esp-8);">
                Como nos encontrar
              </h2>

              ${[
                { emoji: '🎥', titulo: 'YouTube', desc: 'Canal Nossas Histórias<br>Novos vídeos toda semana', link: 'https://youtube.com/@canalnossashistorias', label: 'Acessar canal' },
                { emoji: '📷', titulo: 'Instagram', desc: 'Fotos e stories do dia a dia<br>na estrada', link: 'https://instagram.com/nossashistoriasoficial', label: 'Seguir no Instagram' },
                { avatar: '/assets/img/frederico.png', titulo: 'Frederico', desc: 'Nossa IA guia está sempre<br>disponível no site', link: '#', label: 'Conversar agora', id: 'contato-historinha-btn' }
              ].map(item => `
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
              <form class="form-contato" id="form-contato" novalidate aria-label="Formulário de contato">
                <div class="form__grid">
                  <div class="form__grupo">
                    <label class="form__label" for="nome">Nome *</label>
                    <input class="form__input" type="text" id="nome" name="nome" placeholder="Seu nome" required autocomplete="given-name" />
                  </div>
                  <div class="form__grupo">
                    <label class="form__label" for="email">E-mail *</label>
                    <input class="form__input" type="email" id="email" name="email" placeholder="seu@email.com" required autocomplete="email" />
                  </div>
                </div>

                <div class="form__grupo">
                  <label class="form__label" for="assunto">Assunto</label>
                  <input class="form__input" type="text" id="assunto" name="assunto" placeholder="Parceria, dúvida, salve..." />
                </div>

                <div class="form__grupo">
                  <label class="form__label" for="mensagem">Mensagem *</label>
                  <textarea class="form__textarea" id="mensagem" name="mensagem" placeholder="Oi Ricardo e Tami! Queria dizer que..." required></textarea>
                </div>

                <button type="submit" class="btn btn--primario btn--lg" style="width:100%;" id="btn-enviar">
                  Enviar Mensagem 🚀
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
  const mapa = {
    origem: 'Origem', sudamerica: 'América do Sul',
    veiculo: 'Veículo', centroamerica: 'América Central', mexico: 'México 🇲🇽'
  };
  return mapa[cat] || cat;
}

function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}

// ── Inicializadores de página (eventos pós-render) ───────────

export function iniciarPaginaHistorias() {
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filtro = btn.dataset.filtro;
      document.querySelectorAll('.filtro-btn').forEach(b => {
        b.classList.toggle('btn--primario', b === btn);
        b.classList.toggle('btn--secundario', b !== btn);
      });
      document.querySelectorAll('#grid-historias article').forEach(card => {
        const mostrar = !filtro || filtro === 'Todas' || card.dataset.categoria === filtro;
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
      mostrarFeedback('⚠️ Preencha os campos obrigatórios.', 'erro');
      return;
    }

    btnEnv.disabled = true;
    btnEnv.textContent = 'Enviando... 📡';

    try {
      const res = await apiContato.enviar(dados);
      mostrarFeedback('✅ ' + res.mensagem, 'sucesso');
      form.reset();
    } catch {
      mostrarFeedback('❌ Erro ao enviar. Tente novamente!', 'erro');
    } finally {
      btnEnv.disabled = false;
      btnEnv.textContent = 'Enviar Mensagem 🚀';
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

// ═══════════════════════════════════════════════════════════════
//  MÓDULO: Historinha — Chatbot flutuante
// ═══════════════════════════════════════════════════════════════

import { chatbot as apiChatbot } from './api.js';

const SUGESTOES = [
  'Quem são Ricardo e Tami?',
  'Já chegaram no México? 🇲🇽',
  'Como é a Frontier?',
  'A rota até o Alasca',
  'O que tem na loja?'
];

export function iniciarHistorinha() {
  const toggle   = document.getElementById('historinha-toggle');
  const janela   = document.getElementById('historinha-janela');
  const fechar   = document.getElementById('historinha-fechar');
  const msgs     = document.getElementById('historinha-mensagens');
  const input    = document.getElementById('historinha-input');
  const enviar   = document.getElementById('historinha-enviar');
  const sugestoesEl = document.getElementById('historinha-sugestoes');

  if (!toggle) return;

  let aberto = false;

  // ── Abrir / Fechar ───────────────────────────────────────────
  toggle.addEventListener('click', () => alternarChat(true));
  fechar.addEventListener('click', () => alternarChat(false));

  function alternarChat(abrirForcar) {
    aberto = typeof abrirForcar === 'boolean' ? abrirForcar : !aberto;
    janela.classList.toggle('historinha-janela--oculta', !aberto);
    toggle.setAttribute('aria-expanded', String(aberto));

    if (aberto && msgs.children.length === 0) {
      // Mensagem de boas-vindas
      setTimeout(() => adicionarMensagemBot(
  'Oi! Eu sou Frederico, seu companheiro de aventura nesse site! 🗺️ Pergunta qualquer coisa sobre Ricardo e Tami, a viagem, o canal... pode falar!'
      ), 400);
      renderizarSugestoes();
    }

    if (aberto) {
      // Remove badge
      const badge = toggle.querySelector('.historinha-toggle__badge');
      if (badge) badge.style.display = 'none';
      setTimeout(() => input.focus(), 300);
    }
  }

  // ── Sugestões rápidas ────────────────────────────────────────
  function renderizarSugestoes() {
    sugestoesEl.innerHTML = SUGESTOES.map(s =>
      `<button class="historinha__chip" type="button">${s}</button>`
    ).join('');

    sugestoesEl.querySelectorAll('.historinha__chip').forEach(chip => {
      chip.addEventListener('click', () => {
        enviarMensagem(chip.textContent);
      });
    });
  }

  // ── Envio de mensagem ────────────────────────────────────────
  async function enviarMensagem(texto) {
    const msg = texto || input.value.trim();
    if (!msg) return;

    adicionarMensagemUsuario(msg);
    input.value = '';
    ajustarAlturaInput();

    // Esconde sugestões após primeiro uso
    sugestoesEl.innerHTML = '';

    // Indicador de digitação
    const digitandoId = mostrarDigitando();

    try {
      const res = await apiChatbot.enviar(msg);
      removerDigitando(digitandoId);
      adicionarMensagemBot(res.resposta);
    } catch {
      removerDigitando(digitandoId);
      adicionarMensagemBot('Ops! Tive um problema de sinal por aqui... tenta de novo! 📡');
    }
  }

  enviar.addEventListener('click', () => enviarMensagem());

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  });

  input.addEventListener('input', ajustarAlturaInput);

  function ajustarAlturaInput() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  }

  // ── Funções de mensagem ──────────────────────────────────────
  function adicionarMensagemUsuario(texto) {
    const div = document.createElement('div');
    div.className = 'mensagem mensagem--usuario';
    div.innerHTML = `<div class="mensagem__balao">${escaparHTML(texto)}</div>`;
    msgs.appendChild(div);
    rolarParaBaixo();
  }

  function adicionarMensagemBot(texto) {
    const div = document.createElement('div');
    div.className = 'mensagem mensagem--bot';
    div.innerHTML = `
      <div class="mensagem__avatar-bot" aria-hidden="true"></div>
      <div class="mensagem__balao">${escaparHTML(texto)}</div>
    `;
    msgs.appendChild(div);
    rolarParaBaixo();
  }

  function mostrarDigitando() {
    const id  = `digitando-${Date.now()}`;
    const div = document.createElement('div');
    div.className = 'mensagem mensagem--bot';
    div.id = id;
    div.innerHTML = `
      <div class="mensagem__avatar-bot" aria-hidden="true"></div>
      <div class="mensagem__balao">
        <div class="mensagem__digitando">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    msgs.appendChild(div);
    rolarParaBaixo();
    return id;
  }

  function removerDigitando(id) {
    document.getElementById(id)?.remove();
  }

  function rolarParaBaixo() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function escaparHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\n/g, '<br>');
  }
}

// ═══════════════════════════════════════════════════════════════
//  MÓDULO: API — Cliente para o servidor Node.js
// ═══════════════════════════════════════════════════════════════

const BASE = '/api';

/**
 * Requisição base com tratamento de erro
 * @param {string} endpoint
 * @param {RequestInit} [opcoes]
 */
async function requisitar(endpoint, opcoes = {}) {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });

  if (!res.ok) {
    const erro = await res.json().catch(() => ({ mensagem: 'Erro desconhecido' }));
    throw new Error(erro.mensagem || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Histórias ────────────────────────────────────────────────

export const historias = {
  listar: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return requisitar(`/historias${q ? '?' + q : ''}`);
  },
  buscarPorSlug: slug => requisitar(`/historias/${slug}`),
  curiosidades: () => requisitar('/historias/curiosidades')
};

// ── Lugares ──────────────────────────────────────────────────

export const lugares = {
  listar: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return requisitar(`/lugares${q ? '?' + q : ''}`);
  },
  buscarPorId: id => requisitar(`/lugares/${id}`)
};

// ── Loja ─────────────────────────────────────────────────────

export const loja = {
  listar: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return requisitar(`/loja${q ? '?' + q : ''}`);
  }
};

// ── Chatbot ──────────────────────────────────────────────────

export const chatbot = {
  enviar: mensagem => requisitar('/chatbot/mensagem', {
    method: 'POST',
    body: JSON.stringify({ mensagem })
  })
};

// ── Contato ──────────────────────────────────────────────────

export const contato = {
  enviar: dados => requisitar('/contato', {
    method: 'POST',
    body: JSON.stringify(dados)
  })
};

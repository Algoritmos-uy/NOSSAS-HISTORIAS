// ═══════════════════════════════════════════════════════════════
//  HISTORINHA — Chatbot da Nossas Histórias
//  Personalidade: Amigável, aventureira, fala como uma companheira
//  de viagem que sabe tudo sobre Ricardo e Tami
// ═══════════════════════════════════════════════════════════════

import { Router } from 'express';

const router = Router();

const respostas = {
  saudacoes: [
    'Oi! Sou a Historinha, sua guia nessa aventura! 🗺️ Como posso te ajudar hoje?',
  'Olá, viajante! Pronto pra conhecer as histórias de Ricardo e Tami? Me conta o que quer saber! 🚙',
    'E aí! Que bom ter você por aqui! Pergunte à vontade sobre nossa aventura do Brasil ao Alasca! ✨'
  ],
  veiculo: 'A Frontier com motor home é a nossa casa sobre rodas! 🚙 Tem cama de casal, cozinha, água corrente e tudo que precisamos pra viver na estrada com conforto. Antes usávamos uma Grande Vitara pra explorar o Brasil e a América do Sul.',
  rota: 'Nossa rota começa no Brasil, passa por toda a América do Sul, pela América Central e já entramos no México! 🇲🇽 O próximo passo é cruzar os EUA pela América do Norte até chegar ao Alasca — o destino final da aventura! 🏔️',
  canal: 'Nos acompanhe no YouTube pelo canal "Nossas Histórias"! 🎥 Lá tem tudo: paisagens incríveis, desafios da estrada, dicas e muito da nossa vida real viajando.',
  casal: 'Somos Ricardo (43 anos) e Tamires (32 anos) — um casal que trocou a rotina pela estrada! 💑 Começamos viajando o Brasil, depois toda a América do Sul na Vitara, e agora na Frontier rumo ao Alasca!',
  patagonia: 'A Patagônia foi um dos capítulos mais emocionantes! 🏔️ Torres del Paine, o Glaciar Perito Moreno, vento de enlouquecer... um lugar que muda quem você é.',
  loja: 'Na nossa loja você encontra guias digitais, camisetas, canecas e adesivos exclusivos da Nossas Histórias! 🛍️ Vai lá na aba "Loja" e dá uma olhada!',
  contato: 'Quer falar com a gente? Acessa a página "Contato" e manda mensagem! Respondemos assim que der — as vezes estamos em área sem sinal, mas a gente não some! 📡',
  padrão: [
    'Hmm, boa pergunta! Não sei responder isso agora, mas conta pra gente na página de contato! 🤔',
  'Eita, essa me pegou! Mas você pode mandar sua dúvida pra Ricardo e Tami diretamente. Eles adoram conversar com a galera! ✌️',
    'Essa não tenho como responder agora, mas explora o site — tem muita coisa boa por aqui! 🗺️'
  ]
};

function detectarIntencao(msg) {
  const m = msg.toLowerCase();
  if (/oi|olá|ola|hey|eai|e aí|bom dia|boa tarde|boa noite|tudo bem/.test(m)) return 'saudacoes';
  if (/frontier|vitara|carro|motorhome|motor home|veículo|veiculo/.test(m)) return 'veiculo';
  if (/rota|caminho|percurso|alasca|destino|onde|ir|méxico|mexico|norte/.test(m)) return 'rota';
  if (/youtube|canal|vídeo|video/.test(m)) return 'canal';
  if (/quem|ricardo|tamires|casal|vocês|voces/.test(m)) return 'casal';
  if (/patagônia|patagonia|chile|argentina/.test(m)) return 'patagonia';
  if (/loja|comprar|produto|camiseta|caneca/.test(m)) return 'loja';
  if (/contato|falar|mensagem|email/.test(m)) return 'contato';
  return 'padrão';
}

function aleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

router.post('/mensagem', (req, res) => {
  const { mensagem } = req.body;
  if (!mensagem || !mensagem.trim()) {
    return res.status(400).json({ sucesso: false, mensagem: 'Mensagem não pode ser vazia.' });
  }

  const intencao = detectarIntencao(mensagem.trim());
  const resposta = Array.isArray(respostas[intencao])
    ? aleatorio(respostas[intencao])
    : respostas[intencao];

  res.json({
    sucesso: true,
    resposta,
    intencao,
    timestamp: new Date().toISOString()
  });
});

export default router;

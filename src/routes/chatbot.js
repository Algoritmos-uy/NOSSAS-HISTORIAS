// ═══════════════════════════════════════════════════════════════
//  HISTORINHA — Chatbot da Nossas Histórias
//  Personalidade: Amigável, aventureira, fala como uma companheira
//  de viagem que sabe tudo sobre Ricardo e Tami
// ═══════════════════════════════════════════════════════════════

import { Router } from 'express';

const router = Router();

const respostasPorIdioma = {
  'pt-BR': {
    saudacoes: [
      'Oi! Sou o Frederico, seu guia nessa aventura! 🗺️ Como posso te ajudar hoje?',
      'Olá, viajante! Pronto pra conhecer as histórias de Ricardo e Tami? Me conta o que quer saber! 🚙',
      'E aí! Que bom ter você por aqui! Pergunte à vontade sobre nossa aventura do Brasil ao Alasca! ✨'
    ],
    veiculo: 'A Frontier com motor home é a nossa casa sobre rodas! 🚙 Tem cama de casal, cozinha, água corrente e tudo que precisamos pra viver na estrada com conforto. Antes usávamos uma Grande Vitara pra explorar o Brasil e a América do Sul.',
    rota: 'Nossa rota começa no Brasil, passa por toda a América do Sul, pela América Central e já entramos no México! 🇲🇽 O próximo passo é cruzar os EUA pela América do Norte até chegar ao Alasca — o destino final da aventura! 🏔️',
    canal: 'Nos acompanhe no YouTube pelo canal "Nossas Histórias"! 🎥 Lá tem tudo: paisagens incríveis, desafios da estrada, dicas e muito da nossa vida real viajando.',
    casal: 'Somos Ricardo (43 anos) e Tamires (32 anos) — um casal que trocou a rotina pela estrada! 💑 Começamos viajando o Brasil, depois toda a América do Sul na Vitara, e agora na Frontier rumo ao Alasca!',
    patagonia: 'A Patagônia foi um dos capítulos mais emocionantes! 🏔️ Torres del Paine, o Glaciar Perito Moreno, vento de enlouquecer... um lugar que muda quem você é.',
    loja: 'Na nossa loja você encontra guias digitais, camisetas, canecas e adesivos exclusivos da Nossas Histórias! 🛍️ Vai lá na aba "Loja" e dá uma olhada!',
    contato: 'Quer falar com a gente? Acessa a página "Contato" e manda mensagem! Respondemos assim que der — às vezes estamos em área sem sinal, mas a gente não some! 📡',
    padrao: [
      'Hmm, boa pergunta! Não sei responder isso agora, mas conta pra gente na página de contato! 🤔',
      'Eita, essa me pegou! Mas você pode mandar sua dúvida pra Ricardo e Tami diretamente. Eles adoram conversar com a galera! ✌️',
      'Essa não tenho como responder agora, mas explora o site — tem muita coisa boa por aqui! 🗺️'
    ],
    erroVazia: 'Mensagem não pode ser vazia.'
  },
  es: {
    saudacoes: [
      '¡Hola! Soy Frederico, tu guía en esta aventura 🗺️ ¿En qué te ayudo hoy?',
      '¡Hola, viajero! ¿Listo para conocer las historias de Ricardo y Tami? 🚙',
      '¡Qué bueno tenerte aquí! Pregunta lo que quieras sobre la ruta de Brasil a Alaska ✨'
    ],
    veiculo: 'La Frontier con motorhome es nuestra casa sobre ruedas 🚙 Tiene cama doble, cocina, agua y todo lo necesario para vivir en la carretera con comodidad.',
    rota: 'Nuestra ruta empieza en Brasil, pasa por Sudamérica y Centroamérica, y ya estamos en México 🇲🇽. El próximo paso es cruzar Estados Unidos hasta Alaska 🏔️.',
    canal: 'Síguenos en YouTube en el canal "Nossas Histórias" 🎥 Ahí compartimos paisajes, desafíos de la ruta y la vida real viajando.',
    casal: 'Somos Ricardo (43) y Tamires (32), una pareja que cambió la rutina por la carretera 💑.',
    patagonia: 'Patagonia fue uno de los capítulos más emocionantes 🏔️: Torres del Paine, Perito Moreno y vientos inolvidables.',
    loja: 'En nuestra tienda encontrarás guías digitales, camisetas, tazas y stickers exclusivos 🛍️.',
    contato: '¿Quieres hablar con nosotros? Ve a la página "Contacto" y envíanos un mensaje 📡.',
    padrao: [
      'Buena pregunta. Ahora no tengo esa respuesta, pero puedes escribirnos desde Contacto 🤔',
      'Esa me tomó por sorpresa 😅, pero Ricardo y Tami te responderán con gusto.',
      'No tengo esa respuesta por ahora, pero en el sitio hay mucho contenido útil 🗺️'
    ],
    erroVazia: 'El mensaje no puede estar vacío.'
  },
  en: {
    saudacoes: [
      'Hi! I am Frederico, your guide in this adventure 🗺️ How can I help you today?',
      'Hello traveler! Ready to discover Ricardo and Tami stories? 🚙',
      'Great to have you here! Ask anything about the journey from Brazil to Alaska ✨'
    ],
    veiculo: 'The Frontier with motorhome is our home on wheels 🚙. It has a double bed, kitchen, water supply, and everything we need for road life.',
    rota: 'Our route starts in Brazil, goes through South and Central America, and we are already in Mexico 🇲🇽. Next step: cross the US and reach Alaska 🏔️.',
    canal: 'Follow us on YouTube at "Nossas Histórias" 🎥. We share real road-life moments, landscapes, and travel challenges.',
    casal: 'We are Ricardo (43) and Tamires (32), a couple who swapped routine for the road 💑.',
    patagonia: 'Patagonia was one of our most unforgettable chapters 🏔️: Torres del Paine, Perito Moreno, and wild winds.',
    loja: 'In our shop you can find digital guides, t-shirts, mugs, and exclusive stickers 🛍️.',
    contato: 'Want to contact us? Go to the "Contact" page and send a message 📡.',
    padrao: [
      'Great question! I do not have that answer right now, but you can reach us via Contact 🤔',
      'That one caught me 😅, but Ricardo and Tami will gladly answer you.',
      'I do not have that response for now, but there is plenty of useful content on the site 🗺️'
    ],
    erroVazia: 'Message cannot be empty.'
  }
};

function normalizarIdioma(idioma = 'pt-BR') {
  const valor = String(idioma).toLowerCase();
  if (valor.startsWith('es')) return 'es';
  if (valor.startsWith('en')) return 'en';
  return 'pt-BR';
}

function detectarIntencao(msg) {
  const m = msg.toLowerCase();
  if (/oi|olá|ola|hey|eai|e aí|bom dia|boa tarde|boa noite|tudo bem|hola|hello|hi/.test(m)) return 'saudacoes';
  if (/frontier|vitara|carro|motorhome|motor home|veículo|veiculo|vehicle/.test(m)) return 'veiculo';
  if (/rota|caminho|percurso|alasca|destino|onde|ir|méxico|mexico|norte|route|alaska/.test(m)) return 'rota';
  if (/youtube|canal|vídeo|video|channel/.test(m)) return 'canal';
  if (/quem|ricardo|tamires|casal|vocês|voces|who|pareja|couple/.test(m)) return 'casal';
  if (/patagônia|patagonia|chile|argentina/.test(m)) return 'patagonia';
  if (/loja|comprar|produto|camiseta|caneca|tienda|shop|buy|product/.test(m)) return 'loja';
  if (/contato|falar|mensagem|email|contacto|contact|message/.test(m)) return 'contato';
  return 'padrao';
}

function aleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

router.post('/mensagem', (req, res) => {
  const { mensagem, idioma } = req.body;
  const locale = normalizarIdioma(idioma);
  const respostas = respostasPorIdioma[locale] || respostasPorIdioma['pt-BR'];

  if (!mensagem || !mensagem.trim()) {
    return res.status(400).json({ sucesso: false, mensagem: respostas.erroVazia });
  }

  const intencao = detectarIntencao(mensagem.trim());
  const resposta = Array.isArray(respostas[intencao])
    ? aleatorio(respostas[intencao])
    : (respostas[intencao] || aleatorio(respostas.padrao));

  res.json({
    sucesso: true,
    resposta,
    intencao,
    timestamp: new Date().toISOString()
  });
});

export default router;

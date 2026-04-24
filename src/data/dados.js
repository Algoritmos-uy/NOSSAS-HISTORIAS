// ═══════════════════════════════════════════════════════════════
//  DADOS — Histórias de Ricardo e Tami
// ═══════════════════════════════════════════════════════════════

export const historias = [
  {
    id: 1,
    slug: 'inicio-de-tudo',
    titulo: 'O Início de Tudo',
    subtitulo: 'Como uma Grande Vitara mudou nossas vidas',
    categoria: 'origem',
    pais: 'Brasil',
    data: '2022-03-10',
    resumo: 'Tudo começou com um sonho, uma Vitara reformada e dois corações aventureiros. A história de como largamos tudo para viver a estrada.',
    imagem: '/assets/images/historia-01.jpg',
    leitura: 8,
    destaque: true
  },
  {
    id: 2,
    slug: 'fim-do-mundo-patagonia',
    titulo: 'No Fim do Mundo',
    subtitulo: 'Patagônia: onde a terra acaba e o vento fala',
    categoria: 'sudamerica',
    pais: 'Argentina',
    data: '2022-09-20',
    resumo: 'Torres del Paine, glaciares e um frio que abraça a alma. A Patagônia nos ensinou que a beleza mora nos lugares mais difíceis de alcançar.',
    imagem: '/assets/images/historia-02.jpg',
    leitura: 12,
    destaque: true
  },
  {
    id: 3,
    slug: 'frontier-motor-home',
    titulo: 'A Frontier Chegou',
    subtitulo: 'Nossa nova casa sobre rodas',
    categoria: 'veiculo',
    pais: 'Brasil',
    data: '2023-04-05',
    resumo: 'Trocamos a Vitara por uma Frontier com motor home artesanal. Conheça cada detalhe da nossa nova casa que nos levará até o Alasca.',
    imagem: '/assets/images/historia-03.jpg',
    leitura: 10,
    destaque: false
  },
  {
    id: 4,
    slug: 'colombia-medellin',
    titulo: 'Medellín, a Cidade da Eterna Primavera',
    subtitulo: 'Onde o estigma virou renascimento',
    categoria: 'centroamerica',
    pais: 'Colômbia',
    data: '2023-08-14',
    resumo: 'Uma cidade que nos surpreendeu em cada esquina. Arte, gastronomia, gente calorosa e uma vista do alto que tira o fôlego.',
    imagem: '/assets/images/historia-04.jpg',
    leitura: 9,
    destaque: true
  },
  {
    id: 5,
    slug: 'mexico-chegamos',
    titulo: 'México — Chegamos!',
    subtitulo: 'A fronteira que marca uma nova fase da aventura',
    categoria: 'mexico',
    pais: 'México',
    data: '2024-03-01',
    resumo: 'Cruzamos a fronteira e entramos no México! Um país gigante, cheio de contrastes, sabores e história. A América do Norte começa aqui.',
    imagem: '/assets/images/historia-05.jpg',
    leitura: 11,
    destaque: true
  }
];

export const curiosidades = [
  {
    id: 1,
    titulo: 'Quantos litros cabe no tanque da Frontier?',
    resposta: 'Nossa Frontier tem tanque auxiliar de 80L além dos 80L originais — 160L para não ficar na mão em lugares remotos.',
    categoria: 'veiculo',
    emoji: '⛽'
  },
  {
    id: 2,
    titulo: 'Como é dormir no motor home?',
    resposta: 'Surpreendentemente confortável! Cama de casal, ventilação cruzada e o som da natureza como despertador.',
    categoria: 'vida-na-estrada',
    emoji: '🛏️'
  },
  {
    id: 3,
    titulo: 'Qual país tem as piores estradas?',
    resposta: 'Cada país tem suas surpresas! Mas certas trilhas na Bolívia e estradas de terra no interior do Brasil são inesquecíveis.',
    categoria: 'estradas',
    emoji: '🛣️'
  },
  {
    id: 4,
    titulo: 'Como vocês se sustentam viajando?',
    resposta: 'YouTube, parcerias, venda de produtos digitais e muito planejamento financeiro feito antes de partir.',
    categoria: 'financeiro',
    emoji: '💰'
  },
  {
    id: 5,
    titulo: 'Como foi cruzar para o México?',
    resposta: 'A fronteira Guatemala–México foi um momento épico! Burocracia, fila e muita emoção. O México nos recebeu com tacos, calor humano e estradas que às vezes surpreendem.',
    categoria: 'fronteiras',
    emoji: '🇲🇽'
  },
  {
    id: 6,
    titulo: 'Qual o maior desafio da viagem até agora?',
    resposta: 'Além da saudade da família, lidar com mecânica em lugares remotos, comunicação em espanhol e planejar combustível em regiões sem posto. A Frontier nunca nos deixou na mão!',
    categoria: 'vida-na-estrada',
    emoji: '🔧'
  }
];

export const lugares = [
  {
    id: 1,
    nome: 'Torres del Paine',
    pais: 'Chile',
    lat: -50.9423,
    lng: -73.4068,
    descricao: 'Um dos cenários mais dramáticos do planeta.',
    nota: 5,
    categoria: 'natureza'
  },
  {
    id: 2,
    nome: 'Salar de Uyuni',
    pais: 'Bolívia',
    lat: -20.1338,
    lng: -67.4891,
    descricao: 'O maior espelho do mundo — onde o céu encontra a terra.',
    nota: 5,
    categoria: 'paisagem'
  },
  {
    id: 3,
    nome: 'Cartagena de Índias',
    pais: 'Colômbia',
    lat: 10.3910,
    lng: -75.4794,
    descricao: 'Cores, história colonial e um calor de encher o coração.',
    nota: 5,
    categoria: 'cidade'
  },
  {
    id: 4,
    nome: 'Ruta Panamericana — Guatemala',
    pais: 'Guatemala',
    lat: 14.6349,
    lng: -90.5069,
    descricao: 'Vulcões, lagos e culturas milenares a cada curva.',
    nota: 5,
    categoria: 'rota'
  },
  {
    id: 5,
    nome: 'Cidade do México',
    pais: 'México',
    lat: 19.4326,
    lng: -99.1332,
    descricao: 'Uma metrópole que impressiona: gastronomia imbatível, história asteca e uma energia que nunca para.',
    nota: 5,
    categoria: 'cidade'
  },
  {
    id: 6,
    nome: 'Barrancas del Cobre (Copper Canyon)',
    pais: 'México',
    lat: 27.5167,
    lng: -107.6833,
    descricao: 'Um cânion maior que o Grand Canyon, com povos indígenas Rarámuri e paisagens de tirar o fôlego.',
    nota: 5,
    categoria: 'natureza'
  }
];

export const produtos = [
  {
    id: 1,
    nome: 'Guia Digital — Como Viajar na América do Sul',
    preco: 47.90,
    descricao: 'Mais de 150 páginas com dicas, rotas, fronteiras e truques que aprendemos na prática.',
    tipo: 'digital',
    imagem: '/assets/images/produto-01.jpg',
    disponivel: true
  },
  {
    id: 2,
    nome: 'Camiseta Nossas Histórias — Edição Frontier',
    preco: 89.90,
    descricao: '100% algodão penteado. Arte exclusiva com nossa Frontier e o mapa da aventura.',
    tipo: 'fisico',
    imagem: '/assets/images/produto-02.jpg',
    disponivel: true
  },
  {
    id: 3,
    nome: 'Caneca — Do Brasil ao Alasca',
    preco: 59.90,
    descricao: 'Caneca 350ml com o mapa da nossa rota até o Alasca. Perfeita pro café da manhã na estrada.',
    tipo: 'fisico',
    imagem: '/assets/images/produto-03.jpg',
    disponivel: true
  },
  {
    id: 4,
    nome: 'Adesivo Pack — 6 unidades',
    preco: 24.90,
    descricao: 'Conjunto com 6 adesivos resinados com símbolos da nossa aventura.',
    tipo: 'fisico',
    imagem: '/assets/images/produto-04.jpg',
    disponivel: true
  }
];

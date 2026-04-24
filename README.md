# 🚙 Nossas Histórias — Ricardo e Tami

> Do Brasil ao Alasca numa Frontier com motor home.  
> Canal: **Nossas Histórias** no YouTube.

---

## Arquitetura da Aplicação

```
nossas-historias/
│
├── package.json
├── README.md
│
├── src/                          ← Backend Node.js
│   ├── server/
│   │   └── app.js               ← Servidor Express (entry point)
│   ├── routes/
│   │   ├── historias.js          ← GET /api/historias
│   │   ├── lugares.js            ← GET /api/lugares
│   │   ├── loja.js               ← GET /api/loja
│   │   ├── chatbot.js            ← POST /api/chatbot/mensagem
│   │   └── contato.js            ← POST /api/contato
│   └── data/
│       └── dados.js              ← Mock data (histórias, lugares, produtos)
│
└── public/                       ← Frontend estático (SPA)
    ├── index.html                ← Shell HTML único
    │
    ├── css/                      ← ITCSS Architecture
    │   ├── main.css              ← Importa todas as camadas em ordem
    │   ├── settings/
    │   │   └── _variaveis.css    ← Tokens de design (cores, tipografia, espaçamento)
    │   ├── tools/
    │   │   └── _animacoes.css    ← Keyframes e animações globais
    │   ├── generic/
    │   │   └── _reset.css        ← Reset CSS moderno
    │   ├── elements/
    │   │   └── _tipografia.css   ← Estilo base dos elementos HTML
    │   ├── objects/
    │   │   └── _layout.css       ← Container, grid, flex, section
    │   ├── components/
    │   │   ├── _header.css       ← Header + navegação + menu mobile
    │   │   ├── _hero.css         ← Seção hero da home
    │   │   ├── _ui.css           ← Cards, botões, forms, footer
    │   │   └── _chatbot.css      ← Historinha chatbot flutuante
    │   └── trumps/
    │       └── _utilitarios.css  ← Classes utilitárias de alta especificidade
    │
    └── js/                       ← JavaScript modularizado (ES Modules)
        ├── app.js                ← Entry point — inicializa tudo
        ├── modules/
        │   ├── router.js         ← SPA router client-side
        │   ├── api.js            ← Cliente HTTP para a API
        │   ├── header.js         ← Scroll behavior + menu mobile
        │   └── historinha.js     ← Chatbot Historinha
        └── pages/
            ├── home.js           ← Renderiza página Início
            └── paginas.js        ← Renderiza Histórias, Lugares, Curiosidades, Loja, Contato
```

---

## Páginas

| Rota            | Página       | Descrição                                    |
| --------------- | ------------ | -------------------------------------------- |
| `/`             | Home         | Hero, estatísticas, destaques, sobre o casal |
| `/historias`    | Histórias    | Grade filtrável de todos os capítulos        |
| `/lugares`      | Lugares      | Mapa + cards dos destinos visitados          |
| `/curiosidades` | Curiosidades | Perguntas frequentes respondidas             |
| `/loja`         | Loja         | Produtos digitais e físicos                  |
| `/contato`      | Contato      | Formulário + canais de contato               |

---

## API Endpoints

```
GET  /api/historias              → Lista todas as histórias
GET  /api/historias?destaque=true→ Apenas destaques
GET  /api/historias/:slug        → História por slug
GET  /api/historias/curiosidades → Lista de curiosidades
GET  /api/lugares                → Lista de lugares
GET  /api/lugares/:id            → Lugar por ID
GET  /api/loja                   → Produtos disponíveis
POST /api/chatbot/mensagem       → Mensagem para Historinha
POST /api/contato                → Envio de formulário
```

---

## Como rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento (com hot-reload)
npm run dev

# Produção
npm start
```

Acesse em: http://localhost:3000

---

## Decisões de design

### ITCSS (Inverted Triangle CSS)

Arquitetura de CSS em 7 camadas em ordem crescente de especificidade:
`Settings → Tools → Generic → Elements → Objects → Components → Trumps`

### SPA sem framework

Router client-side próprio usando `history.pushState` e delegação de eventos.

### JavaScript ES Modules

Código modularizado sem bundler — importado diretamente via `<script type="module">`.

### Historinha �

Chatbot com personalidade aventureira, detecta intenção por regex e responde a perguntas sobre o casal, veículo, rota, YouTube, loja e contato.

---

## Design

**Paleta:** Terra queimada + Areia + Noite profunda + Verde mata + Ouro  
**Tipografia:** Playfair Display (títulos) + Oswald (labels) + Lato (corpo)  
**Tema:** Aventura terrestre, mapas, estrada — remetendo à Panamericana e natureza das Américas.

---

## Rota da Aventura

| Etapa                     | Status           |
| ------------------------- | ---------------- |
| 🇧🇷 Brasil                 | ✅ Concluído     |
| 🌎 América do Sul         | ✅ Concluído     |
| 🌴 América Central        | ✅ Concluído     |
| 🇲🇽 México                 | 📍 **Agora!**    |
| 🗽 América do Norte (EUA) | ⏳ Em breve      |
| 🏔️ Alasca                 | 🎯 Destino final |

---

_"A estrada é longa, mas a aventura não tem fim."_ — Ricardo e Tami 🚙

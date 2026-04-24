// ═══════════════════════════════════════════════════════════════
//  MÓDULO: Mapa SVG da Rota — Ricardo e Tami
//  Gera o mapa animado das Américas com a rota completa
// ═══════════════════════════════════════════════════════════════

/**
 * Retorna o HTML do mapa SVG da rota
 */
export function gerarMapaRota() {
  return /* html */`
  <div style="position:relative; border-radius:var(--raio-xl); overflow:hidden; border:1px solid rgba(245,230,200,0.08); background:var(--cor-noite-clara);">

    <!-- Legenda -->
    <div style="
      position:absolute; top:var(--esp-4); left:var(--esp-4); z-index:10;
      background:rgba(15,25,35,0.85); backdrop-filter:blur(8px);
      border:1px solid rgba(245,230,200,0.1); border-radius:var(--raio-md);
      padding:var(--esp-3) var(--esp-4);
    ">
      <p style="font-family:var(--fonte-subtitulo);font-size:var(--text-xs);letter-spacing:0.15em;text-transform:uppercase;color:var(--cor-ouro);margin-bottom:var(--esp-2);">Rota da Aventura</p>
      <div style="display:flex;flex-direction:column;gap:var(--esp-1);">
        <div style="display:flex;align-items:center;gap:var(--esp-2);font-size:var(--text-xs);color:var(--cor-verde-clara);">
          <span style="display:block;width:20px;height:2px;background:var(--cor-verde-clara);"></span> Percorrido
        </div>
        <div style="display:flex;align-items:center;gap:var(--esp-2);font-size:var(--text-xs);color:var(--cor-terra-clara);">
          <span style="display:block;width:20px;height:2px;background:var(--cor-terra-clara);"></span> Atual — México 🇲🇽
        </div>
        <div style="display:flex;align-items:center;gap:var(--esp-2);font-size:var(--text-xs);color:rgba(245,230,200,0.3);">
          <span style="display:block;width:20px;height:2px;background:rgba(245,230,200,0.3);border-top:2px dashed rgba(245,230,200,0.3);height:0;"></span> Em breve
        </div>
      </div>
    </div>

    <svg
      viewBox="0 0 480 680"
      xmlns="http://www.w3.org/2000/svg"
  aria-label="Mapa da rota de Ricardo e Tami do Brasil ao Alasca"
      role="img"
      style="width:100%;display:block;"
    >
      <!-- Fundo oceano -->
      <rect width="480" height="680" fill="#0F1923"/>

      <!-- Grade de coordenadas -->
      <g stroke="rgba(245,230,200,0.04)" stroke-width="1">
        <line x1="0" y1="170" x2="480" y2="170"/>
        <line x1="0" y1="340" x2="480" y2="340"/>
        <line x1="0" y1="510" x2="480" y2="510"/>
        <line x1="120" y1="0" x2="120" y2="680"/>
        <line x1="240" y1="0" x2="240" y2="680"/>
        <line x1="360" y1="0" x2="360" y2="680"/>
      </g>

      <!-- ═══ CONTINENTES (silhuetas simplificadas) ════════════ -->

      <!-- ALASCA -->
      <path d="M 60 30 L 200 20 L 220 50 L 180 70 L 130 80 L 80 70 Z"
        fill="rgba(45,106,79,0.15)" stroke="rgba(82,183,136,0.2)" stroke-width="1"/>
      <text x="140" y="55" text-anchor="middle" fill="rgba(82,183,136,0.5)" font-size="10" font-family="serif" font-style="italic">Alasca</text>

      <!-- CANADÁ / EUA -->
      <path d="M 60 75 L 310 65 L 320 120 L 300 150 L 240 160 L 160 165 L 80 155 L 60 130 Z"
        fill="rgba(26,43,60,0.8)" stroke="rgba(245,230,200,0.08)" stroke-width="1"/>
      <text x="185" y="120" text-anchor="middle" fill="rgba(245,230,200,0.2)" font-size="9" font-family="serif">América do Norte</text>

      <!-- MÉXICO -->
      <path d="M 155 163 L 280 155 L 295 190 L 270 220 L 220 235 L 180 230 L 155 205 Z"
        fill="rgba(193,68,14,0.2)" stroke="rgba(232,96,26,0.35)" stroke-width="1.5"/>
      <text x="225" y="198" text-anchor="middle" fill="rgba(232,96,26,0.7)" font-size="9" font-family="serif">México</text>

      <!-- AMERICA CENTRAL -->
      <path d="M 210 233 L 265 225 L 270 255 L 250 275 L 225 280 L 205 265 Z"
        fill="rgba(26,43,60,0.9)" stroke="rgba(245,230,200,0.08)" stroke-width="1"/>
      <text x="238" y="255" text-anchor="middle" fill="rgba(245,230,200,0.15)" font-size="7" font-family="serif">C. América</text>

      <!-- COLOMBIA/VENEZUELA -->
      <path d="M 200 285 L 310 275 L 325 310 L 295 330 L 240 335 L 195 315 Z"
        fill="rgba(26,43,60,0.9)" stroke="rgba(245,230,200,0.07)" stroke-width="1"/>

      <!-- BRASIL (maior) -->
      <path d="M 230 330 L 360 310 L 390 360 L 370 430 L 330 460 L 270 465 L 230 440 L 210 390 L 215 350 Z"
        fill="rgba(26,43,60,0.9)" stroke="rgba(245,230,200,0.08)" stroke-width="1"/>
      <text x="300" y="390" text-anchor="middle" fill="rgba(245,230,200,0.15)" font-size="11" font-family="serif">Brasil</text>

      <!-- PERU/BOLIVIA/CHILE -->
      <path d="M 180 360 L 230 340 L 235 450 L 210 510 L 175 520 L 155 470 L 160 410 Z"
        fill="rgba(26,43,60,0.9)" stroke="rgba(245,230,200,0.07)" stroke-width="1"/>

      <!-- ARGENTINA / PATAGÔNIA -->
      <path d="M 195 510 L 320 460 L 335 530 L 310 590 L 270 620 L 240 630 L 210 610 L 190 565 Z"
        fill="rgba(26,43,60,0.9)" stroke="rgba(245,230,200,0.07)" stroke-width="1"/>
      <text x="260" y="560" text-anchor="middle" fill="rgba(245,230,200,0.1)" font-size="9" font-family="serif">Patagônia</text>

      <!-- ═══ ROTA ANIMADA ══════════════════════════════════════ -->

      <!-- Definir o path da rota completa para animação de traçado -->
      <defs>
        <filter id="brilho-rota">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="brilho-ponto">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- SEGMENTO 1: Brasil → América do Sul → América Central (PERCORRIDO — verde) -->
      <path
        d="M 295 370 C 280 340, 250 320, 235 295 C 220 275, 225 265, 238 255 C 248 245, 258 238, 255 230"
        fill="none"
        stroke="var(--cor-verde-clara)"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#brilho-rota)"
        opacity="0.8"
      >
        <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="2s" fill="freeze" begin="0.5s"/>
      </path>

      <!-- SEGMENTO 2: América Central → México (ATUAL — terra) -->
      <path
        d="M 255 230 C 248 218, 238 210, 230 198"
        fill="none"
        stroke="var(--cor-terra-clara)"
        stroke-width="3"
        stroke-linecap="round"
        filter="url(#brilho-rota)"
        opacity="0.9"
      >
        <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="1s" fill="freeze" begin="2.5s"/>
      </path>

      <!-- SEGMENTO 3: México → EUA → Alasca (FUTURO — tracejado) -->
      <path
        d="M 230 198 C 225 180, 220 160, 215 140 C 210 120, 200 100, 190 80 C 180 60, 170 48, 155 42"
        fill="none"
        stroke="rgba(245,230,200,0.25)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="6,5"
        opacity="0.6"
      />

      <!-- ═══ PONTOS DE PARADA ═══════════════════════════════════ -->

      <!-- Brasil — Origem -->
      <g filter="url(#brilho-ponto)">
        <circle cx="295" cy="370" r="5" fill="var(--cor-verde-clara)" opacity="0.9"/>
        <circle cx="295" cy="370" r="9" fill="none" stroke="var(--cor-verde-clara)" stroke-width="1" opacity="0.4"/>
      </g>
      <text x="308" y="374" fill="var(--cor-verde-clara)" font-size="9" font-family="serif" opacity="0.9">🇧🇷 Brasil ✓</text>

      <!-- Patagônia -->
      <circle cx="260" cy="555" r="4" fill="var(--cor-verde-clara)" opacity="0.7"/>
      <text x="273" y="559" fill="rgba(82,183,136,0.7)" font-size="8" font-family="serif">Patagônia ✓</text>

      <!-- América Central -->
      <circle cx="238" cy="255" r="4" fill="var(--cor-verde-clara)" opacity="0.9"/>
      <text x="251" y="259" fill="rgba(82,183,136,0.8)" font-size="8" font-family="serif">C. América ✓</text>

      <!-- MÉXICO — ATUAL (pulsando) -->
      <g filter="url(#brilho-ponto)">
        <circle cx="230" cy="198" r="6" fill="var(--cor-terra-clara)">
          <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="230" cy="198" r="12" fill="none" stroke="var(--cor-terra-clara)" stroke-width="1.5">
          <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
      <text x="243" y="194" fill="var(--cor-terra-clara)" font-size="10" font-weight="bold" font-family="serif">🇲🇽 Aqui agora!</text>

      <!-- EUA (futuro) -->
      <circle cx="215" cy="140" r="4" fill="none" stroke="rgba(245,230,200,0.3)" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="228" y="144" fill="rgba(245,230,200,0.3)" font-size="8" font-family="serif">EUA</text>

      <!-- ALASCA — Destino final -->
      <g>
        <circle cx="155" cy="42" r="5" fill="none" stroke="rgba(245,230,200,0.35)" stroke-width="1.5" stroke-dasharray="3,2"/>
        <circle cx="155" cy="42" r="10" fill="none" stroke="rgba(245,230,200,0.15)" stroke-width="1"/>
      </g>
      <text x="165" y="38" fill="rgba(245,230,200,0.35)" font-size="9" font-family="serif">🏔️ Alasca</text>
      <text x="165" y="49" fill="rgba(245,230,200,0.2)" font-size="7" font-family="serif">Destino final</text>

      <!-- Ícone do veículo na posição atual -->
      <text x="222" y="215" font-size="14" opacity="0.9">🚙</text>

      <!-- Crédito -->
      <text x="240" y="672" text-anchor="middle" fill="rgba(245,230,200,0.15)" font-size="8" font-family="serif">
        Ricardo &amp; Tamires — Nossas Histórias
      </text>
    </svg>
  </div>
  `;
}

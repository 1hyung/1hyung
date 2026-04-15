import { SVGConfig } from './types';

export function createFarmFilters(): string {
  return `
    <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feColorMatrix in="coloredBlur" type="matrix"
        values="1 0.5 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0.8 0" result="warmBlur"/>
      <feMerge>
        <feMergeNode in="warmBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="farmShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#1a3a0a" flood-opacity="0.28"/>
    </filter>
  `;
}

/** 자작나무 스타일 픽셀아트 나무 (cx=중심 x, by=하단 y, s=크기 배율) */
function drawTree(cx: number, by: number, s: number = 1): string {
  const tw = Math.round(8 * s);
  const th = Math.round(26 * s);
  const cr = Math.round(22 * s);
  const tx = cx - Math.floor(tw / 2);
  const ty = by - th;
  const ccy = by - th - Math.round(cr * 0.55);

  return `<g>
    <ellipse cx="${cx + 3}" cy="${by + 3}" rx="${Math.round(cr * 0.75)}" ry="${Math.round(4 * s)}" fill="#2d6a15" opacity="0.28"/>
    <rect x="${tx}" y="${ty}" width="${tw}" height="${th}" fill="#ddd5b8"/>
    <rect x="${tx + Math.round(tw * 0.55)}" y="${ty}" width="${Math.round(tw * 0.45)}" height="${th}" fill="#bfb096" opacity="0.7"/>
    <rect x="${tx}" y="${ty + Math.round(th * 0.25)}" width="${tw}" height="2" fill="#908060" opacity="0.38"/>
    <rect x="${tx}" y="${ty + Math.round(th * 0.55)}" width="${Math.round(tw * 0.75)}" height="2" fill="#908060" opacity="0.32"/>
    <circle cx="${cx}" cy="${ccy + Math.round(cr * 0.2)}" r="${cr}" fill="#236a14"/>
    <circle cx="${cx - Math.round(cr * 0.35)}" cy="${ccy}" r="${Math.round(cr * 0.82)}" fill="#3c8a22"/>
    <circle cx="${cx + Math.round(cr * 0.28)}" cy="${ccy + Math.round(cr * 0.12)}" r="${Math.round(cr * 0.78)}" fill="#3c8a22"/>
    <circle cx="${cx - Math.round(cr * 0.18)}" cy="${ccy - Math.round(cr * 0.08)}" r="${Math.round(cr * 0.62)}" fill="#52a832"/>
    <circle cx="${cx + Math.round(cr * 0.12)}" cy="${ccy - Math.round(cr * 0.22)}" r="${Math.round(cr * 0.5)}" fill="#52a832"/>
    <circle cx="${cx - Math.round(cr * 0.1)}" cy="${ccy - Math.round(cr * 0.32)}" r="${Math.round(cr * 0.28)}" fill="#6ec045" opacity="0.68"/>
  </g>`;
}

/** 스타듀밸리 스타일 농가 건물 */
function drawFarmhouse(cx: number, ty: number): string {
  const hw = 110, hh = 78;
  const hx = cx - Math.floor(hw / 2);
  const rh = 52;
  const rtop = ty - rh;

  return `<g>
    <rect x="${hx + 6}" y="${ty + 6}" width="${hw}" height="${hh}" fill="#1a4a0a" rx="2" opacity="0.18"/>
    <rect x="${cx + 24}" y="${rtop - 14}" width="14" height="38" fill="#7a5050"/>
    <rect x="${cx + 22}" y="${rtop - 17}" width="18" height="6" fill="#5a3838"/>
    <polygon points="${hx - 8},${ty} ${cx},${rtop} ${hx + hw + 8},${ty}" fill="#c03050"/>
    <polygon points="${hx - 8},${ty} ${cx},${rtop} ${cx - 8},${ty}" fill="#8a2038" opacity="0.4"/>
    <rect x="${hx}" y="${ty}" width="${hw}" height="${hh}" fill="#c8a870"/>
    <rect x="${hx + Math.round(hw * 0.8)}" y="${ty}" width="${Math.round(hw * 0.2)}" height="${hh}" fill="#9a7840" opacity="0.45"/>
    <line x1="${hx}" y1="${ty + 22}" x2="${hx + Math.round(hw * 0.8)}" y2="${ty + 22}" stroke="#a88a50" stroke-width="1.5" opacity="0.3"/>
    <line x1="${hx}" y1="${ty + 44}" x2="${hx + Math.round(hw * 0.8)}" y2="${ty + 44}" stroke="#a88a50" stroke-width="1.5" opacity="0.3"/>
    <line x1="${hx}" y1="${ty + 66}" x2="${hx + Math.round(hw * 0.8)}" y2="${ty + 66}" stroke="#a88a50" stroke-width="1.5" opacity="0.3"/>
    <rect x="${cx - 18}" y="${ty + hh - 44}" width="36" height="44" fill="#6a3820" rx="3"/>
    <rect x="${cx - 16}" y="${ty + hh - 42}" width="32" height="40" fill="#7a4830" rx="2"/>
    <rect x="${cx - 13}" y="${ty + hh - 39}" width="12" height="16" fill="#8a3820"/>
    <rect x="${cx + 1}" y="${ty + hh - 39}" width="12" height="16" fill="#8a3820"/>
    <circle cx="${cx + 5}" cy="${ty + hh - 18}" r="2.5" fill="#c8a028"/>
    <rect x="${hx + 10}" y="${ty + 19}" width="26" height="22" fill="#5888b8" rx="2"/>
    <rect x="${hx + 12}" y="${ty + 21}" width="11" height="18" fill="#7aaad8"/>
    <rect x="${hx + 25}" y="${ty + 21}" width="9" height="18" fill="#7aaad8"/>
    <rect x="${hx + 10}" y="${ty + 30}" width="26" height="2" fill="#3860a0" opacity="0.45"/>
    <rect x="${hx + hw - 36}" y="${ty + 19}" width="26" height="22" fill="#5888b8" rx="2"/>
    <rect x="${hx + hw - 34}" y="${ty + 21}" width="11" height="18" fill="#7aaad8"/>
    <rect x="${hx + hw - 21}" y="${ty + 21}" width="9" height="18" fill="#7aaad8"/>
    <rect x="${hx + hw - 36}" y="${ty + 30}" width="26" height="2" fill="#3860a0" opacity="0.45"/>
    <rect x="${cx - 22}" y="${ty + hh}" width="44" height="7" fill="#9a9080"/>
  </g>`;
}

/** 꽃 장식 */
function drawFlower(x: number, y: number): string {
  return `<g>
    <circle cx="${x}" cy="${y - 4}" r="2.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="${x + 4}" cy="${y}" r="2.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="${x - 4}" cy="${y}" r="2.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="${x}" cy="${y + 4}" r="2.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="${x}" cy="${y}" r="2" fill="#f0d040" opacity="0.88"/>
  </g>`;
}

/** 풀잎 장식 */
function drawGrassTuft(x: number, y: number): string {
  return `<g opacity="0.58">
    <ellipse cx="${x}" cy="${y}" rx="2.5" ry="5" fill="#5db838" transform="rotate(-20 ${x} ${y})"/>
    <ellipse cx="${x + 5}" cy="${y + 1}" rx="2" ry="4.5" fill="#4ca82a" transform="rotate(14 ${x + 5} ${y + 1})"/>
    <ellipse cx="${x - 4}" cy="${y + 1}" rx="2" ry="4" fill="#5db838" transform="rotate(-28 ${x - 4} ${y + 1})"/>
  </g>`;
}

export function createFarmBackground(config: SVGConfig): string {
  const { width, height } = config;

  return `<g id="farm-background">
    <!-- 잔디 배경 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="#7dc54a"/>
    <ellipse cx="260" cy="155" rx="185" ry="72" fill="#88d052" opacity="0.16"/>
    <ellipse cx="660" cy="185" rx="145" ry="62" fill="#88d052" opacity="0.14"/>

    <!-- 잔디 장식 (꽃, 풀잎) -->
    ${drawFlower(42, 110)}
    ${drawGrassTuft(122, 150)}
    ${drawFlower(232, 80)}
    ${drawGrassTuft(335, 272)}
    ${drawFlower(392, 178)}
    ${drawGrassTuft(455, 112)}
    ${drawGrassTuft(508, 196)}
    ${drawFlower(552, 248)}
    ${drawFlower(682, 120)}
    ${drawGrassTuft(728, 188)}
    ${drawFlower(796, 148)}
    ${drawGrassTuft(838, 234)}
    ${drawFlower(172, 246)}
    ${drawGrassTuft(62, 196)}

    <!-- 나무들 (z-order: y 작은것 먼저 = 뒤쪽부터) -->
    ${drawTree(108, 215, 0.72)}
    ${drawTree(740, 222, 0.75)}
    ${drawTree(820, 228, 0.7)}
    ${drawTree(215, 228, 0.78)}
    ${drawTree(145, 248, 0.88)}
    ${drawTree(310, 242, 0.82)}
    ${drawTree(380, 252, 0.75)}
    ${drawTree(455, 238, 0.8)}
    ${drawTree(715, 248, 0.9)}
    ${drawTree(780, 255, 0.82)}
    ${drawTree(75, 262, 1.05)}
    ${drawTree(195, 268, 0.92)}
    ${drawTree(840, 258, 0.78)}
    ${drawTree(350, 278, 0.7)}
    ${drawTree(490, 272, 0.68)}

    <!-- 농가 건물 (상단 우측) -->
    ${drawFarmhouse(618, 135)}

    <!-- 돌길 (농가 → 그리드) -->
    <g opacity="0.7">
      <ellipse cx="618" cy="226" rx="9" ry="5.5" fill="#9a9a8a"/>
      <ellipse cx="630" cy="235" rx="8" ry="5" fill="#b0b0a0"/>
      <ellipse cx="610" cy="245" rx="7.5" ry="4.5" fill="#909080"/>
      <ellipse cx="624" cy="254" rx="8" ry="5" fill="#9a9a8a"/>
      <ellipse cx="613" cy="263" rx="7" ry="4.5" fill="#b0b0a0"/>
      <ellipse cx="626" cy="272" rx="8.5" ry="5" fill="#909080"/>
      <ellipse cx="616" cy="281" rx="7.5" ry="4.5" fill="#9a9a8a"/>
      <ellipse cx="621" cy="290" rx="8" ry="5" fill="#b0b0a0"/>
    </g>

    <!-- 테두리 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#4a6e28" stroke-width="3"/>
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="#88cc50" stroke-width="1" opacity="0.26"/>
  </g>`;
}

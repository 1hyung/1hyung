// 흥부네 커밋 — 초가집 배경 (지붕=그리드, 아래=집 본체)
// 레이아웃: 하늘(0~140) | 용마루+박(125~140) | 그리드=지붕(140~252) | 처마(252~272) | 집 본체(272~415) | 기단(415~433) | 지면(433~)

import { SVGConfig } from './types';
import { HEUNGBU_COLORS } from './heungbu-colors';

const H = HEUNGBU_COLORS;

// 레이아웃 상수 (theme.flatGridY=140 과 일치)
const GRID_Y      = 140;  // 그리드 시작 = 지붕 타일 시작
const GRID_BOTTOM = 252;  // GRID_Y + 7행×16px
const RIDGE_Y     = 130;  // 용마루 시작
const RIDGE_H     = 10;   // 용마루 높이
const EAVE_Y      = GRID_BOTTOM;
const EAVE_H      = 22;
const HOUSE_Y     = EAVE_Y + EAVE_H;  // 274
const HOUSE_H     = 141;               // 집 본체 높이
const FOUND_Y     = HOUSE_Y + HOUSE_H; // 415
const FOUND_H     = 18;
const GROUND_Y    = FOUND_Y + FOUND_H; // 433

export function createHeungbuFilters(): string {
  return `
    <filter id="heungbuGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="gourdShadow">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#2a1a04" flood-opacity="0.45"/>
    </filter>
  `;
}

// 박 하나를 SVG로 그리기 (용마루 위 좌표 기준)
function gourdSVG(gx: number, sz: number): string {
  const ry  = Math.round(sz * 1.35);
  const cy  = RIDGE_Y - ry + 3;          // 박 바닥이 용마루 위에 걸침
  const hlX = Math.round(gx - sz * 0.25);
  const hlY = Math.round(cy - ry * 0.22);
  return `
    <ellipse cx="${gx}" cy="${cy}" rx="${sz}" ry="${ry}"
      fill="${H.gourdMid}" filter="url(#gourdShadow)"/>
    <ellipse cx="${hlX}" cy="${hlY}" rx="${Math.round(sz * 0.55)}" ry="${Math.round(ry * 0.48)}"
      fill="${H.gourdLight}"/>
    <ellipse cx="${Math.round(gx - sz * 0.35)}" cy="${Math.round(cy - ry * 0.38)}"
      rx="${Math.round(sz * 0.28)}" ry="${Math.round(ry * 0.26)}"
      fill="${H.gourdHighlight}"/>
    <rect x="${gx - 2}" y="${cy + ry - 2}" width="4" height="6" rx="2"
      fill="${H.gourdStem}"/>
  `;
}

// 박들과 덩굴선
function buildRidge(width: number): string {
  const gourds: Array<{ x: number; sz: number }> = [
    { x: 48,   sz: 11 },
    { x: 140,  sz: 14 },
    { x: 240,  sz: 12 },
    { x: 345,  sz: 15 },
    { x: Math.round(width / 2), sz: 19 },  // 중앙 최대
    { x: Math.round(width / 2) + 80, sz: 15 },
    { x: 560,  sz: 13 },
    { x: 660,  sz: 14 },
    { x: 760,  sz: 12 },
    { x: 820,  sz: 10 },
  ];

  // 덩굴 줄기 (박 사이)
  const vineLines = gourds.slice(0, -1).map((g, i) => {
    const nx = gourds[i + 1].x;
    const mx = Math.round((g.x + nx) / 2);
    return `<path d="M${g.x},${RIDGE_Y + 2} Q${mx},${RIDGE_Y - 8} ${nx},${RIDGE_Y + 2}"
      stroke="${H.vineGreen}" stroke-width="2.5" fill="none" opacity="0.85"/>`;
  }).join('\n    ');

  // 잎사귀 장식
  const leafPositions = [100, 195, 300, 430, width / 2 + 40, 520, 620, 715];
  const leafs = leafPositions.map(lx => {
    const angle = (lx % 40 > 20) ? -20 : 20;
    return `<ellipse cx="${Math.round(lx)}" cy="${RIDGE_Y - 14}"
      rx="9" ry="5" fill="${H.leafMid}"
      transform="rotate(${angle}, ${Math.round(lx)}, ${RIDGE_Y - 14})"
      opacity="0.88"/>`;
  }).join('\n    ');

  const gourdSVGs = gourds.map(g => gourdSVG(g.x, g.sz)).join('');

  return `
    <!-- 덩굴 줄기 -->
    ${vineLines}
    <!-- 잎 -->
    ${leafs}
    <!-- 박들 -->
    ${gourdSVGs}
  `;
}

// 창호지 창문 (한국 전통 격자 창)
function windowSVG(wx: number, wy: number, ww: number, wh: number): string {
  const cols = 3;
  const rows = 4;
  const vLines = Array.from({ length: cols - 1 }, (_, i) => {
    const lx = Math.round(wx + (ww / cols) * (i + 1));
    return `<line x1="${lx}" y1="${wy}" x2="${lx}" y2="${wy + wh}" stroke="#7a5030" stroke-width="1.5" opacity="0.7"/>`;
  }).join('');
  const hLines = Array.from({ length: rows - 1 }, (_, j) => {
    const ly = Math.round(wy + (wh / rows) * (j + 1));
    return `<line x1="${wx}" y1="${ly}" x2="${wx + ww}" y2="${ly}" stroke="#7a5030" stroke-width="1" opacity="0.6"/>`;
  }).join('');
  return `
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#eedcaa" rx="2" opacity="0.92"/>
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="none" stroke="#5c3214" stroke-width="2.5" rx="2"/>
    ${vLines}${hLines}
  `;
}

export function createHeungbuBackground(config: SVGConfig): string {
  const { width, height } = config;
  const cx = Math.round(width / 2);

  // ─── 처마 (eaves) ─────────────────────────────────────────────
  const eaves = `
    <rect x="0" y="${EAVE_Y}" width="${width}" height="${EAVE_H}"
      fill="${H.strawDark}" opacity="0.97"/>
    <rect x="0" y="${EAVE_Y}" width="${width}" height="5"
      fill="${H.strawHighlight}" opacity="0.28"/>
    <rect x="0" y="${EAVE_Y + EAVE_H - 5}" width="${width}" height="5"
      fill="#2a1808" opacity="0.55"/>
    ${/* 처마 서까래 끝 장식 */Array.from({ length: Math.ceil(width / 14) }, (_, i) =>
      `<rect x="${i * 14 + 1}" y="${EAVE_Y + 5}" width="12" height="${EAVE_H - 10}"
        rx="1" fill="#7a5020" opacity="0.35"/>`
    ).join('')}
  `;

  // ─── 집 본체 ──────────────────────────────────────────────────
  const pillarX = [30, 215, cx - 12, 615, 800];
  const pillarW = 14;
  const pillars = pillarX.map(px => `
    <rect x="${px}" y="${HOUSE_Y}" width="${pillarW}" height="${HOUSE_H}"
      fill="#4a2810"/>
    <rect x="${px}" y="${HOUSE_Y}" width="${pillarW}" height="8"
      fill="#6a3e1e"/>
    <rect x="${px}" y="${HOUSE_Y + HOUSE_H - 7}" width="${pillarW}" height="7"
      fill="#2e1608"/>
  `).join('');

  // 창문 (왼쪽 · 오른쪽)
  const winH = 88;
  const winY = HOUSE_Y + 30;
  const winW = 155;
  const leftWin  = windowSVG(50, winY, winW, winH);
  const rightWin = windowSVG(width - 50 - winW, winY, winW, winH);

  // 현판 홀더 (통계 패널이 이 위에 겹쳐 그려짐, statsPanelY=338)
  const hyeonpan = `
    <!-- 현판 (nameplate holder) — 통계 패널 배경 -->
    <rect x="${cx - 215}" y="332" width="430" height="66"
      rx="6" fill="#3c2010" opacity="0.72"/>
    <rect x="${cx - 210}" y="335" width="420" height="60"
      rx="5" fill="none" stroke="${H.strawLight}" stroke-width="1.2" opacity="0.45"/>
  `;

  // 중앙문 (현판 아래)
  const doorX = cx - 80;
  const doorW = 160;
  const doorY = 402;
  const doorH = HOUSE_Y + HOUSE_H - doorY;
  const door = `
    <rect x="${doorX - 6}" y="${doorY}" width="${doorW + 12}" height="${doorH + 6}"
      rx="2" fill="#3a1e0a"/>
    <rect x="${doorX}" y="${doorY + 4}" width="${doorW / 2 - 3}" height="${doorH - 2}"
      rx="1" fill="#5a3018"/>
    <rect x="${doorX + doorW / 2 + 3}" y="${doorY + 4}" width="${doorW / 2 - 3}" height="${doorH - 2}"
      rx="1" fill="#5a3018"/>
    <circle cx="${doorX + doorW / 2 - 7}" cy="${doorY + doorH / 2}" r="4" fill="#c89040"/>
    <circle cx="${doorX + doorW / 2 + 7}" cy="${doorY + doorH / 2}" r="4" fill="#c89040"/>
  `;

  // 상단/하단 가로보 (들보)
  const beams = `
    <rect x="0" y="${HOUSE_Y}" width="${width}" height="14" fill="#4a2810" opacity="0.92"/>
    <rect x="0" y="${HOUSE_Y}" width="${width}" height="4" fill="#6a4020" opacity="0.5"/>
    <rect x="0" y="${HOUSE_Y + HOUSE_H - 10}" width="${width}" height="10"
      fill="#3a1c08" opacity="0.9"/>
  `;

  // ─── 기단 (foundation) ────────────────────────────────────────
  const stoneW = 58;
  const stoneCount = Math.ceil(width / stoneW);
  const foundation = `
    <rect x="0" y="${FOUND_Y}" width="${width}" height="${FOUND_H}" fill="#7a6a58"/>
    ${Array.from({ length: stoneCount }, (_, i) =>
      `<rect x="${i * stoneW + 1}" y="${FOUND_Y + 2}" width="${stoneW - 2}" height="${FOUND_H - 4}"
        rx="2" fill="#9a8a78" stroke="#5a4a3a" stroke-width="0.8" opacity="0.85"/>`
    ).join('')}
  `;

  return `
<g id="heungbu-background">
  <defs>
    <linearGradient id="hSkyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${H.skyTop}"/>
      <stop offset="65%"  stop-color="${H.skyMid}"/>
      <stop offset="100%" stop-color="${H.skyBottom}"/>
    </linearGradient>
    <linearGradient id="hWallGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#c8a878"/>
      <stop offset="100%" stop-color="#9a7848"/>
    </linearGradient>
  </defs>

  <!-- ① 하늘 -->
  <rect x="0" y="0" width="${width}" height="${GRID_Y}" fill="url(#hSkyGrad)"/>

  <!-- 구름 -->
  <g opacity="0.90">
    <ellipse cx="75"  cy="42" rx="40" ry="16" fill="white"/>
    <ellipse cx="105" cy="33" rx="28" ry="12" fill="white"/>
    <ellipse cx="50"  cy="44" rx="22" ry="10" fill="white"/>
  </g>
  <g opacity="0.82">
    <ellipse cx="760" cy="37" rx="46" ry="18" fill="white"/>
    <ellipse cx="795" cy="28" rx="32" ry="13" fill="white"/>
    <ellipse cx="728" cy="40" rx="26" ry="11" fill="white"/>
  </g>
  <g opacity="0.70">
    <ellipse cx="430" cy="22" rx="38" ry="14" fill="white"/>
    <ellipse cx="455" cy="13" rx="26" ry="10" fill="white"/>
  </g>

  <!-- 타이틀 (하늘) -->
  <text x="${cx}" y="74"
    text-anchor="middle" font-family="monospace" font-size="11"
    fill="${H.textLight}" opacity="0.78">흥부네 커밋 · Heungbu's Commits</text>
  <text x="${cx}" y="98"
    text-anchor="middle" font-family="monospace" font-size="20" font-weight="bold"
    fill="${H.strawLight}">1hyung's Commits</text>

  <!-- ② 용마루 (ridge bar) -->
  <rect x="0" y="${RIDGE_Y}" width="${width}" height="${RIDGE_H}"
    fill="#4a2e10" rx="1"/>
  <rect x="0" y="${RIDGE_Y}" width="${width}" height="3"
    fill="#7a5028" opacity="0.55"/>
  <rect x="0" y="${RIDGE_Y + RIDGE_H - 2}" width="${width}" height="2"
    fill="#1e0e04" opacity="0.65"/>

  <!-- ③ 박 + 덩굴 (용마루 위) -->
  ${buildRidge(width)}

  <!-- ④ 처마 (그리드 아래) -->
  ${eaves}

  <!-- ⑤ 집 본체 -->
  <rect x="0" y="${HOUSE_Y}" width="${width}" height="${HOUSE_H}" fill="url(#hWallGrad)"/>
  ${beams}
  ${pillars}
  ${leftWin}
  ${rightWin}
  ${hyeonpan}
  ${door}

  <!-- ⑥ 기단 -->
  ${foundation}

  <!-- ⑦ 지면 -->
  <rect x="0" y="${GROUND_Y}" width="${width}" height="${height - GROUND_Y}"
    fill="${H.groundGreen}"/>
  <rect x="0" y="${GROUND_Y}" width="${width}" height="8"
    fill="${H.hillNear}" opacity="0.6"/>
</g>`.trim();
}

/** 그리드 위에 그리는 전경: 처마 아래 그림자 선 */
export function createHeungbuForeground(config: SVGConfig): string {
  const { width } = config;
  return `
<g id="heungbu-foreground">
  <!-- 처마 상단 그림자 (지붕 아래쪽 깊이감) -->
  <rect x="0" y="${GRID_BOTTOM - 2}" width="${width}" height="4"
    fill="#1e0e04" opacity="0.30"/>
  <!-- 지붕 좌우 테두리 (측면 처마) -->
  <rect x="0" y="${GRID_Y}" width="3" height="${GRID_BOTTOM - GRID_Y}"
    fill="#3a1e08" opacity="0.35"/>
  <rect x="${width - 3}" y="${GRID_Y}" width="3" height="${GRID_BOTTOM - GRID_Y}"
    fill="#3a1e08" opacity="0.35"/>
</g>`.trim();
}

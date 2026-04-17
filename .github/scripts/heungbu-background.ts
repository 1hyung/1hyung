// 흥부네 커밋 — 초가집 배경 (HTML 템플릿 기반 레이아웃)
// 레이아웃: 하늘(0~200) | 지붕=그리드(200~350) | 집본체(350~500) | 기단(500~520) | 잔디(520~600)
// 현판: 상단 중앙(y=25~135), 박덩굴: 지붕 상단(translate 100,150)

import { SVGConfig } from './types';
import { HEUNGBU_COLORS as H } from './heungbu-colors';

// 지붕 clipPath 좌표 (1000×600 캔버스 고정)
const ROOF_TOP_Y  = 200;
const ROOF_BOT_Y  = 350;
const ROOF_CLIP_D = `M90,${ROOF_TOP_Y} L910,${ROOF_TOP_Y} L940,${ROOF_BOT_Y} Q500,${ROOF_BOT_Y - 50} 60,${ROOF_BOT_Y} Z`;

// ─── 필터 + ClipPath ──────────────────────────────────────────────
export function createHeungbuFilters(): string {
  return `
    <filter id="heungbuGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="gourdShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="#3a1a00" flood-opacity="0.4"/>
    </filter>
    <clipPath id="heungbu-roof-clip">
      <path d="${ROOF_CLIP_D}"/>
    </clipPath>
  `;
}

// ─── 창호지 창문 ──────────────────────────────────────────────────
function windowSVG(wx: number, wy: number, ww: number, wh: number): string {
  const cols = 3, rows = 4;
  const vLines = Array.from({ length: cols - 1 }, (_, i) => {
    const lx = Math.round(wx + (ww / cols) * (i + 1));
    return `<line x1="${lx}" y1="${wy+5}" x2="${lx}" y2="${wy+wh-5}" stroke="#7A5030" stroke-width="1.5" opacity="0.6"/>`;
  }).join('');
  const hLines = Array.from({ length: rows - 1 }, (_, j) => {
    const ly = Math.round(wy + (wh / rows) * (j + 1));
    return `<line x1="${wx+5}" y1="${ly}" x2="${wx+ww-5}" y2="${ly}" stroke="#7A5030" stroke-width="1" opacity="0.5"/>`;
  }).join('');
  return `
    <rect x="${wx-6}" y="${wy-4}" width="${ww+12}" height="${wh+8}" rx="2" fill="#5A3218"/>
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#EDD4A0" rx="1" opacity="0.94"/>
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="none" stroke="#5C3214" stroke-width="2" rx="1"/>
    ${vLines}${hLines}
  `;
}

// ─── 배경 생성 ────────────────────────────────────────────────────
export function createHeungbuBackground(config: SVGConfig): string {
  const { width: W, height: H } = config;
  const cx = Math.round(W / 2);

  const HOUSE_Y  = ROOF_BOT_Y;   // 350
  const HOUSE_H  = 150;
  const FOUND_Y  = HOUSE_Y + HOUSE_H; // 500
  const FOUND_H  = 20;
  const GROUND_Y = FOUND_Y + FOUND_H; // 520

  // 짚 가로 결 (지붕 위)
  const thatchLines = Array.from({ length: 8 }, (_, i) => {
    const ty = ROOF_TOP_Y + 18 + i * 18;
    const t = (ty - ROOF_TOP_Y) / (ROOF_BOT_Y - ROOF_TOP_Y);
    const lx = Math.round(90 - t * 30);
    const rx = Math.round(W - 90 + t * 30);
    const op = (0.06 + i * 0.012).toFixed(2);
    return `<line x1="${lx}" y1="${ty}" x2="${rx}" y2="${ty}" stroke="#F8D840" stroke-width="1.5" opacity="${op}"/>`;
  }).join('');

  // 현판 (hyeonpan) 위치
  const signX = cx - 250, signY = 22, signW = 500, signH = 112;
  const rainbow = ['#E82020','#F07020','#E8C018','#38A028','#2070D0','#7828C0'];
  const bs = 2, bH = rainbow.length * bs; // 12px
  const rbTop    = rainbow.map((c, i) =>
    `<rect x="${signX}" y="${signY+i*bs}" width="${signW}" height="${bs}" fill="${c}"/>`).join('');
  const rbBottom = rainbow.map((c, i) =>
    `<rect x="${signX}" y="${signY+signH-bH+i*bs}" width="${signW}" height="${bs}" fill="${c}"/>`).join('');
  const rbLeft   = rainbow.map((c, i) =>
    `<rect x="${signX+i*bs}" y="${signY+bH}" width="${bs}" height="${signH-bH*2}" fill="${c}"/>`).join('');
  const rbRight  = rainbow.map((c, i) =>
    `<rect x="${signX+signW-bH+i*bs}" y="${signY+bH}" width="${bs}" height="${signH-bH*2}" fill="${c}"/>`).join('');
  const signGrain = Array.from({ length: 5 }, (_, i) => {
    const gy = signY + bH + 10 + i * 17;
    const c2 = (i % 2 === 0) ? 5 : -5;
    return `<path d="M${signX+bH+8},${gy} Q${cx},${gy+c2} ${signX+signW-bH-8},${gy}" stroke="#5A2808" stroke-width="1.2" fill="none" opacity="0.22"/>`;
  }).join('');

  // 현판 받침대 (두 다리 + 가로대)
  const legTop = signY + signH;
  const leg1X = cx - 195, leg2X = cx + 195;
  const crossBarY = legTop + Math.round((H - legTop) * 0.62);

  // 기둥
  const pillarsX = [100, 315, W - 315, W - 100];
  const pillars = pillarsX.map(px => `
    <rect x="${px}" y="${HOUSE_Y}" width="15" height="${HOUSE_H}" fill="#3C2008"/>
    <rect x="${px}" y="${HOUSE_Y}" width="15" height="6" fill="#6A3E1E" opacity="0.5"/>
    <rect x="${px}" y="${HOUSE_Y+HOUSE_H-7}" width="15" height="7" fill="#2E1608" opacity="0.8"/>
  `).join('');

  // 창문 좌/우
  const leftWin  = windowSVG(120, HOUSE_Y + 28, 160, 86);
  const rightWin = windowSVG(W - 280, HOUSE_Y + 28, 160, 86);

  // 문 (중앙)
  const doorW = 98, doorH = 76;
  const doorX = cx - Math.round(doorW / 2);
  const doorY = HOUSE_Y + HOUSE_H - doorH;

  // 기단 돌
  const stones = Array.from({ length: Math.ceil((W - 200) / 62) }, (_, i) =>
    `<rect x="${100 + i * 62 + 1}" y="${FOUND_Y + 2}" width="60" height="${FOUND_H - 4}" rx="3" fill="#9A8A78" stroke="#5A4A3A" stroke-width="0.8" opacity="0.85"/>`
  ).join('');

  return `
<g id="heungbu-background">
  <defs>
    <linearGradient id="hSkG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#6AB8E0"/>
      <stop offset="60%"  stop-color="#9CD0EC"/>
      <stop offset="100%" stop-color="#C2E4F8"/>
    </linearGradient>
    <linearGradient id="hWallG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#BF9868"/>
      <stop offset="100%" stop-color="#8A6840"/>
    </linearGradient>
    <linearGradient id="hRoofG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#D4B060"/>
      <stop offset="100%" stop-color="#B89040"/>
    </linearGradient>
    <linearGradient id="hSignG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#B06838"/>
      <stop offset="100%" stop-color="#7A4820"/>
    </linearGradient>
    <linearGradient id="hGrassG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#62CA28"/>
      <stop offset="100%" stop-color="#48A018"/>
    </linearGradient>
  </defs>

  <!-- ① 하늘 -->
  <rect x="0" y="0" width="${W}" height="${ROOF_BOT_Y}" fill="url(#hSkG)"/>

  <!-- 구름 좌 -->
  <g opacity="0.92">
    <ellipse cx="128" cy="60" rx="55" ry="22" fill="white"/>
    <ellipse cx="164" cy="47" rx="37" ry="16" fill="white"/>
    <ellipse cx="98"  cy="65" rx="30" ry="13" fill="white"/>
    <ellipse cx="182" cy="63" rx="22" ry="10" fill="white"/>
  </g>
  <!-- 구름 우 -->
  <g opacity="0.88">
    <ellipse cx="872" cy="54" rx="58" ry="23" fill="white"/>
    <ellipse cx="910" cy="42" rx="40" ry="17" fill="white"/>
    <ellipse cx="840" cy="59" rx="32" ry="14" fill="white"/>
    <ellipse cx="930" cy="57" rx="24" ry="11" fill="white"/>
  </g>

  <!-- ② 지붕 배경 (commit grid 영역) -->
  <path d="${ROOF_CLIP_D}" fill="url(#hRoofG)"/>
  <path d="${ROOF_CLIP_D}" fill="none" stroke="#5A3810" stroke-width="3" opacity="0.35"/>
  ${thatchLines}
  <!-- 용마루 (지붕 상단 가로대) -->
  <rect x="88" y="${ROOF_TOP_Y - 2}" width="${W - 176}" height="14" fill="#C89030" rx="3"/>
  <rect x="88" y="${ROOF_TOP_Y - 2}" width="${W - 176}" height="4" fill="#F0D880" opacity="0.32"/>
  <rect x="88" y="${ROOF_TOP_Y + 8}" width="${W - 176}" height="4" fill="#2a1400" opacity="0.30"/>

  <!-- ③ 현판 받침대 -->
  <path d="M${leg1X},${legTop} L${leg1X - 18},${H - 5}" stroke="#5A3410" stroke-width="20" stroke-linecap="round"/>
  <path d="M${leg2X},${legTop} L${leg2X + 18},${H - 5}" stroke="#5A3410" stroke-width="20" stroke-linecap="round"/>
  <path d="M${leg1X},${legTop} L${leg1X - 18},${H - 5}" stroke="#8A5828" stroke-width="5" stroke-linecap="round" opacity="0.35"/>
  <path d="M${leg2X},${legTop} L${leg2X + 18},${H - 5}" stroke="#8A5828" stroke-width="5" stroke-linecap="round" opacity="0.35"/>
  <!-- 가로 지지대 -->
  <rect x="${cx - 215}" y="${crossBarY}" width="430" height="16" rx="5" fill="#4E3010"/>
  <rect x="${cx - 215}" y="${crossBarY}" width="430" height="5" rx="4" fill="#7A5020" opacity="0.40"/>

  <!-- ④ 현판 보드 -->
  <rect x="${signX}" y="${signY}" width="${signW}" height="${signH}" rx="8" fill="url(#hSignG)" filter="url(#gourdShadow)"/>
  ${signGrain}
  <rect x="${signX}" y="${signY}" width="${signW}" height="${signH}" rx="8" fill="none" stroke="#2E1408" stroke-width="3" opacity="0.30"/>
  <!-- 색동 테두리 (12px) -->
  ${rbTop}${rbBottom}${rbLeft}${rbRight}
  <!-- 현판 텍스트 -->
  <text x="${cx}" y="${signY + Math.round(signH * 0.40)}"
    text-anchor="middle" font-family="monospace" font-size="15"
    fill="#F8E8B8" opacity="0.88" letter-spacing="1">흥부네 커밋 · Heungbu's Commits</text>
  <text x="${cx}" y="${signY + Math.round(signH * 0.78)}"
    text-anchor="middle"
    font-family="'Arial Black','Arial Bold',Arial,sans-serif"
    font-size="42" font-weight="bold"
    fill="#FFD838" filter="url(#gourdShadow)">1HYUNG'S COMMITS</text>
  <!-- 현판 장식 점 3개 -->
  <circle cx="${cx - 26}" cy="${signY + Math.round(signH * 0.93)}" r="7" fill="none" stroke="#C8A030" stroke-width="2.5"/>
  <circle cx="${cx}"      cy="${signY + Math.round(signH * 0.93)}" r="7" fill="#4A7A28"/>
  <circle cx="${cx + 26}" cy="${signY + Math.round(signH * 0.93)}" r="7" fill="#284820"/>

  <!-- ⑤ 집 본체 -->
  <rect x="100" y="${HOUSE_Y}" width="${W - 200}" height="${HOUSE_H}" fill="url(#hWallG)"/>
  <rect x="100" y="${HOUSE_Y}" width="${W - 200}" height="12" fill="#4A2810" opacity="0.9"/>
  <rect x="100" y="${HOUSE_Y + HOUSE_H - 8}" width="${W - 200}" height="8" fill="#3A1C08" opacity="0.85"/>
  ${pillars}
  ${leftWin}
  ${rightWin}
  <!-- 문 -->
  <rect x="${doorX - 7}" y="${doorY}" width="${doorW + 14}" height="${doorH + 5}" rx="2" fill="#3A1E0A"/>
  <rect x="${doorX}" y="${doorY + 4}" width="${Math.round(doorW / 2) - 2}" height="${doorH - 2}" rx="1" fill="#5A3018"/>
  <rect x="${doorX + Math.round(doorW / 2) + 2}" y="${doorY + 4}" width="${Math.round(doorW / 2) - 2}" height="${doorH - 2}" rx="1" fill="#5A3018"/>
  <circle cx="${doorX + Math.round(doorW / 2) - 6}" cy="${doorY + Math.round(doorH / 2) + 2}" r="4" fill="#C89040"/>
  <circle cx="${doorX + Math.round(doorW / 2) + 6}" cy="${doorY + Math.round(doorH / 2) + 2}" r="4" fill="#C89040"/>

  <!-- ⑥ 기단 -->
  <rect x="100" y="${FOUND_Y}" width="${W - 200}" height="${FOUND_H}" fill="#7A6A58"/>
  ${stones}

  <!-- ⑦ 잔디 -->
  <rect x="0" y="${GROUND_Y}" width="${W}" height="${H - GROUND_Y}" fill="url(#hGrassG)"/>
  <rect x="0" y="${GROUND_Y}" width="${W}" height="8" fill="#72DA38" opacity="0.7"/>
  <rect x="0" y="${GROUND_Y + 8}" width="${W}" height="5" fill="#5AC028" opacity="0.45"/>
</g>`.trim();
}

// ─── 박(호리병) 하나 ─────────────────────────────────────────────
function gourdSVG(cx: number, cy: number, sz: number): string {
  const bRx = Math.round(sz);
  const bRy = Math.round(sz * 0.88);
  const bCy = cy + Math.round(sz * 0.55);
  const tRx = Math.round(sz * 0.55);
  const tRy = Math.round(sz * 0.52);
  const tCy = cy - Math.round(sz * 0.68);
  const neckW = Math.round(sz * 0.28);
  const neckY1 = tCy + tRy - 2;
  const neckH = Math.max(2, bCy - bRy + 2 - neckY1);
  return `
    <ellipse cx="${cx}" cy="${bCy}" rx="${bRx}" ry="${bRy}" fill="${H.gourdMid}" filter="url(#gourdShadow)"/>
    <ellipse cx="${cx - Math.round(bRx * 0.28)}" cy="${bCy - Math.round(bRy * 0.32)}"
      rx="${Math.round(bRx * 0.40)}" ry="${Math.round(bRy * 0.28)}" fill="${H.gourdLight}" opacity="0.72"/>
    <ellipse cx="${cx - Math.round(bRx * 0.14)}" cy="${bCy - Math.round(bRy * 0.52)}"
      rx="${Math.round(bRx * 0.20)}" ry="${Math.round(bRy * 0.15)}" fill="${H.gourdHighlight}" opacity="0.6"/>
    <ellipse cx="${cx}" cy="${tCy}" rx="${tRx}" ry="${tRy}" fill="${H.gourdMid}"/>
    <ellipse cx="${cx - Math.round(tRx * 0.3)}" cy="${tCy - Math.round(tRy * 0.3)}"
      rx="${Math.round(tRx * 0.42)}" ry="${Math.round(tRy * 0.30)}" fill="${H.gourdLight}" opacity="0.70"/>
    <rect x="${cx - neckW}" y="${neckY1}" width="${neckW * 2}" height="${neckH}" fill="${H.gourdMid}"/>
    <rect x="${cx - 2}" y="${tCy - tRy - 7}" width="4" height="9" rx="2" fill="${H.gourdStem}"/>
    <path d="M${cx+2},${tCy-tRy-2} Q${cx+7},${tCy-tRy-9} ${cx+6},${tCy-tRy-16}" stroke="${H.gourdStem}" stroke-width="1.5" fill="none"/>
  `;
}

// ─── 잎 하나 ─────────────────────────────────────────────────────
function gourdLeaf(cx: number, cy: number, angle: number, scale: number): string {
  const w = Math.round(26 * scale), h = Math.round(16 * scale);
  return `
    <ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="${h}" fill="${H.leafMid}"
      transform="rotate(${angle} ${cx} ${cy})" opacity="0.92"/>
    <line x1="${cx}" y1="${cy - Math.round(h * 0.7)}" x2="${cx}" y2="${cy + Math.round(h * 0.7)}"
      stroke="${H.leafDark}" stroke-width="1" opacity="0.40"
      transform="rotate(${angle} ${cx} ${cy})"/>
  `;
}

/**
 * 박 덩굴 동적 생성 — 총 커밋 수에 비례하여 박 크기/개수 결정
 *
 * - 0~49:   박 2개 (r×1.0)
 * - 50~199: 박 3개 (r×1.2)
 * - 200~399: 박 4개 (r×1.5)
 * - 400+:   박 5개 (r×1.8)
 */
export function createHeungbuPumpkins(totalCommits: number): string {
  // 커밋 수 → 개수와 성장 배율
  const count = totalCommits >= 400 ? 5
    : totalCommits >= 200 ? 4
    : totalCommits >= 50  ? 3
    : 2;
  const growFactor = Math.min(1.0 + totalCommits / 600, 1.9);

  // 박 배치 (translate(100,150) 기준, y=0이 덩굴선)
  const allPositions: Array<{ x: number; baseSz: number }> = [
    { x: 52,  baseSz: 12 },  // 좌측
    { x: 680, baseSz: 10 },  // 우측
    { x: 200, baseSz: 11 },  // 좌중
    { x: 460, baseSz:  9 },  // 중앙
    { x: 820, baseSz:  9 },  // 우끝
  ];
  const positions = allPositions.slice(0, count);

  const VINE_Y = 68; // 덩굴선 Y

  // 덩굴 줄기
  const vines = positions.slice(0, -1).map((g, i) => {
    const nx = positions[i + 1].x;
    const droop = 10 + (i % 3) * 3;
    return `<path d="M${g.x},${VINE_Y} C${g.x+18},${VINE_Y-droop} ${nx-18},${VINE_Y-droop} ${nx},${VINE_Y}"
      stroke="${H.vineGreen}" stroke-width="3.5" fill="none" opacity="0.9"/>`;
  }).join('\n    ');

  // 잎
  const leafDefs = positions.slice(0, -1).map((g, i) => ({
    x: Math.round((g.x + positions[i + 1].x) / 2),
    angle: i % 2 === 0 ? -24 : 22,
    scale: 1.0 + (i % 3) * 0.15,
  }));
  const leaves = leafDefs.map(({ x, angle, scale }) =>
    gourdLeaf(x, VINE_Y - 4, angle, scale)
  ).join('');

  // 박 호리병
  const gourds = positions.map(({ x, baseSz }) => {
    const sz = Math.round(baseSz * growFactor);
    const cy = VINE_Y - Math.round(sz * 1.98);
    return gourdSVG(x, cy, sz);
  }).join('');

  return `
<g id="pumpkins" transform="translate(100, 150)">
  <!-- 덩굴 줄기 -->
  ${vines}
  <!-- 잎 -->
  ${leaves}
  <!-- 박(호리병) -->
  ${gourds}
</g>`.trim();
}

// ─── 전경 (그리드 위) ─────────────────────────────────────────────
export function createHeungbuForeground(config: SVGConfig): string {
  const { width } = config;
  return `
<g id="heungbu-foreground">
  <!-- 지붕 하단 처마선 -->
  <path d="M60,${ROOF_BOT_Y} Q500,${ROOF_BOT_Y - 50} 940,${ROOF_BOT_Y}"
    fill="none" stroke="#2a1400" stroke-width="3" opacity="0.25"/>
  <!-- 좌우 그림자 -->
  <rect x="0"          y="${ROOF_TOP_Y}" width="4" height="${ROOF_BOT_Y - ROOF_TOP_Y + 12}" fill="#2a1400" opacity="0.25"/>
  <rect x="${width-4}" y="${ROOF_TOP_Y}" width="4" height="${ROOF_BOT_Y - ROOF_TOP_Y + 12}" fill="#2a1400" opacity="0.25"/>
</g>`.trim();
}

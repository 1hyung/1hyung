// 흥부네 커밋 — 초가집 배경 (지붕=그리드, 박/덩굴=용마루 위)
// 레이아웃: 하늘(0~140) | 용마루+박(90~143) | 그리드=지붕(140~252) | 처마(252~292) | 집 본체(292~428) | 기단(428~448) | 지면(448~)

import { SVGConfig } from './types';
import { HEUNGBU_COLORS as H } from './heungbu-colors';

const GRID_Y      = 140;
const GRID_BOTTOM = 252;
const RIDGE_Y     = 122;
const RIDGE_H     = 20;
const EAVE_Y      = GRID_BOTTOM;
const EAVE_H      = 40;
const HOUSE_Y     = EAVE_Y + EAVE_H;   // 292
const HOUSE_H     = 136;
const FOUND_Y     = HOUSE_Y + HOUSE_H; // 428
const FOUND_H     = 20;
const GROUND_Y    = FOUND_Y + FOUND_H; // 448

export function createHeungbuFilters(): string {
  return `
    <filter id="heungbuGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="gourdShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="#3a1a00" flood-opacity="0.4"/>
    </filter>
  `;
}

// ─── 호리병 박 (전통 박 = 호리병형) ──────────────────────────────
// sz: 기준 크기 8~13 — RIDGE_Y 위 80px 이내에 완전히 들어옴
function calabashGourd(cx: number, cy: number, sz: number): string {
  const cxr = Math.round(cx);
  const cyr = Math.round(cy);
  const bRx = Math.round(sz);
  const bRy = Math.round(sz * 0.88);
  const bCy = Math.round(cy + sz * 0.55);
  const tRx = Math.round(sz * 0.55);
  const tRy = Math.round(sz * 0.52);
  const tCy = Math.round(cy - sz * 0.68);
  const neckW = Math.round(sz * 0.28);
  const neckY1 = tCy + tRy - 2;
  const neckH = Math.max(2, bCy - bRy + 2 - neckY1);

  return `
    <ellipse cx="${cxr}" cy="${bCy}" rx="${bRx}" ry="${bRy}"
      fill="${H.gourdMid}" filter="url(#gourdShadow)"/>
    <ellipse cx="${Math.round(cxr - bRx*0.28)}" cy="${Math.round(bCy - bRy*0.32)}"
      rx="${Math.round(bRx*0.4)}" ry="${Math.round(bRy*0.28)}"
      fill="${H.gourdLight}" opacity="0.72"/>
    <ellipse cx="${Math.round(cxr - bRx*0.14)}" cy="${Math.round(bCy - bRy*0.52)}"
      rx="${Math.round(bRx*0.2)}" ry="${Math.round(bRy*0.15)}"
      fill="${H.gourdHighlight}" opacity="0.6"/>
    <ellipse cx="${cxr}" cy="${tCy}" rx="${tRx}" ry="${tRy}"
      fill="${H.gourdMid}"/>
    <ellipse cx="${Math.round(cxr - tRx*0.3)}" cy="${Math.round(tCy - tRy*0.3)}"
      rx="${Math.round(tRx*0.42)}" ry="${Math.round(tRy*0.3)}"
      fill="${H.gourdLight}" opacity="0.7"/>
    <ellipse cx="${Math.round(cxr - tRx*0.15)}" cy="${Math.round(tCy - tRy*0.5)}"
      rx="${Math.round(tRx*0.22)}" ry="${Math.round(tRy*0.16)}"
      fill="${H.gourdHighlight}" opacity="0.6"/>
    <rect x="${cxr - neckW}" y="${neckY1}" width="${neckW*2}" height="${neckH}"
      fill="${H.gourdMid}"/>
    <rect x="${cxr - 2}" y="${tCy - tRy - 7}" width="4" height="9" rx="2"
      fill="${H.gourdStem}"/>
    <path d="M${cxr+2},${tCy-tRy-2} Q${cxr+7},${tCy-tRy-9} ${cxr+6},${tCy-tRy-16}"
      stroke="${H.gourdStem}" stroke-width="1.5" fill="none"/>
  `;
}

// ─── 잎 ──────────────────────────────────────────────────────────
function leafSVG(cx: number, cy: number, angle: number, scale: number): string {
  const w = Math.round(26 * scale);
  const h = Math.round(17 * scale);
  return `
    <ellipse cx="${Math.round(cx)}" cy="${Math.round(cy)}" rx="${w}" ry="${h}"
      fill="${H.leafMid}"
      transform="rotate(${angle} ${Math.round(cx)} ${Math.round(cy)})" opacity="0.93"/>
    <line x1="${Math.round(cx)}" y1="${Math.round(cy - h*0.7)}"
          x2="${Math.round(cx)}" y2="${Math.round(cy + h*0.7)}"
      stroke="${H.leafDark}" stroke-width="1" opacity="0.45"
      transform="rotate(${angle} ${Math.round(cx)} ${Math.round(cy)})"/>
  `;
}

// ─── 용마루 위 박 + 덩굴 ──────────────────────────────────────────
function buildRidge(width: number): string {
  const ridgeBaseY = RIDGE_Y + 2;
  // sz: 8~12 — 하늘 영역(0~85) 침범 안 하도록 조정
  // 박 cy = ridgeBaseY - sz*1.98 (cy 계산식 기반)
  // sz=12 → cy=97, gourd top ≈ y=74 (타이틀 y=55 아래에 위치) ✓
  const gourds: Array<{ x: number; sz: number }> = [
    { x: 52,        sz:  8 },
    { x: 150,       sz: 10 },
    { x: 255,       sz:  7 },
    { x: 350,       sz: 11 },
    { x: Math.round(width/2) - 35, sz: 12 },  // 중앙 최대
    { x: Math.round(width/2) + 55, sz: 11 },
    { x: 560,       sz:  8 },
    { x: 652,       sz: 10 },
    { x: 748,       sz:  7 },
    { x: 828,       sz:  9 },
  ];

  const gourdSVGs = gourds.map(g => {
    const cy = ridgeBaseY - Math.round(g.sz * 1.98);
    return calabashGourd(g.x, cy, g.sz);
  }).join('');

  const vines = gourds.slice(0, -1).map((g, i) => {
    const nx = gourds[i + 1].x;
    const vy = RIDGE_Y + 6;
    const droop = 10 + (i % 3) * 3;
    return `<path d="M${g.x},${vy} C${g.x+18},${vy-droop} ${nx-18},${vy-droop} ${nx},${vy}"
      stroke="${H.vineGreen}" stroke-width="3.5" fill="none" opacity="0.9"/>`;
  }).join('\n    ');

  const leafDefs = [
    { x: 100,  angle: -28, s: 1.1 }, { x: 204,  angle:  22, s: 1.3 },
    { x: 302,  angle: -30, s: 1.0 }, { x: 400,  angle:  18, s: 1.4 },
    { x: Math.round(width/2) + 8,  angle: -22, s: 1.2 },
    { x: 508,  angle:  26, s: 1.1 }, { x: 606,  angle: -20, s: 1.3 },
    { x: 700,  angle:  22, s: 1.0 }, { x: 790,  angle: -24, s: 1.1 },
  ];
  const leaves = leafDefs.map(({ x, angle, s }) =>
    leafSVG(x, RIDGE_Y - 4, angle, s)).join('');

  return `
    <!-- 덩굴 줄기 -->
    ${vines}
    <!-- 잎 -->
    ${leaves}
    <!-- 박(호리병) -->
    ${gourdSVGs}
  `;
}

// ─── 창호지 창문 ──────────────────────────────────────────────────
function windowSVG(wx: number, wy: number, ww: number, wh: number): string {
  const cols = 3; const rows = 4;
  const vLines = Array.from({ length: cols - 1 }, (_, i) => {
    const lx = Math.round(wx + (ww / cols) * (i + 1));
    return `<line x1="${lx}" y1="${wy+5}" x2="${lx}" y2="${wy+wh-5}"
      stroke="#7A5030" stroke-width="1.5" opacity="0.6"/>`;
  }).join('');
  const hLines = Array.from({ length: rows - 1 }, (_, j) => {
    const ly = Math.round(wy + (wh / rows) * (j + 1));
    return `<line x1="${wx+5}" y1="${ly}" x2="${wx+ww-5}" y2="${ly}"
      stroke="#7A5030" stroke-width="1" opacity="0.5"/>`;
  }).join('');
  return `
    <rect x="${wx-6}" y="${wy-4}" width="${ww+12}" height="${wh+8}" rx="2" fill="#5A3218"/>
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#EDD4A0" rx="1" opacity="0.94"/>
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="none" stroke="#5C3214" stroke-width="2" rx="1"/>
    ${vLines}${hLines}
  `;
}

// ─── 닭 스프라이트 ───────────────────────────────────────────────
function chickenSVG(cx: number, cy: number): string {
  const px = Math.round(cx); const py = Math.round(cy);
  return `
    <ellipse cx="${px}" cy="${py}" rx="14" ry="11" fill="${H.chickenBody}"/>
    <ellipse cx="${px-3}" cy="${py+1}" rx="9" ry="7" fill="${H.chickenDark}" opacity="0.45"/>
    <circle cx="${px+13}" cy="${py-8}" r="8" fill="${H.chickenBody}"/>
    <ellipse cx="${px+14}" cy="${py-17}" rx="4" ry="5" fill="${H.chickenComb}"/>
    <ellipse cx="${px+17}" cy="${py-15}" rx="3" ry="4" fill="${H.chickenComb}"/>
    <path d="M${px+20},${py-9} L${px+26},${py-7} L${px+20},${py-5}" fill="${H.chickenBeak}"/>
    <circle cx="${px+18}" cy="${py-9}" r="1.5" fill="#1a0800"/>
    <circle cx="${px+18.5}" cy="${py-9.5}" r="0.6" fill="white"/>
    <line x1="${px-4}" y1="${py+10}" x2="${px-6}" y2="${py+20}" stroke="${H.chickenLeg}" stroke-width="2.5"/>
    <line x1="${px+4}" y1="${py+10}" x2="${px+5}" y2="${py+20}" stroke="${H.chickenLeg}" stroke-width="2.5"/>
    <line x1="${px-6}" y1="${py+20}" x2="${px-12}" y2="${py+22}" stroke="${H.chickenLeg}" stroke-width="1.8"/>
    <line x1="${px-6}" y1="${py+20}" x2="${px-4}" y2="${py+23}" stroke="${H.chickenLeg}" stroke-width="1.8"/>
    <line x1="${px+5}" y1="${py+20}" x2="${px+11}" y2="${py+22}" stroke="${H.chickenLeg}" stroke-width="1.8"/>
    <line x1="${px+5}" y1="${py+20}" x2="${px+3}" y2="${py+23}" stroke="${H.chickenLeg}" stroke-width="1.8"/>
  `;
}

// ─── 대나무 통계 패널 ─────────────────────────────────────────────
function bambooPanel(cx: number, py: number, pw: number, ph: number): string {
  const px = Math.round(cx - pw / 2);
  const bw = 8;
  const jointCount = Math.floor(pw / 80);
  const topJoints = Array.from({ length: jointCount }, (_, i) => {
    const jx = px + Math.round((pw / (jointCount + 1)) * (i + 1));
    return `<circle cx="${jx}" cy="${py}" r="5" fill="${H.bambooJoint}"/>
      <circle cx="${jx}" cy="${py+ph}" r="5" fill="${H.bambooJoint}"/>`;
  }).join('');
  const sideJointCount = Math.floor(ph / 40);
  const sideJoints = Array.from({ length: sideJointCount }, (_, i) => {
    const jy = py + Math.round((ph / (sideJointCount + 1)) * (i + 1));
    return `<circle cx="${px}" cy="${jy}" r="5" fill="${H.bambooJoint}"/>
      <circle cx="${px+pw}" cy="${jy}" r="5" fill="${H.bambooJoint}"/>`;
  }).join('');
  return `
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}"
      rx="6" fill="${H.statsPanelColor}" opacity="0.88"/>
    <rect x="${px-bw/2}" y="${py-bw/2}" width="${pw+bw}" height="${bw}" rx="4" fill="${H.bambooGreen}"/>
    <rect x="${px-bw/2}" y="${py+ph-bw/2}" width="${pw+bw}" height="${bw}" rx="4" fill="${H.bambooGreen}"/>
    <rect x="${px-bw/2}" y="${py-bw/2}" width="${bw}" height="${ph+bw}" rx="4" fill="${H.bambooGreen}"/>
    <rect x="${px+pw-bw/2}" y="${py-bw/2}" width="${bw}" height="${ph+bw}" rx="4" fill="${H.bambooGreen}"/>
    ${topJoints}${sideJoints}
    <rect x="${px-bw/2+1}" y="${py-bw/2+1}" width="${pw+bw-2}" height="2"
      rx="1" fill="${H.bambooLight}" opacity="0.5"/>
  `;
}

export function createHeungbuBackground(config: SVGConfig): string {
  const { width, height } = config;
  const cx = Math.round(width / 2);

  const fringeLines = Array.from({ length: Math.ceil(width / 7) }, (_, i) => {
    const fx = i * 7 + 2;
    const fh = 14 + (i % 3) * 4 + (i % 7) * 2;
    const fo = (0.5 + (i % 4) * 0.1).toFixed(2);
    return `<line x1="${fx}" y1="${EAVE_Y+EAVE_H-4}" x2="${Math.round(fx+(i%3-1)*1.5)}" y2="${EAVE_Y+EAVE_H-4+fh}"
      stroke="${H.strawLight}" stroke-width="1.2" opacity="${fo}"/>`;
  }).join('');

  const pillarX = [28, 198, cx - 14, 604, 808];
  const pillars = pillarX.map(px2 => `
    <rect x="${px2}" y="${HOUSE_Y}" width="16" height="${HOUSE_H}" fill="#4A2810"/>
    <rect x="${px2}" y="${HOUSE_Y}" width="16" height="8" fill="#6A3E1E"/>
    <rect x="${px2}" y="${HOUSE_Y+HOUSE_H-7}" width="16" height="7" fill="#2E1608"/>
  `).join('');

  const winH = 90; const winY = HOUSE_Y + 28; const winW = 155;
  const leftWin  = windowSVG(50, winY, winW, winH);
  const rightWin = windowSVG(width - 50 - winW, winY, winW, winH);

  const panelH = 68; const panelW = 430; const panelY = 332;
  const panel = bambooPanel(cx, panelY, panelW, panelH);

  const doorX = cx - 82; const doorW = 164; const doorY = 400;
  const doorH = HOUSE_Y + HOUSE_H - doorY;

  const stones = Array.from({ length: Math.ceil(width / 58) }, (_, i) =>
    `<rect x="${i*58+1}" y="${FOUND_Y+2}" width="56" height="${FOUND_H-4}"
      rx="3" fill="#9A8A78" stroke="#5A4A3A" stroke-width="0.8" opacity="0.85"/>`
  ).join('');

  return `
<g id="heungbu-background">
  <defs>
    <linearGradient id="hSkyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${H.skyTop}"/>
      <stop offset="60%"  stop-color="${H.skyMid}"/>
      <stop offset="100%" stop-color="${H.skyBottom}"/>
    </linearGradient>
    <linearGradient id="hWallGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#BF9868"/>
      <stop offset="100%" stop-color="#8A6840"/>
    </linearGradient>
    <linearGradient id="hRoofGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#D4B060"/>
      <stop offset="100%" stop-color="#B89040"/>
    </linearGradient>
  </defs>

  <!-- ① 하늘 (0~140) -->
  <rect x="0" y="0" width="${width}" height="${GRID_Y}" fill="url(#hSkyGrad)"/>
  <g opacity="0.93">
    <ellipse cx="80" cy="40" rx="46" ry="18" fill="white"/>
    <ellipse cx="112" cy="28" rx="30" ry="13" fill="white"/>
    <ellipse cx="52" cy="42" rx="26" ry="11" fill="white"/>
    <ellipse cx="128" cy="40" rx="22" ry="10" fill="white"/>
  </g>
  <g opacity="0.88">
    <ellipse cx="762" cy="34" rx="50" ry="20" fill="white"/>
    <ellipse cx="798" cy="22" rx="34" ry="14" fill="white"/>
    <ellipse cx="730" cy="36" rx="28" ry="12" fill="white"/>
  </g>
  <g opacity="0.72">
    <ellipse cx="438" cy="18" rx="36" ry="13" fill="white"/>
    <ellipse cx="462" cy="8" rx="24" ry="9" fill="white"/>
  </g>
  <!-- 타이틀: 하늘 위쪽에 배치 (박 침범 안 하도록 y=36/56) -->
  <text x="${cx}" y="36"
    text-anchor="middle" font-family="monospace" font-size="11"
    fill="${H.textLight}" opacity="0.82">흥부네 커밋 · Heungbu's Commits</text>
  <text x="${cx}" y="60"
    text-anchor="middle" font-family="monospace" font-size="22" font-weight="bold"
    fill="${H.titleColor}">1hyung's Commits</text>

  <!-- ② 용마루 -->
  <rect x="0" y="${RIDGE_Y}" width="${width}" height="${RIDGE_H}"
    fill="url(#hRoofGrad)" rx="2"/>
  <rect x="0" y="${RIDGE_Y}" width="${width}" height="4"
    fill="${H.strawLight}" opacity="0.4"/>
  <rect x="0" y="${RIDGE_Y+RIDGE_H-3}" width="${width}" height="3"
    fill="#1e0e04" opacity="0.5"/>

  <!-- ③ 박(호리병) + 덩굴 -->
  ${buildRidge(width)}

  <!-- ④ 처마 -->
  <rect x="0" y="${EAVE_Y}" width="${width}" height="${EAVE_H}"
    fill="${H.strawMid}" opacity="0.97"/>
  <rect x="0" y="${EAVE_Y}" width="${width}" height="4"
    fill="${H.strawLight}" opacity="0.35"/>
  <rect x="0" y="${EAVE_Y+EAVE_H-6}" width="${width}" height="6"
    fill="#2a1808" opacity="0.45"/>
  ${fringeLines}

  <!-- ⑤ 집 본체 -->
  <rect x="0" y="${HOUSE_Y}" width="${width}" height="${HOUSE_H}" fill="url(#hWallGrad)"/>
  <rect x="0" y="${HOUSE_Y}" width="${width}" height="14" fill="#4A2810" opacity="0.95"/>
  <rect x="0" y="${HOUSE_Y}" width="${width}" height="4" fill="#6A4020" opacity="0.5"/>
  <rect x="0" y="${HOUSE_Y+HOUSE_H-10}" width="${width}" height="10" fill="#3A1C08" opacity="0.9"/>
  ${pillars}
  ${leftWin}
  ${rightWin}
  ${panel}
  <rect x="${doorX-8}" y="${doorY}" width="${doorW+16}" height="${doorH+6}" rx="2" fill="#3A1E0A"/>
  <rect x="${doorX}" y="${doorY+5}" width="${Math.round(doorW/2)-4}" height="${doorH-3}" rx="1" fill="#5A3018"/>
  <rect x="${doorX+Math.round(doorW/2)+4}" y="${doorY+5}" width="${Math.round(doorW/2)-4}" height="${doorH-3}" rx="1" fill="#5A3018"/>
  <circle cx="${doorX+Math.round(doorW/2)-8}" cy="${doorY+Math.round(doorH/2)+2}" r="5" fill="#C89040"/>
  <circle cx="${doorX+Math.round(doorW/2)+8}" cy="${doorY+Math.round(doorH/2)+2}" r="5" fill="#C89040"/>

  <!-- ⑥ 기단 -->
  <rect x="0" y="${FOUND_Y}" width="${width}" height="${FOUND_H}" fill="#7A6A58"/>
  ${stones}

  <!-- ⑦ 닭 -->
  ${chickenSVG(cx, FOUND_Y - 8)}

  <!-- ⑧ 지면 -->
  <rect x="0" y="${GROUND_Y}" width="${width}" height="${height-GROUND_Y}"
    fill="${H.groundGreen}"/>
  <rect x="0" y="${GROUND_Y}" width="${width}" height="8"
    fill="${H.groundEdge}" opacity="0.7"/>
</g>`.trim();
}

/** 그리드 위에 그리는 전경 */
export function createHeungbuForeground(config: SVGConfig): string {
  const { width } = config;
  return `
<g id="heungbu-foreground">
  <rect x="0" y="${GRID_BOTTOM-3}" width="${width}" height="5"
    fill="#1e0e04" opacity="0.28"/>
  <rect x="0" y="${GRID_Y}" width="4" height="${GRID_BOTTOM-GRID_Y+15}"
    fill="#2a1400" opacity="0.3"/>
  <rect x="${width-4}" y="${GRID_Y}" width="4" height="${GRID_BOTTOM-GRID_Y+15}"
    fill="#2a1400" opacity="0.3"/>
  <rect x="0" y="${GRID_Y-2}" width="${width}" height="3"
    fill="#C4983E" opacity="0.6"/>
</g>`.trim();
}

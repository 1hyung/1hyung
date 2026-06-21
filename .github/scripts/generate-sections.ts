// README 섹션 SVG 생성 스크립트 (농장 테마 + 흥부네 커밋 테마)

import * as fs from 'fs';
import * as path from 'path';
import { SUCCULENT_COLORS } from './succulent-colors';
import { HEUNGBU_COLORS } from './heungbu-colors';

const {
  bgGreen, bgDark, bgLight, borderBrown,
  titleColor, textDark, textLight,
  leafGreen, leafDark, leafLight, leafMid,
  trunkBrown, appleRed, sunYellow, sunOrange,
  grassMid, soilDark,
} = SUCCULENT_COLORS;

/** 헤더 장식용 사구아로 선인장 (cx=중심, baseY=밑동, s=배율) */
function headerCactus(cx: number, baseY: number, s: number): string {
  const { succDark, succBody, succLight, bloom, bloomLight } = SUCCULENT_COLORS;
  const w = Math.round(16 * s);
  const h = Math.round(96 * s);
  const x = cx - Math.round(w / 2);
  const top = baseY - h;
  const armY = top + Math.round(h * 0.4);
  return `<g opacity="0.92">
    <ellipse cx="${cx}" cy="${baseY + 3}" rx="${Math.round(w * 1.1)}" ry="${Math.round(5 * s)}" fill="${SUCCULENT_COLORS.soilDeep}" opacity="0.4"/>
    <rect x="${x}" y="${top}" width="${w}" height="${h}" rx="${Math.round(w / 2)}" fill="${succBody}"/>
    <rect x="${x}" y="${top}" width="${Math.round(w * 0.35)}" height="${h}" rx="${Math.round(w * 0.18)}" fill="${succLight}" opacity="0.8"/>
    <rect x="${x + w - Math.round(w * 0.3)}" y="${top}" width="${Math.round(w * 0.3)}" height="${h}" rx="${Math.round(w * 0.15)}" fill="${succDark}" opacity="0.8"/>
    <rect x="${x - Math.round(w * 0.9)}" y="${armY}" width="${Math.round(w * 0.7)}" height="${Math.round(28 * s)}" rx="${Math.round(w * 0.35)}" fill="${succBody}"/>
    <rect x="${x - Math.round(w * 0.9)}" y="${armY - Math.round(20 * s)}" width="${Math.round(w * 0.7)}" height="${Math.round(24 * s)}" rx="${Math.round(w * 0.35)}" fill="${succBody}"/>
    <rect x="${x + w + Math.round(w * 0.2)}" y="${armY + Math.round(10 * s)}" width="${Math.round(w * 0.7)}" height="${Math.round(26 * s)}" rx="${Math.round(w * 0.35)}" fill="${succBody}"/>
    <rect x="${x + w + Math.round(w * 0.2)}" y="${armY - Math.round(12 * s)}" width="${Math.round(w * 0.7)}" height="${Math.round(24 * s)}" rx="${Math.round(w * 0.35)}" fill="${succDark}"/>
    <circle cx="${cx - Math.round(2 * s)}" cy="${top - Math.round(3 * s)}" r="${Math.round(6 * s)}" fill="${bloom}"/>
    <circle cx="${cx - Math.round(2 * s)}" cy="${top - Math.round(3 * s)}" r="${Math.round(3 * s)}" fill="${bloomLight}"/>
  </g>`;
}

/**
 * 헤더 SVG 생성 (SUCCULENT GARDEN — 노을 사막 정원)
 */
function generateSucculentHeaderSVG(): string {
  const C = SUCCULENT_COLORS;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300">
  <defs>
    <linearGradient id="sgHeaderSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${C.skyTop}"/>
      <stop offset="52%" stop-color="${C.skyMid}"/>
      <stop offset="100%" stop-color="${C.skyLow}"/>
    </linearGradient>
    <radialGradient id="sgHeaderSun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${C.sunCore}"/>
      <stop offset="45%" stop-color="${C.sunHalo}"/>
      <stop offset="100%" stop-color="${C.skyLow}" stop-opacity="0"/>
    </radialGradient>
    <filter id="sgTextShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="${C.soilDeep}" flood-opacity="0.55"/>
    </filter>
  </defs>

  <!-- 노을 하늘 -->
  <rect x="0" y="0" width="1200" height="300" fill="url(#sgHeaderSky)"/>
  <!-- 저무는 해 -->
  <circle cx="600" cy="250" r="180" fill="url(#sgHeaderSun)"/>

  <!-- 메사 실루엣 -->
  <path d="M0,250 L0,210 L140,210 L160,190 L320,190 L320,250 Z" fill="${C.mesaFar}" opacity="0.85"/>
  <path d="M880,250 L880,196 L1040,196 L1060,176 L1200,176 L1200,250 Z" fill="${C.mesaFar}" opacity="0.85"/>
  <rect x="0" y="248" width="1200" height="52" fill="${C.soilBase}"/>
  <rect x="0" y="248" width="1200" height="3" fill="${C.soilEdge}" opacity="0.8"/>

  <!-- 좌우 사구아로 선인장 -->
  ${headerCactus(72, 250, 1.05)}
  ${headerCactus(1128, 250, 1.0)}

  <!-- 테두리 -->
  <rect x="0" y="0" width="1200" height="300" fill="none" stroke="${C.soilEdge}" stroke-width="3" opacity="0.7"/>

  <!-- 메인 타이틀 -->
  <text x="600" y="118" text-anchor="middle" font-family="'Arial Black', Arial, sans-serif" font-size="34" font-weight="bold" fill="${C.sgSubtitle}" filter="url(#sgTextShadow)" letter-spacing="2">
    1HYUNG'S
  </text>
  <text x="600" y="180" text-anchor="middle" font-family="'Arial Black', Arial, sans-serif" font-size="60" font-weight="bold" fill="${C.sgTitle}" filter="url(#sgTextShadow)" letter-spacing="3">
    SUCCULENT GARDEN
  </text>

  <!-- 서브타이틀 -->
  <text x="600" y="222" text-anchor="middle" font-family="monospace" font-size="16" fill="${C.sgSubtitle}" opacity="0.92">
    Where every commit takes root 🌵
  </text>
</svg>`;
}

/**
 * Experience 섹션 SVG 생성
 */
function generateExperienceSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 250" width="1200" height="250">
  <!-- 배경 -->
  <rect x="0" y="0" width="1200" height="250" fill="${bgGreen}"/>
  <rect x="0" y="0" width="1200" height="250" fill="none" stroke="${borderBrown}" stroke-width="2" opacity="0.6"/>

  <!-- 섹션 타이틀 -->
  <text x="600" y="42" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="${titleColor}">
    🏡 Experience 🏡
  </text>

  <!-- 회사 배지 -->
  <rect x="450" y="68" width="300" height="40" rx="8" fill="${bgDark}" opacity="0.8"/>
  <rect x="450" y="68" width="300" height="40" rx="8" fill="none" stroke="${borderBrown}" stroke-width="2" opacity="0.8"/>
  <text x="600" y="94" text-anchor="middle" font-family="'Arial Black', sans-serif" font-size="18" fill="${titleColor}">
    MOVV Corp
  </text>

  <!-- 커리어 패스 -->
  <g transform="translate(600, 140)">
    <!-- Backend Engineer -->
    <rect x="-280" y="0" width="180" height="30" rx="6" fill="${bgDark}" stroke="${sunYellow}" stroke-width="2" opacity="0.9"/>
    <text x="-190" y="20" text-anchor="middle" font-family="monospace" font-size="13" fill="${sunYellow}">Backend Engineer</text>

    <!-- Arrow -->
    <text x="-90" y="20" text-anchor="middle" font-family="monospace" font-size="16" fill="${titleColor}">→</text>

    <!-- QA Engineer -->
    <rect x="-60" y="0" width="140" height="30" rx="6" fill="${bgDark}" stroke="${leafLight}" stroke-width="2" opacity="0.9"/>
    <text x="10" y="20" text-anchor="middle" font-family="monospace" font-size="13" fill="${leafLight}">QA Engineer</text>

    <!-- Arrow -->
    <text x="90" y="20" text-anchor="middle" font-family="monospace" font-size="16" fill="${titleColor}">→</text>

    <!-- Prompt Engineer -->
    <rect x="120" y="0" width="160" height="30" rx="6" fill="${bgDark}" stroke="#b678c4" stroke-width="2" opacity="0.9"/>
    <text x="200" y="20" text-anchor="middle" font-family="monospace" font-size="13" fill="#b678c4">Prompt Engineer</text>
  </g>

  <!-- 기간 -->
  <text x="600" y="210" text-anchor="middle" font-family="monospace" font-size="14" fill="${titleColor}" opacity="0.8">
    2025.06 ~ Present
  </text>
</svg>`;
}

/**
 * Tech Stack 섹션 SVG 생성
 */
function generateTechStackSVG(): string {
  const badges = [
    { category: 'Backend', items: ['Kotlin', 'Spring Boot', 'MySQL', 'Kafka', 'gRPC'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes'] },
    { category: 'Tools', items: ['IntelliJ IDEA', 'Jira', 'Confluence', 'Slack', 'Notion'] },
    { category: 'AI & Prompt', items: ['Claude', 'Prompt Engineering'] }
  ];

  let yOffset = 60;
  let badgesSVG = '';

  badges.forEach(({ category, items }) => {
    badgesSVG += `
    <text x="600" y="${yOffset}" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="${textLight}">
      ${category}
    </text>`;

    yOffset += 30;

    const totalWidth = items.length * 120;
    const startX = 600 - totalWidth / 2;

    items.forEach((item, index) => {
      const x = startX + index * 120;
      badgesSVG += `
      <rect x="${x}" y="${yOffset}" width="110" height="25" rx="4" fill="${bgDark}" opacity="0.85"/>
      <rect x="${x}" y="${yOffset}" width="110" height="25" rx="4" fill="none" stroke="${borderBrown}" stroke-width="1" opacity="0.6"/>
      <text x="${x + 55}" y="${yOffset + 17}" text-anchor="middle" font-family="monospace" font-size="11" fill="${titleColor}">
        ${item}
      </text>`;
    });

    yOffset += 45;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${yOffset + 20}" width="1200" height="${yOffset + 20}">
  <!-- 배경 -->
  <rect x="0" y="0" width="1200" height="${yOffset + 20}" fill="${bgGreen}"/>
  <rect x="0" y="0" width="1200" height="${yOffset + 20}" fill="none" stroke="${borderBrown}" stroke-width="2" opacity="0.6"/>

  <!-- 섹션 타이틀 -->
  <text x="600" y="35" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="${titleColor}">
    🌾 Tech Stack 🌾
  </text>

  ${badgesSVG}
</svg>`;
}

/**
 * Social 섹션 SVG 생성
 */
function generateSocialSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" width="1200" height="150">
  <!-- 배경 -->
  <rect x="0" y="0" width="1200" height="150" fill="${bgGreen}"/>
  <rect x="0" y="0" width="1200" height="150" fill="none" stroke="${borderBrown}" stroke-width="2" opacity="0.6"/>

  <!-- 섹션 타이틀 -->
  <text x="600" y="40" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="${titleColor}">
    🌱 Social 🌱
  </text>

  <!-- Velog 배지 -->
  <a href="https://velog.io/@1hyung/posts/">
    <rect x="500" y="68" width="200" height="40" rx="8" fill="${bgDark}" opacity="0.85">
      <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="500" y="68" width="200" height="40" rx="8" fill="none" stroke="${borderBrown}" stroke-width="2" opacity="0.8"/>
    <text x="600" y="93" text-anchor="middle" font-family="'Arial Black', sans-serif" font-size="16" fill="${titleColor}">
      📝 Velog
    </text>
  </a>
</svg>`;
}

/**
 * Section Divider SVG 생성
 */
function generateDividerSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 30" width="1200" height="30">
  <!-- 배경 -->
  <rect x="0" y="0" width="1200" height="30" fill="${bgGreen}"/>

  <!-- 물결 잔디 라인 -->
  <path d="M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
        stroke="${leafLight}"
        stroke-width="2"
        fill="none"
        opacity="0.7">
    <animate attributeName="d"
             values="M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
                     M 0,15 Q 100,22 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
                     M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
             dur="4s"
             repeatCount="indefinite"/>
  </path>

  <!-- 잎 장식점 -->
  <g fill="${leafGreen}" opacity="0.6">
    <circle cx="150" cy="15" r="3"/>
    <circle cx="350" cy="15" r="2"/>
    <circle cx="600" cy="15" r="3"/>
    <circle cx="850" cy="15" r="2"/>
    <circle cx="1050" cy="15" r="3"/>
  </g>
</svg>`;
}

// ─── 흥부네 커밋 테마 SVG 생성 ────────────────────────────────────

const {
  skyTop, skyMid, skyBottom,
  hillFar, hillMid, hillNear, groundGreen,
  leafLight: hLeafLight, leafMid: hLeafMid, leafDark: hLeafDark,
  vineGreen,
  gourdHighlight, gourdLight, gourdMid: hGourdMid, gourdDark: hGourdDark,
  strawLight, strawMid, strawDark: hStrawDark,
  titleColor: hTitleColor, textLight: hTextLight,
  statsPanelColor,
} = HEUNGBU_COLORS;

/**
 * 흥부네 커밋 헤더 SVG (1200×420)
 * 나무 간판 + 갓 캐릭터(1.3×) + 초가집(대형) + 산 배경
 */
function generateHeungbuHeaderSVG(): string {
  const W = 1200, H = 420;
  const GRASS_Y = 298;
  // 간판 위치 (sy=108로 내려 캐릭터 공간 확보)
  const sx = 370, sy = 108, sw = 460, sh = 185;
  const scx = sx + Math.round(sw / 2); // 600

  // 색동 테두리 (6색 × 2px = 12px 폭 — 얇게)
  const rainbow = ['#E82020','#F07020','#E8C018','#38A028','#2070D0','#7828C0'];
  const bs = 2;
  const nb = rainbow.length; // 6
  const borderH = nb * bs; // 12px
  const rbTop    = rainbow.map((c, i) =>
    `<rect x="${sx}" y="${sy+i*bs}" width="${sw}" height="${bs}" fill="${c}"/>`).join('');
  const rbBottom = rainbow.map((c, i) =>
    `<rect x="${sx}" y="${sy+sh-borderH+i*bs}" width="${sw}" height="${bs}" fill="${c}"/>`).join('');
  const rbLeft   = rainbow.map((c, i) =>
    `<rect x="${sx+i*bs}" y="${sy+borderH}" width="${bs}" height="${sh-borderH*2}" fill="${c}"/>`).join('');
  const rbRight  = rainbow.map((c, i) =>
    `<rect x="${sx+sw-borderH+i*bs}" y="${sy+borderH}" width="${bs}" height="${sh-borderH*2}" fill="${c}"/>`).join('');

  // 나뭇결 선
  const grainLines = Array.from({ length: 9 }, (_, i) => {
    const gy = sy + borderH + 8 + i * 18;
    const c2 = (i % 2 === 0) ? 6 : -6;
    return `<path d="M${sx+borderH+8},${gy} Q${scx},${gy+c2} ${sx+sw-borderH-8},${gy}"
      stroke="#5A2808" stroke-width="1.2" fill="none" opacity="0.25"/>`;
  }).join('');

  // 소나무 헬퍼 (3단 레이어)
  const pine = (pcx: number, pcy: number, ph: number) => {
    const pw = ph * 0.42;
    return `
      <polygon points="${pcx},${pcy} ${pcx-pw*0.68},${pcy+ph*0.38} ${pcx+pw*0.68},${pcy+ph*0.38}" fill="#1A3810"/>
      <polygon points="${pcx},${pcy+ph*0.14} ${pcx-pw*0.82},${pcy+ph*0.57} ${pcx+pw*0.82},${pcy+ph*0.57}" fill="#22481A"/>
      <polygon points="${pcx},${pcy+ph*0.32} ${pcx-pw},${pcy+ph*0.80} ${pcx+pw},${pcy+ph*0.80}" fill="#2C5E22"/>
      <rect x="${pcx-6}" y="${pcy+ph*0.74}" width="12" height="${ph*0.30}" rx="2" fill="#3A2008"/>`;
  };

  // 돔형 초가집 (대형 — rx 152, ry 108)
  const domeHouse = (hcx: number, baseY: number) => {
    const rx = 152, ry = 108;
    const bx = hcx - Math.round(rx * 0.70);
    const bw = Math.round(rx * 1.40);
    const bodyH = 82;
    const thatch = [10,22,34,46,58,72,86].map(di => {
      const hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (di / ry) * (di / ry))));
      const ty = baseY - di;
      const op = (0.10 + di * 0.004).toFixed(2);
      return `<line x1="${hcx-hw}" y1="${ty}" x2="${hcx+hw}" y2="${ty}" stroke="#F8D840" stroke-width="2" opacity="${op}"/>`;
    }).join('');
    const domePath = `M${hcx-rx},${baseY} A${rx},${ry} 0 0 1 ${hcx+rx},${baseY}`;
    return `
      <path d="${domePath}" fill="#C89020"/>
      <path d="${domePath}" fill="#D4A030" opacity="0.6"/>
      ${thatch}
      <path d="M${hcx-rx*0.74},${baseY-ry*0.40} A${rx*0.82},${ry*0.62} 0 0 1 ${hcx+rx*0.74},${baseY-ry*0.40}"
        fill="none" stroke="#F8E060" stroke-width="2.5" opacity="0.28"/>
      <circle cx="${hcx-rx*0.60}" cy="${baseY-ry*0.36}" r="6" fill="#FFF060" opacity="0.82"/>
      <circle cx="${hcx}"         cy="${baseY-ry+8}"     r="6" fill="#FFF060" opacity="0.82"/>
      <circle cx="${hcx+rx*0.60}" cy="${baseY-ry*0.36}" r="6" fill="#FFF060" opacity="0.82"/>
      <rect x="${bx}" y="${baseY}" width="${bw}" height="${bodyH}" fill="#7A5030" rx="2"/>
      <rect x="${bx}" y="${baseY}" width="${bw}" height="3" fill="#5A3818" opacity="0.55"/>
      <line x1="${bx}" y1="${baseY+22}" x2="${bx+bw}" y2="${baseY+22}" stroke="#5A3818" stroke-width="1.5" opacity="0.35"/>
      <rect x="${hcx-16}" y="${baseY+18}" width="32" height="${bodyH-10}" rx="2" fill="#3C2008"/>
      <rect x="${hcx+28}" y="${baseY+14}" width="36" height="28" rx="2" fill="#EED898" opacity="0.88"/>
      <line x1="${hcx+46}" y1="${baseY+14}" x2="${hcx+46}" y2="${baseY+42}" stroke="#6A4020" stroke-width="2"/>
      <line x1="${hcx+28}" y1="${baseY+28}" x2="${hcx+64}" y2="${baseY+28}" stroke="#6A4020" stroke-width="2"/>
      <rect x="${hcx-64}" y="${baseY+14}" width="36" height="28" rx="2" fill="#EED898" opacity="0.88"/>
      <line x1="${hcx-46}" y1="${baseY+14}" x2="${hcx-46}" y2="${baseY+42}" stroke="#6A4020" stroke-width="2"/>
      <line x1="${hcx-64}" y1="${baseY+28}" x2="${hcx-28}" y2="${baseY+28}" stroke="#6A4020" stroke-width="2"/>
      <rect x="${hcx-7}" y="${baseY+bodyH-25}" width="14" height="5" rx="1" fill="#8A6040" opacity="0.7"/>`;
  };

  // 삼각형 산 + 설원
  const mountainSVG = (() => {
    const peaks = [
      { cx: 170, py: 48, hw: 245, snowHw: 62 },
      { cx: 600, py: 30, hw: 300, snowHw: 75 },
      { cx: 1030, py: 52, hw: 255, snowHw: 65 },
    ];
    return peaks.map(({ cx, py, hw, snowHw }) => {
      const snowBase = py + 100;
      return `
        <polygon points="${cx},${py} ${cx-hw},${GRASS_Y} ${cx+hw},${GRASS_Y}" fill="#6878A0" opacity="0.70"/>
        <polygon points="${cx},${py} ${cx-hw*0.12},${py+28} ${cx+hw*0.12},${py+28}" fill="#FFFFFF" opacity="0.30"/>
        <polygon points="${cx},${py} ${cx-snowHw},${snowBase} ${cx+snowHw},${snowBase}" fill="#EEF4FF" opacity="0.82"/>`;
    }).join('');
  })();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="hSkG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#6AB8E0"/>
      <stop offset="55%"  stop-color="#9CD0EC"/>
      <stop offset="100%" stop-color="#C2E4F8"/>
    </linearGradient>
    <linearGradient id="signG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#B06838"/>
      <stop offset="100%" stop-color="#7A4820"/>
    </linearGradient>
    <linearGradient id="grassG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#62CA28"/>
      <stop offset="100%" stop-color="#48A018"/>
    </linearGradient>
    <filter id="signSh">
      <feDropShadow dx="6" dy="8" stdDeviation="7" flood-color="#1a0800" flood-opacity="0.50"/>
    </filter>
    <filter id="textGl">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#3a1800" flood-opacity="0.75"/>
    </filter>
    <filter id="charSh">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#1a0800" flood-opacity="0.40"/>
    </filter>
  </defs>

  <!-- 하늘 -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#hSkG)"/>

  <!-- 배경 산 (삼각형 + 설원) -->
  ${mountainSVG}

  <!-- 중경 언덕 (짙은 녹색 타원) -->
  <ellipse cx="-20"  cy="325" rx="290" ry="140" fill="#2E5A22"/>
  <ellipse cx="320"  cy="326" rx="295" ry="138" fill="#325E24"/>
  <ellipse cx="660"  cy="322" rx="285" ry="136" fill="#2E5A22"/>
  <ellipse cx="1050" cy="325" rx="280" ry="140" fill="#325E24"/>

  <!-- 밝은 잔디 -->
  <rect x="0" y="${GRASS_Y}" width="${W}" height="${H-GRASS_Y}" fill="url(#grassG)"/>
  <rect x="0" y="${GRASS_Y}" width="${W}" height="10" fill="#72DA38" opacity="0.75"/>
  <rect x="0" y="${GRASS_Y+10}" width="${W}" height="6" fill="#5AC028" opacity="0.5"/>

  <!-- 구름 좌 -->
  <g opacity="0.94">
    <ellipse cx="148" cy="55" rx="58" ry="24" fill="white"/>
    <ellipse cx="182" cy="42" rx="40" ry="18" fill="white"/>
    <ellipse cx="118" cy="60" rx="34" ry="15" fill="white"/>
    <ellipse cx="200" cy="56" rx="25" ry="12" fill="white"/>
  </g>
  <!-- 구름 우 -->
  <g opacity="0.90">
    <ellipse cx="1052" cy="48" rx="62" ry="26" fill="white"/>
    <ellipse cx="1090" cy="36" rx="44" ry="19" fill="white"/>
    <ellipse cx="1020" cy="53" rx="36" ry="16" fill="white"/>
    <ellipse cx="1112" cy="52" rx="28" ry="13" fill="white"/>
  </g>

  <!-- 소나무 좌 (3그루) -->
  ${pine(82,  138, 168)}
  ${pine(140, 155, 148)}
  ${pine(194, 170, 126)}

  <!-- 소나무 우 (3그루) -->
  ${pine(1006, 152, 154)}
  ${pine(1060, 140, 164)}
  ${pine(1118, 165, 130)}

  <!-- 초가집 좌 -->
  ${domeHouse(210, GRASS_Y)}

  <!-- 초가집 우 -->
  ${domeHouse(990, GRASS_Y)}

  <!-- 간판 받침대 -->
  <path d="M${sx+52},${sy+sh} L${sx+40},${H-10}" stroke="#5A3410" stroke-width="22" stroke-linecap="round"/>
  <path d="M${sx+sw-52},${sy+sh} L${sx+sw-40},${H-10}" stroke="#5A3410" stroke-width="22" stroke-linecap="round"/>
  <path d="M${sx+52},${sy+sh} L${sx+40},${H-10}" stroke="#8A5828" stroke-width="6" stroke-linecap="round" opacity="0.40"/>
  <path d="M${sx+sw-52},${sy+sh} L${sx+sw-40},${H-10}" stroke="#8A5828" stroke-width="6" stroke-linecap="round" opacity="0.40"/>
  <rect x="${sx+28}" y="${sy+sh+74}" width="${sw-56}" height="18" rx="6" fill="#4E3010"/>
  <rect x="${sx+28}" y="${sy+sh+74}" width="${sw-56}" height="6" rx="4" fill="#7A5020" opacity="0.45"/>

  <!-- 간판 보드 -->
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10"
    fill="url(#signG)" filter="url(#signSh)"/>
  ${grainLines}
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10"
    fill="none" stroke="#2E1408" stroke-width="3.5" opacity="0.35"/>

  <!-- 색동 테두리 (얇게 12px) -->
  ${rbTop}${rbBottom}${rbLeft}${rbRight}

  <!-- 갓 쓴 캐릭터 (1.3× 크기) -->
  <g filter="url(#charSh)">
  <!-- 갓 크라운 -->
  <rect x="${scx-31}" y="${sy-101}" width="62" height="72" rx="8" fill="#141414"/>
  <ellipse cx="${scx}" cy="${sy-101}" rx="34" ry="13" fill="#141414"/>
  <rect x="${scx-29}" y="${sy-99}" width="12" height="67" rx="3" fill="#2A2A2A" opacity="0.60"/>
  <!-- 갓 챙 -->
  <ellipse cx="${scx}" cy="${sy-30}" rx="81" ry="20" fill="#141414"/>
  <ellipse cx="${scx}" cy="${sy-33}" rx="83" ry="16" fill="none" stroke="#282828" stroke-width="2.5"/>
  <!-- 갓끈 -->
  <path d="M${scx-65},${sy-23} Q${scx-47},${sy-5} ${scx-34},${sy+8}"
    stroke="#C89018" stroke-width="3.5" fill="none"/>
  <path d="M${scx+65},${sy-23} Q${scx+47},${sy-5} ${scx+34},${sy+8}"
    stroke="#C89018" stroke-width="3.5" fill="none"/>
  <!-- 얼굴 -->
  <circle cx="${scx}" cy="${sy-13}" r="47" fill="#F6CA9A"/>
  <circle cx="${scx}" cy="${sy-13}" r="47" fill="none" stroke="#D8A870" stroke-width="1.5" opacity="0.4"/>
  <!-- 눈썹 -->
  <path d="M${scx-23},${sy-28} Q${scx-16},${sy-34} ${scx-8},${sy-28}"
    stroke="#381808" stroke-width="2.8" fill="none"/>
  <path d="M${scx+8},${sy-28} Q${scx+16},${sy-34} ${scx+23},${sy-28}"
    stroke="#381808" stroke-width="2.8" fill="none"/>
  <!-- 눈 -->
  <circle cx="${scx-16}" cy="${sy-21}" r="7" fill="#241008"/>
  <circle cx="${scx+16}" cy="${sy-21}" r="7" fill="#241008"/>
  <circle cx="${scx-13}" cy="${sy-24}" r="2.5" fill="white"/>
  <circle cx="${scx+19}" cy="${sy-24}" r="2.5" fill="white"/>
  <!-- 코 -->
  <ellipse cx="${scx}" cy="${sy-8}" rx="6" ry="4.5" fill="#D4986A"/>
  <!-- 입 -->
  <path d="M${scx-16},${sy+1} Q${scx},${sy+13} ${scx+16},${sy+1}"
    stroke="#904830" stroke-width="3" fill="none"/>
  <!-- 볼 홍조 -->
  <ellipse cx="${scx-39}" cy="${sy-10}" rx="12" ry="8" fill="#F8A0A0" opacity="0.50"/>
  <ellipse cx="${scx+39}" cy="${sy-10}" rx="12" ry="8" fill="#F8A0A0" opacity="0.50"/>
  </g>

  <!-- 간판 텍스트 -->
  <text x="${scx}" y="${sy + Math.round(sh*0.40)}"
    text-anchor="middle" font-family="monospace" font-size="16"
    fill="#F8E8B8" opacity="0.88" letter-spacing="1">흥부네 커밋 · Heungbu's Commits</text>
  <text x="${scx}" y="${sy + Math.round(sh*0.72)}"
    text-anchor="middle"
    font-family="'Arial Black','Arial Bold',Arial,sans-serif"
    font-size="48" font-weight="bold"
    fill="#FFD838"
    filter="url(#textGl)">1HYUNG'S COMMITS</text>

  <!-- 하단 장식 닷 3개 -->
  <circle cx="${scx-28}" cy="${sy+Math.round(sh*0.90)}" r="9" fill="none" stroke="#C8A030" stroke-width="3"/>
  <circle cx="${scx}"    cy="${sy+Math.round(sh*0.90)}" r="9" fill="#4A7A28"/>
  <circle cx="${scx+28}" cy="${sy+Math.round(sh*0.90)}" r="9" fill="#284820"/>
</svg>`;
}

/**
 * 흥부네 커밋 섹션 구분선 SVG (1200×30)
 * 덩굴 물결선 + 박 장식
 */
function generateHeungbuDividerSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 30" width="1200" height="30">
  <!-- 배경 -->
  <rect x="0" y="0" width="1200" height="30" fill="${groundGreen}"/>

  <!-- 덩굴 물결선 -->
  <path d="M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
        stroke="${hLeafMid}"
        stroke-width="2"
        fill="none"
        opacity="0.8">
    <animate attributeName="d"
             values="M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
                     M 0,15 Q 100,22 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
                     M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
             dur="4s"
             repeatCount="indefinite"/>
  </path>

  <!-- 잎 장식 -->
  <g fill="${hLeafMid}" opacity="0.65">
    <ellipse cx="180" cy="15" rx="5" ry="3"/>
    <ellipse cx="420" cy="15" rx="4" ry="2.5"/>
    <ellipse cx="660" cy="15" rx="5" ry="3"/>
    <ellipse cx="900" cy="15" rx="4" ry="2.5"/>
  </g>

  <!-- 박 장식점 -->
  <g fill="${gourdLight}" opacity="0.80">
    <ellipse cx="300"  cy="15" rx="5" ry="3.5"/>
    <ellipse cx="540"  cy="15" rx="6" ry="4"/>
    <ellipse cx="780"  cy="15" rx="5" ry="3.5"/>
    <ellipse cx="1020" cy="15" rx="6" ry="4"/>
  </g>
</svg>`;
}

/**
 * 메인 실행 함수
 */
async function main(): Promise<void> {
  const assetsDir = path.join(__dirname, '../../assets');

  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('Generating section SVGs...');

  const files = [
    { name: 'succulent-header.svg',              content: generateSucculentHeaderSVG() },
    { name: 'experience-section.svg',        content: generateExperienceSVG() },
    { name: 'tech-stack-section.svg',        content: generateTechStackSVG() },
    { name: 'social-section.svg',            content: generateSocialSVG() },
    { name: 'section-divider.svg',           content: generateDividerSVG() },
    { name: 'heungbu-header.svg',            content: generateHeungbuHeaderSVG() },
    { name: 'section-divider-heungbu.svg',   content: generateHeungbuDividerSVG() },
  ];

  files.forEach(({ name, content }) => {
    const filePath = path.join(assetsDir, name);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Generated: ${name}`);
  });

  console.log('All section SVGs generated successfully!');
}

main().catch(error => {
  console.error('Error generating sections:', error);
  process.exit(1);
});

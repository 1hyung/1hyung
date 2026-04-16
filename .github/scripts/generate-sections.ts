// README 섹션 SVG 생성 스크립트 (농장 테마 + 흥부네 커밋 테마)

import * as fs from 'fs';
import * as path from 'path';
import { FARM_COLORS } from './farm-colors';
import { HEUNGBU_COLORS } from './heungbu-colors';

const {
  bgGreen, bgDark, bgLight, borderBrown,
  titleColor, textDark, textLight,
  leafGreen, leafDark, leafLight, leafMid,
  trunkBrown, appleRed, sunYellow, sunOrange,
  grassMid, soilDark,
} = FARM_COLORS;

/**
 * 헤더 SVG 생성 (GIT FARM)
 */
function generateHeaderSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300">
  <defs>
    <!-- 제목 텍스트 그라디언트 -->
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${sunYellow}"/>
      <stop offset="50%" style="stop-color:#fffde0"/>
      <stop offset="100%" style="stop-color:${sunYellow}"/>
    </linearGradient>

    <!-- 텍스트 그림자 -->
    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="${bgDark}" flood-opacity="0.6"/>
    </filter>

    <!-- 잔디 텍스처 -->
    <filter id="grassNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0.3"/>
      <feBlend in="SourceGraphic" in2="noise" mode="overlay" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>

  <!-- 메인 잔디 배경 -->
  <rect x="0" y="0" width="1200" height="300" fill="${bgGreen}"/>
  <rect x="0" y="0" width="1200" height="300" fill="${bgLight}" opacity="0.12" filter="url(#grassNoise)"/>

  <!-- 테두리 -->
  <rect x="0" y="0" width="1200" height="300" fill="none" stroke="${borderBrown}" stroke-width="4" opacity="0.8"/>
  <rect x="3" y="3" width="1194" height="294" fill="none" stroke="${bgLight}" stroke-width="1" opacity="0.3"/>

  <!-- 좌측 나무 장식 -->
  <g opacity="0.7">
    <!-- 나무 줄기 -->
    <rect x="58" y="190" width="8" height="60" fill="${trunkBrown}"/>
    <!-- 캐노피 -->
    <ellipse cx="62" cy="160" rx="40" ry="35" fill="${leafDark}"/>
    <ellipse cx="62" cy="155" rx="35" ry="30" fill="${leafGreen}"/>
    <ellipse cx="55" cy="148" rx="22" ry="18" fill="${leafLight}"/>
    <!-- 사과 -->
    <circle cx="75" cy="165" r="5" fill="${appleRed}"/>
    <circle cx="52" cy="170" r="4" fill="${appleRed}"/>
  </g>

  <!-- 우측 나무 장식 -->
  <g opacity="0.7">
    <rect x="1134" y="190" width="8" height="60" fill="${trunkBrown}"/>
    <ellipse cx="1138" cy="160" rx="40" ry="35" fill="${leafDark}"/>
    <ellipse cx="1138" cy="155" rx="35" ry="30" fill="${leafGreen}"/>
    <ellipse cx="1131" cy="148" rx="22" ry="18" fill="${leafLight}"/>
    <circle cx="1151" cy="165" r="5" fill="${appleRed}"/>
    <circle cx="1128" cy="170" r="4" fill="${appleRed}"/>
  </g>

  <!-- 메인 타이틀 -->
  <text x="600" y="125" text-anchor="middle" font-family="'Arial Black', Arial, sans-serif" font-size="40" font-weight="bold" fill="url(#textGradient)" filter="url(#textShadow)">
    WELCOME TO 1HYUNG'S
  </text>
  <text x="600" y="185" text-anchor="middle" font-family="'Arial Black', Arial, sans-serif" font-size="58" font-weight="bold" fill="url(#textGradient)" filter="url(#textShadow)">
    GIT FARM
  </text>

  <!-- 서브타이틀 -->
  <text x="600" y="230" text-anchor="middle" font-family="monospace" font-size="16" fill="${titleColor}" opacity="0.9">
    Where commits grow into trees 🌱
  </text>

  <!-- 떠다니는 잎 파티클 -->
  <g fill="${leafLight}" opacity="0.8">
    <ellipse cx="200" cy="250" rx="6" ry="3">
      <animate attributeName="cx" values="200;210;200" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="250;220;250" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="380" cy="270" rx="4" ry="2">
      <animate attributeName="cx" values="380;395;380" dur="3.5s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="270;235;270" dur="3.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0;0.8" dur="3.5s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="820" cy="260" rx="5" ry="2.5">
      <animate attributeName="cx" values="820;835;820" dur="3.8s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="260;225;260" dur="3.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0;0.8" dur="3.8s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="1000" cy="255" rx="4" ry="2">
      <animate attributeName="cx" values="1000;1012;1000" dur="4.2s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="255;220;255" dur="4.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0;0.8" dur="4.2s" repeatCount="indefinite"/>
    </ellipse>
  </g>

  <!-- 하단 잔디 라인 -->
  <rect x="0" y="292" width="1200" height="8" fill="${leafGreen}" opacity="0.6">
    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
  </rect>
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
 * 나무 간판 + 갓 캐릭터 + 초가집 + 산 배경
 */
function generateHeungbuHeaderSVG(): string {
  const W = 1200, H = 420;
  const GRASS_Y = 298;
  // 간판 위치
  const sx = 370, sy = 80, sw = 460, sh = 210;
  const scx = sx + Math.round(sw / 2); // 600

  // 무지개 색동 테두리 (6색 × 4px = 24px 폭)
  const rainbow = ['#E82020','#F07020','#E8C018','#38A028','#2070D0','#7828C0'];
  const bs = 4;
  const nb = rainbow.length; // 6
  const borderH = nb * bs; // 24px
  const rbTop    = rainbow.map((c, i) =>
    `<rect x="${sx}" y="${sy+i*bs}" width="${sw}" height="${bs}" fill="${c}"/>`).join('');
  const rbBottom = rainbow.map((c, i) =>
    `<rect x="${sx}" y="${sy+sh-borderH+i*bs}" width="${sw}" height="${bs}" fill="${c}"/>`).join('');
  const rbLeft   = rainbow.map((c, i) =>
    `<rect x="${sx+i*bs}" y="${sy+borderH}" width="${bs}" height="${sh-borderH*2}" fill="${c}"/>`).join('');
  const rbRight  = rainbow.map((c, i) =>
    `<rect x="${sx+sw-borderH+i*bs}" y="${sy+borderH}" width="${bs}" height="${sh-borderH*2}" fill="${c}"/>`).join('');

  // 나뭇결 선
  const grainLines = Array.from({ length: 10 }, (_, i) => {
    const gy = sy + borderH + 8 + i * 18;
    const c2 = (i % 2 === 0) ? 6 : -6;
    return `<path d="M${sx+borderH+8},${gy} Q${scx},${gy+c2} ${sx+sw-borderH-8},${gy}"
      stroke="#5A2808" stroke-width="1.2" fill="none" opacity="0.25"/>`;
  }).join('');

  // 소나무 헬퍼 (3단 레이어로 풍성하게)
  const pine = (pcx: number, pcy: number, ph: number) => {
    const pw = ph * 0.42;
    return `
      <polygon points="${pcx},${pcy} ${pcx-pw*0.68},${pcy+ph*0.38} ${pcx+pw*0.68},${pcy+ph*0.38}" fill="#1A3810"/>
      <polygon points="${pcx},${pcy+ph*0.14} ${pcx-pw*0.82},${pcy+ph*0.57} ${pcx+pw*0.82},${pcy+ph*0.57}" fill="#22481A"/>
      <polygon points="${pcx},${pcy+ph*0.32} ${pcx-pw},${pcy+ph*0.80} ${pcx+pw},${pcy+ph*0.80}" fill="#2C5E22"/>
      <rect x="${pcx-6}" y="${pcy+ph*0.74}" width="12" height="${ph*0.30}" rx="2" fill="#3A2008"/>`;
  };

  // 돔형 초가집 — 더 크고 짚 텍스처 포함
  const domeHouse = (hcx: number, baseY: number) => {
    const rx = 118, ry = 84;
    const bx = hcx - Math.round(rx * 0.70);
    const bw = Math.round(rx * 1.40);
    const bodyH = 70;
    // 돔 위 가로 짚 줄무늬 (8줄)
    const thatch = [10,20,30,40,50,62,72].map(di => {
      const hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (di / ry) * (di / ry))));
      const ty = baseY - di;
      const op = (0.10 + di * 0.004).toFixed(2);
      return `<line x1="${hcx-hw}" y1="${ty}" x2="${hcx+hw}" y2="${ty}" stroke="#F8D840" stroke-width="2" opacity="${op}"/>`;
    }).join('');
    // 돔 테두리 하이라이트
    const domePath = `M${hcx-rx},${baseY} A${rx},${ry} 0 0 1 ${hcx+rx},${baseY}`;
    return `
      <path d="${domePath}" fill="#C89020"/>
      <path d="${domePath}" fill="#D4A030" opacity="0.6"/>
      ${thatch}
      <path d="M${hcx-rx*0.74},${baseY-ry*0.40} A${rx*0.82},${ry*0.62} 0 0 1 ${hcx+rx*0.74},${baseY-ry*0.40}"
        fill="none" stroke="#F8E060" stroke-width="2.5" opacity="0.28"/>
      <circle cx="${hcx-rx*0.60}" cy="${baseY-ry*0.36}" r="5" fill="#FFF060" opacity="0.82"/>
      <circle cx="${hcx}"         cy="${baseY-ry+6}"     r="5" fill="#FFF060" opacity="0.82"/>
      <circle cx="${hcx+rx*0.60}" cy="${baseY-ry*0.36}" r="5" fill="#FFF060" opacity="0.82"/>
      <rect x="${bx}" y="${baseY}" width="${bw}" height="${bodyH}" fill="#7A5030" rx="2"/>
      <rect x="${bx}" y="${baseY}" width="${bw}" height="3" fill="#5A3818" opacity="0.55"/>
      <line x1="${bx}" y1="${baseY+18}" x2="${bx+bw}" y2="${baseY+18}" stroke="#5A3818" stroke-width="1.5" opacity="0.35"/>
      <rect x="${hcx-14}" y="${baseY+16}" width="28" height="${bodyH-8}" rx="2" fill="#3C2008"/>
      <rect x="${hcx+24}" y="${baseY+12}" width="32" height="24" rx="2" fill="#EED898" opacity="0.88"/>
      <line x1="${hcx+40}" y1="${baseY+12}" x2="${hcx+40}" y2="${baseY+36}" stroke="#6A4020" stroke-width="2"/>
      <line x1="${hcx+24}" y1="${baseY+24}" x2="${hcx+56}" y2="${baseY+24}" stroke="#6A4020" stroke-width="2"/>
      <rect x="${hcx-56}" y="${baseY+12}" width="32" height="24" rx="2" fill="#EED898" opacity="0.88"/>
      <line x1="${hcx-40}" y1="${baseY+12}" x2="${hcx-40}" y2="${baseY+36}" stroke="#6A4020" stroke-width="2"/>
      <line x1="${hcx-56}" y1="${baseY+24}" x2="${hcx-24}" y2="${baseY+24}" stroke="#6A4020" stroke-width="2"/>
      <rect x="${hcx-6}" y="${baseY+bodyH-22}" width="12" height="4" rx="1" fill="#8A6040" opacity="0.7"/>`;
  };

  // 삼각형 산 + 설원 (배경)
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
  <rect x="${sx+28}" y="${sy+sh+90}" width="${sw-56}" height="18" rx="6" fill="#4E3010"/>
  <rect x="${sx+28}" y="${sy+sh+90}" width="${sw-56}" height="6" rx="4" fill="#7A5020" opacity="0.45"/>

  <!-- 간판 보드 -->
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10"
    fill="url(#signG)" filter="url(#signSh)"/>
  ${grainLines}
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10"
    fill="none" stroke="#2E1408" stroke-width="3.5" opacity="0.35"/>

  <!-- 무지개 색동 테두리 -->
  ${rbTop}${rbBottom}${rbLeft}${rbRight}

  <!-- 갓 쓴 캐릭터 (간판 위에서 삐죽 나옴) -->
  <g filter="url(#charSh)">
  <!-- 갓 크라운 (검은 원통형 모자) -->
  <rect x="${scx-24}" y="${sy-78}" width="48" height="55" rx="6" fill="#141414"/>
  <ellipse cx="${scx}" cy="${sy-78}" rx="26" ry="10" fill="#141414"/>
  <rect x="${scx-22}" y="${sy-76}" width="9" height="51" rx="3" fill="#2A2A2A" opacity="0.60"/>
  <!-- 갓 챙 (넓은 평면 브림) -->
  <ellipse cx="${scx}" cy="${sy-23}" rx="62" ry="15" fill="#141414"/>
  <ellipse cx="${scx}" cy="${sy-25}" rx="64" ry="12" fill="none" stroke="#282828" stroke-width="2.5"/>
  <!-- 갓끈 -->
  <path d="M${scx-50},${sy-18} Q${scx-36},${sy-4} ${scx-26},${sy+6}"
    stroke="#C89018" stroke-width="3" fill="none"/>
  <path d="M${scx+50},${sy-18} Q${scx+36},${sy-4} ${scx+26},${sy+6}"
    stroke="#C89018" stroke-width="3" fill="none"/>
  <!-- 얼굴 -->
  <circle cx="${scx}" cy="${sy-10}" r="36" fill="#F6CA9A"/>
  <circle cx="${scx}" cy="${sy-10}" r="36" fill="none" stroke="#D8A870" stroke-width="1.5" opacity="0.4"/>
  <!-- 눈썹 -->
  <path d="M${scx-18},${sy-22} Q${scx-12},${sy-26} ${scx-6},${sy-22}"
    stroke="#381808" stroke-width="2.2" fill="none"/>
  <path d="M${scx+6},${sy-22} Q${scx+12},${sy-26} ${scx+18},${sy-22}"
    stroke="#381808" stroke-width="2.2" fill="none"/>
  <!-- 눈 -->
  <circle cx="${scx-12}" cy="${sy-16}" r="5" fill="#241008"/>
  <circle cx="${scx+12}" cy="${sy-16}" r="5" fill="#241008"/>
  <circle cx="${scx-10}" cy="${sy-18}" r="2" fill="white"/>
  <circle cx="${scx+14}" cy="${sy-18}" r="2" fill="white"/>
  <!-- 코 -->
  <ellipse cx="${scx}" cy="${sy-6}" rx="4.5" ry="3.5" fill="#D4986A"/>
  <!-- 입 (활짝 웃음) -->
  <path d="M${scx-12},${sy+1} Q${scx},${sy+10} ${scx+12},${sy+1}"
    stroke="#904830" stroke-width="2.5" fill="none"/>
  <!-- 볼 홍조 -->
  <ellipse cx="${scx-30}" cy="${sy-8}" rx="9" ry="6" fill="#F8A0A0" opacity="0.50"/>
  <ellipse cx="${scx+30}" cy="${sy-8}" rx="9" ry="6" fill="#F8A0A0" opacity="0.50"/>
  </g>

  <!-- 간판 텍스트 -->
  <text x="${scx}" y="${sy + Math.round(sh*0.37)}"
    text-anchor="middle" font-family="monospace" font-size="16"
    fill="#F8E8B8" opacity="0.88" letter-spacing="1">흥부네 커밋 · Heungbu's Commits</text>
  <text x="${scx}" y="${sy + Math.round(sh*0.68)}"
    text-anchor="middle"
    font-family="'Arial Black','Arial Bold',Arial,sans-serif"
    font-size="50" font-weight="bold"
    fill="#FFD838"
    filter="url(#textGl)">1HYUNG'S COMMITS</text>

  <!-- 하단 장식 닷 3개 -->
  <circle cx="${scx-28}" cy="${sy+Math.round(sh*0.87)}" r="9" fill="none" stroke="#C8A030" stroke-width="3"/>
  <circle cx="${scx}"    cy="${sy+Math.round(sh*0.87)}" r="9" fill="#4A7A28"/>
  <circle cx="${scx+28}" cy="${sy+Math.round(sh*0.87)}" r="9" fill="#284820"/>
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
    { name: 'farm-header.svg',              content: generateHeaderSVG() },
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

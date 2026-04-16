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
  // 간판 위치
  const sx = 380, sy = 72, sw = 440, sh = 208;
  const scx = sx + Math.round(sw / 2); // 600

  // 무지개 색동 테두리 (6색 × 3px = 18px 폭)
  const rainbow = ['#E82020','#F07020','#E8C018','#38A028','#2070D0','#7828C0'];
  const bs = 3; // stripe height
  const nb = rainbow.length; // 6
  const borderH = nb * bs; // 18px
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
    const gy = sy + borderH + 10 + i * 20;
    const c2 = (i % 2 === 0) ? 5 : -5;
    return `<path d="M${sx+borderH+10},${gy} Q${scx},${gy+c2} ${sx+sw-borderH-10},${gy}"
      stroke="#5A2808" stroke-width="1.2" fill="none" opacity="0.28"/>`;
  }).join('');

  // 소나무 헬퍼
  const pine = (pcx: number, pcy: number, ph: number) => {
    const pw = ph * 0.36;
    return `
      <polygon points="${pcx},${pcy} ${pcx-pw*0.9},${pcy+ph*0.55} ${pcx+pw*0.9},${pcy+ph*0.55}" fill="#224818"/>
      <polygon points="${pcx},${pcy+ph*0.22} ${pcx-pw},${pcy+ph*0.78} ${pcx+pw},${pcy+ph*0.78}" fill="#224818"/>
      <rect x="${pcx-5}" y="${pcy+ph*0.72}" width="10" height="${ph*0.32}" fill="#4A2808"/>`;
  };

  // 돔형 초가집 헬퍼
  const domeHouse = (hcx: number, baseY: number) => {
    const rx = 95, ry = 62;
    const bx = hcx - Math.round(rx * 0.72);
    const bw = Math.round(rx * 1.44);
    const bodyH = 55;
    return `
      <path d="M${hcx-rx},${baseY} A${rx},${ry} 0 0 1 ${hcx+rx},${baseY}" fill="#D4A838"/>
      <path d="M${hcx-rx*0.75},${baseY-ry*0.42} A${rx*0.82},${ry*0.65} 0 0 1 ${hcx+rx*0.75},${baseY-ry*0.42}"
        fill="none" stroke="#F0C840" stroke-width="1.5" opacity="0.25"/>
      <circle cx="${hcx-rx*0.62}" cy="${baseY-ry*0.35}" r="4" fill="#F8F040" opacity="0.88"/>
      <circle cx="${hcx}"         cy="${baseY-ry+5}"     r="4" fill="#F8F040" opacity="0.88"/>
      <circle cx="${hcx+rx*0.62}" cy="${baseY-ry*0.35}" r="4" fill="#F8F040" opacity="0.88"/>
      <rect x="${bx}" y="${baseY}" width="${bw}" height="${bodyH}" fill="#7A5030" rx="2"/>
      <line x1="${bx}" y1="${baseY+16}" x2="${bx+bw}" y2="${baseY+16}" stroke="#5A3818" stroke-width="1" opacity="0.35"/>
      <rect x="${hcx-13}" y="${baseY+14}" width="26" height="${bodyH-8}" rx="2" fill="#4A2808"/>
      <rect x="${hcx+22}" y="${baseY+11}" width="28" height="20" rx="1" fill="#E8D090" opacity="0.82"/>
      <line x1="${hcx+36}" y1="${baseY+11}" x2="${hcx+36}" y2="${baseY+31}" stroke="#6A4020" stroke-width="1.5"/>
      <line x1="${hcx+22}" y1="${baseY+21}" x2="${hcx+50}" y2="${baseY+21}" stroke="#6A4020" stroke-width="1.5"/>
      <rect x="${hcx-50}" y="${baseY+11}" width="28" height="20" rx="1" fill="#E8D090" opacity="0.82"/>
      <line x1="${hcx-36}" y1="${baseY+11}" x2="${hcx-36}" y2="${baseY+31}" stroke="#6A4020" stroke-width="1.5"/>
      <line x1="${hcx-50}" y1="${baseY+21}" x2="${hcx-22}" y2="${baseY+21}" stroke="#6A4020" stroke-width="1.5"/>`;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="hSkG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#80C8E8"/>
      <stop offset="60%"  stop-color="#A8D8F0"/>
      <stop offset="100%" stop-color="#C0E0F8"/>
    </linearGradient>
    <linearGradient id="signG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#A86030"/>
      <stop offset="100%" stop-color="#7A4820"/>
    </linearGradient>
    <filter id="signSh">
      <feDropShadow dx="5" dy="6" stdDeviation="6" flood-color="#1a0800" flood-opacity="0.45"/>
    </filter>
    <filter id="textGl">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#3a1800" flood-opacity="0.7"/>
    </filter>
  </defs>

  <!-- 하늘 -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#hSkG)"/>

  <!-- 배경 산 (청회색) -->
  <ellipse cx="220"  cy="240" rx="215" ry="135" fill="#7890A8" opacity="0.55"/>
  <ellipse cx="600"  cy="230" rx="260" ry="122" fill="#6880A0" opacity="0.5"/>
  <ellipse cx="980"  cy="236" rx="225" ry="128" fill="#7890A8" opacity="0.55"/>

  <!-- 중경 언덕 (짙은 녹색) -->
  <ellipse cx="-30"  cy="318" rx="260" ry="128" fill="#3A6828"/>
  <ellipse cx="300"  cy="320" rx="270" ry="130" fill="#3A6828"/>
  <ellipse cx="650"  cy="316" rx="260" ry="125" fill="#3A6828"/>
  <ellipse cx="1030" cy="320" rx="250" ry="128" fill="#3A6828"/>

  <!-- 밝은 잔디 -->
  <rect x="0" y="298" width="${W}" height="${H-298}" fill="#52BA1C"/>
  <rect x="0" y="298" width="${W}" height="14" fill="#60CA28" opacity="0.8"/>

  <!-- 구름 좌 -->
  <g opacity="0.92">
    <ellipse cx="155" cy="58" rx="52" ry="22" fill="white"/>
    <ellipse cx="185" cy="46" rx="36" ry="17" fill="white"/>
    <ellipse cx="125" cy="62" rx="30" ry="13" fill="white"/>
  </g>
  <!-- 구름 우 -->
  <g opacity="0.86">
    <ellipse cx="1048" cy="52" rx="55" ry="22" fill="white"/>
    <ellipse cx="1082" cy="40" rx="40" ry="17" fill="white"/>
    <ellipse cx="1018" cy="56" rx="32" ry="13" fill="white"/>
  </g>

  <!-- 소나무 좌 -->
  ${pine(90,  140, 162)}
  ${pine(148, 158, 142)}
  ${pine(196, 172, 120)}

  <!-- 소나무 우 -->
  ${pine(1004, 155, 148)}
  ${pine(1055, 142, 158)}
  ${pine(1110, 168, 125)}

  <!-- 초가집 좌 -->
  ${domeHouse(232, 298)}

  <!-- 초가집 우 -->
  ${domeHouse(968, 298)}

  <!-- 간판 받침대 -->
  <path d="M${sx+55},${sy+sh} L${sx+42},${H-12}" stroke="#6A4018" stroke-width="20" stroke-linecap="round"/>
  <path d="M${sx+sw-55},${sy+sh} L${sx+sw-42},${H-12}" stroke="#6A4018" stroke-width="20" stroke-linecap="round"/>
  <path d="M${sx+55},${sy+sh} L${sx+42},${H-12}" stroke="#8A5828" stroke-width="5" stroke-linecap="round" opacity="0.45"/>
  <path d="M${sx+sw-55},${sy+sh} L${sx+sw-42},${H-12}" stroke="#8A5828" stroke-width="5" stroke-linecap="round" opacity="0.45"/>
  <rect x="${sx+32}" y="${sy+sh+88}" width="${sw-64}" height="16" rx="5" fill="#5A3810"/>
  <rect x="${sx+32}" y="${sy+sh+88}" width="${sw-64}" height="5" rx="3" fill="#7A5020" opacity="0.5"/>

  <!-- 간판 보드 -->
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="8"
    fill="url(#signG)" filter="url(#signSh)"/>
  ${grainLines}
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="8"
    fill="none" stroke="#3A1808" stroke-width="3" opacity="0.3"/>

  <!-- 무지개 색동 테두리 -->
  ${rbTop}${rbBottom}${rbLeft}${rbRight}

  <!-- 갓 쓴 캐릭터 (간판 위에서 삐죽 나옴) -->
  <!-- 갓 크라운 (검은 원통형 모자) -->
  <rect x="${scx-22}" y="${sy-82}" width="44" height="52" rx="5" fill="#181818"/>
  <ellipse cx="${scx}" cy="${sy-82}" rx="24" ry="9" fill="#181818"/>
  <rect x="${scx-20}" y="${sy-80}" width="8" height="48" rx="3" fill="#323232" opacity="0.55"/>
  <!-- 갓 챙 (넓은 평면 브림) -->
  <ellipse cx="${scx}" cy="${sy-30}" rx="56" ry="13" fill="#181818"/>
  <ellipse cx="${scx}" cy="${sy-32}" rx="58" ry="11" fill="none" stroke="#303030" stroke-width="2"/>
  <!-- 갓끈 -->
  <path d="M${scx-45},${sy-26} Q${scx-35},${sy-8} ${scx-26},${sy+2}"
    stroke="#C89018" stroke-width="2.5" fill="none"/>
  <path d="M${scx+45},${sy-26} Q${scx+35},${sy-8} ${scx+26},${sy+2}"
    stroke="#C89018" stroke-width="2.5" fill="none"/>
  <!-- 얼굴 -->
  <circle cx="${scx}" cy="${sy-16}" r="34" fill="#F4C898"/>
  <!-- 눈 -->
  <circle cx="${scx-12}" cy="${sy-20}" r="4.5" fill="#281008"/>
  <circle cx="${scx+12}" cy="${sy-20}" r="4.5" fill="#281008"/>
  <circle cx="${scx-10}" cy="${sy-22}" r="1.8" fill="white"/>
  <circle cx="${scx+14}" cy="${sy-22}" r="1.8" fill="white"/>
  <!-- 코 -->
  <ellipse cx="${scx}" cy="${sy-11}" rx="4" ry="3" fill="#DFA878"/>
  <!-- 입 (웃음) -->
  <path d="M${scx-10},${sy-5} Q${scx},${sy+2} ${scx+10},${sy-5}"
    stroke="#A05840" stroke-width="2.2" fill="none"/>
  <!-- 볼 홍조 -->
  <circle cx="${scx-28}" cy="${sy-12}" r="7" fill="#F4A0A0" opacity="0.45"/>
  <circle cx="${scx+28}" cy="${sy-12}" r="7" fill="#F4A0A0" opacity="0.45"/>

  <!-- 간판 텍스트 -->
  <text x="${scx}" y="${sy + sh*0.38}"
    text-anchor="middle" font-family="monospace" font-size="15"
    fill="#F0E0A8" opacity="0.90">흥부네 커밋 · Heungbu's Commits</text>
  <text x="${scx}" y="${sy + sh*0.70}"
    text-anchor="middle"
    font-family="'Arial Black','Arial Bold',Arial,sans-serif"
    font-size="46" font-weight="bold"
    fill="#F8D838"
    filter="url(#textGl)">1HYUNG'S COMMITS</text>

  <!-- 하단 3개 닷 -->
  <circle cx="${scx-24}" cy="${sy+sh*0.88}" r="8" fill="none" stroke="#C0A030" stroke-width="2.5"/>
  <circle cx="${scx}"    cy="${sy+sh*0.88}" r="8" fill="#4A7828"/>
  <circle cx="${scx+24}" cy="${sy+sh*0.88}" r="8" fill="#284820"/>
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

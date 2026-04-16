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
 * 흥부네 커밋 헤더 SVG (1200×300)
 * 한국 시골 풍경 + 초가집 실루엣 + 박 덩굴
 */
function generateHeungbuHeaderSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300">
  <defs>
    <linearGradient id="hSkyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${skyTop}"/>
      <stop offset="55%"  stop-color="${skyMid}"/>
      <stop offset="100%" stop-color="${skyBottom}"/>
    </linearGradient>
    <linearGradient id="hTitleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${strawLight}"/>
      <stop offset="50%"  stop-color="#fffde0"/>
      <stop offset="100%" stop-color="${strawLight}"/>
    </linearGradient>
    <filter id="hTextShadow">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="${statsPanelColor}" flood-opacity="0.7"/>
    </filter>
    <filter id="hGourdGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- 하늘 -->
  <rect x="0" y="0" width="1200" height="300" fill="url(#hSkyGrad)"/>

  <!-- 구름 -->
  <g opacity="0.88">
    <ellipse cx="160"  cy="60"  rx="55" ry="22" fill="white"/>
    <ellipse cx="195"  cy="50"  rx="40" ry="17" fill="white"/>
    <ellipse cx="128"  cy="63"  rx="32" ry="14" fill="white"/>
  </g>
  <g opacity="0.80">
    <ellipse cx="950"  cy="48"  rx="58" ry="22" fill="white"/>
    <ellipse cx="985"  cy="38"  rx="42" ry="17" fill="white"/>
    <ellipse cx="918"  cy="52"  rx="34" ry="14" fill="white"/>
  </g>
  <g opacity="0.72">
    <ellipse cx="520"  cy="35"  rx="42" ry="16" fill="white"/>
    <ellipse cx="545"  cy="26"  rx="30" ry="12" fill="white"/>
  </g>

  <!-- 원경 산 -->
  <polygon
    points="0,190 80,115 180,155 280,100 380,145 480,92 580,132 680,88 780,125 880,82 980,118 1080,78 1200,108 1200,210 0,210"
    fill="${hillFar}" opacity="0.5"/>

  <!-- 중경 언덕 -->
  <ellipse cx="-30"  cy="240" rx="230" ry="88" fill="${hillMid}"/>
  <ellipse cx="330"  cy="255" rx="280" ry="95" fill="${hillMid}"/>
  <ellipse cx="720"  cy="248" rx="250" ry="90" fill="${hillMid}"/>
  <ellipse cx="1100" cy="242" rx="220" ry="85" fill="${hillMid}"/>

  <!-- 지평선 -->
  <rect x="0" y="248" width="1200" height="52" fill="${hillNear}"/>

  <!-- 소나무 (좌) -->
  <g fill="${hLeafDark}" opacity="0.82">
    <polygon points="55,252 80,175 105,252"/>
    <polygon points="60,235 80,188 100,235"/>
    <rect x="75" y="247" width="10" height="28" fill="#5c3214"/>
  </g>
  <g fill="${hLeafDark}" opacity="0.70">
    <polygon points="108,255 130,188 152,255"/>
    <polygon points="112,240 130,200 148,240"/>
    <rect x="126" y="250" width="8" height="24" fill="#5c3214"/>
  </g>

  <!-- 소나무 (우) -->
  <g fill="${hLeafDark}" opacity="0.78">
    <polygon points="1060,252 1082,177 1104,252"/>
    <polygon points="1064,237 1082,190 1100,237"/>
    <rect x="1078" y="247" width="10" height="28" fill="#5c3214"/>
  </g>
  <g fill="${hLeafDark}" opacity="0.85">
    <polygon points="1108,256 1132,180 1156,256"/>
    <polygon points="1112,240 1132,194 1152,240"/>
    <rect x="1128" y="250" width="10" height="28" fill="#5c3214"/>
  </g>

  <!-- 초가집 실루엣 (좌) -->
  <g opacity="0.78">
    <!-- 지붕 -->
    <polygon points="155,200 240,155 325,200" fill="${hStrawDark}"/>
    <polygon points="165,200 240,160 315,200" fill="${strawMid}"/>
    <!-- 지붕 하이라이트 -->
    <line x1="200" y1="183" x2="240" y2="162" stroke="${strawLight}" stroke-width="1.5" opacity="0.5"/>
    <!-- 집 본체 -->
    <rect x="175" y="198" width="130" height="52" fill="#6b4828"/>
    <!-- 기둥 -->
    <rect x="182" y="200" width="8" height="50" fill="#5a3820"/>
    <rect x="290" y="200" width="8" height="50" fill="#5a3820"/>
    <!-- 창문 -->
    <rect x="215" y="212" width="28" height="22" rx="1" fill="#e8d4a0" opacity="0.7"/>
    <rect x="237" y="212" width="2" height="22" fill="#6b4828" opacity="0.6"/>
    <rect x="215" y="223" width="28" height="2" fill="#6b4828" opacity="0.6"/>
    <rect x="258" y="212" width="24" height="22" rx="1" fill="#e8d4a0" opacity="0.7"/>
    <rect x="270" y="212" width="2" height="22" fill="#6b4828" opacity="0.6"/>
    <rect x="258" y="223" width="24" height="2" fill="#6b4828" opacity="0.6"/>
    <!-- 박 덩굴 on 지붕 -->
    <path d="M180,198 Q210,180 240,185 Q270,180 310,192" stroke="${vineGreen}" stroke-width="2.5" fill="none" opacity="0.9"/>
    <ellipse cx="205" cy="181" rx="9" ry="6" fill="${hGourdMid}" filter="url(#hGourdGlow)"/>
    <ellipse cx="205" cy="181" rx="5" ry="3" fill="${gourdHighlight}"/>
    <ellipse cx="258" cy="178" rx="11" ry="7.5" fill="${hGourdMid}" filter="url(#hGourdGlow)"/>
    <ellipse cx="258" cy="178" rx="6" ry="4" fill="${gourdHighlight}"/>
    <ellipse cx="295" cy="183" rx="8" ry="5.5" fill="${hGourdMid}" filter="url(#hGourdGlow)"/>
  </g>

  <!-- 초가집 실루엣 (우) -->
  <g opacity="0.78">
    <polygon points="875,200 960,155 1045,200" fill="${hStrawDark}"/>
    <polygon points="885,200 960,160 1035,200" fill="${strawMid}"/>
    <line x1="918" y1="183" x2="960" y2="162" stroke="${strawLight}" stroke-width="1.5" opacity="0.5"/>
    <rect x="893" y="198" width="130" height="52" fill="#6b4828"/>
    <rect x="900" y="200" width="8" height="50" fill="#5a3820"/>
    <rect x="1008" y="200" width="8" height="50" fill="#5a3820"/>
    <rect x="932" y="212" width="28" height="22" rx="1" fill="#e8d4a0" opacity="0.7"/>
    <rect x="954" y="212" width="2" height="22" fill="#6b4828" opacity="0.6"/>
    <rect x="932" y="223" width="28" height="2" fill="#6b4828" opacity="0.6"/>
    <rect x="974" y="212" width="24" height="22" rx="1" fill="#e8d4a0" opacity="0.7"/>
    <rect x="986" y="212" width="2" height="22" fill="#6b4828" opacity="0.6"/>
    <rect x="974" y="223" width="24" height="2" fill="#6b4828" opacity="0.6"/>
    <path d="M895,198 Q930,180 960,184 Q990,180 1030,192" stroke="${vineGreen}" stroke-width="2.5" fill="none" opacity="0.9"/>
    <ellipse cx="922"  cy="181" rx="9"  ry="6"   fill="${hGourdMid}" filter="url(#hGourdGlow)"/>
    <ellipse cx="922"  cy="181" rx="5"  ry="3"   fill="${gourdHighlight}"/>
    <ellipse cx="972"  cy="177" rx="12" ry="8"   fill="${hGourdMid}" filter="url(#hGourdGlow)"/>
    <ellipse cx="972"  cy="177" rx="7"  ry="4.5" fill="${gourdHighlight}"/>
    <ellipse cx="1015" cy="184" rx="8"  ry="5.5" fill="${hGourdMid}" filter="url(#hGourdGlow)"/>
  </g>

  <!-- 중앙 타이틀 패널 -->
  <rect x="380" y="115" width="440" height="90" rx="12" fill="${statsPanelColor}" opacity="0.80"/>
  <rect x="385" y="120" width="430" height="80" rx="10" fill="none" stroke="${strawLight}" stroke-width="1.5" opacity="0.55"/>

  <!-- 타이틀 텍스트 -->
  <text x="600" y="150"
        text-anchor="middle"
        font-family="monospace"
        font-size="13"
        fill="${hTitleColor}"
        opacity="0.85">흥부네 커밋 · Heungbu's Commits</text>
  <text x="600" y="183"
        text-anchor="middle"
        font-family="'Arial Black', Arial, sans-serif"
        font-size="34"
        font-weight="bold"
        fill="url(#hTitleGrad)"
        filter="url(#hTextShadow)">1HYUNG'S COMMITS</text>

  <!-- 떠다니는 박 파티클 -->
  <g filter="url(#hGourdGlow)">
    <ellipse cx="480" cy="268" rx="7" ry="5" fill="${gourdLight}" opacity="0.85">
      <animate attributeName="cy" values="268;252;268" dur="4.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.85;0.3;0.85" dur="4.2s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="720" cy="272" rx="8" ry="5.5" fill="${gourdLight}" opacity="0.80">
      <animate attributeName="cy" values="272;254;272" dur="3.6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.80;0.2;0.80" dur="3.6s" repeatCount="indefinite"/>
    </ellipse>
  </g>

  <!-- 하단 지면 -->
  <rect x="0" y="292" width="1200" height="8" fill="${hillNear}" opacity="0.7"/>
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

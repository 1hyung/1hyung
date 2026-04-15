// README 섹션 SVG 생성 스크립트 (농장 테마)

import * as fs from 'fs';
import * as path from 'path';
import { FARM_COLORS } from './farm-colors';

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

/**
 * 메인 실행 함수
 */
async function main(): Promise<void> {
  const assetsDir = path.join(__dirname, '../../assets');

  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('Generating farm-themed section SVGs...');

  const files = [
    { name: 'farm-header.svg', content: generateHeaderSVG() },
    { name: 'experience-section.svg', content: generateExperienceSVG() },
    { name: 'tech-stack-section.svg', content: generateTechStackSVG() },
    { name: 'social-section.svg', content: generateSocialSVG() },
    { name: 'section-divider.svg', content: generateDividerSVG() }
  ];

  files.forEach(({ name, content }) => {
    const filePath = path.join(assetsDir, name);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Generated: ${name}`);
  });

  console.log('All farm section SVGs generated successfully!');
}

main().catch(error => {
  console.error('Error generating sections:', error);
  process.exit(1);
});

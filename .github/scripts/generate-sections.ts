// README 섹션 SVG 생성 스크립트

import * as fs from 'fs';
import * as path from 'path';
import { DRAGON_COLORS } from './colors';

const { githubDark, githubGray, githubBorder, textGold, dragonOrange, dragonRed } = DRAGON_COLORS;

/**
 * 헤더 SVG 생성
 */
function generateHeaderSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300">
  <defs>
    <!-- Text gradient -->
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${textGold}"/>
      <stop offset="50%" style="stop-color:#ffcc00"/>
      <stop offset="100%" style="stop-color:${textGold}"/>
    </linearGradient>

    <!-- Glow filter -->
    <filter id="headerGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Text shadow -->
    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="${dragonOrange}" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect x="0" y="0" width="1200" height="300" fill="${githubDark}"/>

  <!-- Subtle border -->
  <rect x="0" y="0" width="1200" height="300" fill="none" stroke="${githubBorder}" stroke-width="1" opacity="0.5"/>

  <!-- Dragon eye decorations -->
  <g opacity="0.3">
    <circle cx="100" cy="150" r="20" stroke="${dragonOrange}" stroke-width="2" fill="none">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="1100" cy="150" r="20" stroke="${dragonOrange}" stroke-width="2" fill="none">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- Main title text -->
  <text x="600" y="130" text-anchor="middle" font-family="'Arial Black', Arial, sans-serif" font-size="42" font-weight="bold" fill="url(#textGradient)" filter="url(#textShadow)">
    WELCOME TO 1HYUNG'S
  </text>
  <text x="600" y="190" text-anchor="middle" font-family="'Arial Black', Arial, sans-serif" font-size="56" font-weight="bold" fill="url(#textGradient)" filter="url(#textShadow)">
    DRAGON LAIR
  </text>

  <!-- Decorative flame particles -->
  <g fill="${dragonOrange}">
    <circle cx="200" cy="250" r="3">
      <animate attributeName="cy" values="250;200;250" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="350" cy="270" r="2">
      <animate attributeName="cy" values="270;220;270" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="850" cy="260" r="3">
      <animate attributeName="cy" values="260;210;260" dur="2.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0;1" dur="2.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="1000" cy="255" r="2">
      <animate attributeName="cy" values="255;205;255" dur="3.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0;1" dur="3.2s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- Subtitle -->
  <text x="600" y="240" text-anchor="middle" font-family="monospace" font-size="16" fill="${githubGray}">
    Where commits hatch into dragons
  </text>

  <!-- Bottom accent line -->
  <rect x="0" y="295" width="1200" height="5" fill="${dragonOrange}" opacity="0.5">
    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/>
  </rect>
</svg>`;
}

/**
 * Experience 섹션 SVG 생성
 */
function generateExperienceSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 250" width="1200" height="250">
  <!-- Background -->
  <rect x="0" y="0" width="1200" height="250" fill="${githubDark}"/>

  <!-- Subtle border -->
  <rect x="0" y="0" width="1200" height="250" fill="none" stroke="${githubBorder}" stroke-width="1" opacity="0.5"/>

  <!-- Section Title -->
  <text x="600" y="40" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="${textGold}">
    🔥 Experience 🔥
  </text>

  <!-- Company Badge -->
  <rect x="450" y="70" width="300" height="40" rx="8" fill="${dragonRed}" opacity="0.8"/>
  <text x="600" y="96" text-anchor="middle" font-family="'Arial Black', sans-serif" font-size="18" fill="${textGold}">
    MOVV Corp
  </text>

  <!-- Career Path -->
  <g transform="translate(600, 140)">
    <!-- Backend Engineer -->
    <rect x="-280" y="0" width="180" height="30" rx="6" fill="#2d1b0e" stroke="${textGold}" stroke-width="2"/>
    <text x="-190" y="20" text-anchor="middle" font-family="monospace" font-size="13" fill="${textGold}">Backend Engineer</text>

    <!-- Arrow -->
    <text x="-90" y="20" text-anchor="middle" font-family="monospace" font-size="16" fill="${textGold}">→</text>

    <!-- QA Engineer -->
    <rect x="-60" y="0" width="140" height="30" rx="6" fill="#2d1b0e" stroke="#FF6B6B" stroke-width="2"/>
    <text x="10" y="20" text-anchor="middle" font-family="monospace" font-size="13" fill="#FF6B6B">QA Engineer</text>

    <!-- Arrow -->
    <text x="90" y="20" text-anchor="middle" font-family="monospace" font-size="16" fill="${textGold}">→</text>

    <!-- Prompt Engineer -->
    <rect x="120" y="0" width="160" height="30" rx="6" fill="#2d1b0e" stroke="#b678c4" stroke-width="2"/>
    <text x="200" y="20" text-anchor="middle" font-family="monospace" font-size="13" fill="#b678c4">Prompt Engineer</text>
  </g>

  <!-- Period -->
  <text x="600" y="210" text-anchor="middle" font-family="monospace" font-size="14" fill="${githubGray}">
    2025.06 ~ Present
  </text>
</svg>`;
}

/**
 * Tech Stack 섹션 SVG 생성
 */
function generateTechStackSVG(): string {
  const badges = [
    // Backend
    { category: 'Backend', items: ['Kotlin', 'Spring Boot', 'MySQL', 'Kafka', 'gRPC'] },
    // DevOps
    { category: 'DevOps', items: ['Docker', 'Kubernetes'] },
    // Tools
    { category: 'Tools', items: ['IntelliJ IDEA', 'Jira', 'Confluence', 'Slack', 'Notion'] },
    // AI
    { category: 'AI & Prompt', items: ['Claude', 'Prompt Engineering'] }
  ];

  let yOffset = 60;
  let badgesSVG = '';

  badges.forEach(({ category, items }) => {
    // Category title
    badgesSVG += `
    <text x="600" y="${yOffset}" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="${githubGray}">
      ${category}
    </text>`;

    yOffset += 30;

    // Badges
    const totalWidth = items.length * 120;
    const startX = 600 - totalWidth / 2;

    items.forEach((item, index) => {
      const x = startX + index * 120;
      badgesSVG += `
      <rect x="${x}" y="${yOffset}" width="110" height="25" rx="4" fill="${dragonRed}" opacity="0.8"/>
      <text x="${x + 55}" y="${yOffset + 17}" text-anchor="middle" font-family="monospace" font-size="11" fill="${textGold}">
        ${item}
      </text>`;
    });

    yOffset += 45;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${yOffset + 20}" width="1200" height="${yOffset + 20}">
  <!-- Background -->
  <rect x="0" y="0" width="1200" height="${yOffset + 20}" fill="${githubDark}"/>

  <!-- Subtle border -->
  <rect x="0" y="0" width="1200" height="${yOffset + 20}" fill="none" stroke="${githubBorder}" stroke-width="1" opacity="0.5"/>

  <!-- Section Title -->
  <text x="600" y="35" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="${textGold}">
    🐉 Tech Stack 🐉
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
  <!-- Background -->
  <rect x="0" y="0" width="1200" height="150" fill="${githubDark}"/>

  <!-- Subtle border -->
  <rect x="0" y="0" width="1200" height="150" fill="none" stroke="${githubBorder}" stroke-width="1" opacity="0.5"/>

  <!-- Section Title -->
  <text x="600" y="40" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="${textGold}">
    🌋 Social 🌋
  </text>

  <!-- Velog Badge -->
  <a href="https://velog.io/@1hyung/posts/">
    <rect x="500" y="70" width="200" height="40" rx="8" fill="${dragonRed}" opacity="0.8">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="600" y="95" text-anchor="middle" font-family="'Arial Black', sans-serif" font-size="16" fill="${textGold}">
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
  <!-- Background -->
  <rect x="0" y="0" width="1200" height="30" fill="${githubDark}"/>

  <!-- Flame pattern divider -->
  <path d="M 0,15 Q 100,5 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
        stroke="${dragonOrange}"
        stroke-width="2"
        fill="none"
        opacity="0.5">
    <animate attributeName="d"
             values="M 0,15 Q 100,5 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
                     M 0,15 Q 100,25 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
                     M 0,15 Q 100,5 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
             dur="3s"
             repeatCount="indefinite"/>
  </path>
</svg>`;
}

/**
 * 메인 실행 함수
 */
async function main(): Promise<void> {
  const assetsDir = path.join(__dirname, '../../assets');

  // assets 디렉토리 생성
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('Generating section SVGs...');

  // SVG 파일 생성
  const files = [
    { name: 'dragon-header.svg', content: generateHeaderSVG() },
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

  console.log('All section SVGs generated successfully!');
}

main().catch(error => {
  console.error('Error generating sections:', error);
  process.exit(1);
});

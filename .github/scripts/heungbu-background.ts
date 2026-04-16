// 흥부네 커밋 — 한국 시골 풍경 배경

import { SVGConfig } from './types';
import { HEUNGBU_COLORS } from './heungbu-colors';

export function createHeungbuFilters(): string {
  return `
    <filter id="heungbuGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="heungbuShadow" x="-10%" y="-10%" width="130%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#1a0e04" flood-opacity="0.4"/>
    </filter>
  `;
}

export function createHeungbuBackground(config: SVGConfig): string {
  const { width, height } = config;
  const cx = Math.round(width / 2);

  return `
<g id="heungbu-background">
  <defs>
    <linearGradient id="heungbuSkyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${HEUNGBU_COLORS.skyTop}"/>
      <stop offset="55%"  stop-color="${HEUNGBU_COLORS.skyMid}"/>
      <stop offset="100%" stop-color="${HEUNGBU_COLORS.skyBottom}"/>
    </linearGradient>
    <linearGradient id="heungbuGroundGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${HEUNGBU_COLORS.hillNear}"/>
      <stop offset="100%" stop-color="${HEUNGBU_COLORS.groundGreen}"/>
    </linearGradient>
  </defs>

  <!-- 하늘 -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#heungbuSkyGrad)"/>

  <!-- 구름 1 (좌) -->
  <g opacity="0.88">
    <ellipse cx="110" cy="55" rx="42" ry="17" fill="white"/>
    <ellipse cx="135" cy="47" rx="30" ry="13" fill="white"/>
    <ellipse cx="86"  cy="57" rx="24" ry="11" fill="white"/>
  </g>
  <!-- 구름 2 (우) -->
  <g opacity="0.82">
    <ellipse cx="640" cy="40" rx="52" ry="20" fill="white"/>
    <ellipse cx="668" cy="31" rx="36" ry="14" fill="white"/>
    <ellipse cx="612" cy="44" rx="28" ry="12" fill="white"/>
  </g>
  <!-- 구름 3 (중) -->
  <g opacity="0.70">
    <ellipse cx="360" cy="28" rx="36" ry="13" fill="white"/>
    <ellipse cx="378" cy="20" rx="26" ry="10" fill="white"/>
  </g>

  <!-- 원경 산 실루엣 -->
  <polygon
    points="0,185 70,108 150,148 230,96 310,135 400,85 490,125 575,90 650,120 730,80 810,115 850,100 850,205 0,205"
    fill="${HEUNGBU_COLORS.hillFar}" opacity="0.55"/>

  <!-- 중경 언덕 -->
  <ellipse cx="-20"  cy="235" rx="210" ry="82" fill="${HEUNGBU_COLORS.hillMid}"/>
  <ellipse cx="230"  cy="252" rx="255" ry="88" fill="${HEUNGBU_COLORS.hillMid}"/>
  <ellipse cx="610"  cy="245" rx="225" ry="83" fill="${HEUNGBU_COLORS.hillMid}"/>
  <ellipse cx="895"  cy="238" rx="185" ry="74" fill="${HEUNGBU_COLORS.hillMid}"/>

  <!-- 지평선 초원 -->
  <rect x="0" y="248" width="${width}" height="${height - 248}" fill="url(#heungbuGroundGrad)"/>

  <!-- 소나무 (좌) -->
  <g fill="${HEUNGBU_COLORS.leafDark}" opacity="0.82">
    <polygon points="28,252 49,185 70,252"/>
    <polygon points="32,238 49,196 66,238"/>
    <rect x="45" y="247" width="8" height="22" fill="#5c3214"/>
  </g>
  <g fill="${HEUNGBU_COLORS.leafDark}" opacity="0.72">
    <polygon points="65,256 83,200 101,256"/>
    <polygon points="68,242 83,208 98,242"/>
    <rect x="79" y="251" width="7" height="20" fill="#5c3214"/>
  </g>

  <!-- 소나무 (우) -->
  <g fill="${HEUNGBU_COLORS.leafDark}" opacity="0.78">
    <polygon points="755,252 774,186 793,252"/>
    <polygon points="758,238 774,197 790,238"/>
    <rect x="770" y="246" width="8" height="22" fill="#5c3214"/>
  </g>
  <g fill="${HEUNGBU_COLORS.leafDark}" opacity="0.83">
    <polygon points="798,256 818,190 838,256"/>
    <polygon points="801,242 818,200 835,242"/>
    <rect x="814" y="250" width="8" height="22" fill="#5c3214"/>
  </g>

  <!-- 대나무 (우측 중간) -->
  <g opacity="0.62">
    <rect x="706" y="222" width="3" height="58" fill="${HEUNGBU_COLORS.hillMid}"/>
    <ellipse cx="708" cy="222" rx="8"  ry="11" fill="${HEUNGBU_COLORS.leafDark}"/>
    <ellipse cx="708" cy="217" rx="6"  ry="8"  fill="${HEUNGBU_COLORS.leafMid}"/>
    <rect x="718" y="228" width="3" height="52" fill="${HEUNGBU_COLORS.hillMid}"/>
    <ellipse cx="720" cy="228" rx="6"  ry="8"  fill="${HEUNGBU_COLORS.leafDark}"/>
    <ellipse cx="720" cy="223" rx="5"  ry="7"  fill="${HEUNGBU_COLORS.leafMid}"/>
  </g>

  <!-- 타이틀 패널 (반투명 갈색 현판) -->
  <rect x="${cx - 195}" y="10" width="390" height="56" rx="9"
        fill="${HEUNGBU_COLORS.statsPanelColor}" opacity="0.72"/>
  <rect x="${cx - 190}" y="14" width="380" height="48" rx="7"
        fill="none" stroke="${HEUNGBU_COLORS.strawHighlight}" stroke-width="1" opacity="0.5"/>

  <!-- 타이틀 텍스트 -->
  <text
    x="${cx}" y="34"
    text-anchor="middle"
    font-family="monospace"
    font-size="11"
    fill="${HEUNGBU_COLORS.titleColor}"
    opacity="0.80"
  >흥부네 커밋 · Heungbu's Commits</text>
  <text
    x="${cx}" y="54"
    text-anchor="middle"
    font-family="monospace"
    font-size="17"
    font-weight="bold"
    fill="${HEUNGBU_COLORS.strawLight}"
  >1hyung's Commits</text>

  <!-- 그리드 하단 풀밭 전환 -->
  <rect x="0" y="293" width="${width}" height="12"
        fill="${HEUNGBU_COLORS.groundGreen}" opacity="0.5"/>
</g>
  `.trim();
}

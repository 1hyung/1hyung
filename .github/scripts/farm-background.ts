import { FARM_COLORS } from './farm-colors';
import { SVGConfig } from './types';

/**
 * 농장 테마 SVG 필터 정의
 */
export function createFarmFilters(): string {
  return `
    <!-- 햇빛 글로우 필터 (Level 4 사과나무) -->
    <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feColorMatrix in="coloredBlur" type="matrix"
        values="1 0.5 0 0 0
                0 1   0 0 0
                0 0   0 0 0
                0 0   0 0.8 0" result="warmBlur"/>
      <feMerge>
        <feMergeNode in="warmBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- 스프라이트 그림자 -->
    <filter id="farmShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="#2d3a1e" flood-opacity="0.4"/>
    </filter>

    <!-- 잔디 텍스처 노이즈 -->
    <filter id="grassNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0.3"/>
      <feBlend in="SourceGraphic" in2="noise" mode="overlay" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>
  `;
}

/**
 * 농장 테마 배경 생성 (초록 잔디밭)
 */
export function createFarmBackground(config: SVGConfig): string {
  const { bgGreen, bgDark, bgLight, borderBrown, grassMid } = FARM_COLORS;

  return `
    <g id="background">
      <!-- 메인 잔디 배경 -->
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${bgGreen}"/>

      <!-- 잔디 텍스처 오버레이 -->
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${bgLight}" opacity="0.15" filter="url(#grassNoise)"/>

      <!-- 상단 밝은 하이라이트 (햇빛 느낌) -->
      <rect x="0" y="0" width="${config.width}" height="${Math.round(config.height * 0.3)}" fill="${bgLight}" opacity="0.08"/>

      <!-- 하단 어두운 그림자 -->
      <rect x="0" y="${Math.round(config.height * 0.75)}" width="${config.width}" height="${Math.round(config.height * 0.25)}" fill="${bgDark}" opacity="0.15"/>

      <!-- 나무 테두리 -->
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="none" stroke="${borderBrown}" stroke-width="3" opacity="0.7"/>
      <rect x="2" y="2" width="${config.width - 4}" height="${config.height - 4}" fill="none" stroke="${bgLight}" stroke-width="1" opacity="0.3"/>
    </g>
  `;
}

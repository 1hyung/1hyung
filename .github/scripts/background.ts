import { DRAGON_COLORS } from './colors';
import { SVGConfig } from './types';

/**
 * SVG 필터 및 효과 정의
 */
export function createBackgroundFilters(): string {
  return `
    <!-- Glow filter for Level 4 dragons -->
    <filter id="dragonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Drop shadow for sprites -->
    <filter id="spriteShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="1" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>

    <!-- Subtle texture noise -->
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0"/>
      <feBlend in="SourceGraphic" in2="noise" mode="multiply" result="blend"/>
    </filter>
  `;
}

/**
 * GitHub Dark 테마의 단순한 배경 생성
 * 미세한 텍스처 추가로 드래곤 테마 유지
 */
export function createDarkBackground(config: SVGConfig): string {
  const { githubDark, githubBorder, rockDark } = DRAGON_COLORS;

  return `
    <g id="background">
      <!-- Main background -->
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${githubDark}"/>

      <!-- Subtle texture overlay -->
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${rockDark}" opacity="0.02" filter="url(#noise)"/>

      <!-- Subtle border -->
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="none" stroke="${githubBorder}" stroke-width="1" opacity="0.5"/>
    </g>
  `;
}

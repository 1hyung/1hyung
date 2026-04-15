// 설산 테마 배경 - 깊은 밤하늘 + 중앙 배경 설산 + 알펜글로
import { SVGConfig } from './types';

export function createMountainFilters(): string {
  return `
    <filter id="snowGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feColorMatrix in="coloredBlur" type="matrix"
        values="1 0.5 0 0 0  0.6 0.8 0.6 0 0  0 0 1 0 0  0 0 0 0.7 0" result="glowBlur"/>
      <feMerge>
        <feMergeNode in="glowBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <radialGradient id="skyGrad" cx="50%" cy="20%" r="75%">
      <stop offset="0%" stop-color="#1a2d5a"/>
      <stop offset="55%" stop-color="#0d1b38"/>
      <stop offset="100%" stop-color="#08101e"/>
    </radialGradient>
    <radialGradient id="peakGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e87040" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#e87040" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="horizonHaze" cx="50%" cy="0%" r="100%">
      <stop offset="0%" stop-color="#1a2d5a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#1a2d5a" stop-opacity="0"/>
    </radialGradient>
  `;
}

/** 고정 별 배치 */
function drawStars(): string {
  const stars: Array<{ x: number; y: number; r: number; o: number }> = [
    { x: 38,  y: 16, r: 1.2, o: 0.82 }, { x: 124, y: 10, r: 0.9, o: 0.70 },
    { x: 210, y: 24, r: 1.0, o: 0.78 }, { x: 298, y: 8,  r: 1.3, o: 0.88 },
    { x: 382, y: 18, r: 0.8, o: 0.65 }, { x: 464, y: 12, r: 1.1, o: 0.80 },
    { x: 558, y: 20, r: 0.9, o: 0.72 }, { x: 640, y: 9,  r: 1.2, o: 0.85 },
    { x: 724, y: 16, r: 1.0, o: 0.75 }, { x: 812, y: 7,  r: 0.9, o: 0.68 },
    { x: 76,  y: 40, r: 0.8, o: 0.62 }, { x: 160, y: 48, r: 1.0, o: 0.76 },
    { x: 245, y: 36, r: 0.9, o: 0.70 }, { x: 334, y: 44, r: 1.1, o: 0.82 },
    { x: 418, y: 32, r: 0.8, o: 0.60 }, { x: 502, y: 46, r: 1.0, o: 0.74 },
    { x: 592, y: 38, r: 0.9, o: 0.68 }, { x: 672, y: 50, r: 1.2, o: 0.80 },
    { x: 756, y: 40, r: 0.8, o: 0.65 }, { x: 838, y: 28, r: 1.0, o: 0.78 },
    { x: 18,  y: 58, r: 0.7, o: 0.58 }, { x: 98,  y: 70, r: 0.8, o: 0.65 },
    { x: 188, y: 62, r: 0.7, o: 0.60 }, { x: 618, y: 68, r: 0.7, o: 0.55 },
    { x: 776, y: 62, r: 0.9, o: 0.70 }, { x: 844, y: 55, r: 0.7, o: 0.60 },
    { x: 52,  y: 82, r: 0.6, o: 0.52 }, { x: 840, y: 80, r: 0.6, o: 0.50 },
  ];
  return stars.map(s =>
    `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="#f0f4ff" opacity="${s.o}"/>`
  ).join('\n    ');
}

/** 중앙 배경 설산 (장식용, 대형) */
function drawBackgroundMountain(cx: number): string {
  const peakY    = 72;
  const snowY    = 152;
  const baseY    = 295;
  const halfW    = 265;
  const snowHalfW = 92;

  return `<g opacity="0.92">
    <!-- 산 본체 왼쪽 어두운 면 -->
    <polygon points="${cx},${peakY} ${cx - halfW},${baseY} ${cx},${baseY}" fill="#12203a"/>
    <!-- 산 본체 오른쪽 약간 밝은 면 -->
    <polygon points="${cx},${peakY} ${cx + halfW},${baseY} ${cx},${baseY}" fill="#1c2d48"/>
    <!-- 눈 경계 아래 왼쪽 암석 -->
    <polygon points="${cx - snowHalfW},${snowY} ${cx - halfW},${baseY} ${cx},${baseY} ${cx},${snowY + 28}" fill="#16203a"/>
    <!-- 눈 경계 아래 오른쪽 암석 -->
    <polygon points="${cx + snowHalfW},${snowY} ${cx + halfW},${baseY} ${cx},${baseY} ${cx},${snowY + 28}" fill="#20304a"/>
    <!-- 왼쪽 설면 (알펜글로 따뜻한 노을빛) -->
    <polygon points="${cx},${peakY} ${cx - snowHalfW},${snowY} ${cx},${snowY + 28}" fill="#f0b87a" opacity="0.88"/>
    <!-- 오른쪽 설면 (밝은 흰색) -->
    <polygon points="${cx},${peakY} ${cx + snowHalfW},${snowY} ${cx},${snowY + 28}" fill="#eef4ff" opacity="0.95"/>
    <!-- 눈 그늘 (얼음 파란색) -->
    <polygon points="${cx},${snowY + 28} ${cx - snowHalfW},${snowY} ${cx - snowHalfW + 28},${snowY + 28}" fill="#a0bcd8" opacity="0.38"/>
    <!-- 정상 순백 하이라이트 -->
    <polygon points="${cx},${peakY} ${cx - 9},${peakY + 14} ${cx + 9},${peakY + 14}" fill="#fff8f0" opacity="0.88"/>
    <!-- 알펜글로 광채 -->
    <ellipse cx="${cx}" cy="${peakY}" rx="38" ry="24" fill="url(#peakGlow)"/>
    <!-- 산 기저부 안개 -->
    <ellipse cx="${cx}" cy="${baseY}" rx="245" ry="18" fill="#0d1b38" opacity="0.38"/>
  </g>`;
}

export function createMountainBackground(config: SVGConfig): string {
  const { width, height } = config;
  const cx = Math.round(width / 2);

  return `<g id="mountain-background">
    <!-- 밤하늘 배경 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#skyGrad)"/>

    <!-- 별 -->
    ${drawStars()}

    <!-- 배경 설산 (중앙) -->
    ${drawBackgroundMountain(cx)}

    <!-- 수평선 안개 (그리드 기저 블렌딩) -->
    <rect x="0" y="${Math.round(height * 0.5)}" width="${width}" height="${Math.round(height * 0.18)}" fill="url(#horizonHaze)"/>

    <!-- 테두리 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#2a3a5a" stroke-width="3"/>
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="#4a6080" stroke-width="1" opacity="0.28"/>
  </g>`;
}

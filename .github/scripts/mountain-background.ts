// 설산 테마 배경 — 협곡 + 3겹 산맥 실루엣 + 밤하늘
// 레이아웃: 대형 타이틀(상단) → 협곡 산맥(배경) → 기여 그리드(하단)
import { SVGConfig } from './types';

export function createMountainFilters(): string {
  return `
    <filter id="snowGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="0.8 0.4 0 0 0.05  0.5 0.8 0.5 0 0  0 0.2 1 0 0  0 0 0 0.65 0" result="glowBlur"/>
      <feMerge>
        <feMergeNode in="glowBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="titleGlow" x="-20%" y="-80%" width="140%" height="260%">
      <!-- 그림자: 살짝 아래+오른쪽으로 어두운 파란 그림자 -->
      <feDropShadow dx="1.5" dy="2" stdDeviation="2" flood-color="#0a1830" flood-opacity="0.85" result="shadow"/>
      <!-- 글로우: 부드러운 파란빛 후광 -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="0.3 0.4 1 0 0  0.2 0.4 1 0 0  0.1 0.3 1 0 0  0 0 0 0.45 0" result="titleBlur"/>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="titleBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#06101e"/>
      <stop offset="38%"  stop-color="#0d1b38"/>
      <stop offset="72%"  stop-color="#162240"/>
      <stop offset="100%" stop-color="#0e1828"/>
    </linearGradient>
    <linearGradient id="valleyHaze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0e1828" stop-opacity="0"/>
      <stop offset="100%" stop-color="#060e18" stop-opacity="0.55"/>
    </linearGradient>
    <radialGradient id="peakAlpen" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#e87040" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#e87040" stop-opacity="0"/>
    </radialGradient>
  `;
}

/** 고정 별 (캔버스 850×600 기준) */
function drawStars(): string {
  const stars = [
    { x:  38, y: 18, r: 1.2, o: 0.82 }, { x: 125, y: 11, r: 0.9, o: 0.72 },
    { x: 210, y: 25, r: 1.0, o: 0.78 }, { x: 300, y:  8, r: 1.3, o: 0.90 },
    { x: 385, y: 20, r: 0.8, o: 0.65 }, { x: 465, y: 13, r: 1.1, o: 0.80 },
    { x: 560, y: 22, r: 0.9, o: 0.74 }, { x: 642, y:  9, r: 1.2, o: 0.86 },
    { x: 726, y: 17, r: 1.0, o: 0.76 }, { x: 814, y:  7, r: 0.9, o: 0.68 },
    { x:  78, y: 42, r: 0.8, o: 0.62 }, { x: 162, y: 50, r: 1.0, o: 0.75 },
    { x: 248, y: 36, r: 0.9, o: 0.70 }, { x: 336, y: 46, r: 1.1, o: 0.82 },
    { x: 418, y: 34, r: 0.8, o: 0.60 }, { x: 505, y: 48, r: 1.0, o: 0.74 },
    { x: 592, y: 40, r: 0.9, o: 0.68 }, { x: 674, y: 52, r: 1.2, o: 0.80 },
    { x: 758, y: 42, r: 0.8, o: 0.64 }, { x: 840, y: 30, r: 1.0, o: 0.78 },
    { x:  18, y: 62, r: 0.7, o: 0.56 }, { x:  98, y: 72, r: 0.8, o: 0.64 },
    { x: 190, y: 64, r: 0.7, o: 0.60 }, { x: 620, y: 70, r: 0.7, o: 0.55 },
    { x: 778, y: 64, r: 0.9, o: 0.70 }, { x: 846, y: 56, r: 0.7, o: 0.58 },
    { x:  54, y: 86, r: 0.6, o: 0.50 }, { x: 842, y: 82, r: 0.6, o: 0.50 },
  ];
  return stars.map(s =>
    `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="#f0f4ff" opacity="${s.o}"/>`
  ).join('\n    ');
}

/** 원거리 산맥 실루엣 (가장 희미, y_base=268) */
function drawFarRange(w: number): string {
  const pts = `0,218 65,200 132,212 198,194 268,207 338,190 408,202 478,191 548,204 618,188 688,200 758,188 828,198 ${w},194 ${w},268 0,268`;
  return `<polygon points="${pts}" fill="#3a4a6a" opacity="0.32"/>`;
}

/** 중거리 산맥 실루엣 (중간 밝기, y_base=240) */
function drawMidRange(w: number): string {
  const pts = `0,195 52,174 108,186 168,162 238,178 295,156 365,172 422,150 488,166 548,148 612,163 672,145 735,160 795,146 850,154 ${w},240 0,240`;
  return `<polygon points="${pts}" fill="#28385a" opacity="0.58"/>`;
}

/** 근거리 산맥 — 설산 포함 (가장 선명, y_base=208) */
function drawNearRange(w: number): string {
  // 산맥 본체
  const pts = `0,172 44,150 92,164 152,136 218,154 272,128 338,148 392,122 450,140 510,118 572,136 632,115 692,132 750,112 812,128 ${w},122 ${w},208 0,208`;
  // 눈 덮인 봉우리들 (가장 높은 6개)
  const snowPeaks = [
    { px: 272, py: 128 }, { px: 392, py: 122 }, { px: 510, py: 118 },
    { px: 632, py: 115 }, { px: 750, py: 112 },
  ];
  const snow = snowPeaks.map(p => `
    <polygon points="${p.px},${p.py} ${p.px - 18},${p.py + 22} ${p.px},${p.py + 28}" fill="#f0c890" opacity="0.85"/>
    <polygon points="${p.px},${p.py} ${p.px + 18},${p.py + 22} ${p.px},${p.py + 28}" fill="#eef4ff" opacity="0.95"/>
    <polygon points="${p.px},${p.py} ${p.px - 3},${p.py + 4} ${p.px + 3},${p.py + 4}" fill="#fff8f0" opacity="0.95"/>
    <ellipse cx="${p.px}" cy="${p.py}" rx="18" ry="10" fill="url(#peakAlpen)"/>
  `).join('');

  return `<g>
    <polygon points="${pts}" fill="#1c2840" opacity="0.85"/>
    ${snow}
  </g>`;
}

/**
 * 왼쪽 절벽 — 사선 절벽 (등각 투영 방향)
 * 지그재그 제거, 상단 130px → 하단 75px으로 수렴하는 깔끔한 사선
 */
function drawLeftCliff(h: number): string {
  // 사선 내측 엣지 좌표 (상단 넓고 하단 좁아짐 — 원근감)
  const topX = 130;
  const botX = 75;

  // 절벽 내측 면 (얇은 밝은 면으로 등각 입체감)
  const faceOuter = 12;

  return `<g>
    <!-- 절벽 본체 -->
    <polygon points="0,0 ${topX},0 ${botX},${h} 0,${h}" fill="#0a1220"/>
    <!-- 내측 노출 암석면 (얇은 밝은 사면) -->
    <polygon points="${topX},0 ${topX + faceOuter},0 ${botX + faceOuter},${h} ${botX},${h}"
             fill="#162032" opacity="0.9"/>
    <!-- 암석 층 라인 (strata) — 사선 방향 -->
    <line x1="${topX}" y1="0" x2="${botX}" y2="${h}"
          stroke="#1e2d42" stroke-width="2" opacity="0.75"/>
    <line x1="${topX - 16}" y1="0" x2="${botX - 16}" y2="${h}"
          stroke="#162030" stroke-width="1.5" opacity="0.5"/>
    <line x1="${topX - 30}" y1="0" x2="${botX - 30}" y2="${h}"
          stroke="#0e1826" stroke-width="1" opacity="0.3"/>
    <!-- 능선 하이라이트 -->
    <line x1="${topX}" y1="0" x2="${botX}" y2="${h}"
          stroke="#2a3d58" stroke-width="0.8" opacity="0.3"/>
  </g>`;
}

/**
 * 오른쪽 절벽 (왼쪽 대칭)
 */
function drawRightCliff(w: number, h: number): string {
  const topX = 130;
  const botX = 75;
  const faceOuter = 12;

  const il = w - topX;   // inner top-left x
  const bl = w - botX;   // inner bottom-left x

  return `<g>
    <polygon points="${il},0 ${w},0 ${w},${h} ${bl},${h}" fill="#0a1220"/>
    <polygon points="${il - faceOuter},0 ${il},0 ${bl},${h} ${bl - faceOuter},${h}"
             fill="#162032" opacity="0.9"/>
    <line x1="${il}" y1="0" x2="${bl}" y2="${h}"
          stroke="#1e2d42" stroke-width="2" opacity="0.75"/>
    <line x1="${il + 16}" y1="0" x2="${bl + 16}" y2="${h}"
          stroke="#162030" stroke-width="1.5" opacity="0.5"/>
    <line x1="${il + 30}" y1="0" x2="${bl + 30}" y2="${h}"
          stroke="#0e1826" stroke-width="1" opacity="0.3"/>
    <line x1="${il}" y1="0" x2="${bl}" y2="${h}"
          stroke="#2a3d58" stroke-width="0.8" opacity="0.3"/>
  </g>`;
}

/** 상단 대형 타이틀 — "1hyung's Git Mountain" */
function drawTitle(cx: number): string {
  return `<g id="mountain-title">
    <!-- 타이틀 본문 (드롭 섀도로 그림자 처리, 텍스트는 1개) -->
    <text
      x="${cx}" y="55"
      text-anchor="middle"
      font-family="monospace"
      font-size="27"
      font-weight="bold"
      letter-spacing="1.5"
      fill="#f0f4ff"
      filter="url(#titleGlow)"
    >1hyung's Git Mountain</text>
    <!-- 장식 구분선 -->
    <line x1="${cx - 148}" y1="66" x2="${cx + 148}" y2="66" stroke="#4a6898" stroke-width="0.8" opacity="0.6"/>
    <line x1="${cx - 120}" y1="70" x2="${cx + 120}" y2="70" stroke="#3a5070" stroke-width="0.5" opacity="0.4"/>
  </g>`;
}

export function createMountainBackground(config: SVGConfig): string {
  const { width, height } = config;
  const cx = Math.round(width / 2);

  return `<g id="mountain-background">
    <!-- 밤하늘 그라디언트 배경 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#skyGrad)"/>

    <!-- 별 -->
    ${drawStars()}

    <!-- 원거리 산맥 (가장 흐릿) -->
    ${drawFarRange(width)}

    <!-- 중거리 산맥 -->
    ${drawMidRange(width)}

    <!-- 근거리 산맥 (설산 포함, 가장 선명) -->
    ${drawNearRange(width)}

    <!-- 왼쪽 사선 절벽 -->
    ${drawLeftCliff(height)}

    <!-- 오른쪽 사선 절벽 -->
    ${drawRightCliff(width, height)}

    <!-- 협곡 바닥 안개 (그리드 영역 블렌딩) -->
    <rect x="0" y="${Math.round(height * 0.62)}" width="${width}" height="${Math.round(height * 0.38)}" fill="url(#valleyHaze)"/>

    <!-- 상단 대형 타이틀 -->
    ${drawTitle(cx)}

    <!-- 테두리 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#1e2d48" stroke-width="3"/>
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="#3a5270" stroke-width="1" opacity="0.25"/>
  </g>`;
}

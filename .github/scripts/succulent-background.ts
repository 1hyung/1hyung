import { SVGConfig } from './types';
import { SUCCULENT_COLORS } from './succulent-colors';

// 노을 다육정원 (Golden-Hour Succulent Garden)
// 따뜻한 건조 사막 정원 + 황혼 무드. 보라/코랄/호박빛 하늘 + 테라코타 흙.
// 초록 잔디밭, 둥근 활엽수, 빨간 지붕 집, 흰 꽃 장식 일절 없음.

const C = SUCCULENT_COLORS;

export function createSucculentFilters(): string {
  return `
    <linearGradient id="sgSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.skyTop}"/>
      <stop offset="48%" stop-color="${C.skyMid}"/>
      <stop offset="100%" stop-color="${C.skyLow}"/>
    </linearGradient>
    <radialGradient id="sgSun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${C.sunCore}"/>
      <stop offset="45%" stop-color="${C.sunHalo}"/>
      <stop offset="100%" stop-color="${C.skyLow}" stop-opacity="0"/>
    </radialGradient>
    <filter id="bloomGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feColorMatrix in="b" type="matrix"
        values="1 0.3 0.2 0 0  0.2 0.6 0.2 0 0  0.2 0.3 0.4 0 0  0 0 0 0.85 0" result="warm"/>
      <feMerge>
        <feMergeNode in="warm"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="sgShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="${C.soilDeep}" flood-opacity="0.25"/>
    </filter>
  `;
}

// 부드러운 타원 그림자 (식물 밑동)
function groundShadow(cx: number, baseY: number, rx: number): string {
  return `<ellipse cx="${cx}" cy="${baseY + 2}" rx="${rx}" ry="${Math.max(2, Math.round(rx * 0.32))}" fill="${C.soilDeep}" opacity="0.32"/>`;
}

// 통 선인장 (배럴): 세로 능선이 있는 둥근 통
function drawBarrelCactus(cx: number, baseY: number, scale: number): string {
  const w = Math.round(20 * scale);
  const h = Math.round(24 * scale);
  const x = cx - Math.round(w / 2);
  const y = baseY - h;
  const ribW = Math.max(2, Math.round(w / 5));
  let body = '';
  // 본체: 세로 능선 3톤 램프
  for (let i = 0; i < 5; i++) {
    const rx = x + i * ribW;
    const tone = i % 2 === 0 ? C.succBody : C.succDark;
    body += `<rect x="${rx}" y="${y}" width="${ribW}" height="${h}" fill="${tone}"/>`;
  }
  // 좌측 하이라이트 능선
  body += `<rect x="${x + ribW}" y="${y + 2}" width="${Math.max(1, Math.round(ribW / 2))}" height="${h - 4}" fill="${C.succLight}" opacity="0.7"/>`;
  // 가시 (밝은 점)
  let spines = '';
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      const sx = x + c * ribW + Math.round(ribW / 2);
      const sy = y + 3 + r * Math.round((h - 6) / 3);
      spines += `<rect x="${sx}" y="${sy}" width="1" height="1" fill="${C.potRim}" opacity="0.85"/>`;
    }
  }
  return `<g filter="url(#sgShadow)">
    ${groundShadow(cx, baseY, w * 0.6)}
    <rect x="${x - 1}" y="${y - 1}" width="${w + 2}" height="${h + 1}" rx="${Math.round(w / 3)}" fill="${C.soilDeep}" opacity="0.55"/>
    <g>${body}</g>
    ${spines}
    <ellipse cx="${cx}" cy="${y + 2}" rx="${Math.round(w * 0.42)}" ry="2" fill="${C.succLight}" opacity="0.5"/>
  </g>`;
}

// 아가베 로제트: 바깥으로 뻗는 뾰족한 잎들
function drawAgave(cx: number, baseY: number, scale: number): string {
  const len = Math.round(22 * scale);
  const baseW = Math.max(2, Math.round(4 * scale));
  const angles = [-72, -50, -28, -8, 8, 28, 50, 72, -90, 90];
  let leaves = '';
  for (const a of angles) {
    const rad = (a * Math.PI) / 180;
    const tx = cx + Math.sin(rad) * len;
    const ty = baseY - Math.cos(rad) * len * 0.78;
    const tone = a % 2 === 0 ? C.succBody : C.succDark;
    // 잎: 삼각형 폴리곤
    const px1 = cx - Math.cos(rad) * baseW;
    const py1 = baseY - Math.sin(rad) * baseW * 0.5;
    const px2 = cx + Math.cos(rad) * baseW;
    const py2 = baseY + Math.sin(rad) * baseW * 0.5;
    leaves += `<polygon points="${px1.toFixed(1)},${py1.toFixed(1)} ${px2.toFixed(1)},${py2.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}" fill="${tone}" stroke="${C.succDark}" stroke-width="0.6"/>`;
    // 잎 끝 가시
    leaves += `<rect x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" width="1.4" height="1.4" fill="${C.potRim}" opacity="0.85"/>`;
    // 중앙선 하이라이트
    leaves += `<line x1="${cx}" y1="${baseY}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="${C.succLight}" stroke-width="0.7" opacity="0.45"/>`;
  }
  return `<g filter="url(#sgShadow)">
    ${groundShadow(cx, baseY, len * 0.7)}
    ${leaves}
    <ellipse cx="${cx}" cy="${baseY - 2}" rx="${baseW + 1}" ry="2" fill="${C.succLight}" opacity="0.55"/>
  </g>`;
}

// 부채선인장 (프리클리 페어): 둥근 패드 2~3장
function drawPricklyPear(cx: number, baseY: number, scale: number): string {
  const padW = Math.round(14 * scale);
  const padH = Math.round(18 * scale);
  function pad(px: number, py: number, w: number, h: number): string {
    let dots = '';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        dots += `<rect x="${px - w / 2 + (c + 0.5) * (w / 3)}" y="${py - h + (r + 0.5) * (h / 3)}" width="1" height="1" fill="${C.potRim}" opacity="0.8"/>`;
      }
    }
    return `<g>
      <ellipse cx="${px}" cy="${py - h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${C.succDark}"/>
      <ellipse cx="${px}" cy="${py - h / 2}" rx="${w / 2 - 1.5}" ry="${h / 2 - 1.5}" fill="${C.succBody}"/>
      <ellipse cx="${px - 1.5}" cy="${py - h / 2 - 1}" rx="${w / 3.2}" ry="${h / 3.4}" fill="${C.succLight}" opacity="0.6"/>
      ${dots}
    </g>`;
  }
  return `<g filter="url(#sgShadow)">
    ${groundShadow(cx, baseY, padW * 0.85)}
    ${pad(cx, baseY, padW + 2, padH)}
    ${pad(cx - padW * 0.55, baseY - padH * 0.5, padW * 0.78, padH * 0.78)}
    ${pad(cx + padW * 0.55, baseY - padH * 0.55, padW * 0.82, padH * 0.82)}
  </g>`;
}

// 알로에: 위로 솟는 통통한 칼날잎
function drawAloe(cx: number, baseY: number, scale: number): string {
  const len = Math.round(20 * scale);
  const angles = [-40, -22, -7, 7, 22, 40];
  let leaves = '';
  for (const a of angles) {
    const rad = (a * Math.PI) / 180;
    const tx = cx + Math.sin(rad) * len;
    const ty = baseY - Math.cos(rad) * len;
    const w = Math.max(2, Math.round(3.2 * scale));
    const tone = a % 2 === 0 ? C.succBody : C.succDark;
    leaves += `<polygon points="${(cx - w).toFixed(1)},${baseY} ${(cx + w).toFixed(1)},${baseY} ${tx.toFixed(1)},${ty.toFixed(1)}" fill="${tone}" stroke="${C.succDark}" stroke-width="0.6"/>`;
    leaves += `<line x1="${cx}" y1="${baseY}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="${C.succLight}" stroke-width="0.8" opacity="0.5"/>`;
    // 잎 가장자리 가시
    leaves += `<rect x="${((cx + tx) / 2).toFixed(1)}" y="${((baseY + ty) / 2).toFixed(1)}" width="1" height="1" fill="${C.potLight}" opacity="0.7"/>`;
  }
  return `<g filter="url(#sgShadow)">
    ${groundShadow(cx, baseY, len * 0.55)}
    ${leaves}
    <ellipse cx="${cx}" cy="${baseY - 2}" rx="3" ry="2" fill="${C.succLight}" opacity="0.5"/>
  </g>`;
}

// 코랄 꽃 한 송이 (히어로 장식용)
function drawBloom(cx: number, cy: number, r: number): string {
  return `<g filter="url(#bloomGlow)">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.bloomDeep}"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 1}" fill="${C.bloom}"/>
    <circle cx="${cx - 0.6}" cy="${cy - 0.8}" r="${r * 0.55}" fill="${C.bloomLight}"/>
    <circle cx="${cx - 0.4}" cy="${cy - 0.6}" r="${r * 0.28}" fill="${C.bloomCore}"/>
  </g>`;
}

// 큰 사구아로 선인장 (히어로): 기둥 + 양팔
function drawSaguaro(cx: number, baseY: number, scale: number): string {
  const trunkW = Math.round(16 * scale);
  const trunkH = Math.round(62 * scale);
  const tx = cx - Math.round(trunkW / 2);
  const ty = baseY - trunkH;
  const armW = Math.round(11 * scale);
  // 능선 줄무늬
  let ribs = '';
  const ribN = 4;
  const rw = trunkW / ribN;
  for (let i = 0; i < ribN; i++) {
    const tone = i % 2 === 0 ? C.succBody : C.succDark;
    ribs += `<rect x="${tx + i * rw}" y="${ty}" width="${rw}" height="${trunkH}" fill="${tone}"/>`;
  }
  ribs += `<rect x="${tx + rw}" y="${ty + 3}" width="${Math.max(1, rw / 2)}" height="${trunkH - 6}" fill="${C.succLight}" opacity="0.6"/>`;
  // 왼팔
  const laY = baseY - Math.round(trunkH * 0.62);
  const leftArm = `
    <rect x="${tx - Math.round(14 * scale)}" y="${laY}" width="${Math.round(14 * scale)}" height="${armW}" rx="${Math.round(armW / 2)}" fill="${C.succDark}"/>
    <rect x="${tx - Math.round(14 * scale)}" y="${laY - Math.round(18 * scale)}" width="${armW}" height="${Math.round(20 * scale)}" rx="${Math.round(armW / 2)}" fill="${C.succBody}"/>
    <rect x="${tx - Math.round(14 * scale)}" y="${laY - Math.round(18 * scale)}" width="${armW}" height="${Math.round(20 * scale)}" rx="${Math.round(armW / 2)}" fill="none" stroke="${C.succDark}" stroke-width="0.6"/>
    <rect x="${tx - Math.round(12 * scale)}" y="${laY - Math.round(16 * scale)}" width="${Math.max(1, Math.round(armW / 3))}" height="${Math.round(16 * scale)}" fill="${C.succLight}" opacity="0.5"/>`;
  // 오른팔
  const raY = baseY - Math.round(trunkH * 0.48);
  const rightArm = `
    <rect x="${tx + trunkW}" y="${raY}" width="${Math.round(14 * scale)}" height="${armW}" rx="${Math.round(armW / 2)}" fill="${C.succDark}"/>
    <rect x="${tx + trunkW + Math.round(14 * scale) - armW}" y="${raY - Math.round(22 * scale)}" width="${armW}" height="${Math.round(24 * scale)}" rx="${Math.round(armW / 2)}" fill="${C.succBody}"/>
    <rect x="${tx + trunkW + Math.round(14 * scale) - armW}" y="${raY - Math.round(22 * scale)}" width="${armW}" height="${Math.round(24 * scale)}" rx="${Math.round(armW / 2)}" fill="none" stroke="${C.succDark}" stroke-width="0.6"/>
    <rect x="${tx + trunkW + Math.round(14 * scale) - armW + 1}" y="${raY - Math.round(20 * scale)}" width="${Math.max(1, Math.round(armW / 3))}" height="${Math.round(18 * scale)}" fill="${C.succLight}" opacity="0.5"/>`;
  // 가시 점
  let spines = '';
  for (let r = 0; r < 8; r++) {
    spines += `<rect x="${cx - 1}" y="${ty + 4 + r * Math.round((trunkH - 8) / 7)}" width="1" height="1" fill="${C.potRim}" opacity="0.7"/>`;
  }
  return `<g filter="url(#sgShadow)">
    ${groundShadow(cx, baseY, trunkW * 1.1)}
    <rect x="${tx - 1}" y="${ty - 1}" width="${trunkW + 2}" height="${trunkH + 1}" rx="${Math.round(trunkW / 2)}" fill="${C.soilDeep}" opacity="0.5"/>
    ${leftArm}
    ${rightArm}
    <g>${ribs}</g>
    <rect x="${tx}" y="${ty}" width="${trunkW}" height="${Math.round(trunkW / 2)}" rx="${Math.round(trunkW / 2)}" fill="${C.succLight}" opacity="0.35"/>
    ${spines}
    ${drawBloom(cx - trunkW * 0.2, ty + 1, 2.6 * scale)}
    ${drawBloom(cx + trunkW * 0.3, ty - 1, 2 * scale)}
  </g>`;
}

// 테라스 단(段) ledge 라인: 밝은 줄(soilEdge) + 그림자 줄(soilDeep)
// y는 그리드 위(약 300~306)에만 은은하게
function drawTerraceLedge(width: number, y: number): string {
  return `<rect x="0" y="${y}" width="${width}" height="1" fill="${C.soilEdge}" opacity="0.5"/>
    <rect x="0" y="${y + 1}" width="${width}" height="1" fill="${C.soilDeep}" opacity="0.45"/>`;
}

// 작은 자갈/돌멩이 한 개 (2~4px, 3톤 톤)
function drawPebble(px: number, py: number, sz: number, tone: string): string {
  return `<rect x="${px}" y="${py}" width="${sz}" height="${Math.max(2, sz - 1)}" rx="1" fill="${tone}"/>` +
    `<rect x="${px}" y="${py}" width="${sz}" height="1" fill="${C.potRim}" opacity="0.35"/>`;
}

// 테라스 lip / 식물 밑동 주변 자갈 흩뿌리기 (그리드 영역 y>305 제외)
function scatterPebbles(): string {
  const tones = [C.soilEdge, C.potShadow, C.soilTill];
  // [px, py, sz, toneIdx] — py는 모두 ≤305 (그리드 비침)
  const specs: [number, number, number, number][] = [
    [58, 302, 3, 0],  [90, 304, 2, 1],  [118, 301, 4, 2], [150, 305, 2, 0],
    [212, 303, 3, 1], [248, 305, 2, 2], [292, 302, 3, 0], [340, 304, 4, 1],
    [382, 301, 2, 2], [432, 305, 3, 0], [470, 303, 2, 1], [512, 304, 3, 2],
    [700, 302, 2, 0], [748, 305, 3, 1], [800, 303, 2, 2], [846, 304, 3, 0],
  ];
  return specs.map(([px, py, sz, t]) => drawPebble(px, py, sz, tones[t])).join('');
}

// 픽셀 계단식 메사 실루엣
function drawMesa(x: number, topY: number, w: number, h: number, color: string): string {
  const step = Math.max(6, Math.round(w / 8));
  let pts = `${x},${topY + h}`;
  // 좌측 계단 상승
  pts += ` ${x},${topY + Math.round(h * 0.35)} ${x + step},${topY + Math.round(h * 0.35)} ${x + step},${topY + Math.round(h * 0.12)} ${x + step * 2},${topY + Math.round(h * 0.12)} ${x + step * 2},${topY}`;
  // 평정 상단
  pts += ` ${x + w - step * 2},${topY} ${x + w - step * 2},${topY + Math.round(h * 0.12)} ${x + w - step},${topY + Math.round(h * 0.12)} ${x + w - step},${topY + Math.round(h * 0.35)} ${x + w},${topY + Math.round(h * 0.35)} ${x + w},${topY + h}`;
  return `<polygon points="${pts}" fill="${color}"/>`;
}

export function createSucculentBackground(config: SVGConfig): string {
  const { width, height } = config;

  // 흙 전경 시작 y
  const soilTop = 300;

  // 흩어진 다육/선인장 배치 (밑동 baseY 285~308)
  // 크기 편차 + 2~3개씩 모인 군집 + baseY 산포로 앞뒤 레이어감
  // (앞쪽=크고 아래(baseY↑), 뒤쪽=작고 위(baseY↓))
  // z-order: 뒤(작고 위) → 앞(크고 아래) 순으로 렌더
  // [cx, baseY, scale, 생성함수] — baseY 오름차순 정렬로 뒤(위)→앞(아래) 렌더
  type Spec = [number, number, number, (cx: number, b: number, s: number) => string];
  const plantSpecs: Spec[] = [
    // ── 군집 A: 좌측 (배럴 + 아가베 + 작은 알로에) ──
    [108, 289, 0.55, drawAloe],          // 뒤·작음
    [72, 303, 1.35, drawAgave],          // 앞·큼
    [126, 307, 1.2, drawBarrelCactus],   // 앞·큼, 살짝 겹침

    // 단독 중간 (좌중)
    [196, 296, 0.62, drawPricklyPear],   // 뒤·작음

    // ── 군집 B: 중앙 (아가베 큰것 + 부채 작은것) ──
    [262, 306, 1.45, drawAgave],         // 앞·큼
    [300, 300, 0.58, drawPricklyPear],   // 뒤·작음, 겹침
    [238, 290, 0.5, drawBarrelCactus],   // 뒤·작음

    // 단독 중간 (중우)
    [372, 305, 1.25, drawAloe],          // 앞·큼

    // ── 군집 C: 좌측 사구아로 아래 발치 (앞쪽 큰 무리) ──
    [448, 308, 1.4, drawBarrelCactus],   // 앞·큼
    [486, 301, 0.6, drawAgave],          // 뒤·작음, 겹침

    // 우측 원경 (작게 흩뿌림, 사구아로 주변 비움)
    [742, 293, 0.52, drawPricklyPear],   // 뒤·작음
    [792, 305, 1.15, drawAloe],          // 앞·중
    [836, 297, 0.56, drawAgave],         // 뒤·작음
    [706, 308, 0.85, drawBarrelCactus],  // 중간
  ];
  const plants = plantSpecs
    .slice()
    .sort((a, b) => a[1] - b[1])
    .map(([cx, b, s, fn]) => fn(cx, b, s));

  // 경작 줄무늬 (가로 till lines)
  let furrows = '';
  for (let i = 0; i < 7; i++) {
    const fy = soilTop + 16 + i * Math.round((height - soilTop - 20) / 7);
    furrows += `<rect x="0" y="${fy}" width="${width}" height="2" fill="${C.soilTill}" opacity="${0.35 - i * 0.02}"/>`;
  }

  return `<g id="succulent-background">
    <!-- 하늘 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#sgSky)"/>

    <!-- 저무는 해 (메사 뒤) -->
    <ellipse cx="600" cy="270" rx="130" ry="130" fill="url(#sgSun)"/>

    <!-- 메사 실루엣 3겹 (먼 곳에서 가까운 곳으로) -->
    ${drawMesa(40, 178, 280, 96, C.mesaFar)}
    ${drawMesa(470, 196, 330, 88, C.mesaFar)}
    ${drawMesa(0, 214, 360, 78, C.mesaMid)}
    ${drawMesa(560, 220, 300, 74, C.mesaMid)}
    ${drawMesa(180, 240, 360, 64, C.mesaNear)}
    ${drawMesa(540, 246, 360, 60, C.mesaNear)}

    <!-- 흙 전경 (테라스 지면) -->
    <rect x="0" y="${soilTop}" width="${width}" height="${height - soilTop}" fill="${C.soilBase}"/>
    <rect x="0" y="${soilTop}" width="${width}" height="3" fill="${C.soilEdge}"/>
    <rect x="0" y="${soilTop + 3}" width="${width}" height="2" fill="${C.potRim}" opacity="0.35"/>

    <!-- 테라스 단 ledge 라인 (그리드 위, 은은하게) -->
    ${drawTerraceLedge(width, soilTop + 6)}
    ${drawTerraceLedge(width, soilTop + 11)}

    <!-- 테라스 lip / 밑동 주변 자갈 (그리드 영역 y>305 제외) -->
    ${scatterPebbles()}
    ${furrows}
    <rect x="0" y="${height - 26}" width="${width}" height="26" fill="${C.soilDeep}" opacity="0.7"/>

    <!-- 흩어진 다육/선인장 (z-order: 위→아래) -->
    ${plants.join('\n    ')}

    <!-- 히어로: 큰 사구아로 (우측 1/3, 우뚝) -->
    ${drawSaguaro(625, 305, 1.7)}

    <!-- 테두리 프레임 -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="${C.soilEdge}" stroke-width="3"/>
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="${C.potRim}" stroke-width="1" opacity="0.3"/>
  </g>`;
}

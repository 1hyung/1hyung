// 설산 테마 등각 투영 스프라이트
// Level 0: 평지, Level 1: 소형 나무, Level 2: 민둥산, Level 3: 풀 덮힌 산, Level 4: 눈 덮인 산
// 각 레벨 GY (타일 기저 Y): [-, 17, 27, 39, 53] → heightOffset = GY - 7 = [0, 10, 20, 32, 46]

import { DragonLevel } from './types';

const MC = {
  // 기저 타일 (회청색 석판)
  tileTop:    '#6e8090',
  tileLeft:   '#3e5060',
  tileRight:  '#90a8b8',

  // Level 2: 민둥산 (따뜻한 흙+이끼)
  bareLeft:   '#7a6250',   // 왼쪽 그늘 (갈색 흙)
  bareRight:  '#ac8c6c',   // 오른쪽 빛 (밝은 갈색)
  bareHigh:   '#c8a880',   // 정상 밝은 흙
  bareMoss:   '#7a8858',   // 약간의 초록 이끼

  // Level 3: 풀 덮힌 산 (초록 초원+암석)
  rockLeft:   '#4a5c6e',   // 왼쪽 그늘 암석
  rockRight:  '#7898aa',   // 오른쪽 빛 암석
  rockHigh:   '#9ab8c8',   // 정상 하이라이트
  meadowL:    '#3a5c2e',   // 초록 초원 (왼쪽)
  meadowR:    '#588840',   // 초록 초원 (오른쪽)

  // Level 1/3: 침엽수/나무 색상
  pineLeft:   '#1a3c1e',   // 왼쪽 짙은 수관 그늘
  pineRight:  '#347838',   // 오른쪽 수관 빛
  pineMid:    '#2a5c2e',   // 중간 수관
  pineHigh:   '#4a8850',   // 수관 하이라이트
  capL:       '#404e5c',   // 정상 암석 왼쪽
  capR:       '#6082a0',   // 정상 암석 오른쪽

  // Level 4: 설산
  snowTop:    '#eef4ff',   // 눈 상면
  snowLeft:   '#d8b878',   // 알펜글로 노을빛 (왼쪽)
  snowRight:  '#f6faff',   // 오른쪽 순백
  snowShade:  '#90b4d0',   // 눈 그늘 (얼음 파랑)
  iceLeft:    '#364858',   // 빙하 하부 왼쪽
  iceRight:   '#4e7088',   // 빙하 하부 오른쪽
  glow:       '#e87828',   // 알펜글로 포인트
  glowSoft:   '#f4a850',   // 알펜글로 소프트
};

/**
 * Level 0: 평지 돌 타일 (W=20, H=14)
 * 다이아몬드 12px 높이 = cellHeight(12)와 완전 일치
 */
function createFlatGround(): string {
  return `<g>
    <!-- 상면 다이아몬드 -->
    <polygon points="10,1 20,7 10,13 0,7" fill="${MC.tileTop}"
             stroke="#1c2d40" stroke-width="0.8"/>
    <!-- 왼쪽 측면 -->
    <polygon points="0,7 10,13 10,14 0,8" fill="${MC.tileLeft}"/>
    <!-- 오른쪽 측면 -->
    <polygon points="10,13 20,7 20,8 10,14" fill="${MC.tileRight}"/>
  </g>`;
}

/**
 * Level 1: 소형 나무 — 둥근 수관 (W=22, H=30, GY=17)
 * 농장 나무 축소 버전. 시각 높이 = GY = 17px.
 * heightOffset = GY - 7 = 10
 */
function createSmallMountainTree(): string {
  const CX = 11;
  const GY = 17; // 기저 타일 상면 Y

  return `<g>
    <!-- 기저 타일 (20px 다이아몬드, CX±10) -->
    <polygon points="${CX},${GY} 21,${GY+5} ${CX},${GY+10} 1,${GY+5}" fill="${MC.tileTop}"
             stroke="#1c2d40" stroke-width="0.6"/>
    <polygon points="1,${GY+5} ${CX},${GY+10} ${CX},${GY+12} 1,${GY+7}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+10} 21,${GY+5} 21,${GY+7} ${CX},${GY+12}" fill="${MC.tileRight}"/>

    <!-- 나무 줄기 (그늘/빛 분할) -->
    <rect x="${CX-1.5}" y="${GY-5}" width="1.5" height="5" fill="#3d1e08"/>
    <rect x="${CX}" y="${GY-5}" width="1.5" height="5" fill="#7a4020"/>

    <!-- 수관 — 세 겹 타원 (둥근 캐노피) -->
    <ellipse cx="${CX}" cy="${GY-9}" rx="8" ry="7" fill="${MC.pineLeft}"/>
    <ellipse cx="${CX+1}" cy="${GY-10}" rx="6" ry="5.5" fill="${MC.pineMid}"/>
    <ellipse cx="${CX+2.5}" cy="${GY-12}" rx="3" ry="3" fill="${MC.pineHigh}" opacity="0.80"/>
  </g>`;
}

/**
 * Level 2: 민둥산 — 둥근 언덕 (W=30, H=42, GY=27)
 * 베지어 곡선 부드러운 돔. 시각 높이 = GY = 27px.
 * heightOffset = GY - 7 = 20
 */
function createRoundedBareHill(): string {
  const GY = 27;
  const CX = 15;
  const PY = 5; // 정상

  return `<g>
    <!-- 기저 타일 (20px 다이아몬드, CX±10) -->
    <polygon points="${CX},${GY} 25,${GY+5} ${CX},${GY+10} 5,${GY+5}" fill="${MC.tileTop}"/>
    <polygon points="5,${GY+5} ${CX},${GY+10} ${CX},${GY+12} 5,${GY+7}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+10} 25,${GY+5} 25,${GY+7} ${CX},${GY+12}" fill="${MC.tileRight}"/>

    <!-- 언덕 왼쪽 면 — 베지어 곡선 (그늘) -->
    <path d="M ${CX},${GY+10} L 5,${GY+5} Q 2,${GY-8} ${CX},${PY} Z" fill="${MC.bareLeft}"/>
    <!-- 언덕 오른쪽 면 — 베지어 곡선 (빛) -->
    <path d="M ${CX},${PY} Q 28,${GY-8} 25,${GY+5} L ${CX},${GY+10} Z" fill="${MC.bareRight}"/>
    <!-- 이끼 터치 -->
    <path d="M ${CX},${GY+8} L 7,${GY+3} Q 5,${GY-3} ${CX},${PY+8} Z"
          fill="${MC.bareMoss}" opacity="0.22"/>
    <!-- 정상 하이라이트 -->
    <ellipse cx="${CX}" cy="${PY+2}" rx="4.5" ry="2.5" fill="${MC.bareHigh}" opacity="0.60"/>
  </g>`;
}

/**
 * Level 3: 풀 덮힌 산 — 초원 하부 + 암석 상부 (W=36, H=54, GY=39)
 * 시각 높이 = GY = 39px. heightOffset = GY - 7 = 32
 */
function createRockyMountain(): string {
  const GY = 39;
  const CX = 18;
  const PY = 3;

  return `<g>
    <!-- 기저 타일 (20px 다이아몬드, CX±10) -->
    <polygon points="${CX},${GY} 28,${GY+6} ${CX},${GY+11} 8,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="8,${GY+6} ${CX},${GY+11} ${CX},${GY+13} 8,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+11} 28,${GY+6} 28,${GY+8} ${CX},${GY+13}" fill="${MC.tileRight}"/>

    <!-- 하부 초원 왼쪽 (풀밭) -->
    <polygon points="${CX},${GY+11} 8,${GY+6} 10,${GY-6} ${CX},${GY}" fill="${MC.meadowL}"/>
    <!-- 하부 초원 오른쪽 (풀밭) -->
    <polygon points="${CX},${GY} 26,${GY-6} 28,${GY+6} ${CX},${GY+11}" fill="${MC.meadowR}"/>

    <!-- 상부 암석 왼쪽 (비대칭 어깨) -->
    <polygon points="${CX},${GY} 10,${GY-6} 12,${GY-16} 14,${GY-28} ${CX},${PY}" fill="${MC.rockLeft}"/>
    <!-- 상부 암석 오른쪽 -->
    <polygon points="${CX},${PY} 22,${GY-28} 24,${GY-16} 26,${GY-6} ${CX},${GY}" fill="${MC.rockRight}"/>

    <!-- 정상 하이라이트 -->
    <polygon points="${CX},${PY} ${CX-3},${PY+6} ${CX+3},${PY+6}" fill="${MC.rockHigh}" opacity="0.7"/>
  </g>`;
}

/**
 * 구버전 Level 3: 침엽수림 산 (W=30, H=40) — 현재 미사용
 */
function createLushMountain(): string {
  const GY = 29;
  const CX = 15;
  const PY = 2;

  const lBody = `${CX},${GY+11} 2,${GY+6} 5,${GY-4} 8,${GY-12} 11,${GY-20} 13,${GY-24} ${CX},${PY}`;
  const rBody = `${CX},${PY} 17,${GY-24} 19,${GY-20} 22,${GY-12} 25,${GY-4} 28,${GY+6} ${CX},${GY+11}`;

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 29,${GY+6} ${CX},${GY+11} 1,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="1,${GY+6} ${CX},${GY+11} ${CX},${GY+13} 1,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+11} 29,${GY+6} 29,${GY+8} ${CX},${GY+13}" fill="${MC.tileRight}"/>

    <!-- 침엽수림 왼쪽 면 -->
    <polygon points="${lBody}" fill="${MC.pineLeft}"/>
    <!-- 침엽수림 오른쪽 면 -->
    <polygon points="${rBody}" fill="${MC.pineRight}"/>

    <!-- 침엽수 실루엣 — 왼쪽 사면 -->
    <polygon points="${CX-6},${GY-1} ${CX-10},${GY+5} ${CX-2},${GY+5}" fill="${MC.pineLeft}" opacity="0.95"/>
    <polygon points="${CX-5},${GY-7} ${CX-9},${GY-1} ${CX-1},${GY-1}" fill="${MC.pineMid}" opacity="0.90"/>
    <polygon points="${CX-4},${GY-13} ${CX-8},${GY-7} ${CX},${GY-7}" fill="${MC.pineLeft}" opacity="0.85"/>
    <polygon points="${CX-3},${GY-19} ${CX-7},${GY-13} ${CX+1},${GY-13}" fill="${MC.pineMid}" opacity="0.80"/>

    <!-- 침엽수 실루엣 — 오른쪽 사면 -->
    <polygon points="${CX+6},${GY-1} ${CX+2},${GY+5} ${CX+10},${GY+5}" fill="${MC.pineRight}" opacity="0.82"/>
    <polygon points="${CX+5},${GY-7} ${CX+1},${GY-1} ${CX+9},${GY-1}" fill="${MC.pineHigh}" opacity="0.75"/>
    <polygon points="${CX+4},${GY-13} ${CX},${GY-7} ${CX+8},${GY-7}" fill="${MC.pineRight}" opacity="0.70"/>
    <polygon points="${CX+3},${GY-19} ${CX-1},${GY-13} ${CX+7},${GY-13}" fill="${MC.pineHigh}" opacity="0.65"/>

    <!-- 정상 암석 캡 -->
    <polygon points="${CX},${PY} ${CX-3},${PY+7} ${CX},${PY+10}" fill="${MC.capL}"/>
    <polygon points="${CX},${PY} ${CX+3},${PY+7} ${CX},${PY+10}" fill="${MC.capR}"/>
    <polygon points="${CX},${PY} ${CX-1.5},${PY+3} ${CX+1.5},${PY+3}" fill="${MC.capR}" opacity="0.55"/>
  </g>`;
}

/**
 * Level 4: 설산 — 알펜글로 다봉 설산 (W=42, H=68, GY=53)
 * 불규칙 빙하 하부 + 눈 경계 + 알펜글로 정상
 * 시각 높이 = GY = 53px. heightOffset = GY - 7 = 46
 */
function createSnowMountain(): string {
  const GY = 53;
  const CX = 21;
  const PY = 1;
  const SB = 22; // 눈/암석 경계 Y (GY-31)

  // 왼쪽 빙하/암석 — 불규칙 산맥 실루엣
  const lRock = `${CX},${GY+12} 3,${GY+6} 6,${GY-4} 10,${GY-16} 13,${GY-31} ${CX},${SB}`;
  // 오른쪽 빙하/암석
  const rRock = `${CX},${SB} 29,${GY-31} 32,${GY-16} 36,${GY-4} 39,${GY+6} ${CX},${GY+12}`;

  return `<g>
    <!-- 기저 타일 (20px 다이아몬드, CX±10) -->
    <polygon points="${CX},${GY} 31,${GY+6} ${CX},${GY+12} 11,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="11,${GY+6} ${CX},${GY+12} ${CX},${GY+14} 11,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+12} 31,${GY+6} 31,${GY+8} ${CX},${GY+14}" fill="${MC.tileRight}"/>

    <!-- 하부 암석/빙하 왼쪽 -->
    <polygon points="${lRock}" fill="${MC.iceLeft}"/>
    <!-- 하부 암석/빙하 오른쪽 -->
    <polygon points="${rRock}" fill="${MC.iceRight}"/>

    <!-- 좌측 하부 그늘 -->
    <polygon points="${CX},${SB} 13,${GY-31} 10,${GY-16} 6,${GY-4} 3,${GY+6} ${CX},${GY+12}"
             fill="#1e2c38" opacity="0.25"/>

    <!-- 왼쪽 설면 (알펜글로 노을빛) -->
    <path d="M ${CX},${SB} L 4,${SB+16} Q 3,${SB+8} ${CX},${PY} Z" fill="${MC.snowLeft}"/>
    <!-- 알펜글로 상단 밝은 부분 -->
    <path d="M ${CX},${PY} Q 13,${PY+8} ${CX},${PY+13} Q 15,${PY+5} ${CX},${PY} Z"
          fill="${MC.glowSoft}" opacity="0.55"/>

    <!-- 오른쪽 설면 (순백) -->
    <path d="M ${CX},${PY} Q 39,${SB+8} 38,${SB+16} L ${CX},${SB} Z" fill="${MC.snowTop}"/>
    <!-- 오른쪽 최고 밝기 -->
    <path d="M ${CX},${PY} Q 29,${PY+8} ${CX},${PY+13} Q 25,${PY+5} ${CX},${PY} Z"
          fill="${MC.snowRight}" opacity="0.8"/>

    <!-- 눈 그늘 (얼음 파랑) -->
    <polygon points="${CX},${SB} 4,${SB+16} 9,${SB+9}" fill="${MC.snowShade}" opacity="0.50"/>

    <!-- 눈골 선 (gully) -->
    <line x1="${CX-7}" y1="${PY+6}" x2="${CX-5}" y2="${SB}"
          stroke="${MC.snowLeft}" stroke-width="0.8" opacity="0.40"/>
    <line x1="${CX+7}" y1="${PY+6}" x2="${CX+5}" y2="${SB}"
          stroke="${MC.snowTop}" stroke-width="0.8" opacity="0.38"/>

    <!-- 정상 순백 하이라이트 -->
    <polygon points="${CX},${PY} ${CX-3},${PY+6} ${CX+3},${PY+6}" fill="#ffffff"/>

    <!-- 알펜글로 광채 -->
    <polygon points="${CX},${PY} ${CX-4},${PY+8} ${CX},${PY+11} ${CX+4},${PY+8}"
             fill="${MC.glow}" opacity="0.32"/>
  </g>`;
}

export function createMountainSprite(level: DragonLevel): string {
  switch (level) {
    case 0: return createFlatGround();
    case 1: return createSmallMountainTree(); // 소형 나무 (H=30, offset=10)
    case 2: return createRoundedBareHill();   // 민둥산 (H=42, offset=20)
    case 3: return createRockyMountain();     // 풀 덮힌 산 (H=54, offset=32)
    case 4: return createSnowMountain();      // 눈 덮인 산 (H=68, offset=46)
    default: return '';
  }
}

export function getMountainSpriteSize(level: DragonLevel): { width: number; height: number } {
  switch (level) {
    case 0: return { width: 20, height: 14 };
    case 1: return { width: 22, height: 30 };  // 소형 나무
    case 2: return { width: 30, height: 42 };  // 민둥산
    case 3: return { width: 36, height: 54 };  // 풀 덮힌 산
    case 4: return { width: 42, height: 68 };  // 눈 덮인 산
    default: return { width: 20, height: 14 };
  }
}

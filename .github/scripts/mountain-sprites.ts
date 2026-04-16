// 설산 테마 등각 투영 스프라이트
// Level 0: 평지, Level 1: 소형 나무, Level 2: 민둥산, Level 3: 풀 덮힌 산, Level 4: 눈 덮인 산
// heightOffsets: [0, 10, 20, 32, 46]

import { DragonLevel } from './types';

const MC = {
  tileTop:    '#6e8090',
  tileLeft:   '#3e5060',
  tileRight:  '#90a8b8',

  bareLeft:   '#7a6250',
  bareRight:  '#ac8c6c',
  bareHigh:   '#c8a880',
  bareMoss:   '#7a8858',

  meadowL:    '#3a5c2e',
  meadowR:    '#588840',
  grassDark:  '#284820',
  grassMid:   '#4a7830',
  grassHigh:  '#78b848',

  pineLeft:   '#1a3c1e',
  pineRight:  '#347838',
  pineMid:    '#2a5c2e',
  pineHigh:   '#4a8850',
  capL:       '#404e5c',
  capR:       '#6082a0',

  iceLeft:    '#364858',
  iceRight:   '#4e7088',
};

/** Level 0: 평지 돌 타일 (W=20, H=14) */
function createFlatGround(): string {
  return `<g>
    <polygon points="10,1 20,7 10,13 0,7" fill="${MC.tileTop}"
             stroke="#1c2d40" stroke-width="0.8"/>
    <polygon points="0,7 10,13 10,14 0,8" fill="${MC.tileLeft}"/>
    <polygon points="10,13 20,7 20,8 10,14" fill="${MC.tileRight}"/>
  </g>`;
}

/**
 * Level 1: 소형 나무 (W=22, H=30, GY=17)
 * 농장 나무 색상(leafDark/Green/Mid/Light) + ellipse 렌더링으로 파일 크기 최소화
 * 픽셀 아트 방식은 rect 90+개/타일 → 수MB 파일 폭증 문제로 ellipse 방식 사용
 * heightOffset = GY - 7 = 10
 */
function createSmallMountainTree(): string {
  const CX = 11;
  const GY = 17;

  // 팜 나무 색상 (farm-colors.ts와 동일)
  const leafDark  = '#1d4a0d';
  const leafGreen = '#2d6b18';
  const leafMid   = '#4a8c30';
  const leafLight = '#6aae48';
  const trunkBrown= '#8b4513';
  const trunkDark = '#5c2d0e';

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 21,${GY+5} ${CX},${GY+10} 1,${GY+5}" fill="${MC.tileTop}"
             stroke="#1c2d40" stroke-width="0.6"/>
    <polygon points="1,${GY+5} ${CX},${GY+10} ${CX},${GY+12} 1,${GY+7}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+10} 21,${GY+5} 21,${GY+7} ${CX},${GY+12}" fill="${MC.tileRight}"/>

    <!-- 나무 줄기 (그늘/빛 분할) -->
    <rect x="${CX-1.5}" y="${GY-5}" width="1.5" height="5" fill="${trunkDark}"/>
    <rect x="${CX}" y="${GY-5}" width="1.5" height="5" fill="${trunkBrown}"/>

    <!-- 수관 — 팜 나무 색상 레이어드 ellipse (leafDark 외곽→Green→Mid→Light 하이라이트) -->
    <ellipse cx="${CX}" cy="${GY-9}" rx="8.5" ry="7.5" fill="${leafDark}"/>
    <ellipse cx="${CX}" cy="${GY-9}" rx="7.5" ry="6.5" fill="${leafGreen}"/>
    <ellipse cx="${CX}" cy="${GY-8.5}" rx="6" ry="5" fill="${leafMid}"/>
    <ellipse cx="${CX-1}" cy="${GY-11}" rx="4.5" ry="3.5" fill="${leafLight}"/>
    <ellipse cx="${CX-0.5}" cy="${GY-13}" rx="2.5" ry="2" fill="${leafLight}" opacity="0.75"/>
  </g>`;
}

/**
 * Level 2: 민둥산 — 둥근 동산 (W=30, H=42, GY=27)
 * 베지어 + 정상 타원으로 부드러운 돔 형태
 * heightOffset = GY - 7 = 20
 */
function createRoundedBareHill(): string {
  const GY = 27;
  const CX = 15;
  const PY = 6; // 베지어 수렴점 (실제 정상은 타원)

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 25,${GY+5} ${CX},${GY+10} 5,${GY+5}" fill="${MC.tileTop}"/>
    <polygon points="5,${GY+5} ${CX},${GY+10} ${CX},${GY+12} 5,${GY+7}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+10} 25,${GY+5} 25,${GY+7} ${CX},${GY+12}" fill="${MC.tileRight}"/>

    <!-- 언덕 왼쪽 — 베지어 (그늘), 정상 타원 수렴점으로 -->
    <path d="M ${CX},${GY+10} L 5,${GY+5} Q 2,${GY-6} ${CX},${PY+2} Z" fill="${MC.bareLeft}"/>
    <!-- 언덕 오른쪽 — 베지어 (빛) -->
    <path d="M ${CX},${PY+2} Q 28,${GY-6} 25,${GY+5} L ${CX},${GY+10} Z" fill="${MC.bareRight}"/>
    <!-- 둥근 정상 돔 — 타원으로 뾰족한 끝 없애기 -->
    <ellipse cx="${CX}" cy="${PY+2}" rx="8" ry="5.5" fill="${MC.bareRight}"/>
    <!-- 정상 이끼 (약간의 초록 느낌) -->
    <ellipse cx="${CX-1}" cy="${PY+1}" rx="5" ry="3.5" fill="${MC.bareMoss}" opacity="0.32"/>
    <!-- 정상 하이라이트 -->
    <ellipse cx="${CX+1}" cy="${PY}" rx="4" ry="2.5" fill="${MC.bareHigh}" opacity="0.72"/>
  </g>`;
}

/**
 * Level 3: 풀 덮힌 산 — 전체 초록 (W=36, H=54, GY=39)
 * 초원 하부 + 짙은 초록 상부 (암석 없음)
 * heightOffset = GY - 7 = 32
 */
function createRockyMountain(): string {
  const GY = 39;
  const CX = 18;
  const PY = 3;

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 28,${GY+6} ${CX},${GY+11} 8,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="8,${GY+6} ${CX},${GY+11} ${CX},${GY+13} 8,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+11} 28,${GY+6} 28,${GY+8} ${CX},${GY+13}" fill="${MC.tileRight}"/>

    <!-- 하부 초원 왼쪽 -->
    <polygon points="${CX},${GY+11} 8,${GY+6} 10,${GY-6} ${CX},${GY}" fill="${MC.meadowL}"/>
    <!-- 하부 초원 오른쪽 -->
    <polygon points="${CX},${GY} 26,${GY-6} 28,${GY+6} ${CX},${GY+11}" fill="${MC.meadowR}"/>

    <!-- 상부 풀 왼쪽 (짙은 초록) -->
    <polygon points="${CX},${GY} 10,${GY-6} 12,${GY-16} 14,${GY-28} ${CX},${PY}" fill="${MC.grassDark}"/>
    <!-- 상부 풀 오른쪽 (중간 초록) -->
    <polygon points="${CX},${PY} 22,${GY-28} 24,${GY-16} 26,${GY-6} ${CX},${GY}" fill="${MC.grassMid}"/>

    <!-- 정상 밝은 초록 하이라이트 -->
    <polygon points="${CX},${PY} ${CX-3},${PY+6} ${CX+3},${PY+6}" fill="${MC.grassHigh}" opacity="0.85"/>
    <!-- 정상 둥근 처리 -->
    <ellipse cx="${CX}" cy="${PY+3}" rx="4" ry="3" fill="${MC.grassMid}"/>
    <ellipse cx="${CX+1}" cy="${PY+2}" rx="2.5" ry="2" fill="${MC.grassHigh}" opacity="0.7"/>
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
    <polygon points="${CX},${GY} 29,${GY+6} ${CX},${GY+11} 1,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="1,${GY+6} ${CX},${GY+11} ${CX},${GY+13} 1,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+11} 29,${GY+6} 29,${GY+8} ${CX},${GY+13}" fill="${MC.tileRight}"/>
    <polygon points="${lBody}" fill="${MC.pineLeft}"/>
    <polygon points="${rBody}" fill="${MC.pineRight}"/>
    <polygon points="${CX-6},${GY-1} ${CX-10},${GY+5} ${CX-2},${GY+5}" fill="${MC.pineLeft}" opacity="0.95"/>
    <polygon points="${CX-5},${GY-7} ${CX-9},${GY-1} ${CX-1},${GY-1}" fill="${MC.pineMid}" opacity="0.90"/>
    <polygon points="${CX-4},${GY-13} ${CX-8},${GY-7} ${CX},${GY-7}" fill="${MC.pineLeft}" opacity="0.85"/>
    <polygon points="${CX-3},${GY-19} ${CX-7},${GY-13} ${CX+1},${GY-13}" fill="${MC.pineMid}" opacity="0.80"/>
    <polygon points="${CX+6},${GY-1} ${CX+2},${GY+5} ${CX+10},${GY+5}" fill="${MC.pineRight}" opacity="0.82"/>
    <polygon points="${CX+5},${GY-7} ${CX+1},${GY-1} ${CX+9},${GY-1}" fill="${MC.pineHigh}" opacity="0.75"/>
    <polygon points="${CX+4},${GY-13} ${CX},${GY-7} ${CX+8},${GY-7}" fill="${MC.pineRight}" opacity="0.70"/>
    <polygon points="${CX+3},${GY-19} ${CX-1},${GY-13} ${CX+7},${GY-13}" fill="${MC.pineHigh}" opacity="0.65"/>
    <polygon points="${CX},${PY} ${CX-3},${PY+7} ${CX},${PY+10}" fill="${MC.capL}"/>
    <polygon points="${CX},${PY} ${CX+3},${PY+7} ${CX},${PY+10}" fill="${MC.capR}"/>
    <polygon points="${CX},${PY} ${CX-1.5},${PY+3} ${CX+1.5},${PY+3}" fill="${MC.capR}" opacity="0.55"/>
  </g>`;
}

/**
 * Level 4: 눈 덮인 산 — 2봉 설산 (W=42, H=68, GY=53)
 * 두 개의 눈 덮인 봉우리, 차가운 청백색 설면
 * heightOffset = GY - 7 = 46
 */
function createSnowMountain(): string {
  const GY = 53;
  const CX = 21;
  const SB = 22; // 눈/암석 경계 Y

  // 좌봉: (CX-7, 3) = (14, 3)
  // 우봉: (CX+8, 1) = (29, 1)  ← 약간 더 높음
  // 안부(saddle): (CX, 12) = (21, 12)

  // 빙하/암석 기저 — 왼쪽 (좌봉 아래까지)
  const lRock = `${CX},${GY+12} 3,${GY+6} 6,${GY-4} 10,${GY-16} 8,${SB} ${CX},${SB}`;
  // 빙하/암석 기저 — 오른쪽 (우봉 아래까지)
  const rRock = `${CX},${SB} 35,${SB} 36,${GY-4} 39,${GY+6} ${CX},${GY+12}`;

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 31,${GY+6} ${CX},${GY+12} 11,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="11,${GY+6} ${CX},${GY+12} ${CX},${GY+14} 11,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+12} 31,${GY+6} 31,${GY+8} ${CX},${GY+14}" fill="${MC.tileRight}"/>

    <!-- 빙하/암석 기저 -->
    <polygon points="${lRock}" fill="${MC.iceLeft}"/>
    <polygon points="${rRock}" fill="${MC.iceRight}"/>
    <!-- 좌측 그늘 -->
    <polygon points="${CX},${SB} 8,${SB} 10,${GY-16} 6,${GY-4} 3,${GY+6} ${CX},${GY+12}"
             fill="#1e2c38" opacity="0.22"/>

    <!-- 왼쪽 봉우리 눈 (그늘면 — 차가운 파랑) -->
    <path d="M 8,${SB} Q 9,6 14,3 Q 19,13 ${CX},${SB} Z"
          fill="#c0d4f0"/>
    <!-- 왼쪽 봉우리 밝은 하이라이트 -->
    <path d="M 14,3 Q 17,1 18,4 Q 17,8 14,6 Z"
          fill="#eef6ff" opacity="0.85"/>

    <!-- 오른쪽 봉우리 눈 (주봉, 밝은 청백색) -->
    <path d="M ${CX},${SB} Q 23,13 29,1 Q 34,6 35,${SB} Z"
          fill="#daeeff"/>
    <!-- 오른쪽 봉우리 최고 밝음 -->
    <path d="M 29,1 Q 33,3 32,6 Q 28,5 29,1 Z"
          fill="#ffffff" opacity="0.90"/>

    <!-- 왼쪽 봉우리 정상 순백 -->
    <polygon points="14,3 12,7 16,7" fill="#ffffff"/>
    <!-- 오른쪽 봉우리 정상 순백 -->
    <polygon points="29,1 27,5 31,5" fill="#ffffff"/>

    <!-- 안부(saddle) 연결 눈 — 두 봉우리 사이 이음 -->
    <path d="M 14,6 Q 21,14 29,5 Q 21,16 14,6 Z"
          fill="#d0e4f8" opacity="0.55"/>

    <!-- 눈골 선 (좌봉) -->
    <line x1="14" y1="3" x2="10" y2="${SB}"
          stroke="#a8c8e8" stroke-width="0.7" opacity="0.38"/>
    <!-- 눈골 선 (우봉) -->
    <line x1="29" y1="1" x2="32" y2="${SB}"
          stroke="#e0f0ff" stroke-width="0.7" opacity="0.36"/>
  </g>`;
}

export function createMountainSprite(level: DragonLevel): string {
  switch (level) {
    case 0: return createFlatGround();
    case 1: return createSmallMountainTree(); // 소형 나무 픽셀 아트 (H=30, offset=10)
    case 2: return createRoundedBareHill();   // 둥근 민둥산 (H=42, offset=20)
    case 3: return createRockyMountain();     // 풀 덮힌 산 전체 초록 (H=54, offset=32)
    case 4: return createSnowMountain();      // 2봉 설산 (H=68, offset=46)
    default: return '';
  }
}

export function getMountainSpriteSize(level: DragonLevel): { width: number; height: number } {
  switch (level) {
    case 0: return { width: 20, height: 14 };
    case 1: return { width: 22, height: 30 };
    case 2: return { width: 30, height: 42 };
    case 3: return { width: 36, height: 54 };
    case 4: return { width: 42, height: 68 };
    default: return { width: 20, height: 14 };
  }
}

// 설산 테마 등각 투영 스프라이트 — 자연스러운 산 / 산맥 스타일
// 베지어 곡선 + 다면 폴리곤으로 피라미드 대신 실제 산 형태 구현
// Level 0: 평지, Level 1: 민둥산(둥근 언덕), Level 2: 바위산, Level 3: 침엽수림 산, Level 4: 설산

import { DragonLevel } from './types';

const MC = {
  // 기저 타일 (회청색 석판)
  tileTop:    '#6e8090',
  tileLeft:   '#3e5060',
  tileRight:  '#90a8b8',

  // Level 1: 민둥산 (따뜻한 흙+초록)
  bareLeft:   '#7a6250',   // 왼쪽 그늘 (갈색 흙)
  bareRight:  '#ac8c6c',   // 오른쪽 빛 (밝은 갈색)
  bareHigh:   '#c8a880',   // 정상 밝은 흙
  bareMoss:   '#7a8858',   // 약간의 초록 이끼

  // Level 2: 바위 산 (회색+초록 혼합)
  rockLeft:   '#4a5c6e',   // 왼쪽 그늘 암석
  rockRight:  '#7898aa',   // 오른쪽 빛 암석
  rockHigh:   '#9ab8c8',   // 정상 하이라이트
  meadowL:    '#3a5c2e',   // 초록 초원 (아래 왼쪽)
  meadowR:    '#588840',   // 초록 초원 (아래 오른쪽)

  // Level 3: 침엽수림 산
  pineLeft:   '#1a3c1e',   // 왼쪽 짙은 침엽수 그늘
  pineRight:  '#347838',   // 오른쪽 침엽수 빛
  pineMid:    '#2a5c2e',   // 중간 침엽수
  pineHigh:   '#4a8850',   // 침엽수 하이라이트
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
 * 다이아몬드 높이 12px = cellHeight(12)와 완전 일치 → 타일 간 갭 없는 테셀레이션
 * 외곽선(stroke)으로 등각 격자선 가시화 → 입체감 강화
 */
function createFlatGround(): string {
  return `<g>
    <!-- 상면 다이아몬드 (12px 높이, stroke으로 격자선 표시) -->
    <polygon points="10,1 20,7 10,13 0,7" fill="${MC.tileTop}"
             stroke="#1c2d40" stroke-width="0.8"/>
    <!-- 왼쪽 측면 (1px) -->
    <polygon points="0,7 10,13 10,14 0,8" fill="${MC.tileLeft}"/>
    <!-- 오른쪽 측면 (1px) -->
    <polygon points="10,13 20,7 20,8 10,14" fill="${MC.tileRight}"/>
  </g>`;
}

/**
 * Level 1: 민둥산 — 둥근 언덕 (W=22, H=28)
 * 베지어 곡선으로 부드러운 돔 형태
 */
function createRoundedBareHill(): string {
  const GY = 17; // 지면 Y
  const CX = 11;
  const PY = 6;  // 정상

  return `<g>
    <!-- 기저 타일 상면 -->
    <polygon points="${CX},${GY} 21,${GY+5} ${CX},${GY+10} 1,${GY+5}" fill="${MC.tileTop}"/>
    <polygon points="1,${GY+5} ${CX},${GY+10} ${CX},${GY+12} 1,${GY+7}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+10} 21,${GY+5} 21,${GY+7} ${CX},${GY+12}" fill="${MC.tileRight}"/>

    <!-- 언덕 왼쪽 면 — 베지어 곡선 (그늘) -->
    <path d="M ${CX},${GY+10} L 1,${GY+5} Q 0,${GY-4} ${CX},${PY} Z" fill="${MC.bareLeft}"/>
    <!-- 언덕 오른쪽 면 — 베지어 곡선 (빛) -->
    <path d="M ${CX},${PY} Q 22,${GY-4} 21,${GY+5} L ${CX},${GY+10} Z" fill="${MC.bareRight}"/>
    <!-- 약간의 이끼 (자연스러운 녹색 터치) -->
    <path d="M ${CX},${GY+8} L 4,${GY+4} Q 3,${GY} ${CX},${PY+6} Z"
          fill="${MC.bareMoss}" opacity="0.22"/>
    <!-- 정상 둥근 하이라이트 -->
    <ellipse cx="${CX}" cy="${PY+1.5}" rx="3.5" ry="2" fill="${MC.bareHigh}" opacity="0.60"/>
  </g>`;
}

/**
 * Level 2: 바위 산 — 어깨(Shoulder) + 초원 사면 (W=26, H=34)
 * 비대칭 어깨로 산맥 느낌, 하부 초원 + 상부 암석
 */
function createRockyMountain(): string {
  const GY = 23;
  const CX = 13;
  const PY = 3;

  // 왼쪽 면: 어깨 포함한 6점 폴리곤 (비대칭 산 실루엣)
  const lBody = `${CX},${GY+11} 1,${GY+6} 4,${GY-3} 7,${GY-11} 10,${GY-18} ${CX},${PY}`;
  // 오른쪽 면: 약간 다른 경사 (비대칭)
  const rBody = `${CX},${PY} 16,${GY-18} 20,${GY-9} 23,${GY-2} 25,${GY+6} ${CX},${GY+11}`;

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 25,${GY+6} ${CX},${GY+11} 1,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="1,${GY+6} ${CX},${GY+11} ${CX},${GY+13} 1,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+11} 25,${GY+6} 25,${GY+8} ${CX},${GY+13}" fill="${MC.tileRight}"/>

    <!-- 하부 초원 왼쪽 (풀밭) -->
    <polygon points="${CX},${GY+11} 1,${GY+6} 4,${GY-3} ${CX},${GY+2}" fill="${MC.meadowL}"/>
    <!-- 하부 초원 오른쪽 (풀밭) -->
    <polygon points="${CX},${GY+2} 23,${GY-2} 25,${GY+6} ${CX},${GY+11}" fill="${MC.meadowR}"/>

    <!-- 상부 암석 왼쪽 면 (불규칙 어깨) -->
    <polygon points="${CX},${GY+2} 4,${GY-3} 7,${GY-11} 10,${GY-18} ${CX},${PY}" fill="${MC.rockLeft}"/>
    <!-- 상부 암석 오른쪽 면 (비대칭) -->
    <polygon points="${CX},${PY} 16,${GY-18} 20,${GY-9} 23,${GY-2} ${CX},${GY+2}" fill="${MC.rockRight}"/>

    <!-- 정상 하이라이트 -->
    <polygon points="${CX},${PY} ${CX-2},${PY+4} ${CX+2},${PY+4}" fill="${MC.rockHigh}" opacity="0.7"/>
  </g>`;
}

/**
 * Level 3: 침엽수림 산 — 다능선 + 나무 실루엣 (W=30, H=40)
 * 불규칙 산 능선 + 침엽수 삼각형 실루엣
 */
function createLushMountain(): string {
  const GY = 29;
  const CX = 15;
  const PY = 2;

  // 왼쪽 산 몸체 (여러 어깨/능선이 있는 불규칙한 산 형태)
  const lBody = `${CX},${GY+11} 2,${GY+6} 5,${GY-4} 8,${GY-12} 11,${GY-20} 13,${GY-24} ${CX},${PY}`;
  // 오른쪽 산 몸체 (비대칭)
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

    <!-- 침엽수 실루엣 — 왼쪽 사면 (삼각형 겹침) -->
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
 * Level 4: 설산 — 알펜글로 다봉 설산 (W=32, H=46)
 * 불규칙 암석 하부 + 눈 경계 + 알펜글로 정상
 */
function createSnowMountain(): string {
  const GY = 35;
  const CX = 16;
  const PY = 1;
  const SB = 18; // 눈/암석 경계 Y

  // 왼쪽 빙하/암석 하부 — 불규칙 산맥 실루엣
  const lRock = `${CX},${GY+11} 2,${GY+6} 5,${GY-3} 8,${GY-12} 10,${GY-22} ${CX},${SB}`;
  // 오른쪽 빙하/암석 하부
  const rRock = `${CX},${SB} 22,${GY-22} 24,${GY-12} 27,${GY-3} 30,${GY+6} ${CX},${GY+11}`;

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 30,${GY+6} ${CX},${GY+12} 2,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="2,${GY+6} ${CX},${GY+12} ${CX},${GY+14} 2,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+12} 30,${GY+6} 30,${GY+8} ${CX},${GY+14}" fill="${MC.tileRight}"/>

    <!-- 하부 암석/빙하 왼쪽 (불규칙 산 형태) -->
    <polygon points="${lRock}" fill="${MC.iceLeft}"/>
    <!-- 하부 암석/빙하 오른쪽 -->
    <polygon points="${rRock}" fill="${MC.iceRight}"/>

    <!-- 설면 경계 이하 왼쪽 어둡게 -->
    <polygon points="${CX},${SB} 10,${GY-22} 8,${GY-12} 5,${GY-3} 2,${GY+6} ${CX},${GY+11}"
             fill="#1e2c38" opacity="0.25"/>

    <!-- 왼쪽 설면 (알펜글로 노을빛) — 베지어 곡선 -->
    <path d="M ${CX},${SB} L 4,${SB+12} Q 3,${SB+5} ${CX},${PY} Z" fill="${MC.snowLeft}"/>
    <!-- 알펜글로 상단 밝은 부분 -->
    <path d="M ${CX},${PY} Q 10,${PY+5} ${CX},${PY+9} Q 12,${PY+4} ${CX},${PY} Z"
          fill="${MC.glowSoft}" opacity="0.55"/>

    <!-- 오른쪽 설면 (순백) — 베지어 곡선 -->
    <path d="M ${CX},${PY} Q 29,${SB+5} 28,${SB+12} L ${CX},${SB} Z" fill="${MC.snowTop}"/>
    <!-- 오른쪽 최고 밝기 -->
    <path d="M ${CX},${PY} Q 21,${PY+5} ${CX},${PY+9} Q 18,${PY+5} ${CX},${PY} Z"
          fill="${MC.snowRight}" opacity="0.8"/>

    <!-- 눈 그늘 (얼음 파랑) -->
    <polygon points="${CX},${SB} 4,${SB+12} 8,${SB+6}" fill="${MC.snowShade}" opacity="0.50"/>

    <!-- 눈골 선 (gully) -->
    <line x1="${CX-5}" y1="${PY+4}" x2="${CX-4}" y2="${SB}" stroke="${MC.snowLeft}" stroke-width="0.7" opacity="0.40"/>
    <line x1="${CX+5}" y1="${PY+4}" x2="${CX+4}" y2="${SB}" stroke="${MC.snowTop}" stroke-width="0.7" opacity="0.38"/>

    <!-- 정상 순백 하이라이트 -->
    <polygon points="${CX},${PY} ${CX-2},${PY+4} ${CX+2},${PY+4}" fill="#ffffff"/>

    <!-- 알펜글로 광채 -->
    <polygon points="${CX},${PY} ${CX-3},${PY+5} ${CX},${PY+7} ${CX+3},${PY+5}"
             fill="${MC.glow}" opacity="0.32"/>
  </g>`;
}

export function createMountainSprite(level: DragonLevel): string {
  switch (level) {
    case 0: return createFlatGround();
    case 1: return createRoundedBareHill();
    case 2: return createRockyMountain();
    case 3: return createLushMountain();
    case 4: return createSnowMountain();
    default: return '';
  }
}

export function getMountainSpriteSize(level: DragonLevel): { width: number; height: number } {
  switch (level) {
    case 0: return { width: 20, height: 14 };
    case 1: return { width: 22, height: 28 };
    case 2: return { width: 26, height: 34 };
    case 3: return { width: 30, height: 40 };
    case 4: return { width: 32, height: 46 };
    default: return { width: 20, height: 14 };
  }
}

// 설산 테마 등각 투영 스프라이트 — 카툰 스타일 클린 그레이
// 밝고 선명한 중간 회색 계열, 3~4면 폴리곤으로 깔끔한 입체감
// 좌면=그늘(어두운), 우면=빛(밝은), 능선=하이라이트

import { DragonLevel } from './types';

const MC = {
  // 기저 타일 (플랫 스톤)
  tileTop:    '#6e8090',  // 타일 상면
  tileLeft:   '#3e5060',  // 타일 왼쪽 그늘
  tileRight:  '#90a8b8',  // 타일 오른쪽 빛
  tileLine:   '#2e4050',  // 타일 테두리 선
  // 암석 계열 (밝은 중간 회색)
  rockTop:    '#6a7e8e',  // 암석 상면
  rockLeft:   '#3a5060',  // 암석 왼쪽 그늘
  rockRight:  '#8aa0b0',  // 암석 오른쪽 빛
  rockHigh:   '#a8bcc8',  // 암석 하이라이트 (능선)
  // 초록 산 계열
  greenLeft:  '#3a6030',  // 초록 왼쪽 그늘
  greenRight: '#5a9048',  // 초록 오른쪽 빛
  greenHigh:  '#78b860',  // 초록 능선 하이라이트
  rockCapL:   '#506070',  // 암석 정상 왼쪽
  rockCapR:   '#7090a0',  // 암석 정상 오른쪽
  // 침엽수 계열
  pineLeft:   '#1e4820',  // 침엽수 왼쪽 그늘
  pineRight:  '#3a7040',  // 침엽수 오른쪽 빛
  pineHigh:   '#58a060',  // 침엽수 능선
  pineCap:    '#4a7850',  // 침엽수 정상 암석
  // 설산 계열
  snowTop:    '#eef4ff',  // 눈 상면 (순백)
  snowLeft:   '#e8c890',  // 알펜글로 (노을빛 왼쪽)
  snowRight:  '#f8fcff',  // 눈 오른쪽 (가장 밝음)
  snowShade:  '#a8c0d8',  // 눈 그늘 (얼음 파랑)
  iceLeft:    '#4a6070',  // 빙하 하부 왼쪽
  iceRight:   '#6a8898',  // 빙하 하부 오른쪽
  glow:       '#e87828',  // 알펜글로 포인트
  glowSoft:   '#f4a850',  // 알펜글로 소프트
};

/**
 * Level 0: 평지 돌 타일 (W=20, H=14)
 * 협곡 바닥의 납작한 석판
 */
function createFlatGround(): string {
  return `<g>
    <!-- 상면 마름모 -->
    <polygon points="10,1 20,6 10,11 0,6" fill="${MC.tileTop}"/>
    <!-- 왼쪽 면 -->
    <polygon points="0,6 10,11 10,13 0,8" fill="${MC.tileLeft}"/>
    <!-- 오른쪽 면 -->
    <polygon points="10,11 20,6 20,8 10,13" fill="${MC.tileRight}"/>
    <!-- 상면 내부 선 (석판 느낌) -->
    <line x1="10" y1="1" x2="20" y2="6" stroke="${MC.tileLine}" stroke-width="0.5" opacity="0.4"/>
    <line x1="10" y1="1" x2="0" y2="6" stroke="${MC.tileLine}" stroke-width="0.5" opacity="0.4"/>
  </g>`;
}

/**
 * Level 1: 작은 바위 언덕 (W=22, H=28)
 * 넓적한 등각 투영 바위 블록
 */
function createSmallHill(): string {
  const BX = 1, BY = 18; // 기저 타일 좌측 상단
  const BW = 20, BH = 10; // 기저 타일 너비/높이
  const CX = 11; // 중앙 X
  const TY = 6;  // 정상 Y

  return `<g>
    <!-- 기저 타일 상면 -->
    <polygon points="${CX},${BY} ${BX+BW},${BY+5} ${CX},${BY+10} ${BX},${BY+5}" fill="${MC.tileTop}"/>
    <!-- 기저 왼쪽 -->
    <polygon points="${BX},${BY+5} ${CX},${BY+10} ${CX},${BY+12} ${BX},${BY+7}" fill="${MC.tileLeft}"/>
    <!-- 기저 오른쪽 -->
    <polygon points="${CX},${BY+10} ${BX+BW},${BY+5} ${BX+BW},${BY+7} ${CX},${BY+12}" fill="${MC.tileRight}"/>

    <!-- 언덕 왼쪽 면 (그늘) -->
    <polygon points="${CX},${TY} ${BX},${BY+5} ${CX},${BY+10}" fill="${MC.rockLeft}"/>
    <!-- 언덕 오른쪽 면 (빛) -->
    <polygon points="${CX},${TY} ${BX+BW},${BY+5} ${CX},${BY+10}" fill="${MC.rockRight}"/>
    <!-- 능선 하이라이트 -->
    <polygon points="${CX},${TY} ${CX-2},${TY+4} ${CX+2},${TY+4}" fill="${MC.rockHigh}" opacity="0.7"/>
  </g>`;
}

/**
 * Level 2: 초기 푸른 산 (W=26, H=34)
 * 암석 정상 + 초록 사면, 클린 4면
 */
function createEarlyGreenMountain(): string {
  const GY = 24;
  const CX = 13;

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 25,${GY+5} ${CX},${GY+10} 1,${GY+5}" fill="${MC.tileTop}"/>
    <polygon points="1,${GY+5} ${CX},${GY+10} ${CX},${GY+12} 1,${GY+7}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+10} 25,${GY+5} 25,${GY+7} ${CX},${GY+12}" fill="${MC.tileRight}"/>

    <!-- 초록 사면 왼쪽 (그늘) -->
    <polygon points="${CX},2 1,${GY+5} ${CX},${GY+10}" fill="${MC.greenLeft}"/>
    <!-- 초록 사면 오른쪽 (빛) -->
    <polygon points="${CX},2 25,${GY+5} ${CX},${GY+10}" fill="${MC.greenRight}"/>

    <!-- 암석 정상 왼쪽 -->
    <polygon points="${CX},2 ${CX-5},9 ${CX},12" fill="${MC.rockCapL}"/>
    <!-- 암석 정상 오른쪽 -->
    <polygon points="${CX},2 ${CX+5},9 ${CX},12" fill="${MC.rockCapR}"/>
    <!-- 능선 하이라이트 -->
    <polygon points="${CX},2 ${CX-2},5 ${CX+2},5" fill="${MC.rockHigh}" opacity="0.65"/>
  </g>`;
}

/**
 * Level 3: 침엽수림 산 (W=30, H=40)
 * 짙은 침엽수 + 암석 정상, 선명한 면 구성
 */
function createLushMountain(): string {
  const GY = 30;
  const CX = 15;

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 29,${GY+6} ${CX},${GY+11} 1,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="1,${GY+6} ${CX},${GY+11} ${CX},${GY+13} 1,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+11} 29,${GY+6} 29,${GY+8} ${CX},${GY+13}" fill="${MC.tileRight}"/>

    <!-- 침엽수 사면 왼쪽 (그늘) -->
    <polygon points="${CX},2 1,${GY+6} ${CX},${GY+11}" fill="${MC.pineLeft}"/>
    <!-- 침엽수 사면 오른쪽 (빛) -->
    <polygon points="${CX},2 29,${GY+6} ${CX},${GY+11}" fill="${MC.pineRight}"/>

    <!-- 암석 정상 -->
    <polygon points="${CX},2 ${CX-4},8 ${CX},11" fill="${MC.rockCapL}"/>
    <polygon points="${CX},2 ${CX+4},8 ${CX},11" fill="${MC.rockCapR}"/>
    <polygon points="${CX},2 ${CX-2},5 ${CX+2},5" fill="${MC.rockHigh}" opacity="0.6"/>

    <!-- 침엽수 실루엣 — 왼쪽 (삼각형 3개) -->
    <polygon points="${CX-8},${GY-2} ${CX-12},${GY+4} ${CX-4},${GY+4}" fill="${MC.pineLeft}" opacity="0.92"/>
    <polygon points="${CX-6},${GY-7} ${CX-10},${GY-1} ${CX-2},${GY-1}" fill="${MC.pineLeft}" opacity="0.85"/>
    <polygon points="${CX-4},${GY-12} ${CX-8},${GY-6} ${CX},${GY-6}" fill="${MC.pineCap}" opacity="0.78"/>

    <!-- 침엽수 실루엣 — 오른쪽 (삼각형 3개) -->
    <polygon points="${CX+8},${GY-2} ${CX+4},${GY+4} ${CX+12},${GY+4}" fill="${MC.pineRight}" opacity="0.80"/>
    <polygon points="${CX+6},${GY-7} ${CX+2},${GY-1} ${CX+10},${GY-1}" fill="${MC.pineRight}" opacity="0.72"/>
    <polygon points="${CX+4},${GY-12} ${CX},${GY-6} ${CX+8},${GY-6}" fill="${MC.pineHigh}" opacity="0.65"/>
  </g>`;
}

/**
 * Level 4: 설산 — 알펜글로 (W=32, H=46)
 * 정상 순백 + 알펜글로 노을빛 왼면 + 그늘 얼음 오른면
 */
function createSnowMountain(): string {
  const GY = 36;
  const CX = 16;
  const SB = 18; // 눈/암석 경계 Y

  return `<g>
    <!-- 기저 타일 -->
    <polygon points="${CX},${GY} 30,${GY+6} ${CX},${GY+12} 2,${GY+6}" fill="${MC.tileTop}"/>
    <polygon points="2,${GY+6} ${CX},${GY+12} ${CX},${GY+14} 2,${GY+8}" fill="${MC.tileLeft}"/>
    <polygon points="${CX},${GY+12} 30,${GY+6} 30,${GY+8} ${CX},${GY+14}" fill="${MC.tileRight}"/>

    <!-- 하부 빙하/암석 왼쪽 -->
    <polygon points="${CX},0 2,${GY+6} ${CX},${GY+12}" fill="${MC.iceLeft}"/>
    <!-- 하부 빙하/암석 오른쪽 -->
    <polygon points="${CX},0 30,${GY+6} ${CX},${GY+12}" fill="${MC.iceRight}"/>

    <!-- 눈 경계 — 왼쪽 설면 (알펜글로) -->
    <polygon points="${CX},0 4,${SB} ${CX},${SB+6}" fill="${MC.snowLeft}"/>
    <!-- 알펜글로 상단 강조 -->
    <polygon points="${CX},0 10,8 ${CX},10" fill="${MC.glowSoft}" opacity="0.65"/>

    <!-- 눈 경계 — 오른쪽 설면 (순백) -->
    <polygon points="${CX},0 28,${SB} ${CX},${SB+6}" fill="${MC.snowTop}"/>
    <!-- 오른쪽 상단 최고 밝기 -->
    <polygon points="${CX},0 22,8 ${CX},10" fill="${MC.snowRight}" opacity="0.9"/>

    <!-- 눈 그늘 (얼음 파랑) -->
    <polygon points="${CX},${SB+6} 4,${SB} 8,${SB+6}" fill="${MC.snowShade}" opacity="0.55"/>

    <!-- 설산 눈골 선 -->
    <line x1="${CX-5}" y1="5" x2="${CX-4}" y2="${SB}" stroke="${MC.snowLeft}" stroke-width="0.8" opacity="0.45"/>
    <line x1="${CX+5}" y1="5" x2="${CX+4}" y2="${SB}" stroke="${MC.snowTop}" stroke-width="0.8" opacity="0.4"/>

    <!-- 정상 순백 하이라이트 -->
    <polygon points="${CX},0 ${CX-2},3.5 ${CX+2},3.5" fill="#ffffff"/>
    <polygon points="${CX},0 ${CX-1.5},5 ${CX+1.5},5" fill="${MC.snowTop}" opacity="0.9"/>

    <!-- 알펜글로 광채 -->
    <polygon points="${CX},0 ${CX-3},5 ${CX},6.5 ${CX+3},5" fill="${MC.glow}" opacity="0.35"/>
  </g>`;
}

export function createMountainSprite(level: DragonLevel): string {
  switch (level) {
    case 0: return createFlatGround();
    case 1: return createSmallHill();
    case 2: return createEarlyGreenMountain();
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

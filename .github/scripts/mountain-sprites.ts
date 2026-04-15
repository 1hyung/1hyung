// 설산 테마 등각 투영 스프라이트 (5단계 저폴리곤)
// 시점: 정면 우측 위 30° 등각 투영
// 왼쪽 면 = 그늘(어두운), 오른쪽 면 = 빛(밝은)

import { DragonLevel } from './types';

const MC = {
  earthBrown: '#8a7050',
  earthDark:  '#6a5030',
  earthLight: '#aa9070',
  hillDark:   '#4a3e32',
  hillMid:    '#6a5848',
  hillLight:  '#8a7868',
  rockDark:   '#1e2535',
  rockMid:    '#2e3848',
  rockLight:  '#5a6878',
  grassDark:  '#2a6020',
  grassMid:   '#408030',
  grassLight: '#58a040',
  pineDeep:   '#0d3018',
  pineDark:   '#1a5025',
  pineMid:    '#286535',
  pineLight:  '#388045',
  snowBright: '#f0f4ff',
  snowWarm:   '#f5c890',
  snowCool:   '#c0d0e8',
  alpenglow:  '#e87040',
};

/**
 * Level 0: 평지 (W=20, H=14)
 * 기여 없음 - 아무것도 없는 평평한 등각 투영 타일
 */
function createFlatGround(): string {
  return `<g>
    <polygon points="10,0 20,5 10,10 0,5" fill="${MC.earthBrown}"/>
    <polygon points="0,5 10,10 10,14 0,9" fill="${MC.earthDark}"/>
    <polygon points="10,10 20,5 20,9 10,14" fill="${MC.earthLight}" opacity="0.85"/>
    <polygon points="5,2.5 10,0 15,2.5 10,5" fill="${MC.earthLight}" opacity="0.22"/>
  </g>`;
}

/**
 * Level 1: 작은 언덕 (W=22, H=26)
 * 나무 없는 낮은 암석 언덕
 */
function createSmallHill(): string {
  const GY = 18;
  return `<g>
    <!-- 기저 타일 -->
    <polygon points="11,${GY - 2} 21,${GY + 3} 11,${GY + 8} 1,${GY + 3}" fill="${MC.earthBrown}" opacity="0.62"/>
    <polygon points="1,${GY + 3} 11,${GY + 8} 11,${GY + 10} 1,${GY + 5}" fill="${MC.earthDark}" opacity="0.62"/>
    <polygon points="11,${GY + 8} 21,${GY + 3} 21,${GY + 5} 11,${GY + 10}" fill="${MC.earthLight}" opacity="0.5"/>
    <!-- 언덕 왼쪽 면 (그늘) -->
    <polygon points="11,5 1,${GY + 3} 11,${GY + 8}" fill="${MC.hillDark}"/>
    <!-- 언덕 오른쪽 면 (빛) -->
    <polygon points="11,5 21,${GY + 3} 11,${GY + 8}" fill="${MC.hillMid}"/>
    <!-- 능선 하이라이트 -->
    <polygon points="11,5 9,9 13,9" fill="${MC.hillLight}" opacity="0.72"/>
    <!-- 암석 질감 -->
    <polygon points="5,12 3,16 7,15" fill="${MC.rockDark}" opacity="0.28"/>
    <polygon points="17,12 15,16 19,15" fill="${MC.earthLight}" opacity="0.2"/>
  </g>`;
}

/**
 * Level 2: 초기 푸른 산 (W=26, H=32)
 * 연한 잔디와 풀이 돋아난 산, 암석 정상
 */
function createEarlyGreenMountain(): string {
  const GY = 23;
  return `<g>
    <!-- 기저 타일 -->
    <polygon points="13,${GY - 2} 25,${GY + 4} 13,${GY + 9} 1,${GY + 4}" fill="${MC.earthBrown}" opacity="0.5"/>
    <polygon points="1,${GY + 4} 13,${GY + 9} 13,${GY + 11} 1,${GY + 6}" fill="${MC.earthDark}" opacity="0.5"/>
    <polygon points="13,${GY + 9} 25,${GY + 4} 25,${GY + 6} 13,${GY + 11}" fill="${MC.earthLight}" opacity="0.4"/>
    <!-- 산 왼쪽 면 (어두운 초록) -->
    <polygon points="13,3 1,${GY + 4} 13,${GY + 9}" fill="${MC.grassDark}"/>
    <!-- 산 오른쪽 면 (밝은 초록) -->
    <polygon points="13,3 25,${GY + 4} 13,${GY + 9}" fill="${MC.grassMid}"/>
    <!-- 상단 암석 -->
    <polygon points="13,3 9,10 17,10" fill="${MC.rockLight}"/>
    <!-- 중간 초목 강조 -->
    <polygon points="7,18 1,${GY + 4} 13,${GY + 9} 25,${GY + 4} 19,18" fill="${MC.grassLight}" opacity="0.28"/>
    <!-- 암석 정상 하이라이트 -->
    <polygon points="13,3 11,6 15,6" fill="#d8d8c8" opacity="0.5"/>
  </g>`;
}

/**
 * Level 3: 울창한 숲이 덮인 산 (W=30, H=38)
 * 침엽수 빽빽하게 덮인 짙은 녹색 산
 */
function createLushMountain(): string {
  const GY = 28;
  return `<g>
    <!-- 기저 타일 -->
    <polygon points="15,${GY - 2} 28,${GY + 4} 15,${GY + 10} 2,${GY + 4}" fill="${MC.earthBrown}" opacity="0.42"/>
    <polygon points="2,${GY + 4} 15,${GY + 10} 15,${GY + 12} 2,${GY + 6}" fill="${MC.earthDark}" opacity="0.42"/>
    <polygon points="15,${GY + 10} 28,${GY + 4} 28,${GY + 6} 15,${GY + 12}" fill="${MC.earthLight}" opacity="0.32"/>
    <!-- 산 왼쪽 (짙은 숲) -->
    <polygon points="15,2 2,${GY + 4} 15,${GY + 10}" fill="${MC.pineDeep}"/>
    <!-- 산 오른쪽 (밝은 숲) -->
    <polygon points="15,2 28,${GY + 4} 15,${GY + 10}" fill="${MC.pineDark}"/>
    <!-- 암석 정상 -->
    <polygon points="15,2 11,8 19,8" fill="${MC.rockMid}"/>
    <!-- 숲 중간 밝은 부분 -->
    <polygon points="15,14 8,22 15,26 22,22" fill="${MC.pineMid}" opacity="0.52"/>
    <!-- 침엽수 왼쪽 실루엣 -->
    <polygon points="5,25 2,29 8,29" fill="${MC.pineDeep}" opacity="0.92"/>
    <polygon points="9,22 6,26 12,26" fill="${MC.pineDeep}" opacity="0.88"/>
    <!-- 침엽수 오른쪽 실루엣 -->
    <polygon points="25,25 22,29 28,29" fill="${MC.pineMid}" opacity="0.72"/>
    <polygon points="21,22 18,26 24,26" fill="${MC.pineMid}" opacity="0.82"/>
    <!-- 숲 능선 빛 -->
    <polygon points="15,10 12,14 18,14" fill="${MC.pineLight}" opacity="0.45"/>
    <!-- 정상 암석 하이라이트 -->
    <polygon points="15,2 13,5 17,5" fill="${MC.rockLight}" opacity="0.5"/>
  </g>`;
}

/**
 * Level 4: 설산 - 알펜글로 노을 (W=32, H=44)
 * 정상에 눈이 쌓이고 노을빛(알펜글로)이 감도는 웅장한 설산
 */
function createSnowMountain(): string {
  const GY = 34;
  return `<g>
    <!-- 기저 타일 (바위/흙) -->
    <polygon points="16,${GY - 2} 30,${GY + 4} 16,${GY + 10} 2,${GY + 4}" fill="${MC.rockMid}" opacity="0.5"/>
    <polygon points="2,${GY + 4} 16,${GY + 10} 16,${GY + 12} 2,${GY + 6}" fill="${MC.rockDark}" opacity="0.5"/>
    <polygon points="16,${GY + 10} 30,${GY + 4} 30,${GY + 6} 16,${GY + 12}" fill="${MC.rockLight}" opacity="0.38"/>
    <!-- 산 하부 왼쪽 (어두운 암석) -->
    <polygon points="16,0 2,${GY + 4} 16,${GY + 10}" fill="${MC.rockDark}"/>
    <!-- 산 하부 오른쪽 (중간 암석) -->
    <polygon points="16,0 30,${GY + 4} 16,${GY + 10}" fill="${MC.rockMid}"/>
    <!-- 눈 경계 아래 왼쪽 암석면 -->
    <polygon points="5,14 2,${GY + 4} 16,${GY + 10} 16,20" fill="#1c2438"/>
    <!-- 눈 경계 아래 오른쪽 암석면 -->
    <polygon points="27,14 30,${GY + 4} 16,${GY + 10} 16,20" fill="#28303e"/>
    <!-- 왼쪽 설면 (알펜글로 따뜻한 노을빛) -->
    <polygon points="16,0 5,14 16,20" fill="${MC.snowWarm}"/>
    <!-- 오른쪽 설면 (밝은 흰색) -->
    <polygon points="16,0 27,14 16,20" fill="${MC.snowBright}"/>
    <!-- 눈 그늘 (얼음 파란 그늘) -->
    <polygon points="16,20 5,14 9,20" fill="${MC.snowCool}" opacity="0.52"/>
    <!-- 정상 순백 하이라이트 -->
    <polygon points="16,0 14,3 18,3" fill="#fff8f0"/>
    <!-- 알펜글로 광채 (정상) -->
    <polygon points="16,0 13,5 16,7 19,5" fill="${MC.alpenglow}" opacity="0.42"/>
    <!-- 눈 결 질감 -->
    <line x1="10" y1="7" x2="13" y2="12" stroke="${MC.snowWarm}" stroke-width="0.8" opacity="0.48"/>
    <line x1="22" y1="7" x2="19" y2="12" stroke="${MC.snowBright}" stroke-width="0.8" opacity="0.42"/>
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

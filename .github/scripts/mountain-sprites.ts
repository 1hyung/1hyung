// 설산 테마 등각 투영 스프라이트 (5단계 저폴리곤, 협곡/산맥 스타일)
// 다면 폴리곤으로 매끄럽고 입체적인 느낌
// 좌면=그늘(어두운), 우면=빛(밝은), 능선=하이라이트

import { DragonLevel } from './types';

const MC = {
  // 땅/암석 계열
  earthA:   '#7a6848',  // 메인 흙색
  earthB:   '#5e5038',  // 어두운 흙
  earthC:   '#9a8860',  // 밝은 흙 하이라이트
  rockA:    '#1c2432',  // 가장 어두운 암석 (그늘)
  rockB:    '#28333e',  // 중간 암석
  rockC:    '#384858',  // 밝은 암석 면
  rockD:    '#506070',  // 암석 하이라이트
  // 식물 계열
  grassA:   '#2a5818',  // 짙은 초록 그늘
  grassB:   '#3c7828',  // 기본 초록
  grassC:   '#56a038',  // 밝은 초록
  pineA:    '#0a2810',  // 가장 짙은 침엽수
  pineB:    '#163820',  // 짙은 침엽수
  pineC:    '#1e5030',  // 중간 침엽수
  pineD:    '#2a6840',  // 밝은 침엽수
  // 눈/설산 계열
  snowA:    '#f0f4ff',  // 밝은 흰 눈 (빛 받는 면)
  snowB:    '#f4d8a8',  // 알펜글로 노을빛 눈 (왼쪽 면)
  snowC:    '#b8ccec',  // 그늘진 눈 (얼음 파랑)
  snowD:    '#d0e4f8',  // 연한 눈 그늘
  // 알펜글로
  glow:     '#e86820',  // 알펜글로 포인트
  glowSoft: '#f5a860',  // 부드러운 노을빛
};

/**
 * Level 0: 평지 (W=20, H=14)
 * 기여 없음 — 협곡 바닥의 납작한 암석 타일
 */
function createFlatGround(): string {
  return `<g>
    <polygon points="10,0 20,5 10,10 0,5" fill="${MC.earthA}"/>
    <polygon points="0,5 10,10 10,14 0,9" fill="${MC.earthB}"/>
    <polygon points="10,10 20,5 20,9 10,14" fill="${MC.earthC}" opacity="0.78"/>
    <!-- 타일 상면 미묘한 질감 -->
    <polygon points="5,2.5 10,0 15,2.5 10,5" fill="${MC.earthC}" opacity="0.18"/>
    <line x1="0" y1="5" x2="10" y2="0" stroke="${MC.earthB}" stroke-width="0.5" opacity="0.25"/>
  </g>`;
}

/**
 * Level 1: 작은 바위 언덕 (W=22, H=28)
 * 완만하게 솟아오른 암석 언덕, 식물 없음
 * 3개 면으로 입체감 강화
 */
function createSmallHill(): string {
  const GY = 20;  // 언덕 기저선
  return `<g>
    <!-- 기저 타일 -->
    <polygon points="11,${GY-2} 21,${GY+3} 11,${GY+8} 1,${GY+3}" fill="${MC.earthA}" opacity="0.6"/>
    <polygon points="1,${GY+3} 11,${GY+8} 11,${GY+10} 1,${GY+5}" fill="${MC.earthB}" opacity="0.6"/>
    <polygon points="11,${GY+8} 21,${GY+3} 21,${GY+5} 11,${GY+10}" fill="${MC.earthC}" opacity="0.5"/>
    <!-- 언덕 왼쪽 그늘면 -->
    <polygon points="11,5 1,${GY+3} 11,${GY+8}" fill="${MC.rockA}"/>
    <!-- 언덕 왼쪽 중간면 -->
    <polygon points="11,5 6,${GY-3} 1,${GY+3}" fill="${MC.rockB}"/>
    <!-- 언덕 오른쪽 빛면 -->
    <polygon points="11,5 21,${GY+3} 11,${GY+8}" fill="${MC.rockC}"/>
    <!-- 언덕 오른쪽 위면 (하이라이트) -->
    <polygon points="11,5 16,${GY-3} 21,${GY+3}" fill="${MC.rockD}" opacity="0.7"/>
    <!-- 능선 하이라이트 -->
    <polygon points="11,5 9.5,8 12.5,8" fill="${MC.rockD}" opacity="0.8"/>
    <!-- 암석 면 질감 -->
    <line x1="4" y1="11" x2="8" y2="16" stroke="${MC.rockA}" stroke-width="0.7" opacity="0.4"/>
    <line x1="14" y1="11" x2="18" y2="15" stroke="${MC.rockD}" stroke-width="0.7" opacity="0.3"/>
  </g>`;
}

/**
 * Level 2: 초기 푸른 산 (W=26, H=34)
 * 암석 정상 + 하부 초록, 4면 폴리곤
 */
function createEarlyGreenMountain(): string {
  const GY = 25;
  return `<g>
    <!-- 기저 타일 -->
    <polygon points="13,${GY-2} 25,${GY+4} 13,${GY+9} 1,${GY+4}" fill="${MC.earthA}" opacity="0.48"/>
    <polygon points="1,${GY+4} 13,${GY+9} 13,${GY+11} 1,${GY+6}" fill="${MC.earthB}" opacity="0.48"/>
    <polygon points="13,${GY+9} 25,${GY+4} 25,${GY+6} 13,${GY+11}" fill="${MC.earthC}" opacity="0.38"/>
    <!-- 하부 초록 왼쪽 -->
    <polygon points="13,3 1,${GY+4} 13,${GY+9}" fill="${MC.grassA}"/>
    <!-- 하부 초록 오른쪽 -->
    <polygon points="13,3 25,${GY+4} 13,${GY+9}" fill="${MC.grassB}"/>
    <!-- 초록 중간 밝은 부분 -->
    <polygon points="13,3 20,${GY-4} 25,${GY+4} 13,${GY+9}" fill="${MC.grassC}" opacity="0.35"/>
    <!-- 상단 암석 왼쪽 -->
    <polygon points="13,3 7,12 13,15" fill="${MC.rockB}"/>
    <!-- 상단 암석 오른쪽 -->
    <polygon points="13,3 19,12 13,15" fill="${MC.rockC}"/>
    <!-- 암석 정상 하이라이트 -->
    <polygon points="13,3 11,6.5 15,6.5" fill="${MC.rockD}" opacity="0.65"/>
    <!-- 초목 경계 질감 -->
    <polygon points="8,18 1,${GY+4} 13,${GY+9} 25,${GY+4} 18,18" fill="${MC.grassC}" opacity="0.22"/>
  </g>`;
}

/**
 * Level 3: 울창한 침엽수림 산 (W=30, H=40)
 * 빽빽한 침엽수 실루엣, 암석 정상, 5면
 */
function createLushMountain(): string {
  const GY = 30;
  return `<g>
    <!-- 기저 타일 -->
    <polygon points="15,${GY-2} 28,${GY+4} 15,${GY+10} 2,${GY+4}" fill="${MC.earthA}" opacity="0.4"/>
    <polygon points="2,${GY+4} 15,${GY+10} 15,${GY+12} 2,${GY+6}" fill="${MC.earthB}" opacity="0.4"/>
    <polygon points="15,${GY+10} 28,${GY+4} 28,${GY+6} 15,${GY+12}" fill="${MC.earthC}" opacity="0.3"/>
    <!-- 산 왼쪽 침엽수 그늘 -->
    <polygon points="15,2 2,${GY+4} 15,${GY+10}" fill="${MC.pineA}"/>
    <!-- 산 왼쪽 침엽수 중간 -->
    <polygon points="15,2 8,${GY-4} 2,${GY+4}" fill="${MC.pineB}"/>
    <!-- 산 오른쪽 침엽수 빛 -->
    <polygon points="15,2 28,${GY+4} 15,${GY+10}" fill="${MC.pineC}"/>
    <!-- 산 오른쪽 침엽수 하이라이트 -->
    <polygon points="15,2 22,${GY-4} 28,${GY+4}" fill="${MC.pineD}" opacity="0.65"/>
    <!-- 암석 정상 -->
    <polygon points="15,2 11,8 19,8" fill="${MC.rockB}"/>
    <polygon points="15,2 13,5 17,5" fill="${MC.rockD}" opacity="0.6"/>
    <!-- 중간 숲 밝은 능선 -->
    <polygon points="15,14 9,22 15,25 21,22" fill="${MC.pineD}" opacity="0.45"/>
    <!-- 침엽수 왼쪽 실루엣 (3겹) -->
    <polygon points="4,26 1,31 7,31" fill="${MC.pineA}" opacity="0.95"/>
    <polygon points="8,23 5,27 11,27" fill="${MC.pineB}" opacity="0.9"/>
    <polygon points="12,20 9,24 15,24" fill="${MC.pineB}" opacity="0.85"/>
    <!-- 침엽수 오른쪽 실루엣 (3겹) -->
    <polygon points="26,26 23,31 29,31" fill="${MC.pineD}" opacity="0.72"/>
    <polygon points="22,23 19,27 25,27" fill="${MC.pineC}" opacity="0.82"/>
    <polygon points="18,20 15,24 21,24" fill="${MC.pineC}" opacity="0.78"/>
    <!-- 능선 숲 경계 -->
    <polygon points="15,10 12,13 18,13" fill="${MC.pineD}" opacity="0.38"/>
  </g>`;
}

/**
 * Level 4: 설산 — 알펜글로 노을 (W=32, H=46)
 * 정상 순백 + 노을빛 왼면 + 그늘 얼음 오른면 + 하부 암석
 * 가장 드라마틱하고 세밀한 5면 구성
 */
function createSnowMountain(): string {
  const GY = 36;
  return `<g>
    <!-- 기저 타일 (어두운 바위) -->
    <polygon points="16,${GY-2} 30,${GY+4} 16,${GY+10} 2,${GY+4}" fill="${MC.rockB}" opacity="0.48"/>
    <polygon points="2,${GY+4} 16,${GY+10} 16,${GY+12} 2,${GY+6}" fill="${MC.rockA}" opacity="0.48"/>
    <polygon points="16,${GY+10} 30,${GY+4} 30,${GY+6} 16,${GY+12}" fill="${MC.rockC}" opacity="0.38"/>

    <!-- 하부 암석 왼쪽 (어두운 그늘) -->
    <polygon points="16,0 2,${GY+4} 16,${GY+10}" fill="${MC.rockA}"/>
    <!-- 하부 암석 왼쪽 중간면 -->
    <polygon points="16,0 8,${GY-4} 2,${GY+4}" fill="${MC.rockB}"/>
    <!-- 하부 암석 오른쪽 -->
    <polygon points="16,0 30,${GY+4} 16,${GY+10}" fill="${MC.rockB}"/>
    <!-- 하부 암석 오른쪽 밝은면 -->
    <polygon points="16,0 24,${GY-4} 30,${GY+4}" fill="${MC.rockC}" opacity="0.7"/>

    <!-- 눈 경계 하부 암석 어두운 면 조정 -->
    <polygon points="4,14 2,${GY+4} 16,${GY+10} 16,20" fill="#181e2a"/>
    <polygon points="28,14 30,${GY+4} 16,${GY+10} 16,20" fill="#222838"/>

    <!-- 왼쪽 설면 (알펜글로 — 따뜻한 노을빛) -->
    <polygon points="16,0 4,14 16,20" fill="${MC.snowB}"/>
    <!-- 왼쪽 설면 상단 (더 밝은 노을) -->
    <polygon points="16,0 10,8 16,10" fill="${MC.glowSoft}" opacity="0.7"/>

    <!-- 오른쪽 설면 (밝은 흰 눈) -->
    <polygon points="16,0 28,14 16,20" fill="${MC.snowA}"/>
    <!-- 오른쪽 설면 상단 (가장 밝은 부분) -->
    <polygon points="16,0 22,8 16,10" fill="#ffffff" opacity="0.65"/>

    <!-- 눈 그늘 (얼음 파란 그늘) -->
    <polygon points="16,20 4,14 8,20" fill="${MC.snowC}" opacity="0.55"/>
    <polygon points="16,20 4,14 7,17" fill="${MC.snowD}" opacity="0.35"/>

    <!-- 설산 눈 골 (gully) 질감 -->
    <line x1="11" y1="5" x2="13" y2="13" stroke="${MC.snowB}" stroke-width="0.8" opacity="0.5"/>
    <line x1="9"  y1="8" x2="11" y2="14" stroke="#e0c898" stroke-width="0.6" opacity="0.4"/>
    <line x1="21" y1="5" x2="19" y2="13" stroke="${MC.snowA}" stroke-width="0.8" opacity="0.42"/>
    <line x1="23" y1="8" x2="21" y2="14" stroke="${MC.snowD}" stroke-width="0.6" opacity="0.35"/>

    <!-- 정상 순백 하이라이트 -->
    <polygon points="16,0 14.5,3 17.5,3" fill="#ffffff"/>
    <polygon points="16,0 15,4.5 17,4.5" fill="${MC.snowA}" opacity="0.9"/>

    <!-- 알펜글로 광채 (정상 근처) -->
    <polygon points="16,0 13,5 16,6.5 19,5" fill="${MC.glow}" opacity="0.38"/>
    <!-- 알펜글로 광채 퍼짐 -->
    <polygon points="16,0 12,7 15,8 16,6" fill="${MC.glowSoft}" opacity="0.22"/>
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

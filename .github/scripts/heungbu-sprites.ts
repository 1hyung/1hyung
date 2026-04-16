// 흥부네 커밋 — 볏짚 번들 스프라이트 (flat grid 14×14px 셀)
// 레벨별로 색이 다른 볏짚 묶음 표현

import { DragonLevel } from './types';
import { HEUNGBU_COLORS as H } from './heungbu-colors';

// 레벨별 볏짚 베이스 색상
const STRAW_COLORS = [
  H.strawLevel0,  // 0: 창백한 밀짚 (기여 없음)
  H.strawLevel1,  // 1: 연한 황금빛
  H.strawLevel2,  // 2: 중간 황금빛
  H.strawLevel3,  // 3: 진한 황금빛
  H.strawLevel4,  // 4: 짙은 호박빛
] as const;

/**
 * 볏짚 묶음 텍스처 — 14×14px 셀 전체를 채우는 오버레이
 * 가는 수직 선들로 짚단 섬유를 표현, 하단에 묶음 선
 */
export function createFlatHeungbuSprite(level: DragonLevel): string {
  const base  = STRAW_COLORS[level] ?? H.strawLevel0;
  const hl    = H.strawHighlight;   // 밝은 섬유 선
  const sh    = H.strawShadow;      // 묶음 하단 그림자
  const bandY = 10;                 // 묶음 띠 Y 위치

  // 레벨에 따라 섬유 선 밀도/불투명도 조정
  const fiberOpacity = 0.3 + level * 0.06;  // 0.30 ~ 0.54

  return `
<rect x="0" y="0" width="14" height="14" fill="${base}" rx="1"/>
<line x1="2"  y1="0" x2="2"  y2="14" stroke="${hl}" stroke-width="0.6" opacity="${fiberOpacity.toFixed(2)}"/>
<line x1="4.5" y1="0" x2="4.5" y2="14" stroke="${hl}" stroke-width="0.5" opacity="${(fiberOpacity*0.8).toFixed(2)}"/>
<line x1="7"  y1="0" x2="7"  y2="14" stroke="${hl}" stroke-width="0.6" opacity="${fiberOpacity.toFixed(2)}"/>
<line x1="9.5" y1="0" x2="9.5" y2="14" stroke="${hl}" stroke-width="0.5" opacity="${(fiberOpacity*0.8).toFixed(2)}"/>
<line x1="12" y1="0" x2="12" y2="14" stroke="${hl}" stroke-width="0.6" opacity="${fiberOpacity.toFixed(2)}"/>
<rect x="0" y="${bandY}" width="14" height="1.5" fill="${sh}" opacity="0.28"/>
<rect x="0" y="0" width="14" height="2" fill="${hl}" opacity="0.18"/>`.trim();
}

/** isometric 인터페이스 호환용 */
export function createHeungbuSprite(level: DragonLevel): string {
  return createFlatHeungbuSprite(level);
}

export function getHeungbuSpriteSize(_level: DragonLevel): { width: number; height: number } {
  return { width: 14, height: 14 };
}

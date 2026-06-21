import { SUCCULENT_COLORS } from './succulent-colors';
import { DragonLevel } from './types';

// ──────────────────────────────────────────────────────
// 플랫 그리드용 사막 식물 스프라이트 (1px = 1 SVG unit, 13×13 셀 기준)
// 화분 없이 모래에서 직접 자란다 (밑동 y≈13, 위로 성장). 빛은 좌상단.
// 재질당 3톤(succDark/succBody/succLight) 음영.
// ──────────────────────────────────────────────────────
const fp = (x: number, y: number, color: string): string =>
  `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
const fps = (coords: [number, number][], color: string): string =>
  coords.map(([x, y]) => fp(x, y, color)).join('');

/** Level 1 — 새싹 (모래를 뚫고 올라온 작은 순) */
export function createFlatSeedling(): string {
  const { succDark, succBody, succLight } = SUCCULENT_COLORS;
  return `<g class="flat-seedling">
    ${fps([[6,13],[7,13]], succDark)}
    ${fp(6,12, succBody)}${fp(7,12, succBody)}
    ${fp(5,11, succDark)}${fp(6,11, succBody)}${fp(7,11, succBody)}${fp(8,11, succDark)}
    ${fp(6,10, succLight)}${fp(7,10, succBody)}
  </g>`;
}

/** Level 2 — 다육 로제트 (통통한 잎 무더기) */
export function createFlatSucculent(): string {
  const { succDark, succBody, succLight } = SUCCULENT_COLORS;
  return `<g class="flat-succulent">
    ${fps([[5,13],[6,13],[7,13],[8,13]], succDark)}
    ${fp(4,12, succDark)}${fps([[5,12],[6,12],[7,12],[8,12]], succBody)}${fp(9,12, succDark)}
    ${fp(5,11, succBody)}${fps([[6,11],[7,11]], succLight)}${fp(8,11, succBody)}
    ${fp(5,10, succDark)}${fps([[6,10],[7,10]], succBody)}${fp(8,10, succDark)}
    ${fps([[6,9],[7,9]], succLight)}
  </g>`;
}

/** Level 3 — 통 선인장 + 꽃봉오리 */
export function createFlatCactusBud(): string {
  const { succDark, succBody, succLight, bloomDeep, bloom } = SUCCULENT_COLORS;
  return `<g class="flat-cactus-bud">
    ${fps([[5,13],[6,13],[7,13],[8,13]], succDark)}
    ${fp(4,12, succDark)}${fps([[5,12],[6,12],[7,12],[8,12]], succBody)}${fp(9,12, succDark)}
    ${fp(4,11, succDark)}${fps([[5,11],[6,11],[7,11],[8,11]], succBody)}${fp(9,11, succDark)}
    ${fp(5,10, succDark)}${fps([[6,10],[7,10]], succBody)}${fp(8,10, succDark)}
    ${fp(6,10, succLight)}
    ${fps([[6,9],[7,9]], succLight)}
    ${fps([[6,8],[7,8]], bloomDeep)}
    ${fp(6,7, bloom)}
  </g>`;
}

/** Level 4 — 선인장 + 활짝 핀 코랄 꽃 (발광) */
export function createFlatCactusBloom(): string {
  const { succDark, succBody, succLight, bloomDeep, bloom, bloomLight, bloomCore } = SUCCULENT_COLORS;
  return `<g class="flat-cactus-bloom">
    ${fps([[5,13],[6,13],[7,13],[8,13]], succDark)}
    ${fp(4,12, succDark)}${fps([[5,12],[6,12],[7,12],[8,12]], succBody)}${fp(9,12, succDark)}
    ${fp(4,11, succDark)}${fps([[5,11],[6,11],[7,11],[8,11]], succBody)}${fp(9,11, succDark)}
    ${fp(5,10, succDark)}${fps([[6,10],[7,10]], succBody)}${fp(8,10, succDark)}${fp(6,10, succLight)}
    <g filter="url(#bloomGlow)">
      ${fp(5,9, bloom)}${fps([[6,9],[7,9]], bloomLight)}${fp(8,9, bloom)}
      ${fp(4,8, bloomDeep)}${fp(5,8, bloom)}${fps([[6,8],[7,8]], bloomCore)}${fp(8,8, bloom)}${fp(9,8, bloomDeep)}
      ${fp(5,7, bloomLight)}${fps([[6,7],[7,7]], bloom)}${fp(8,7, bloomLight)}
      ${fps([[6,6],[7,6]], bloomLight)}
    </g>
  </g>`;
}

/** 레벨별 플랫 스프라이트 반환 (Lv0 = 빈 모래, 식물 없음) */
export function createFlatSucculentSprite(level: DragonLevel): string {
  switch (level) {
    case 1: return createFlatSeedling();
    case 2: return createFlatSucculent();
    case 3: return createFlatCactusBud();
    case 4: return createFlatCactusBloom();
    default: return '';
  }
}

// 등각 투영(isometric) 인터페이스 호환용 — succulent는 flat 모드라 실제로는
// createFlatSucculentSprite가 렌더된다. Theme 인터페이스 충족을 위한 래퍼.
export function createSucculentSprite(level: DragonLevel): string {
  return createFlatSucculentSprite(level);
}

export function getSucculentSpriteSize(level: DragonLevel): { width: number; height: number } {
  return { width: 14, height: level === 0 ? 0 : 14 };
}

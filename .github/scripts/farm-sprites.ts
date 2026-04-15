import { FARM_COLORS } from './farm-colors';
import { DragonLevel, DragonSprite } from './types';

// 픽셀 아트 스케일 (sprites.ts와 동일)
const PX = 1.6;

// 단일 픽셀 rect 생성
const pixel = (x: number, y: number, color: string): string =>
  `<rect x="${x * PX}" y="${y * PX}" width="${PX}" height="${PX}" fill="${color}"/>`;

// 같은 색의 픽셀 배열 생성
const pixels = (coords: [number, number][], color: string): string =>
  coords.map(([x, y]) => pixel(x, y, color)).join('');

/**
 * Level 0 — 빈 밭 (Empty Plot)
 * 갈색 밭고랑이 있는 빈 흙 (10×5 픽셀)
 */
export function createEmptyPlot(): DragonSprite {
  const { soilDark, soilMid, soilLight, soilFurrow } = FARM_COLORS;

  const svg = `
    <g class="farm-empty-plot">
      <!-- 흙 베이스 -->
      ${pixels([[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]], soilDark)}
      ${pixels([[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1]], soilMid)}
      ${pixels([[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2]], soilMid)}
      ${pixels([[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3]], soilLight)}
      ${pixels([[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]], soilDark)}
      <!-- 밭고랑 (furrow) 줄 -->
      ${pixels([[1,1],[3,1],[5,1],[7,1]], soilFurrow)}
      ${pixels([[2,3],[4,3],[6,3],[8,3]], soilFurrow)}
    </g>
  `;

  return { svg, width: 16, height: 8 };
}

/**
 * Level 1 — 새싹 (Sprout)
 * 흙 위에 V자 새싹 (12×14 픽셀)
 */
export function createSprout(): DragonSprite {
  const { soilDark, soilMid, soilFurrow, sproutGreen, sproutDark, leafLight } = FARM_COLORS;

  const svg = `
    <g class="farm-sprout">
      <!-- 흙 베이스 -->
      ${pixels([[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]], soilDark)}
      ${pixels([[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11]], soilMid)}
      ${pixels([[0,12],[1,12],[2,12],[3,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[10,12],[11,12]], soilMid)}
      ${pixels([[1,13],[2,13],[3,13],[4,13],[5,13],[6,13],[7,13],[8,13],[9,13],[10,13]], soilDark)}
      ${pixels([[2,11],[4,11],[6,11],[8,11],[10,11]], soilFurrow)}

      <!-- 줄기 -->
      ${pixels([[5,7],[6,7]], sproutGreen)}
      ${pixels([[5,8],[6,8]], sproutGreen)}
      ${pixels([[5,9],[6,9]], sproutDark)}

      <!-- 왼쪽 잎 -->
      ${pixels([[3,6],[4,6]], leafLight)}
      ${pixels([[2,5],[3,5]], sproutGreen)}
      ${pixels([[4,7]], sproutGreen)}

      <!-- 오른쪽 잎 -->
      ${pixels([[7,6],[8,6]], leafLight)}
      ${pixels([[8,5],[9,5]], sproutGreen)}
      ${pixels([[7,7]], sproutGreen)}

      <!-- 새싹 팁 (밝은 부분) -->
      ${pixels([[5,4],[6,4]], leafLight)}
      ${pixels([[4,5],[7,5]], leafLight)}
    </g>
  `;

  return { svg, width: 19, height: 22 };
}

/**
 * Level 2 — 어린 묘목 (Sapling)
 * 얇은 줄기 + 작은 잎 캐노피 (14×20 픽셀)
 */
export function createSapling(): DragonSprite {
  const { soilDark, soilMid, soilFurrow, leafGreen, leafLight, leafDark, trunkBrown } = FARM_COLORS;

  const svg = `
    <g class="farm-sapling">
      <!-- 흙 베이스 -->
      ${pixels([[1,16],[2,16],[3,16],[4,16],[5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16]], soilDark)}
      ${pixels([[0,17],[1,17],[2,17],[3,17],[4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],[12,17],[13,17]], soilMid)}
      ${pixels([[0,18],[1,18],[2,18],[3,18],[4,18],[5,18],[6,18],[7,18],[8,18],[9,18],[10,18],[11,18],[12,18],[13,18]], soilMid)}
      ${pixels([[1,19],[2,19],[3,19],[4,19],[5,19],[6,19],[7,19],[8,19],[9,19],[10,19],[11,19],[12,19]], soilDark)}
      ${pixels([[2,17],[5,17],[8,17],[11,17]], soilFurrow)}

      <!-- 나무줄기 -->
      ${pixels([[6,12],[7,12]], trunkBrown)}
      ${pixels([[6,13],[7,13]], trunkBrown)}
      ${pixels([[6,14],[7,14]], trunkBrown)}
      ${pixels([[6,15],[7,15]], trunkBrown)}

      <!-- 작은 캐노피 -->
      ${pixels([[5,8],[6,8],[7,8],[8,8]], leafGreen)}
      ${pixels([[4,9],[5,9],[6,9],[7,9],[8,9],[9,9]], leafGreen)}
      ${pixels([[4,10],[5,10],[6,10],[7,10],[8,10],[9,10]], leafLight)}
      ${pixels([[5,11],[6,11],[7,11],[8,11]], leafGreen)}

      <!-- 하이라이트 (상단) -->
      ${pixels([[5,7],[6,7],[7,7],[8,7]], leafLight)}
      ${pixels([[6,6],[7,6]], leafLight)}

      <!-- 그림자 (캐노피 하단) -->
      ${pixels([[4,10],[9,10]], leafDark)}
      ${pixels([[5,11],[8,11]], leafDark)}
    </g>
  `;

  return { svg, width: 22, height: 32 };
}

/**
 * Level 3 — 나무 (Tree)
 * 굵은 줄기 + 큰 둥근 캐노피 (20×26 픽셀)
 */
export function createTree(): DragonSprite {
  const { soilDark, soilMid, soilFurrow, leafGreen, leafLight, leafDark, leafMid, trunkBrown, trunkDark, rootBrown } = FARM_COLORS;

  const svg = `
    <g class="farm-tree">
      <!-- 흙 베이스 -->
      ${pixels([[2,22],[3,22],[4,22],[5,22],[6,22],[7,22],[8,22],[9,22],[10,22],[11,22],[12,22],[13,22],[14,22],[15,22],[16,22],[17,22]], soilDark)}
      ${pixels([[0,23],[1,23],[2,23],[3,23],[4,23],[5,23],[6,23],[7,23],[8,23],[9,23],[10,23],[11,23],[12,23],[13,23],[14,23],[15,23],[16,23],[17,23],[18,23],[19,23]], soilMid)}
      ${pixels([[0,24],[1,24],[2,24],[3,24],[4,24],[5,24],[6,24],[7,24],[8,24],[9,24],[10,24],[11,24],[12,24],[13,24],[14,24],[15,24],[16,24],[17,24],[18,24],[19,24]], soilMid)}
      ${pixels([[2,25],[3,25],[4,25],[5,25],[6,25],[7,25],[8,25],[9,25],[10,25],[11,25],[12,25],[13,25],[14,25],[15,25],[16,25],[17,25]], soilDark)}
      ${pixels([[2,23],[6,23],[10,23],[14,23],[18,23]], soilFurrow)}

      <!-- 뿌리 -->
      ${pixels([[7,21],[8,21]], rootBrown)}
      ${pixels([[11,21],[12,21]], rootBrown)}
      ${pixels([[5,20],[6,20]], rootBrown)}
      ${pixels([[13,20],[14,20]], rootBrown)}

      <!-- 나무 줄기 -->
      ${pixels([[8,15],[9,15],[10,15],[11,15]], trunkBrown)}
      ${pixels([[8,16],[9,16],[10,16],[11,16]], trunkBrown)}
      ${pixels([[8,17],[9,17],[10,17],[11,17]], trunkBrown)}
      ${pixels([[8,18],[9,18],[10,18],[11,18]], trunkBrown)}
      ${pixels([[8,19],[9,19],[10,19],[11,19]], trunkBrown)}
      ${pixels([[8,20],[9,20],[10,20],[11,20]], trunkDark)}
      <!-- 줄기 하이라이트 -->
      ${pixels([[9,15],[9,16],[9,17],[9,18]], '#a0522d')}
      <!-- 줄기 그림자 -->
      ${pixels([[11,16],[11,17],[11,18],[11,19]], trunkDark)}

      <!-- 캐노피 외곽 (어두운 그림자) -->
      ${pixels([[7,4],[8,4],[9,4],[10,4],[11,4],[12,4]], leafDark)}
      ${pixels([[5,5],[6,5],[7,5],[12,5],[13,5],[14,5]], leafDark)}
      ${pixels([[4,6],[5,6],[14,6],[15,6]], leafDark)}
      ${pixels([[4,11],[5,11],[14,11],[15,11]], leafDark)}
      ${pixels([[5,12],[6,12],[13,12],[14,12]], leafDark)}
      ${pixels([[7,13],[8,13],[11,13],[12,13]], leafDark)}

      <!-- 메인 캐노피 -->
      ${pixels([[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5]], leafGreen)}
      ${pixels([[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6]], leafGreen)}
      ${pixels([[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7]], leafMid)}
      ${pixels([[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[15,8]], leafMid)}
      ${pixels([[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],[12,9],[13,9],[14,9],[15,9]], leafGreen)}
      ${pixels([[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10]], leafGreen)}
      ${pixels([[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11]], leafGreen)}
      ${pixels([[6,12],[7,12],[8,12],[9,12],[10,12],[11,12],[12,12],[13,12]], leafMid)}
      ${pixels([[8,13],[9,13],[10,13],[11,13]], leafGreen)}

      <!-- 캐노피 상단 하이라이트 -->
      ${pixels([[8,4],[9,4],[10,4],[11,4]], leafLight)}
      ${pixels([[7,5],[8,5],[9,5],[10,5],[11,5],[12,5]], leafLight)}
      ${pixels([[6,6],[7,6],[8,6],[9,6],[10,6],[11,6]], leafLight)}
      ${pixels([[5,7],[6,7],[7,7],[8,7]], leafLight)}
    </g>
  `;

  return { svg, width: 32, height: 41 };
}

/**
 * Level 4 — 사과나무 (Apple Tree)
 * 나무 + 빨간 사과 (20×28 픽셀)
 */
export function createAppleTree(): DragonSprite {
  const { soilDark, soilMid, soilFurrow, leafGreen, leafLight, leafDark, leafMid, trunkBrown, trunkDark, rootBrown, appleRed, appleDark, appleHighlight, appleStem } = FARM_COLORS;

  const svg = `
    <g class="farm-apple-tree">
      <!-- 흙 베이스 -->
      ${pixels([[2,24],[3,24],[4,24],[5,24],[6,24],[7,24],[8,24],[9,24],[10,24],[11,24],[12,24],[13,24],[14,24],[15,24],[16,24],[17,24]], soilDark)}
      ${pixels([[0,25],[1,25],[2,25],[3,25],[4,25],[5,25],[6,25],[7,25],[8,25],[9,25],[10,25],[11,25],[12,25],[13,25],[14,25],[15,25],[16,25],[17,25],[18,25],[19,25]], soilMid)}
      ${pixels([[0,26],[1,26],[2,26],[3,26],[4,26],[5,26],[6,26],[7,26],[8,26],[9,26],[10,26],[11,26],[12,26],[13,26],[14,26],[15,26],[16,26],[17,26],[18,26],[19,26]], soilMid)}
      ${pixels([[2,27],[3,27],[4,27],[5,27],[6,27],[7,27],[8,27],[9,27],[10,27],[11,27],[12,27],[13,27],[14,27],[15,27],[16,27],[17,27]], soilDark)}
      ${pixels([[2,25],[6,25],[10,25],[14,25],[18,25]], soilFurrow)}

      <!-- 뿌리 -->
      ${pixels([[7,23],[8,23]], rootBrown)}
      ${pixels([[11,23],[12,23]], rootBrown)}
      ${pixels([[5,22],[6,22]], rootBrown)}
      ${pixels([[13,22],[14,22]], rootBrown)}

      <!-- 나무 줄기 -->
      ${pixels([[8,16],[9,16],[10,16],[11,16]], trunkBrown)}
      ${pixels([[8,17],[9,17],[10,17],[11,17]], trunkBrown)}
      ${pixels([[8,18],[9,18],[10,18],[11,18]], trunkBrown)}
      ${pixels([[8,19],[9,19],[10,19],[11,19]], trunkBrown)}
      ${pixels([[8,20],[9,20],[10,20],[11,20]], trunkBrown)}
      ${pixels([[8,21],[9,21],[10,21],[11,21]], trunkDark)}
      ${pixels([[8,22],[9,22],[10,22],[11,22]], trunkDark)}
      <!-- 줄기 하이라이트 -->
      ${pixels([[9,16],[9,17],[9,18],[9,19],[9,20]], '#a0522d')}
      <!-- 줄기 그림자 -->
      ${pixels([[11,17],[11,18],[11,19],[11,20],[11,21]], trunkDark)}

      <!-- 캐노피 외곽 (어두운 그림자) -->
      ${pixels([[7,3],[8,3],[9,3],[10,3],[11,3],[12,3]], leafDark)}
      ${pixels([[5,4],[6,4],[13,4],[14,4]], leafDark)}
      ${pixels([[4,5],[5,5],[14,5],[15,5]], leafDark)}
      ${pixels([[4,12],[5,12],[14,12],[15,12]], leafDark)}
      ${pixels([[5,13],[6,13],[13,13],[14,13]], leafDark)}
      ${pixels([[7,14],[8,14],[11,14],[12,14]], leafDark)}

      <!-- 메인 캐노피 -->
      ${pixels([[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4]], leafGreen)}
      ${pixels([[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5]], leafGreen)}
      ${pixels([[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[15,6]], leafMid)}
      ${pixels([[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7]], leafMid)}
      ${pixels([[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[15,8]], leafGreen)}
      ${pixels([[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],[12,9],[13,9],[14,9],[15,9]], leafGreen)}
      ${pixels([[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10]], leafGreen)}
      ${pixels([[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11]], leafMid)}
      ${pixels([[5,12],[6,12],[7,12],[8,12],[9,12],[10,12],[11,12],[12,12],[13,12],[14,12]], leafGreen)}
      ${pixels([[6,13],[7,13],[8,13],[9,13],[10,13],[11,13],[12,13],[13,13]], leafMid)}
      ${pixels([[8,14],[9,14],[10,14],[11,14]], leafGreen)}

      <!-- 캐노피 상단 하이라이트 -->
      ${pixels([[8,3],[9,3],[10,3],[11,3]], leafLight)}
      ${pixels([[7,4],[8,4],[9,4],[10,4],[11,4],[12,4]], leafLight)}
      ${pixels([[6,5],[7,5],[8,5],[9,5],[10,5],[11,5]], leafLight)}
      ${pixels([[5,6],[6,6],[7,6],[8,6]], leafLight)}

      <!-- 사과 1 (좌측 중간) -->
      ${pixels([[5,8],[6,8]], appleDark)}
      ${pixels([[5,9],[6,9],[7,9]], appleRed)}
      ${pixels([[5,10],[6,10],[7,10]], appleRed)}
      ${pixels([[6,11]], appleDark)}
      ${pixel(5.5 * PX / PX, 8, appleStem)}
      ${pixels([[5,8]], appleHighlight)}

      <!-- 사과 2 (우측 중간) -->
      ${pixels([[12,9],[13,9]], appleDark)}
      ${pixels([[12,10],[13,10],[14,10]], appleRed)}
      ${pixels([[12,11],[13,11],[14,11]], appleRed)}
      ${pixels([[13,12]], appleDark)}
      ${pixels([[12,9]], appleHighlight)}

      <!-- 사과 3 (중앙 아래) -->
      ${pixels([[9,11],[10,11]], appleDark)}
      ${pixels([[9,12],[10,12],[11,12]], appleRed)}
      ${pixels([[9,13],[10,13],[11,13]], appleRed)}
      ${pixels([[10,14]], appleDark)}
      ${pixels([[9,11]], appleHighlight)}

      <!-- 사과 4 (상단 우측) -->
      ${pixels([[12,6],[13,6]], appleDark)}
      ${pixels([[11,7],[12,7],[13,7]], appleRed)}
      ${pixels([[11,8],[12,8],[13,8]], appleRed)}
      ${pixels([[12,9]], appleDark)}
      ${pixels([[11,7]], appleHighlight)}
    </g>
  `;

  return { svg, width: 32, height: 44 };
}

// ──────────────────────────────────────────────────────
// 플랫 그리드용 스프라이트 (1px = 1 SVG unit, 13×13 셀 기준)
// ──────────────────────────────────────────────────────
const fp = (x: number, y: number, color: string): string =>
  `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
const fps = (coords: [number, number][], color: string): string =>
  coords.map(([x, y]) => fp(x, y, color)).join('');

/** Level 1 — 새싹 (Sprout) */
export function createFlatSprout(): string {
  const { sproutGreen, leafLight, sproutDark } = FARM_COLORS;
  return `<g class="flat-sprout">
    ${fp(6, 1, leafLight)}
    ${fps([[5,2],[6,2],[7,2]], leafLight)}
    ${fps([[4,3],[8,3]], sproutGreen)}
    ${fps([[5,3],[7,3]], sproutDark)}
    ${fp(6, 3, leafLight)}
    ${fps([[6,4],[6,5],[6,6],[6,7],[6,8]], sproutGreen)}
  </g>`;
}

/** Level 2 — 어린 묘목 (Sapling) */
export function createFlatSapling(): string {
  const { leafGreen, leafLight, leafDark, trunkBrown } = FARM_COLORS;
  return `<g class="flat-sapling">
    ${fp(6, 0, leafLight)}
    ${fps([[5,1],[6,1],[7,1]], leafLight)}
    ${fps([[4,2],[5,2],[6,2],[7,2],[8,2]], leafGreen)}
    ${fps([[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3]], leafGreen)}
    ${fps([[4,4],[5,4],[6,4],[7,4],[8,4]], leafDark)}
    ${fps([[5,5],[6,5],[7,5]], leafDark)}
    ${fps([[6,6],[6,7],[6,8]], trunkBrown)}
  </g>`;
}

/** Level 3 — 나무 (Tree) */
export function createFlatTree(): string {
  const { leafGreen, leafLight, leafDark, leafMid, trunkBrown, trunkDark } = FARM_COLORS;
  return `<g class="flat-tree">
    ${fps([[4,0],[5,0],[6,0],[7,0],[8,0]], leafLight)}
    ${fps([[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1]], leafGreen)}
    ${fps([[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2]], leafGreen)}
    ${fps([[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3]], leafMid)}
    ${fps([[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]], leafMid)}
    ${fps([[4,5],[5,5],[6,5],[7,5],[8,5]], leafDark)}
    ${fps([[5,6],[6,6],[7,6]], trunkBrown)}
    ${fps([[5,7],[6,7],[7,7]], trunkBrown)}
    ${fp(6, 8, trunkDark)}
  </g>`;
}

/** Level 4 — 사과나무 (Apple Tree) */
export function createFlatAppleTree(): string {
  const { leafGreen, leafLight, leafDark, leafMid, trunkBrown, trunkDark, appleRed, appleHighlight } = FARM_COLORS;
  return `<g class="flat-apple-tree">
    ${fps([[4,0],[5,0],[6,0],[7,0],[8,0]], leafLight)}
    ${fps([[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1]], leafGreen)}
    ${fps([[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2]], leafGreen)}
    ${fps([[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3]], leafMid)}
    ${fps([[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]], leafMid)}
    ${fps([[4,5],[5,5],[6,5],[7,5],[8,5]], leafDark)}
    ${fps([[5,6],[6,6],[7,6]], trunkBrown)}
    ${fps([[5,7],[6,7],[7,7]], trunkBrown)}
    ${fp(6, 8, trunkDark)}
    ${fps([[4,2],[5,2]], appleRed)}
    ${fp(4, 2, appleHighlight)}
    ${fps([[9,2],[9,3]], appleRed)}
    ${fps([[7,4],[7,5]], appleRed)}
    ${fp(7, 4, appleHighlight)}
  </g>`;
}

/** 레벨별 플랫 스프라이트 반환 */
export function createFlatFarmSprite(level: DragonLevel): string {
  switch (level) {
    case 1: return createFlatSprout();
    case 2: return createFlatSapling();
    case 3: return createFlatTree();
    case 4: return createFlatAppleTree();
    default: return '';
  }
}

/**
 * 레벨별 농장 스프라이트 반환 (등각 투영용 - 호환성 유지)
 */
export function createFarmSprite(level: DragonLevel): string {
  switch (level) {
    case 0: return createEmptyPlot().svg;
    case 1: return createSprout().svg;
    case 2: return createSapling().svg;
    case 3: return createTree().svg;
    case 4: return createAppleTree().svg;
    default: return createEmptyPlot().svg;
  }
}

/**
 * 레벨별 농장 스프라이트 크기 반환
 */
export function getFarmSpriteSize(level: DragonLevel): { width: number; height: number } {
  switch (level) {
    case 0: return { width: 16, height: 8 };
    case 1: return { width: 19, height: 22 };
    case 2: return { width: 22, height: 32 };
    case 3: return { width: 32, height: 41 };
    case 4: return { width: 32, height: 44 };
    default: return { width: 16, height: 8 };
  }
}

import { DRAGON_COLORS } from './colors';
import { DragonSprite, DragonLevel } from './types';

// Pixel art scale (each "pixel" is this many SVG units)
// 등각 투영용으로 조정: 1.6배 스케일
const PX = 1.6;

// Helper to create a pixel rectangle
const pixel = (x: number, y: number, color: string): string =>
  `<rect x="${x * PX}" y="${y * PX}" width="${PX}" height="${PX}" fill="${color}"/>`;

// Helper to create multiple pixels of the same color
const pixels = (coords: [number, number][], color: string): string =>
  coords.map(([x, y]) => pixel(x, y, color)).join('');

/**
 * Dragon Egg Sprite (Level 0-1)
 * A brown egg with golden speckles
 * Size: 12x14 pixels (24x28 SVG units)
 */
export function createDragonEgg(): DragonSprite {
  const { eggBase, eggLight, eggSpeckle, eggGold } = DRAGON_COLORS;

  const svg = `
    <g class="dragon-egg">
      <!-- Egg outline -->
      ${pixels([[4, 0], [5, 0], [6, 0], [7, 0]], eggBase)}
      ${pixels([[2, 1], [3, 1], [8, 1], [9, 1]], eggBase)}
      ${pixels([[1, 2], [10, 2]], eggBase)}
      ${pixels([[1, 3], [10, 3]], eggBase)}
      ${pixels([[0, 4], [11, 4]], eggBase)}
      ${pixels([[0, 5], [11, 5]], eggBase)}
      ${pixels([[0, 6], [11, 6]], eggBase)}
      ${pixels([[0, 7], [11, 7]], eggBase)}
      ${pixels([[0, 8], [11, 8]], eggBase)}
      ${pixels([[0, 9], [11, 9]], eggBase)}
      ${pixels([[1, 10], [10, 10]], eggBase)}
      ${pixels([[1, 11], [10, 11]], eggBase)}
      ${pixels([[2, 12], [9, 12]], eggBase)}
      ${pixels([[3, 13], [4, 13], [7, 13], [8, 13]], eggBase)}

      <!-- Egg fill (light brown) -->
      ${pixels([[4, 1], [5, 1], [6, 1], [7, 1]], eggLight)}
      ${pixels([[2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2]], eggLight)}
      ${pixels([[2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3]], eggLight)}
      ${pixels([[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4]], eggLight)}
      ${pixels([[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5]], eggBase)}
      ${pixels([[1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6]], eggBase)}
      ${pixels([[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7]], eggBase)}
      ${pixels([[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8]], eggBase)}
      ${pixels([[1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9]], eggBase)}
      ${pixels([[2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10]], eggBase)}
      ${pixels([[2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11]], eggBase)}
      ${pixels([[3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12]], eggBase)}
      ${pixels([[5, 13], [6, 13]], eggBase)}

      <!-- Golden speckles -->
      ${pixels([[3, 2], [7, 3], [9, 5]], eggGold)}
      ${pixels([[2, 6], [5, 4], [8, 7]], eggSpeckle)}
      ${pixels([[4, 8], [6, 10], [8, 9]], eggGold)}
      ${pixels([[3, 5], [9, 6]], eggSpeckle)}
    </g>
  `;

  return { svg, width: 19, height: 22 };
}

/**
 * Hatching Dragon Sprite (Level 2-3)
 * Baby dragon peeking out of cracked shell
 * Size: 16x18 pixels (32x36 SVG units)
 */
export function createHatchingDragon(): DragonSprite {
  const { dragonRed, dragonCream, dragonGold, eggBase, shellWhite, eggCrack } = DRAGON_COLORS;

  const svg = `
    <g class="hatching-dragon">
      <!-- Dragon head (poking out) -->
      ${pixels([[6, 0], [7, 0], [8, 0], [9, 0]], dragonRed)}
      ${pixels([[5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1]], dragonRed)}
      ${pixels([[4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2]], dragonRed)}
      ${pixels([[4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3]], dragonRed)}
      ${pixels([[5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4]], dragonRed)}

      <!-- Dragon eyes -->
      ${pixels([[5, 2], [9, 2]], dragonGold)}

      <!-- Dragon snout/nose -->
      ${pixels([[7, 4], [8, 4]], dragonCream)}

      <!-- Small horns -->
      ${pixels([[4, 0], [11, 0]], dragonRed)}

      <!-- Shell on head (cracked piece) -->
      ${pixels([[3, 1], [12, 1]], shellWhite)}
      ${pixels([[2, 2], [3, 2], [12, 2], [13, 2]], shellWhite)}
      ${pixels([[2, 3], [3, 3]], shellWhite)}

      <!-- Cracked egg shell (bottom half) -->
      ${pixels([[4, 5], [5, 5], [6, 5], [9, 5], [10, 5], [11, 5]], eggBase)}
      ${pixels([[3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6]], eggBase)}
      ${pixels([[2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7]], eggBase)}
      ${pixels([[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8]], eggBase)}
      ${pixels([[1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9]], eggBase)}
      ${pixels([[1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10]], eggBase)}
      ${pixels([[2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11]], eggBase)}
      ${pixels([[2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12]], eggBase)}
      ${pixels([[3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13]], eggBase)}
      ${pixels([[4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14]], eggBase)}
      ${pixels([[5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15]], eggBase)}
      ${pixels([[6, 16], [7, 16], [8, 16], [9, 16]], eggBase)}
      ${pixels([[7, 17], [8, 17]], eggBase)}

      <!-- Crack lines on shell -->
      ${pixels([[7, 5], [8, 5]], eggCrack)}
      ${pixels([[5, 7], [10, 7]], eggCrack)}
      ${pixels([[4, 9], [11, 9]], eggCrack)}

      <!-- Jagged shell edge at top -->
      ${pixels([[5, 5], [10, 5]], shellWhite)}
      ${pixels([[4, 6], [11, 6]], shellWhite)}
    </g>
  `;

  return { svg, width: 26, height: 29 };
}

/**
 * Full Dragon Sprite (Level 4)
 * Fully hatched baby dragon sitting
 * Size: 20x20 pixels (40x40 SVG units)
 */
export function createFullDragon(): DragonSprite {
  const { dragonRed, dragonDarkRed, dragonCream, dragonGold, dragonOrange, wingMembrane } = DRAGON_COLORS;

  const svg = `
    <g class="full-dragon">
      <!-- Wings (behind body) -->
      ${pixels([[2, 6], [3, 5], [4, 4], [5, 3]], wingMembrane)}
      ${pixels([[2, 7], [3, 6], [4, 5], [5, 4]], wingMembrane)}
      ${pixels([[3, 8], [4, 7], [5, 6]], wingMembrane)}
      ${pixels([[16, 6], [15, 5], [14, 4], [13, 3]], wingMembrane)}
      ${pixels([[16, 7], [15, 6], [14, 5], [13, 4]], wingMembrane)}
      ${pixels([[15, 8], [14, 7], [13, 6]], wingMembrane)}

      <!-- Head horns -->
      ${pixels([[7, 0], [12, 0]], dragonDarkRed)}
      ${pixels([[6, 1], [7, 1], [12, 1], [13, 1]], dragonDarkRed)}

      <!-- Head -->
      ${pixels([[8, 1], [9, 1], [10, 1], [11, 1]], dragonRed)}
      ${pixels([[7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2]], dragonRed)}
      ${pixels([[6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3]], dragonRed)}
      ${pixels([[6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4]], dragonRed)}
      ${pixels([[7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5]], dragonRed)}

      <!-- Eyes -->
      ${pixels([[7, 3], [11, 3]], dragonGold)}

      <!-- Snout -->
      ${pixels([[8, 5], [9, 5], [10, 5], [11, 5]], dragonCream)}
      ${pixels([[9, 6], [10, 6]], dragonOrange)}

      <!-- Neck -->
      ${pixels([[8, 6], [9, 6], [10, 6], [11, 6]], dragonRed)}
      ${pixels([[8, 7], [9, 7], [10, 7], [11, 7]], dragonRed)}

      <!-- Body -->
      ${pixels([[6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8]], dragonRed)}
      ${pixels([[5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9]], dragonRed)}
      ${pixels([[5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10]], dragonRed)}
      ${pixels([[5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11]], dragonRed)}
      ${pixels([[6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12]], dragonRed)}

      <!-- Belly (cream color) -->
      ${pixels([[8, 9], [9, 9], [10, 9], [11, 9]], dragonCream)}
      ${pixels([[8, 10], [9, 10], [10, 10], [11, 10]], dragonCream)}
      ${pixels([[8, 11], [9, 11], [10, 11], [11, 11]], dragonCream)}

      <!-- Legs (sitting pose) -->
      ${pixels([[5, 12], [6, 12], [13, 12], [14, 12]], dragonRed)}
      ${pixels([[4, 13], [5, 13], [6, 13], [13, 13], [14, 13], [15, 13]], dragonRed)}
      ${pixels([[4, 14], [5, 14], [14, 14], [15, 14]], dragonRed)}

      <!-- Feet/claws -->
      ${pixels([[3, 14], [4, 15], [5, 15], [6, 15]], dragonDarkRed)}
      ${pixels([[16, 14], [15, 15], [14, 15], [13, 15]], dragonDarkRed)}

      <!-- Tail -->
      ${pixels([[14, 11], [15, 10], [16, 9], [17, 8]], dragonRed)}
      ${pixels([[17, 7], [18, 6], [18, 5]], dragonRed)}
      ${pixels([[19, 4], [19, 3]], dragonOrange)}

      <!-- Tail spike -->
      ${pixels([[19, 2]], dragonOrange)}

      <!-- Fire breath (small) -->
      ${pixels([[6, 6], [5, 5], [4, 5]], dragonOrange)}
      ${pixels([[3, 4], [4, 4]], '#ff8c00')}
      ${pixels([[2, 3], [3, 3]], '#ffcc00')}
    </g>
  `;

  return { svg, width: 32, height: 32 };
}

/**
 * Get sprite for a specific dragon level
 */
export function getDragonSprite(level: DragonLevel): DragonSprite {
  switch (level) {
    case 0:
    case 1:
      return createDragonEgg();
    case 2:
    case 3:
      return createHatchingDragon();
    case 4:
      return createFullDragon();
    default:
      return createDragonEgg();
  }
}

/**
 * Create SVG symbol definitions for all sprites
 */
export function createSpriteSymbols(): string {
  const egg = createDragonEgg();
  const hatching = createHatchingDragon();
  const full = createFullDragon();

  return `
    <symbol id="dragon-egg" viewBox="0 0 ${egg.width} ${egg.height}">
      ${egg.svg}
    </symbol>
    <symbol id="dragon-hatching" viewBox="0 0 ${hatching.width} ${hatching.height}">
      ${hatching.svg}
    </symbol>
    <symbol id="dragon-full" viewBox="0 0 ${full.width} ${full.height}">
      ${full.svg}
    </symbol>
  `;
}

/**
 * Get symbol ID for a dragon level
 */
export function getSpriteSymbolId(level: DragonLevel): string {
  switch (level) {
    case 0:
    case 1:
      return 'dragon-egg';
    case 2:
    case 3:
      return 'dragon-hatching';
    case 4:
      return 'dragon-full';
    default:
      return 'dragon-egg';
  }
}

/**
 * Create commit icon (flame)
 * 16×16px dragon-themed icon for commit statistics
 */
export function createCommitIcon(): string {
  const { dragonOrange, lavaBright, lavaGlow } = DRAGON_COLORS;

  return `
    <g class="commit-icon">
      <!-- Flame base -->
      ${pixels([[7, 15], [8, 15]], dragonOrange)}
      ${pixels([[6, 14], [7, 14], [8, 14], [9, 14]], dragonOrange)}
      ${pixels([[6, 13], [7, 13], [8, 13], [9, 13]], lavaBright)}
      ${pixels([[5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12]], lavaBright)}
      ${pixels([[5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11]], lavaGlow)}
      ${pixels([[6, 10], [7, 10], [8, 10], [9, 10]], lavaGlow)}
      ${pixels([[6, 9], [7, 9], [8, 9], [9, 9]], lavaGlow)}
      ${pixels([[7, 8], [8, 8]], '#ffff00')}
      ${pixels([[7, 7], [8, 7]], '#ffff00')}
      ${pixels([[7, 6]], '#ffffff')}
    </g>
  `;
}

/**
 * Create repository icon (treasure chest)
 * 16×16px dragon-themed icon for repository statistics
 */
export function createRepoIcon(): string {
  const { eggBase, eggGold, dragonGold } = DRAGON_COLORS;

  return `
    <g class="repo-icon">
      <!-- Chest body -->
      ${pixels([[4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9]], eggBase)}
      ${pixels([[3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10]], eggBase)}
      ${pixels([[3, 11], [12, 11]], eggBase)}
      ${pixels([[3, 12], [12, 12]], eggBase)}
      ${pixels([[3, 13], [12, 13]], eggBase)}
      ${pixels([[3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14]], eggBase)}
      <!-- Gold coins -->
      ${pixels([[5, 11], [6, 11], [9, 11], [10, 11]], dragonGold)}
      ${pixels([[6, 12], [7, 12], [8, 12]], eggGold)}
      ${pixels([[5, 13], [10, 13]], dragonGold)}
      <!-- Lock -->
      ${pixels([[7, 10], [8, 10]], eggGold)}
    </g>
  `;
}

/**
 * Create issue icon (warning crystal)
 * 16×16px dragon-themed icon for issue statistics
 */
export function createIssueIcon(): string {
  const { dragonRed, dragonOrange, lavaGlow } = DRAGON_COLORS;

  return `
    <g class="issue-icon">
      <!-- Crystal/warning shape -->
      ${pixels([[7, 5], [8, 5]], dragonRed)}
      ${pixels([[6, 6], [7, 6], [8, 6], [9, 6]], dragonRed)}
      ${pixels([[6, 7], [9, 7]], dragonRed)}
      ${pixels([[5, 8], [6, 8], [9, 8], [10, 8]], dragonOrange)}
      ${pixels([[5, 9], [10, 9]], dragonOrange)}
      ${pixels([[5, 10], [10, 10]], dragonOrange)}
      ${pixels([[5, 11], [10, 11]], dragonOrange)}
      ${pixels([[6, 12], [9, 12]], dragonOrange)}
      ${pixels([[6, 13], [7, 13], [8, 13], [9, 13]], lavaGlow)}
      ${pixels([[7, 14], [8, 14]], lavaGlow)}
      <!-- Exclamation mark inside -->
      ${pixels([[7, 8], [8, 8]], '#ffffff')}
      ${pixels([[7, 9], [8, 9]], '#ffffff')}
      ${pixels([[7, 10], [8, 10]], '#ffffff')}
      ${pixels([[7, 12], [8, 12]], '#ffffff')}
    </g>
  `;
}

/**
 * Create pull request icon (merge arrows)
 * 16×16px dragon-themed icon for pull request statistics
 */
export function createPRIcon(): string {
  const { dragonGold, eggGold } = DRAGON_COLORS;

  return `
    <g class="pr-icon">
      <!-- Left branch -->
      ${pixels([[4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11]], dragonGold)}
      ${pixels([[3, 4], [5, 4]], dragonGold)}
      ${pixels([[3, 12], [5, 12]], dragonGold)}
      <!-- Right branch -->
      ${pixels([[11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11]], dragonGold)}
      ${pixels([[10, 4], [12, 4]], dragonGold)}
      ${pixels([[10, 12], [12, 12]], dragonGold)}
      <!-- Merge point -->
      ${pixels([[5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8]], eggGold)}
      ${pixels([[7, 7], [8, 7]], eggGold)}
      ${pixels([[7, 9], [8, 9]], eggGold)}
    </g>
  `;
}

/**
 * Create review icon (dragon eye)
 * 16×16px dragon-themed icon for review statistics
 */
export function createReviewIcon(): string {
  const { dragonRed, dragonGold, eyePupil } = DRAGON_COLORS;

  return `
    <g class="review-icon">
      <!-- Eye outline -->
      ${pixels([[5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8]], dragonRed)}
      ${pixels([[4, 9], [11, 9]], dragonRed)}
      ${pixels([[3, 10], [12, 10]], dragonRed)}
      ${pixels([[4, 11], [11, 11]], dragonRed)}
      ${pixels([[5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12]], dragonRed)}
      <!-- Iris (gold) -->
      ${pixels([[6, 9], [7, 9], [8, 9], [9, 9]], dragonGold)}
      ${pixels([[5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10]], dragonGold)}
      ${pixels([[6, 11], [7, 11], [8, 11], [9, 11]], dragonGold)}
      <!-- Pupil (black) -->
      ${pixels([[7, 10], [8, 10]], eyePupil)}
    </g>
  `;
}

// 등각 투영용 스프라이트 함수들 (SVG 문자열만 반환)

/**
 * 드래곤 알 스프라이트 (Level 1)
 */
export function createDragonEggSprite(): string {
  return createDragonEgg().svg;
}

/**
 * 빛나는 드래곤 알 스프라이트 (Level 2)
 * 일반 알에 발광 효과 추가
 */
export function createDragonEggGlowSprite(): string {
  return createDragonEgg().svg;
}

/**
 * 부화 중 드래곤 스프라이트 (Level 3)
 */
export function createHatchingDragonSprite(): string {
  return createHatchingDragon().svg;
}

/**
 * 성체 드래곤 스프라이트 (Level 4)
 */
export function createAdultDragonSprite(): string {
  return createFullDragon().svg;
}

// 테마 시스템: dragon | farm 전환 지원

import { SVGConfig, DragonLevel } from './types';

// 드래곤 테마 (기존)
import { DRAGON_COLORS } from './colors';
import { createBackgroundFilters, createDarkBackground } from './background';
import {
  createDragonEggSprite,
  createDragonEggGlowSprite,
  createHatchingDragonSprite,
  createAdultDragonSprite
} from './sprites';

// 농장 테마 (신규)
import { FARM_COLORS } from './farm-colors';
import { createFarmFilters, createFarmBackground } from './farm-background';
import { createFarmSprite, getFarmSpriteSize } from './farm-sprites';

export type ThemeName = 'dragon' | 'farm';

export interface ThemeColors {
  titleColor: string;
  subtitleColor: string;
  radarFillColor: string;
  radarLabelColor: string;
  radarGridColor: string;
  donutStrokeColor: string;
  statsTextColor: string;
  statsLabelColor: string;
  statsDateColor: string;
  legendTextColor: string;
}

export interface Theme {
  name: ThemeName;
  title: string;
  createBackground: (config: SVGConfig) => string;
  createFilters: () => string;
  createSprite: (level: DragonLevel) => string;
  getSpriteSize: (level: DragonLevel) => { width: number; height: number };
  heightOffsets: number[];
  level4FilterId: string;
  renderLevel0: boolean;
  colors: ThemeColors;
  animationCSS: string;
  outputDir: string;
  outputPrefix: string;
}

/**
 * 드래곤 테마 (기존 코드 그대로 사용)
 */
function getDragonTheme(): Theme {
  const dragonSprite = (level: DragonLevel): string => {
    switch (level) {
      case 0: return '';
      case 1: return createDragonEggSprite();
      case 2: return createDragonEggGlowSprite();
      case 3: return createHatchingDragonSprite();
      case 4: return createAdultDragonSprite();
      default: return '';
    }
  };

  const dragonSpriteSize = (level: DragonLevel): { width: number; height: number } => {
    switch (level) {
      case 0: return { width: 0, height: 0 };
      case 1:
      case 2: return { width: 20, height: 24 };
      case 3: return { width: 26, height: 30 };
      case 4: return { width: 32, height: 32 };
      default: return { width: 0, height: 0 };
    }
  };

  return {
    name: 'dragon',
    title: 'DRAGON LAIR',
    createBackground: createDarkBackground,
    createFilters: createBackgroundFilters,
    createSprite: dragonSprite,
    getSpriteSize: dragonSpriteSize,
    heightOffsets: [0, 5, 10, 15, 25],
    level4FilterId: 'dragonGlow',
    renderLevel0: false,
    colors: {
      titleColor: DRAGON_COLORS.textGold,
      subtitleColor: DRAGON_COLORS.githubGray,
      radarFillColor: '#47a042',
      radarLabelColor: '#c9d1d9',
      radarGridColor: 'gray',
      donutStrokeColor: '#0d1117',
      statsTextColor: '#c9d1d9',
      statsLabelColor: '#8b949e',
      statsDateColor: '#484f58',
      legendTextColor: '#c9d1d9',
    },
    animationCSS: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes dragonGlow {
        0%, 100% { filter: drop-shadow(0 0 3px ${DRAGON_COLORS.dragonOrange}); }
        50% { filter: drop-shadow(0 0 8px ${DRAGON_COLORS.dragonGold}); }
      }
      #isometric-dragon-grid {
        animation: fadeIn 1.5s ease-in-out;
      }
      .radar-chart {
        animation: fadeIn 2s ease-in-out;
      }
      .donut-chart {
        animation: fadeIn 2.5s ease-in-out;
      }
    `,
    outputDir: 'dragon-contrib',
    outputPrefix: 'dragon-contrib',
  };
}

/**
 * 농장 테마 (신규)
 */
function getFarmTheme(): Theme {
  return {
    name: 'farm',
    title: 'MY FARM',
    createBackground: createFarmBackground,
    createFilters: createFarmFilters,
    createSprite: createFarmSprite,
    getSpriteSize: getFarmSpriteSize,
    heightOffsets: [0, 3, 8, 14, 18],
    level4FilterId: 'sunGlow',
    renderLevel0: true,
    colors: {
      titleColor: FARM_COLORS.titleColor,
      subtitleColor: FARM_COLORS.textDark,
      radarFillColor: '#e8a33c',
      radarLabelColor: FARM_COLORS.textDark,
      radarGridColor: '#3d6a2a',
      donutStrokeColor: FARM_COLORS.bgGreen,
      statsTextColor: FARM_COLORS.titleColor,
      statsLabelColor: FARM_COLORS.textLight,
      statsDateColor: FARM_COLORS.textDark,
      legendTextColor: FARM_COLORS.textDark,
    },
    animationCSS: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes sunGlow {
        0%, 100% { filter: drop-shadow(0 0 3px ${FARM_COLORS.sunYellow}); }
        50% { filter: drop-shadow(0 0 6px ${FARM_COLORS.sunOrange}); }
      }
      #isometric-dragon-grid {
        animation: fadeIn 1.5s ease-in-out;
      }
      .radar-chart {
        animation: fadeIn 2s ease-in-out;
      }
      .donut-chart {
        animation: fadeIn 2.5s ease-in-out;
      }
    `,
    outputDir: 'farm-contrib',
    outputPrefix: 'farm-contrib',
  };
}

/**
 * 테마 이름으로 테마 객체 반환
 */
export function getTheme(name: ThemeName): Theme {
  switch (name) {
    case 'dragon': return getDragonTheme();
    case 'farm': return getFarmTheme();
    default: return getFarmTheme();
  }
}

// 테마 시스템: dragon | farm | mountain 전환 지원

import { SVGConfig, DragonLevel } from './types';
import { createFlatFarmSprite } from './farm-sprites';

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

// 설산 테마 (신규)
import { MOUNTAIN_COLORS } from './mountain-colors';
import { createMountainFilters, createMountainBackground } from './mountain-background';
import { createMountainSprite, getMountainSpriteSize } from './mountain-sprites';

export type ThemeName = 'dragon' | 'farm' | 'mountain';

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
  statsPanelColor: string;  // showCharts=false 시 통계 패널 배경색
}

export interface ThemeLayout {
  radarCx: number;
  radarCy: number;
  radarR: number;
  donutCx: number;
  donutCy: number;
  donutOuter: number;
  donutInner: number;
}

export interface Theme {
  name: ThemeName;
  title: string;
  gridStyle: 'isometric' | 'flat';
  showCharts: boolean;
  showHeader: boolean;           // false = 배경이 자체 타이틀 포함
  configOverride?: Partial<SVGConfig>;  // SVGConfig 오버라이드 (캔버스 크기, 그리드 위치)
  statsPanelY?: number;          // 통계 패널 Y 위치 (기본 425)
  reverseWeeks?: boolean;        // true = 최신 주(week)를 좌상단(col=0)에 배치
  createBackground: (config: SVGConfig) => string;
  createFilters: () => string;
  createSprite: (level: DragonLevel) => string;
  getSpriteSize: (level: DragonLevel) => { width: number; height: number };
  createFlatSprite?: (level: DragonLevel) => string;
  heightOffsets: number[];
  level4FilterId: string;
  renderLevel0: boolean;
  colors: ThemeColors;
  animationCSS: string;
  layout: ThemeLayout;
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
    gridStyle: 'isometric',
    showCharts: true,
    showHeader: true,
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
      statsPanelColor: '#0d1117',
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
    layout: {
      radarCx: 700, radarCy: 200, radarR: 110,
      donutCx: 120, donutCy: 420, donutOuter: 75, donutInner: 42,
    },
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
    gridStyle: 'flat',
    showCharts: false,
    showHeader: true,
    createBackground: createFarmBackground,
    createFilters: createFarmFilters,
    createSprite: createFarmSprite,
    getSpriteSize: getFarmSpriteSize,
    createFlatSprite: createFlatFarmSprite,
    heightOffsets: [0, 3, 8, 14, 18],
    level4FilterId: 'sunGlow',
    renderLevel0: true,
    colors: {
      titleColor: FARM_COLORS.titleColor,
      subtitleColor: FARM_COLORS.titleColor,  // 초록 배경에서 잘 보이도록 크림색
      radarFillColor: '#e8a33c',
      radarLabelColor: FARM_COLORS.textDark,
      radarGridColor: '#3d6a2a',
      donutStrokeColor: FARM_COLORS.bgGreen,
      statsTextColor: FARM_COLORS.titleColor,
      statsLabelColor: FARM_COLORS.textLight,
      statsDateColor: FARM_COLORS.textLight,  // 어두운 패널 위에 밝은 색
      legendTextColor: FARM_COLORS.textDark,
      statsPanelColor: '#1e4a10',
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
      #farm-flat-grid {
        animation: fadeIn 1.5s ease-in-out;
      }
      .radar-chart {
        animation: fadeIn 2s ease-in-out;
      }
      .donut-chart {
        animation: fadeIn 2.5s ease-in-out;
      }
    `,
    layout: {
      radarCx: 685, radarCy: 340, radarR: 100,
      donutCx: 145, donutCy: 340, donutOuter: 80, donutInner: 45,
    },
    outputDir: 'farm-contrib',
    outputPrefix: 'farm-contrib',
  };
}

/**
 * 설산 테마
 */
function getMountainTheme(): Theme {
  return {
    name: 'mountain',
    title: "1hyung's Git Mountain",
    gridStyle: 'isometric',
    showCharts: false,
    showHeader: false,          // 제목은 배경에 포함
    configOverride: {
      height: 600,              // 캔버스 높이 확장 (더 장엄한 비율)
      gridOffsetX: 195,         // 53주 그리드를 850px 캔버스 중앙 정렬
      gridOffsetY: 130,         // 그리드를 아래로 (제목 영역 확보)
    },
    reverseWeeks: true,         // 최신 주를 좌상단(col=0)에 배치
    statsPanelY: 490,           // 통계 패널을 최하단으로
    createBackground: createMountainBackground,
    createFilters: createMountainFilters,
    createSprite: createMountainSprite,
    getSpriteSize: getMountainSpriteSize,
    heightOffsets: [0, 4, 10, 16, 24],
    level4FilterId: 'snowGlow',
    renderLevel0: true,
    colors: {
      titleColor: MOUNTAIN_COLORS.titleColor,
      subtitleColor: MOUNTAIN_COLORS.subtitleColor,
      radarFillColor: '#4a80d8',
      radarLabelColor: MOUNTAIN_COLORS.legendTextColor,
      radarGridColor: '#2a3a5a',
      donutStrokeColor: MOUNTAIN_COLORS.skyMid,
      statsTextColor: MOUNTAIN_COLORS.statsTextColor,
      statsLabelColor: MOUNTAIN_COLORS.statsLabelColor,
      statsDateColor: MOUNTAIN_COLORS.statsDateColor,
      legendTextColor: MOUNTAIN_COLORS.legendTextColor,
      statsPanelColor: MOUNTAIN_COLORS.statsPanelColor,
    },
    animationCSS: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes snowGlow {
        0%, 100% { filter: drop-shadow(0 0 3px #f0f4ff); }
        50% { filter: drop-shadow(0 0 8px #f5c890); }
      }
      #isometric-dragon-grid {
        animation: fadeIn 1.5s ease-in-out;
      }
    `,
    layout: {
      radarCx: 700, radarCy: 200, radarR: 110,
      donutCx: 120, donutCy: 420, donutOuter: 75, donutInner: 42,
    },
    outputDir: 'mountain-contrib',
    outputPrefix: 'mountain-contrib',
  };
}

/**
 * 테마 이름으로 테마 객체 반환
 */
export function getTheme(name: ThemeName): Theme {
  switch (name) {
    case 'dragon':   return getDragonTheme();
    case 'farm':     return getFarmTheme();
    case 'mountain': return getMountainTheme();
    default:         return getFarmTheme();
  }
}

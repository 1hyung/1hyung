// 등각 투영 좌표 변환 및 그리드 생성 (테마 파라미터화)

import { GridCell, DragonLevel, SVGConfig } from './types';
import { Theme } from './theme';

// 드래곤 테마 하위 호환을 위한 기존 import 유지
import {
  createDragonEggSprite,
  createDragonEggGlowSprite,
  createHatchingDragonSprite,
  createAdultDragonSprite
} from './sprites';

export interface IsometricPosition {
  x: number;
  y: number;
  z: number; // 레벨에 따른 높이
}

// 등각 투영 좌표 변환
export function toIsometric(
  col: number,
  row: number,
  level: DragonLevel,
  config: SVGConfig,
  heightOffsets: number[] = [0, 5, 10, 15, 25]
): { x: number; y: number } {
  const { cellWidth, cellHeight, gridOffsetX, gridOffsetY } = config;

  const heightOffset = heightOffsets[level] ?? 0;

  return {
    x: gridOffsetX + (col - row) * cellWidth / 2,
    y: gridOffsetY + (col + row) * cellHeight / 2 - heightOffset
  };
}

// 스프라이트 크기 반환 (드래곤 기본)
export function getSpriteSize(level: DragonLevel): { width: number; height: number } {
  switch (level) {
    case 0:
      return { width: 0, height: 0 }; // 빈 셀
    case 1:
    case 2:
      return { width: 20, height: 24 }; // 드래곤 알
    case 3:
      return { width: 26, height: 30 }; // 부화 중
    case 4:
      return { width: 32, height: 32 }; // 성체 드래곤
    default:
      return { width: 0, height: 0 };
  }
}

// 드래곤 스프라이트 생성 (기존 하위 호환)
export function createDragonSprite(level: DragonLevel): string {
  switch (level) {
    case 0:
      return ''; // 빈 셀
    case 1:
      return createDragonEggSprite();
    case 2:
      return createDragonEggGlowSprite();
    case 3:
      return createHatchingDragonSprite();
    case 4:
      return createAdultDragonSprite();
    default:
      return '';
  }
}

/**
 * 테마를 사용하는 등각 투영 그리드 생성 (신규)
 * dragon/farm 양쪽 모두 지원
 */
export function createIsometricGrid(
  cells: GridCell[],
  config: SVGConfig,
  theme: Theme
): string {
  // z-order: 뒤에서 앞으로 렌더링
  const sortedCells = [...cells].sort((a, b) => {
    return (Math.floor(a.y) + Math.floor(a.x)) - (Math.floor(b.y) + Math.floor(b.x));
  });

  let gridSVG = '<g id="isometric-dragon-grid">\n';

  sortedCells.forEach(cell => {
    // renderLevel0=false(dragon)이면 level 0 스킵, true(farm)이면 렌더링
    if (!theme.renderLevel0 && cell.level === 0) return;

    const row = Math.floor(cell.y);
    const col = Math.floor(cell.x);
    const isoPos = toIsometric(col, row, cell.level, config, theme.heightOffsets);
    const size = theme.getSpriteSize(cell.level);
    const sprite = theme.createSprite(cell.level);

    if (!sprite) return;

    // 스프라이트를 중앙 정렬
    const offsetX = isoPos.x - size.width / 2;
    const offsetY = isoPos.y - size.height / 2;

    gridSVG += `  <g transform="translate(${offsetX.toFixed(1)}, ${offsetY.toFixed(1)})">\n`;

    // Level 4에 테마별 필터 적용
    if (cell.level === 4 && theme.level4FilterId) {
      gridSVG += `    <g filter="url(#${theme.level4FilterId})">\n`;
      gridSVG += `      ${sprite}\n`;
      gridSVG += `    </g>\n`;
    } else {
      gridSVG += `    ${sprite}\n`;
    }

    gridSVG += `  </g>\n`;
  });

  gridSVG += '</g>';
  return gridSVG;
}

/**
 * 기존 함수 (하위 호환 유지 - 드래곤 테마 전용)
 */
export function createIsometricDragonGrid(
  cells: GridCell[],
  config: SVGConfig
): string {
  const sortedCells = [...cells].sort((a, b) => {
    const aRow = Math.floor(a.y);
    const aCol = Math.floor(a.x);
    const bRow = Math.floor(b.y);
    const bCol = Math.floor(b.x);
    return (aRow + aCol) - (bRow + bCol);
  });

  let gridSVG = '<g id="isometric-dragon-grid">\n';

  sortedCells.forEach(cell => {
    if (cell.level === 0) return;

    const row = Math.floor(cell.y);
    const col = Math.floor(cell.x);
    const isoPos = toIsometric(col, row, cell.level, config);
    const size = getSpriteSize(cell.level);
    const sprite = createDragonSprite(cell.level);

    const offsetX = isoPos.x - size.width / 2;
    const offsetY = isoPos.y - size.height / 2;

    if (sprite) {
      gridSVG += `  <g transform="translate(${offsetX}, ${offsetY})">\n`;

      if (cell.level === 4) {
        gridSVG += `    <g filter="url(#dragonGlow)">\n`;
        gridSVG += `      ${sprite}\n`;
        gridSVG += `    </g>\n`;
      } else {
        gridSVG += `    ${sprite}\n`;
      }

      gridSVG += `  </g>\n`;
    }
  });

  gridSVG += '</g>';
  return gridSVG;
}

// 그리드 셀 데이터 생성 (주별 데이터를 등각 투영용으로 변환)
export function createGridCells(
  weeks: any[],
  contributionLevelToNumber: (level: string) => DragonLevel
): GridCell[] {
  const cells: GridCell[] = [];

  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day: any, dayIndex: number) => {
      const level = contributionLevelToNumber(day.contributionLevel);

      cells.push({
        x: weekIndex, // col
        y: dayIndex,  // row
        date: day.date,
        count: day.contributionCount,
        level
      });
    });
  });

  return cells;
}

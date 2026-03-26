// 등각 투영 좌표 변환 및 드래곤 그리드 생성

import { GridCell, DragonLevel, SVGConfig } from './types';
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
  config: SVGConfig
): { x: number; y: number } {
  const { cellWidth, cellHeight, gridOffsetX, gridOffsetY } = config;

  // 레벨별 높이 오프셋
  const heightOffsets = [0, 5, 10, 15, 25];
  const heightOffset = heightOffsets[level];

  return {
    x: gridOffsetX + (col - row) * cellWidth / 2,
    y: gridOffsetY + (col + row) * cellHeight / 2 - heightOffset
  };
}

// 스프라이트 크기 반환
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

// 드래곤 스프라이트 생성
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

// 등각 투영 드래곤 그리드 생성
export function createIsometricDragonGrid(
  cells: GridCell[],
  config: SVGConfig
): string {
  // z-order: 뒤에서 앞으로 렌더링 (row가 큰 것부터)
  const sortedCells = [...cells].sort((a, b) => {
    // row, col을 추출 (GridCell의 x, y는 원래 그리드 위치)
    const aRow = Math.floor(a.y);
    const aCol = Math.floor(a.x);
    const bRow = Math.floor(b.y);
    const bCol = Math.floor(b.x);

    // row + col 값으로 정렬 (작은 값부터 = 뒤에서부터)
    return (aRow + aCol) - (bRow + bCol);
  });

  let gridSVG = '<g id="isometric-dragon-grid">\n';

  sortedCells.forEach(cell => {
    if (cell.level === 0) return; // 빈 셀은 렌더링하지 않음

    const row = Math.floor(cell.y);
    const col = Math.floor(cell.x);
    const isoPos = toIsometric(col, row, cell.level, config);
    const size = getSpriteSize(cell.level);
    const sprite = createDragonSprite(cell.level);

    // 스프라이트를 중앙 정렬하기 위한 오프셋
    const offsetX = isoPos.x - size.width / 2;
    const offsetY = isoPos.y - size.height / 2;

    if (sprite) {
      gridSVG += `  <g transform="translate(${offsetX}, ${offsetY})">\n`;

      // Level 4 드래곤에 발광 필터 적용
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

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
 * 플랫 그리드 생성 (농장 테마용 - 탑뷰 격자)
 * 각 셀: 14×14px, 간격: 2px, 스텝: 16px
 */
export function createFlatGrid(
  cells: GridCell[],
  config: SVGConfig,
  theme: Theme
): string {
  const cellSize = 14;
  const cellGap = 2;
  const cellStep = cellSize + cellGap; // 16px

  // 최대 주(col) 수 계산
  const numWeeks = cells.length > 0
    ? Math.max(...cells.map(c => Math.floor(c.x))) + 1
    : 53;

  // 그리드 전체 너비 계산, 수평 중앙 정렬
  const gridWidth = numWeeks * cellStep - cellGap;
  const gridX = Math.round((config.width - gridWidth) / 2);
  const gridY = 305; // 상단 농장 장식 영역 아래

  // 행, 열 순서로 정렬
  const sortedCells = [...cells].sort((a, b) => {
    const rowDiff = Math.floor(a.y) - Math.floor(b.y);
    if (rowDiff !== 0) return rowDiff;
    return Math.floor(a.x) - Math.floor(b.x);
  });

  let svg = '<g id="farm-flat-grid">\n';

  // 셀 색상: 테마 flatCellStyle 우선, 없으면 흙색 기본값
  const cs = theme.flatCellStyle;
  const cellBg0   = cs?.bg0              ?? '#6b4423';
  const cellBgN   = cs?.bgN              ?? '#7a5232';
  const hlColor   = cs?.highlight        ?? '#c87040';
  const shColor   = cs?.shadow           ?? '#4a2f17';
  const hlOpacity = cs?.highlightOpacity ?? '0.5';
  const shOpacity = cs?.shadowOpacity    ?? '0.6';

  sortedCells.forEach(cell => {
    const col = Math.floor(cell.x); // 주 인덱스
    const row = Math.floor(cell.y); // 요일 인덱스

    const cx = gridX + col * cellStep;
    const cy = gridY + row * cellStep;

    // 레벨에 따른 배경색
    const bgColor = cell.level === 0 ? cellBg0 : cellBgN;
    svg += `<rect x="${cx}" y="${cy}" width="${cellSize}" height="${cellSize}" fill="${bgColor}" rx="1"/>\n`;

    // 상단/좌측 하이라이트
    svg += `<rect x="${cx}" y="${cy}" width="${cellSize}" height="1" fill="${hlColor}" opacity="${hlOpacity}"/>\n`;
    svg += `<rect x="${cx}" y="${cy}" width="1" height="${cellSize}" fill="${hlColor}" opacity="${hlOpacity}"/>\n`;

    // 하단/우측 그림자
    svg += `<rect x="${cx}" y="${cy + cellSize - 1}" width="${cellSize}" height="1" fill="${shColor}" opacity="${shOpacity}"/>\n`;
    svg += `<rect x="${cx + cellSize - 1}" y="${cy}" width="1" height="${cellSize}" fill="${shColor}" opacity="${shOpacity}"/>\n`;

    // 식물 스프라이트 (레벨 1 이상)
    if (cell.level > 0 && theme.createFlatSprite) {
      const sprite = theme.createFlatSprite(cell.level);
      if (sprite) {
        svg += `<g transform="translate(${cx}, ${cy})">${sprite}</g>\n`;
      }
    }
  });

  svg += '</g>';
  return svg;
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
  contributionLevelToNumber: (level: string, count: number) => DragonLevel
): GridCell[] {
  const cells: GridCell[] = [];

  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day: any, dayIndex: number) => {
      const level = contributionLevelToNumber(day.contributionLevel, day.contributionCount);

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

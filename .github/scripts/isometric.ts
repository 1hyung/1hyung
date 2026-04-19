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
 * 기본 셀: 14×14px, 간격: 2px, 스텝: 16px
 * 테마에 flatCellSize/flatCellGap/flatBands/flatBandGap 설정 시 해당 값 사용
 *
 * flatBands=2 일 때: 53주를 두 행으로 나눠 파란 박스를 채움
 *   - weeksPerBand = ceil(53/2) = 27
 *   - Band 0: col 0~26, Band 1: col 27~52
 *   - cy += band × (7×cellStep - cellGap + bandGap)
 */
export function createFlatGrid(
  cells: GridCell[],
  config: SVGConfig,
  theme: Theme
): string {
  const cellSize = (theme as any).flatCellSize ?? 14;
  const cellGap  = (theme as any).flatCellGap  ?? 2;
  const cellStep = cellSize + cellGap;
  const bands: number    = (theme as any).flatBands    ?? 1;
  const bandGap: number  = (theme as any).flatBandGap  ?? 0;
  const maxRows: number  = (theme as any).flatMaxRows  ?? 7;

  // 최대 주(col) 수 계산
  const numWeeks = cells.length > 0
    ? Math.max(...cells.map(c => Math.floor(c.x))) + 1
    : 53;

  // 밴드별 너비로 수평 중앙 정렬
  const weeksPerBand = bands > 1 ? Math.ceil(numWeeks / bands) : numWeeks;
  const bandWidth    = weeksPerBand * cellStep - cellGap;
  const gridX = Math.round((config.width - bandWidth) / 2);
  const gridY = theme.flatGridY ?? 305; // 테마별 Y 위치 (기본 305)

  // 행, 열 순서로 정렬
  const sortedCells = [...cells].sort((a, b) => {
    const rowDiff = Math.floor(a.y) - Math.floor(b.y);
    if (rowDiff !== 0) return rowDiff;
    return Math.floor(a.x) - Math.floor(b.x);
  });

  let svg = '<g id="farm-flat-grid">\n';

  // 셀 색상: 테마 flatCellStyle 우선, 없으면 흙색 기본값
  const cs = theme.flatCellStyle;
  const cellBg0      = cs?.bg0              ?? '#6b4423';
  const cellBgN      = cs?.bgN              ?? '#7a5232';
  const hlColor      = cs?.highlight        ?? '#c87040';
  const shColor      = cs?.shadow           ?? '#4a2f17';
  const hlOpacity    = cs?.highlightOpacity ?? '0.5';
  const shOpacity    = cs?.shadowOpacity    ?? '0.6';
  const borderColor  = cs?.borderColor;
  const borderOp     = cs?.borderOpacity    ?? '0.55';
  const borderW      = cs?.borderWidth      ?? 0.8;

  // 스프라이트 스케일 (cellSize가 기본 14와 다를 때 비례 축소/확대)
  const spriteNativeSize = 14;
  const spriteScale = cellSize / spriteNativeSize;

  // 밴드 행 오프셋 = 7행 × cellStep - cellGap + bandGap
  const bandRowOffset = 7 * cellStep - cellGap + bandGap;

  sortedCells.forEach(cell => {
    const col = Math.floor(cell.x); // 주 인덱스
    const row = Math.floor(cell.y); // 요일 인덱스

    if (row >= maxRows) return; // flatMaxRows 초과 행 스킵

    const band      = bands > 1 ? Math.floor(col / weeksPerBand) : 0;
    const colInBand = bands > 1 ? col % weeksPerBand : col;

    const cx = gridX + colInBand * cellStep;
    const cy = gridY + row * cellStep + band * bandRowOffset;

    // 레벨에 따른 배경색 — 'none'이면 rect 생략 (배경 이미지가 비침)
    const bgColor = cell.level === 0 ? cellBg0 : cellBgN;
    if (bgColor !== 'none') {
      svg += `<rect x="${cx}" y="${cy}" width="${cellSize}" height="${cellSize}" fill="${bgColor}" rx="1"/>\n`;
    }

    // 상단/좌측 하이라이트
    svg += `<rect x="${cx}" y="${cy}" width="${cellSize}" height="1" fill="${hlColor}" opacity="${hlOpacity}"/>\n`;
    svg += `<rect x="${cx}" y="${cy}" width="1" height="${cellSize}" fill="${hlColor}" opacity="${hlOpacity}"/>\n`;

    // 하단/우측 그림자
    svg += `<rect x="${cx}" y="${cy + cellSize - 1}" width="${cellSize}" height="1" fill="${shColor}" opacity="${shOpacity}"/>\n`;
    svg += `<rect x="${cx + cellSize - 1}" y="${cy}" width="1" height="${cellSize}" fill="${shColor}" opacity="${shOpacity}"/>\n`;

    // 스프라이트 오버레이 — bg0='none'인 경우 level-0 셀은 완전 투명
    const skipSprite = cell.level === 0 && (cellBg0 === 'none' || cellBg0 === 'transparent');
    if (theme.createFlatSprite && !skipSprite) {
      const sprite = theme.createFlatSprite(cell.level);
      if (sprite) {
        if (Math.abs(spriteScale - 1) > 0.01) {
          svg += `<g transform="translate(${cx}, ${cy}) scale(${spriteScale.toFixed(3)})">${sprite}</g>\n`;
        } else {
          svg += `<g transform="translate(${cx}, ${cy})">${sprite}</g>\n`;
        }
      }
    }

    // 격자 테두리 — 모든 셀에 렌더링 (배경 제거 후 셀 구분용)
    if (borderColor) {
      svg += `<rect x="${cx}" y="${cy}" width="${cellSize}" height="${cellSize}" fill="none" stroke="${borderColor}" stroke-opacity="${borderOp}" stroke-width="${borderW}" rx="1"/>\n`;
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

/**
 * 불완전한 주(첫 주/마지막 주)의 누락된 행을 Lv0 셀로 채움
 * reverseWeeks=true 시 첫 주(현재 주)가 오늘까지만 존재하므로 아래 행이 비어 보임
 */
export function padGridCells(cells: GridCell[], maxRows: number): GridCell[] {
  const colRows = new Map<number, Set<number>>();
  cells.forEach(c => {
    const col = Math.floor(c.x);
    const row = Math.floor(c.y);
    if (!colRows.has(col)) colRows.set(col, new Set());
    colRows.get(col)!.add(row);
  });

  const padding: GridCell[] = [];
  colRows.forEach((rows, col) => {
    for (let r = 0; r < maxRows; r++) {
      if (!rows.has(r)) {
        padding.push({ x: col, y: r, date: '', count: 0, level: 0 });
      }
    }
  });

  return [...cells, ...padding];
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

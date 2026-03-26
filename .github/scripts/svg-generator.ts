import { ContributionCalendar, SVGConfig, DEFAULT_CONFIG, DragonLevel, GridCell } from './types';
import { DRAGON_COLORS } from './colors';
import { createSpriteSymbols, getSpriteSymbolId } from './sprites';
import { createBackgroundGradients, createVolcanicBackground } from './background';
import { contributionLevelToNumber } from './github-api';

/**
 * Convert contribution data to grid cells
 */
export function createGridCells(
  calendar: ContributionCalendar,
  config: SVGConfig
): GridCell[] {
  const cells: GridCell[] = [];
  const weeks = calendar.weeks;

  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day, dayIndex) => {
      const x = config.gridOffsetX + weekIndex * (config.cellSize + config.cellGap);
      const y = config.gridOffsetY + dayIndex * (config.cellSize + config.cellGap);

      cells.push({
        x,
        y,
        date: day.date,
        count: day.contributionCount,
        level: contributionLevelToNumber(day.contributionLevel),
      });
    });
  });

  return cells;
}

/**
 * Get sprite size based on level
 */
function getSpriteSize(level: DragonLevel): { width: number; height: number } {
  switch (level) {
    case 0:
      return { width: 0, height: 0 }; // No sprite for empty cells
    case 1:
      return { width: 18, height: 21 }; // Small egg
    case 2:
    case 3:
      return { width: 20, height: 22 }; // Hatching
    case 4:
      return { width: 22, height: 22 }; // Full dragon
    default:
      return { width: 18, height: 21 };
  }
}

/**
 * Create contribution grid with dragon sprites
 */
export function createContributionGrid(
  cells: GridCell[],
  config: SVGConfig
): string {
  const cellElements = cells.map((cell) => {
    if (cell.level === 0) {
      // Empty cell - show dark volcanic rock
      return `
        <rect
          x="${cell.x}"
          y="${cell.y}"
          width="${config.cellSize}"
          height="${config.cellSize}"
          rx="3"
          fill="${DRAGON_COLORS.rockDark}"
          opacity="0.5"
        >
          <title>${cell.date}: No contributions</title>
        </rect>
      `;
    }

    const symbolId = getSpriteSymbolId(cell.level);
    const spriteSize = getSpriteSize(cell.level);

    // Center the sprite in the cell
    const offsetX = (config.cellSize - spriteSize.width) / 2;
    const offsetY = (config.cellSize - spriteSize.height) / 2;

    return `
      <g class="contribution-cell" filter="url(#spriteShadow)">
        <use
          href="#${symbolId}"
          x="${cell.x + offsetX}"
          y="${cell.y + offsetY}"
          width="${spriteSize.width}"
          height="${spriteSize.height}"
        >
          <title>${cell.date}: ${cell.count} contribution${cell.count !== 1 ? 's' : ''}</title>
        </use>
      </g>
    `;
  });

  return `
    <g id="contribution-grid">
      ${cellElements.join('')}
    </g>
  `;
}

/**
 * Create day labels (Mon, Wed, Fri)
 */
export function createDayLabels(config: SVGConfig): string {
  const days = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const labels = days.map((day, index) => {
    if (!day) return '';
    const y = config.gridOffsetY + index * (config.cellSize + config.cellGap) + config.cellSize / 2 + 4;
    return `
      <text
        x="${config.gridOffsetX - 10}"
        y="${y}"
        text-anchor="end"
        font-family="monospace"
        font-size="11"
        fill="${DRAGON_COLORS.textGold}"
      >${day}</text>
    `;
  }).join('');

  return `<g id="day-labels">${labels}</g>`;
}

/**
 * Create month labels
 */
export function createMonthLabels(
  calendar: ContributionCalendar,
  config: SVGConfig
): string {
  const months: { name: string; x: number }[] = [];
  let currentMonth = '';

  calendar.weeks.forEach((week, weekIndex) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const month = new Date(firstDay.date).toLocaleDateString('en-US', { month: 'short' });
      if (month !== currentMonth) {
        currentMonth = month;
        const x = config.gridOffsetX + weekIndex * (config.cellSize + config.cellGap);
        months.push({ name: month, x });
      }
    }
  });

  const labels = months.map((month) => `
    <text
      x="${month.x}"
      y="${config.gridOffsetY - 10}"
      font-family="monospace"
      font-size="11"
      fill="${DRAGON_COLORS.textGold}"
    >${month.name}</text>
  `).join('');

  return `<g id="month-labels">${labels}</g>`;
}

/**
 * Create statistics display
 */
export function createStatsDisplay(
  totalContributions: number,
  config: SVGConfig
): string {
  return `
    <g id="stats">
      <!-- Title -->
      <text
        x="${config.width / 2}"
        y="50"
        text-anchor="middle"
        font-family="monospace"
        font-size="28"
        font-weight="bold"
        fill="${DRAGON_COLORS.textGold}"
      >DRAGON CONTRIBUTION LAIR</text>

      <!-- Total contributions -->
      <text
        x="${config.width / 2}"
        y="90"
        text-anchor="middle"
        font-family="monospace"
        font-size="18"
        fill="${DRAGON_COLORS.textWhite}"
      >${totalContributions.toLocaleString()} contributions in the last year</text>

      <!-- Legend -->
      <g id="legend" transform="translate(${config.gridOffsetX}, ${config.gridOffsetY + 170})">
        <text x="0" y="0" font-family="monospace" font-size="12" fill="${DRAGON_COLORS.textWhite}">Less</text>
        <use href="#dragon-egg" x="40" y="-12" width="14" height="16"/>
        <use href="#dragon-hatching" x="65" y="-14" width="16" height="18"/>
        <use href="#dragon-full" x="95" y="-14" width="18" height="18"/>
        <text x="125" y="0" font-family="monospace" font-size="12" fill="${DRAGON_COLORS.textWhite}">More</text>
      </g>
    </g>
  `;
}

/**
 * Generate the complete SVG
 */
export function generateSVG(
  calendar: ContributionCalendar,
  config: SVGConfig = DEFAULT_CONFIG
): string {
  const cells = createGridCells(calendar, config);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 ${config.width} ${config.height}"
  width="${config.width}"
  height="${config.height}"
>
  <defs>
    ${createBackgroundGradients()}
    ${createSpriteSymbols()}
  </defs>

  ${createVolcanicBackground(config)}
  ${createDayLabels(config)}
  ${createMonthLabels(calendar, config)}
  ${createContributionGrid(cells, config)}
  ${createStatsDisplay(calendar.totalContributions, config)}
</svg>`;
}

/**
 * Generate animated SVG with additional animations
 */
export function generateAnimatedSVG(
  calendar: ContributionCalendar,
  config: SVGConfig = DEFAULT_CONFIG
): string {
  const baseSVG = generateSVG(calendar, config);

  // Add CSS animations
  const animationStyles = `
    <style>
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes glow {
        0%, 100% { filter: drop-shadow(0 0 2px ${DRAGON_COLORS.lavaGlow}); }
        50% { filter: drop-shadow(0 0 8px ${DRAGON_COLORS.lavaBright}); }
      }
      .contribution-cell:hover use {
        animation: pulse 0.5s ease-in-out;
      }
      #dragon-full {
        animation: glow 2s ease-in-out infinite;
      }
    </style>
  `;

  // Insert styles after opening SVG tag
  return baseSVG.replace(
    '<defs>',
    `${animationStyles}\n  <defs>`
  );
}

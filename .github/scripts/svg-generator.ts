import { ContributionCalendar, SVGConfig, DEFAULT_CONFIG, DragonLevel, GridCell } from './types';
import { DRAGON_COLORS } from './colors';
import { createSpriteSymbols, getSpriteSymbolId, createCommitIcon, createRepoIcon, createIssueIcon, createPRIcon, createReviewIcon } from './sprites';
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
 * Get sprite size based on level (22% increase: PX=2.4)
 */
function getSpriteSize(level: DragonLevel): { width: number; height: number } {
  switch (level) {
    case 0:
      return { width: 0, height: 0 }; // No sprite for empty cells
    case 1:
      return { width: 29, height: 34 }; // Dragon egg (12×14 pixels at 2.4px scale)
    case 2:
    case 3:
      return { width: 38, height: 43 }; // Hatching dragon (16×18 pixels at 2.4px scale)
    case 4:
      return { width: 48, height: 48 }; // Full dragon (20×20 pixels at 2.4px scale)
    default:
      return { width: 29, height: 34 };
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

    // Apply glow filter to Level 4 dragons
    const filter = cell.level === 4 ? 'url(#dragonGlow)' : 'url(#spriteShadow)';

    return `
      <g class="contribution-cell" filter="${filter}">
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
 * Create statistics display with detailed stats bars
 */
export function createStatsDisplay(
  calendar: ContributionCalendar,
  config: SVGConfig
): string {
  const stats = [
    { label: 'Commits', value: calendar.totalCommitContributions || 0, icon: 'commit' },
    { label: 'Repos', value: calendar.totalRepositoryContributions || 0, icon: 'repo' },
    { label: 'Issues', value: calendar.totalIssueContributions || 0, icon: 'issue' },
    { label: 'PRs', value: calendar.totalPullRequestContributions || 0, icon: 'pr' },
    { label: 'Reviews', value: calendar.totalPullRequestReviewContributions || 0, icon: 'review' },
  ];

  const statsBarX = 100;
  const statsBarY = 120;
  const statItemWidth = 216;
  const barHeight = 12;
  const maxBarWidth = 180;

  // Calculate max value for bar scaling
  const maxValue = Math.max(...stats.map(s => s.value), 1);

  const statsElements = stats.map((stat, index) => {
    const x = statsBarX + index * statItemWidth;
    const barWidth = (stat.value / maxValue) * maxBarWidth;

    return `
      <g class="stat-item" transform="translate(${x}, ${statsBarY})">
        <!-- Icon -->
        <svg x="0" y="0" width="16" height="16" viewBox="0 0 ${16 * 2.4} ${16 * 2.4}">
          ${stat.icon === 'commit' ? createCommitIcon() :
            stat.icon === 'repo' ? createRepoIcon() :
            stat.icon === 'issue' ? createIssueIcon() :
            stat.icon === 'pr' ? createPRIcon() :
            createReviewIcon()}
        </svg>

        <!-- Label -->
        <text x="20" y="12" font-family="monospace" font-size="11" fill="${DRAGON_COLORS.textWhite}">${stat.label}</text>

        <!-- Bar background -->
        <rect x="0" y="20" width="${maxBarWidth}" height="${barHeight}" rx="2" fill="${DRAGON_COLORS.rockMedium}" opacity="0.5"/>

        <!-- Bar fill -->
        <rect x="0" y="20" width="${barWidth}" height="${barHeight}" rx="2" fill="${DRAGON_COLORS.dragonGold}">
          <animate attributeName="width" from="0" to="${barWidth}" dur="1s" fill="freeze"/>
        </rect>

        <!-- Value text -->
        <text x="0" y="44" font-family="monospace" font-size="13" font-weight="bold" fill="${DRAGON_COLORS.textGold}">${stat.value.toLocaleString()}</text>
      </g>
    `;
  }).join('');

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

      <!-- Total contributions subtitle -->
      <text
        x="${config.width / 2}"
        y="85"
        text-anchor="middle"
        font-family="monospace"
        font-size="16"
        fill="${DRAGON_COLORS.textWhite}"
      >${calendar.totalContributions.toLocaleString()} contributions in the last year</text>

      <!-- Statistics bars -->
      ${statsElements}
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
  ${createStatsDisplay(calendar, config)}
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

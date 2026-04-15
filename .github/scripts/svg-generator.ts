// Dragon/Farm Contribution 시각화 SVG 생성 (테마 지원)

import { ContributionData, SVGConfig, DEFAULT_CONFIG } from './types';
import { contributionLevelToNumber } from './github-api';
import { createGridCells, createIsometricGrid, createFlatGrid } from './isometric';
import { createRadarChart, createDonutChart, processLanguageData, RadarChartData } from './charts';
import { Theme, getTheme } from './theme';

/**
 * 헤더 생성 (제목 + 날짜 범위)
 */
function createHeader(calendar: any, config: SVGConfig, theme: Theme): string {
  const weeks = calendar.weeks;
  const startDate = weeks[0]?.contributionDays[0]?.date || '';
  const endDate = weeks[weeks.length - 1]?.contributionDays[6]?.date || '';

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return `
    <g id="header">
      <text
        x="50"
        y="30"
        font-family="monospace"
        font-size="20"
        font-weight="bold"
        fill="${theme.colors.titleColor}"
      >${theme.title}</text>

      <text
        x="${config.width - 50}"
        y="30"
        text-anchor="end"
        font-family="monospace"
        font-size="12"
        fill="${theme.colors.subtitleColor}"
      >${formatDate(startDate)} - ${formatDate(endDate)}</text>
    </g>
  `;
}

/**
 * 통계 요약 섹션 생성 (하단)
 */
function createStatsSection(calendar: any, config: SVGConfig, theme: Theme): string {
  const total = calendar.totalContributions.toLocaleString();
  const dateRange = getDateRangeText(calendar);

  if (!theme.showCharts) {
    // 농장 테마: 그리드 아래 중앙 정렬 패널
    const cx = Math.round(config.width / 2);
    const panelY = 425;
    return `
    <g id="stats-summary">
      <rect x="${cx - 200}" y="${panelY}" width="400" height="58" fill="${theme.colors.statsPanelColor}" rx="8" opacity="0.65"/>
      <text font-family="monospace" font-size="12" x="${cx}" y="${panelY + 19}" text-anchor="middle" fill="${theme.colors.statsDateColor}">${dateRange}</text>
      <text font-family="monospace" font-size="20" font-weight="bold" x="${cx}" y="${panelY + 46}" text-anchor="middle" fill="${theme.colors.statsTextColor}">${total} contributions</text>
    </g>
  `;
  }

  // 드래곤 테마: 기존 레이아웃
  const y = config.height - 20;
  return `
    <g id="stats-summary">
      <text style="font-size: 24px; font-weight: bold;" x="300" y="${y}" text-anchor="end" fill="${theme.colors.statsTextColor}">${total}</text>
      <text style="font-size: 18px;" x="310" y="${y}" text-anchor="start" fill="${theme.colors.statsLabelColor}">contributions</text>
      <text style="font-size: 14px;" x="${config.width - 50}" y="${y}" text-anchor="end" fill="${theme.colors.statsDateColor}">${dateRange}</text>
    </g>
  `;
}

/**
 * 날짜 범위 텍스트 생성
 */
function getDateRangeText(calendar: any): string {
  const weeks = calendar.weeks;
  const startDate = weeks[0]?.contributionDays[0]?.date || '';
  const endDate = weeks[weeks.length - 1]?.contributionDays[weeks[weeks.length - 1].contributionDays.length - 1]?.date || '';
  if (!startDate || !endDate) return '';
  return `${startDate} / ${endDate}`;
}

/**
 * 전체 SVG 생성
 */
export function generateSVG(
  data: ContributionData,
  config: SVGConfig = DEFAULT_CONFIG,
  theme: Theme = getTheme('farm')
): string {
  const calendar = data.user.contributionsCollection.contributionCalendar;
  const repositories = data.user.repositories.nodes;

  // 그리드 셀 생성
  const gridCells = createGridCells(calendar.weeks, contributionLevelToNumber);

  // 레이더 차트 데이터
  const radarData: RadarChartData = {
    commits: data.user.contributionsCollection.totalCommitContributions,
    repos: data.user.contributionsCollection.totalRepositoryContributions,
    issues: data.user.contributionsCollection.totalIssueContributions,
    pullRequests: data.user.contributionsCollection.totalPullRequestContributions,
    reviews: data.user.contributionsCollection.totalPullRequestReviewContributions
  };

  // 언어 데이터 처리
  const languages = processLanguageData(repositories);

  // 테마별 그리드 렌더링 (flat: 탑뷰 격자, isometric: 등각 투영)
  const gridSVG = theme.gridStyle === 'flat'
    ? createFlatGrid(gridCells, config, theme)
    : createIsometricGrid(gridCells, config, theme);

  // 테마별 차트 위치
  const { radarCx, radarCy, radarR, donutCx, donutCy, donutOuter, donutInner } = theme.layout;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 ${config.width} ${config.height}"
  width="${config.width}"
  height="${config.height}"
>
  <style>* { font-family: "Ubuntu", "Helvetica", "Arial", sans-serif; }</style>
  <defs>
    ${theme.createFilters()}
  </defs>

  ${theme.createBackground(config)}
  ${createHeader(calendar, config, theme)}

  <!-- 그리드 -->
  <g transform="translate(0, 0)">
    ${gridSVG}
  </g>

  <!-- 레이더 차트 (showCharts=true일 때만) -->
  ${theme.showCharts ? `
  <g>
    ${createRadarChart(radarData, radarCx, radarCy, radarR, {
      fillColor: theme.colors.radarFillColor,
      labelColor: theme.colors.radarLabelColor,
      gridColor: theme.colors.radarGridColor,
    })}
  </g>
  ` : ''}

  <!-- 도넛 차트 (showCharts=true일 때만) -->
  ${theme.showCharts && languages.length > 0 ? `
  <g>
    ${createDonutChart(languages, donutCx, donutCy, donutOuter, donutInner, theme.colors.donutStrokeColor, theme.colors.legendTextColor)}
  </g>
  ` : ''}

  ${createStatsSection(calendar, config, theme)}
</svg>`;
}

/**
 * 애니메이션 SVG 생성
 */
export function generateAnimatedSVG(
  data: ContributionData,
  config: SVGConfig = DEFAULT_CONFIG,
  theme: Theme = getTheme('farm')
): string {
  const baseSVG = generateSVG(data, config, theme);

  const animationStyles = `
    <style>
      ${theme.animationCSS}
    </style>
  `;

  return baseSVG.replace(
    '<defs>',
    `${animationStyles}\n  <defs>`
  );
}

// Dragon Contribution 시각화 SVG 생성 (등각 투영 + 차트 통합)

import { ContributionData, SVGConfig, DEFAULT_CONFIG } from './types';
import { DRAGON_COLORS } from './colors';
import { createBackgroundFilters, createDarkBackground } from './background';
import { contributionLevelToNumber } from './github-api';
import { createGridCells, createIsometricDragonGrid } from './isometric';
import { createRadarChart, createDonutChart, processLanguageData, RadarChartData } from './charts';

/**
 * 헤더 생성 (제목 + 날짜 범위)
 */
function createHeader(calendar: any, config: SVGConfig): string {
  const { textGold, githubGray } = DRAGON_COLORS;

  // 날짜 범위 계산
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
        fill="${textGold}"
      >DRAGON LAIR</text>

      <text
        x="${config.width - 50}"
        y="30"
        text-anchor="end"
        font-family="monospace"
        font-size="12"
        fill="${githubGray}"
      >${formatDate(startDate)} - ${formatDate(endDate)}</text>
    </g>
  `;
}

/**
 * 통계 요약 섹션 생성 (하단)
 */
function createStatsSection(calendar: any, config: SVGConfig): string {
  const { textGold, githubGray } = DRAGON_COLORS;
  const y = config.height - 100;

  const totalRepos = calendar.totalRepositoryContributions || 0;
  const totalStars = 2; // placeholder, GitHub API에서 가져올 수 있음

  return `
    <g id="stats-summary">
      <text
        x="120"
        y="${y}"
        font-family="monospace"
        font-size="24"
        font-weight="bold"
        fill="${textGold}"
      >${calendar.totalContributions.toLocaleString()}</text>

      <text
        x="120"
        y="${y + 20}"
        font-family="monospace"
        font-size="12"
        fill="${githubGray}"
      >contributions</text>

      <text
        x="300"
        y="${y}"
        font-family="monospace"
        font-size="24"
        font-weight="bold"
        fill="${textGold}"
      >☆ ${totalStars}</text>

      <text
        x="300"
        y="${y + 20}"
        font-family="monospace"
        font-size="12"
        fill="${githubGray}"
      >stars</text>

      <text
        x="450"
        y="${y}"
        font-family="monospace"
        font-size="24"
        font-weight="bold"
        fill="${textGold}"
      >ψ ${totalRepos}</text>

      <text
        x="450"
        y="${y + 20}"
        font-family="monospace"
        font-size="12"
        fill="${githubGray}"
      >repos</text>
    </g>
  `;
}

/**
 * 전체 SVG 생성
 */
export function generateSVG(
  data: ContributionData,
  config: SVGConfig = DEFAULT_CONFIG
): string {
  const calendar = data.user.contributionsCollection.contributionCalendar;
  const repositories = data.user.repositories.nodes;

  // 등각 투영 그리드 셀 생성
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 ${config.width} ${config.height}"
  width="${config.width}"
  height="${config.height}"
>
  <defs>
    ${createBackgroundFilters()}
  </defs>

  ${createDarkBackground(config)}
  ${createHeader(calendar, config)}

  <!-- 등각 투영 드래곤 그리드 -->
  <g transform="translate(0, 0)">
    ${createIsometricDragonGrid(gridCells, config)}
  </g>

  <!-- 레이더 차트 (우측 상단) -->
  <g transform="translate(620, 120)">
    ${createRadarChart(radarData, 100, 100, 80)}
  </g>

  <!-- 도넛 차트 (좌측 하단) -->
  ${languages.length > 0 ? `
  <g transform="translate(0, 0)">
    ${createDonutChart(languages, 130, 430, 70, 40)}
  </g>
  ` : ''}

  ${createStatsSection(calendar, config)}
</svg>`;
}

/**
 * 애니메이션 SVG 생성
 */
export function generateAnimatedSVG(
  data: ContributionData,
  config: SVGConfig = DEFAULT_CONFIG
): string {
  const baseSVG = generateSVG(data, config);

  // CSS 애니메이션 추가
  const animationStyles = `
    <style>
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
    </style>
  `;

  return baseSVG.replace(
    '<defs>',
    `${animationStyles}\n  <defs>`
  );
}

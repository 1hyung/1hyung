// Dragon contribution visualization types

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
  totalCommitContributions?: number;
  totalRepositoryContributions?: number;
  totalIssueContributions?: number;
  totalPullRequestContributions?: number;
  totalPullRequestReviewContributions?: number;
}

export interface ContributionData {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
      totalCommitContributions: number;
      totalRepositoryContributions: number;
      totalIssueContributions: number;
      totalPullRequestContributions: number;
      totalPullRequestReviewContributions: number;
    };
  };
}

export type DragonLevel = 0 | 1 | 2 | 3 | 4;

export interface DragonSprite {
  svg: string;
  width: number;
  height: number;
}

export interface GridCell {
  x: number;
  y: number;
  date: string;
  count: number;
  level: DragonLevel;
}

export interface SVGConfig {
  width: number;
  height: number;
  cellSize: number;
  cellGap: number;
  gridOffsetX: number;
  gridOffsetY: number;
}

export const DEFAULT_CONFIG: SVGConfig = {
  width: 1280,
  height: 850,
  cellSize: 22,
  cellGap: 2,
  gridOffsetX: 4,
  gridOffsetY: 190,
};

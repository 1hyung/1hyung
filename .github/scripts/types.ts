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

export interface LanguageEdge {
  size: number;
  node: {
    name: string;
    color: string;
  };
}

export interface Repository {
  languages: {
    edges: LanguageEdge[];
  };
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
    repositories: {
      nodes: Repository[];
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
  cellWidth: number;  // 등각 투영 셀 너비
  cellHeight: number;  // 등각 투영 셀 높이
  gridOffsetX: number;
  gridOffsetY: number;
}

export const DEFAULT_CONFIG: SVGConfig = {
  width: 850,
  height: 520,
  cellWidth: 20,
  cellHeight: 12,
  gridOffsetX: 50,
  gridOffsetY: 60,
};

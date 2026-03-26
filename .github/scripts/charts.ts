// 레이더 차트 및 도넛 차트 생성 함수

import { LanguageEdge } from './types';

export interface RadarChartData {
  commits: number;
  repos: number;
  issues: number;
  pullRequests: number;
  reviews: number;
}

export interface LanguageData {
  name: string;
  size: number;
  color: string;
  percentage: number;
}

/**
 * 레이더 차트 생성 (5축)
 * 중심점 (centerX, centerY), 반지름 radius
 */
export function createRadarChart(
  data: RadarChartData,
  centerX: number,
  centerY: number,
  radius: number
): string {
  // 최대값 정규화
  const maxValue = Math.max(
    data.commits,
    data.repos,
    data.issues,
    data.pullRequests,
    data.reviews
  );

  // 각 축의 값 정규화 (0~1)
  const normalized = {
    commits: maxValue > 0 ? data.commits / maxValue : 0,
    repos: maxValue > 0 ? data.repos / maxValue : 0,
    issues: maxValue > 0 ? data.issues / maxValue : 0,
    pullRequests: maxValue > 0 ? data.pullRequests / maxValue : 0,
    reviews: maxValue > 0 ? data.reviews / maxValue : 0
  };

  // 5개 축의 각도 (오각형)
  const angles = [0, 72, 144, 216, 288]; // 0도부터 시작, 72도씩 증가

  // 각 축의 좌표 계산
  const toRadians = (deg: number) => (deg - 90) * Math.PI / 180; // -90도로 시작점을 위쪽으로

  const points = [
    normalized.commits,
    normalized.repos,
    normalized.issues,
    normalized.pullRequests,
    normalized.reviews
  ].map((value, index) => {
    const angle = toRadians(angles[index]);
    const r = value * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  });

  // 배경 오각형 그리드 (3단계)
  const gridLevels = [0.33, 0.66, 1.0];
  const gridPolygons = gridLevels.map(level => {
    const gridPoints = angles.map(angle => {
      const rad = toRadians(angle);
      const r = level * radius;
      return `${centerX + r * Math.cos(rad)},${centerY + r * Math.sin(rad)}`;
    }).join(' ');

    return `<polygon points="${gridPoints}" stroke="#4a3728" stroke-width="1" fill="none" opacity="0.3"/>`;
  }).join('\n');

  // 축 레이블
  const labels = ['Commits', 'Repos', 'Issues', 'PRs', 'Reviews'];
  const labelElements = labels.map((label, index) => {
    const angle = toRadians(angles[index]);
    const labelRadius = radius + 20;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);

    return `<text x="${x}" y="${y}" font-family="monospace" font-size="11" fill="#8b949e" text-anchor="middle" dominant-baseline="middle">${label}</text>`;
  }).join('\n');

  // 축 선
  const axisLines = angles.map(angle => {
    const rad = toRadians(angle);
    const endX = centerX + radius * Math.cos(rad);
    const endY = centerY + radius * Math.sin(rad);

    return `<line x1="${centerX}" y1="${centerY}" x2="${endX}" y2="${endY}" stroke="#4a3728" stroke-width="1" opacity="0.5"/>`;
  }).join('\n');

  // 데이터 오각형
  const dataPolygon = points.map(p => `${p.x},${p.y}`).join(' ');

  return `
    <g class="radar-chart">
      ${gridPolygons}
      ${axisLines}
      <polygon points="${dataPolygon}" fill="rgba(255, 107, 53, 0.3)" stroke="#ff6b35" stroke-width="2">
        <animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze"/>
      </polygon>
      ${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="#ffd700"/>`).join('\n')}
      ${labelElements}
    </g>
  `;
}

/**
 * 도넛 차트 생성
 * 중심점 (centerX, centerY), 외부 반지름 outerRadius, 내부 반지름 innerRadius
 */
export function createDonutChart(
  languages: LanguageData[],
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number
): string {
  if (languages.length === 0) {
    return '<g class="donut-chart"></g>';
  }

  let currentAngle = -90; // 위쪽부터 시작

  const paths = languages.map((lang, index) => {
    const angleSize = (lang.percentage / 100) * 360;
    const endAngle = currentAngle + angleSize;

    const startRad = currentAngle * Math.PI / 180;
    const endRad = endAngle * Math.PI / 180;

    const x1 = centerX + outerRadius * Math.cos(startRad);
    const y1 = centerY + outerRadius * Math.sin(startRad);
    const x2 = centerX + outerRadius * Math.cos(endRad);
    const y2 = centerY + outerRadius * Math.sin(endRad);

    const x3 = centerX + innerRadius * Math.cos(endRad);
    const y3 = centerY + innerRadius * Math.sin(endRad);
    const x4 = centerX + innerRadius * Math.cos(startRad);
    const y4 = centerY + innerRadius * Math.sin(startRad);

    const largeArcFlag = angleSize > 180 ? 1 : 0;

    const path = `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `;

    currentAngle = endAngle;

    return `<path d="${path}" fill="${lang.color}" stroke="#0d1117" stroke-width="2">
      <title>${lang.name}: ${lang.percentage.toFixed(1)}%</title>
    </path>`;
  }).join('\n');

  // 범례
  const legendY = centerY + outerRadius + 30;
  const legend = languages.slice(0, 5).map((lang, index) => {
    const y = legendY + index * 18;
    return `
      <g>
        <rect x="${centerX - outerRadius}" y="${y}" width="12" height="12" fill="${lang.color}"/>
        <text x="${centerX - outerRadius + 16}" y="${y + 10}" font-family="monospace" font-size="11" fill="#8b949e">
          ${lang.name} (${lang.percentage.toFixed(1)}%)
        </text>
      </g>
    `;
  }).join('\n');

  return `
    <g class="donut-chart">
      ${paths}
      ${legend}
    </g>
  `;
}

/**
 * 언어 데이터 처리 및 정규화
 */
export function processLanguageData(repositories: any[]): LanguageData[] {
  const languageMap = new Map<string, number>();

  // 모든 저장소의 언어 데이터를 집계
  repositories.forEach(repo => {
    if (repo.languages && repo.languages.edges) {
      repo.languages.edges.forEach((edge: LanguageEdge) => {
        const { name, color } = edge.node;
        const size = edge.size;

        if (languageMap.has(name)) {
          languageMap.set(name, languageMap.get(name)! + size);
        } else {
          languageMap.set(name, size);
        }
      });
    }
  });

  // 총 바이트 수 계산
  const totalSize = Array.from(languageMap.values()).reduce((sum, size) => sum + size, 0);

  if (totalSize === 0) {
    return [];
  }

  // 언어 데이터 배열로 변환 및 정렬
  const languages: LanguageData[] = [];

  languageMap.forEach((size, name) => {
    // GitHub Linguist 기본 색상 맵
    const colorMap: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'Java': '#b07219',
      'Kotlin': '#A97BFF',
      'Swift': '#ffac45',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'C++': '#f34b7d',
      'C': '#555555',
      'Ruby': '#701516',
      'PHP': '#4F5D95',
      'C#': '#178600',
      'Shell': '#89e051',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Vue': '#41b883',
      'Dart': '#00B4AB'
    };

    languages.push({
      name,
      size,
      color: colorMap[name] || '#8b949e',
      percentage: (size / totalSize) * 100
    });
  });

  // 크기 순으로 정렬하고 상위 10개만 선택
  return languages
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);
}

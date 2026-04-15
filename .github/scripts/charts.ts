// 레이더 차트 및 도넛 차트 생성 함수
// profile-3d-contrib 스타일을 기반으로 한 고품질 차트

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

export interface RadarChartColors {
  fillColor?: string;
  labelColor?: string;
  gridColor?: string;
}

/**
 * 레이더 차트 생성 (5축, 로그 스케일)
 * profile-3d-contrib 스타일의 오각형 레이더 차트
 *
 * 로그 스케일: 1, 10, 100, 1K, 10K (5단계 동심 오각형)
 * 공식: r = (log10(value) + 1) * step (value >= 1)
 */
export function createRadarChart(
  data: RadarChartData,
  centerX: number,
  centerY: number,
  radius: number,
  chartColors: RadarChartColors = {}
): string {
  const numLevels = 5;
  const step = radius / numLevels;

  // 축 순서: Commit(위), Issue(오른쪽 위), PullReq(오른쪽 아래), Review(왼쪽 아래), Repo(왼쪽 위)
  const labels = ['Commit', 'Issue', 'PullReq', 'Review', 'Repo'];
  const values = [data.commits, data.issues, data.pullRequests, data.reviews, data.repos];
  const angles = [0, 72, 144, 216, 288]; // 위에서 시작, 시계방향 (도)

  const fillColor = chartColors.fillColor ?? '#47a042';
  const labelColor = chartColors.labelColor ?? '#c9d1d9';
  const gridColor = chartColors.gridColor ?? 'gray';

  // 각도(위에서 시계방향) → SVG 좌표 변환
  const toXY = (angleDeg: number, r: number): { x: number; y: number } => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + r * Math.sin(rad),
      y: centerY - r * Math.cos(rad)
    };
  };

  // === 동심 오각형 그리드 (5레벨, 점선) ===
  const gridLines: string[] = [];
  for (let level = 1; level <= numLevels; level++) {
    const r = level * step;
    for (let i = 0; i < 5; i++) {
      const p1 = toXY(angles[i], r);
      const p2 = toXY(angles[(i + 1) % 5], r);
      gridLines.push(
        `<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" style="stroke: ${gridColor}; stroke-dasharray: 4 4; stroke-width: 1px;"/>`
      );
    }
  }

  // === 스케일 라벨 (Commit 축을 따라 표시: 1, 10, 100, 1K, 10K) ===
  const scaleLabels = ['1', '10', '100', '1K', '10K'];
  const scaleFontSize = Math.max(10, Math.round(radius * 0.083));
  const scaleLabelElements = scaleLabels.map((label, i) => {
    const r = (i + 1) * step;
    const x = centerX + step * 0.1;
    const y = centerY - r;
    return `<text style="font-size: ${scaleFontSize}px;" text-anchor="start" dominant-baseline="auto" x="${x.toFixed(2)}" y="${y.toFixed(2)}" fill="gray">${label}</text>`;
  });

  // === 축 선 (내부 → 외부, 점선) + 축 라벨 (값 tooltip 포함) ===
  const labelFontSize = Math.max(13, Math.round(radius * 0.133));
  const axisElements = angles.map((angle, i) => {
    const inner = toXY(angle, step);
    const outer = toXY(angle, radius);
    const labelPos = toXY(angle, radius * 1.17);

    return `<g class="axis">
      <line x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" style="stroke: ${gridColor}; stroke-dasharray: 4 4; stroke-width: 1px;"/>
      <text style="font-size: ${labelFontSize}px;" text-anchor="middle" dominant-baseline="middle" x="${labelPos.x.toFixed(2)}" y="${labelPos.y.toFixed(2)}" fill="${labelColor}">${labels[i]}<title>${values[i]}</title></text>
    </g>`;
  });

  // === 데이터 다각형 (로그 스케일 매핑) ===
  const dataPoints = values.map((value, i) => {
    let r: number;
    if (value <= 0) {
      // 값이 0인 경우 최소 반지름 (첫번째 레벨의 80%)
      r = step * 0.8;
    } else {
      // 로그 스케일: r = (log10(value) + 1) * step
      // value=1 → r=step, value=10 → r=2*step, value=100 → r=3*step, etc.
      r = (Math.log10(value) + 1) * step;
      r = Math.min(r, radius);
      r = Math.max(r, step * 0.8);
    }
    return toXY(angles[i], r);
  });

  const dataPolygonPoints = dataPoints.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

  return `
    <g class="radar-chart">
      ${gridLines.join('\n      ')}
      ${scaleLabelElements.join('\n      ')}
      ${axisElements.join('\n      ')}
      <polygon style="stroke-width: 4px; stroke: ${fillColor}; fill: ${fillColor}; fill-opacity: 0.5;" points="${dataPolygonPoints}"/>
    </g>
  `;
}

/**
 * 도넛 차트 생성
 * profile-3d-contrib 스타일의 도넛 차트
 */
export function createDonutChart(
  languages: LanguageData[],
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number,
  strokeColor: string = '#0d1117',
  legendTextColor: string = '#c9d1d9'
): string {
  if (languages.length === 0) {
    return '<g class="donut-chart"></g>';
  }

  let currentAngle = -90; // 위쪽부터 시작

  const paths = languages.map((lang) => {
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

    return `<path d="${path}" style="fill: ${lang.color};" stroke="${strokeColor}" stroke-width="2px">
      <title>${lang.name} ${lang.size}</title>
    </path>`;
  }).join('\n');

  // 범례 (오른쪽에 배치)
  const legendX = centerX + outerRadius + 20;
  const legendStartY = centerY - outerRadius + 10;
  const rectSize = Math.round(outerRadius * 0.18);
  const legendFontSize = Math.round(outerRadius * 0.18);
  const legendSpacing = Math.round(rectSize * 1.5);

  const legend = languages.slice(0, 5).map((lang, index) => {
    const y = legendStartY + index * legendSpacing;
    return `
      <rect x="${legendX}" y="${y}" width="${rectSize}" height="${rectSize}" fill="${lang.color}" stroke="${strokeColor}" stroke-width="1px"/>
      <text dominant-baseline="middle" x="${legendX + rectSize + 6}" y="${y + rectSize / 2}" fill="${legendTextColor}" font-size="${legendFontSize}px" font-family="'Ubuntu', 'Helvetica', 'Arial', sans-serif">${lang.name}</text>
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
  const languageMap = new Map<string, { size: number; color: string }>();

  // 모든 저장소의 언어 데이터를 집계
  repositories.forEach(repo => {
    if (repo.languages && repo.languages.edges) {
      repo.languages.edges.forEach((edge: LanguageEdge) => {
        const { name, color } = edge.node;
        const size = edge.size;

        if (languageMap.has(name)) {
          languageMap.get(name)!.size += size;
        } else {
          languageMap.set(name, { size, color: color || getDefaultColor(name) });
        }
      });
    }
  });

  // 총 바이트 수 계산
  const totalSize = Array.from(languageMap.values()).reduce((sum, entry) => sum + entry.size, 0);

  if (totalSize === 0) {
    return [];
  }

  // 언어 데이터 배열로 변환 및 정렬
  const languages: LanguageData[] = [];

  languageMap.forEach((entry, name) => {
    languages.push({
      name,
      size: entry.size,
      color: entry.color,
      percentage: (entry.size / totalSize) * 100
    });
  });

  // 크기 순으로 정렬
  const sorted = languages.sort((a, b) => b.size - a.size);

  // 상위 항목 + "other" 그룹
  const topN = 5;
  if (sorted.length <= topN) {
    return sorted;
  }

  const top = sorted.slice(0, topN);
  const others = sorted.slice(topN);
  const otherSize = others.reduce((sum, l) => sum + l.size, 0);
  const otherPercentage = others.reduce((sum, l) => sum + l.percentage, 0);

  top.push({
    name: 'other',
    size: otherSize,
    color: '#444444',
    percentage: otherPercentage
  });

  return top;
}

/**
 * GitHub Linguist 기본 색상 맵
 */
function getDefaultColor(name: string): string {
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

  return colorMap[name] || '#8b949e';
}
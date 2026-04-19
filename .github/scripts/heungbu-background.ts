// 흥부네 커밋 — Gemini 배경 이미지 기반 배경 (1200×600)
// 현판 내부(x=282~904, y=194~372)에 기여 그리드 오버레이

import * as fs from 'fs';
import * as path from 'path';
import { SVGConfig } from './types';
import { HEUNGBU_COLORS as H } from './heungbu-colors';

// ─── Gemini 배경 이미지 로드 (base64) ────────────────────────────
function loadBgImage(): string {
  const imgPath = path.join(__dirname, '../../assets/heungbu-bg.jpg');
  try {
    const data = fs.readFileSync(imgPath);
    return 'data:image/jpeg;base64,' + data.toString('base64');
  } catch {
    return ''; // 이미지 없으면 폴백 (SVG 배경 없음)
  }
}
const BG_IMAGE_B64 = loadBgImage();

// ─── 초가 그리드 영역 (1200×892 전체 이미지 기준) ───────────────────
// 픽셀 분석: 박 끝(img_y≈370) ~ 아래 초가 선(img_y≈527) 사이
// step=42(cell=40+gap=2) — 4칸→1칸 병합 효과, 4행×42-2=166px
// 28주×42-2=1174px (너비 98%)
const SIGN = { x: 0, y: 341, w: 1200, h: 50 };   // y=341, h=50(1행×38+여백)

// ─── 필터 + ClipPath ──────────────────────────────────────────────
export function createHeungbuFilters(): string {
  return `
    <filter id="heungbuGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="gourdShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="#3a1a00" flood-opacity="0.4"/>
    </filter>
    <!-- 그리드를 초가 영역으로 제한하는 clipPath -->
    <clipPath id="heungbu-roof-clip">
      <rect x="${SIGN.x}" y="${SIGN.y}" width="${SIGN.w}" height="${SIGN.h}"/>
    </clipPath>
    <!-- 초가 shimmer 애니메이션용 그라디언트 -->
    <linearGradient id="thatchShimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="rgba(255,245,200,0)"/>
      <stop offset="50%"  stop-color="rgba(255,245,200,0.32)"/>
      <stop offset="100%" stop-color="rgba(255,245,200,0)"/>
    </linearGradient>
  `;
}

// ─── 배경 생성 ────────────────────────────────────────────────────
export function createHeungbuBackground(config: SVGConfig): string {
  const { width: W, height: H } = config;

  const bgTag = BG_IMAGE_B64
    ? `<image href="${BG_IMAGE_B64}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>`
    : `<rect x="0" y="0" width="${W}" height="${H}" fill="#4a8a3a"/>`;  // 이미지 없을 때 폴백

  return `
<g id="heungbu-background">
  <!-- Gemini 배경 이미지 (전체 크기 — 잘림 없음) -->
  ${bgTag}
  <!-- Gemini 워터마크 — 주변 잔디색으로 자연스럽게 덮기 -->
  <rect x="1108" y="808" width="75" height="58" fill="#7CAE4F"/>
  <!-- 초가 밴드 오버레이 — 격자 구분을 위한 극히 미세한 어둠 -->
  <rect x="${SIGN.x}" y="${SIGN.y}" width="${SIGN.w}" height="${SIGN.h}"
    fill="#150900" opacity="0.18" rx="2"/>
</g>`.trim();
}

// ─── 박(호리병) 하나 ─────────────────────────────────────────────
function gourdSVG(cx: number, cy: number, sz: number): string {
  const bRx = Math.round(sz);
  const bRy = Math.round(sz * 0.88);
  const bCy = cy + Math.round(sz * 0.55);
  const tRx = Math.round(sz * 0.55);
  const tRy = Math.round(sz * 0.52);
  const tCy = cy - Math.round(sz * 0.68);
  const neckW = Math.round(sz * 0.28);
  const neckY1 = tCy + tRy - 2;
  const neckH = Math.max(2, bCy - bRy + 2 - neckY1);
  return `
    <ellipse cx="${cx}" cy="${bCy}" rx="${bRx}" ry="${bRy}" fill="${H.gourdMid}" filter="url(#gourdShadow)"/>
    <ellipse cx="${cx - Math.round(bRx * 0.28)}" cy="${bCy - Math.round(bRy * 0.32)}"
      rx="${Math.round(bRx * 0.40)}" ry="${Math.round(bRy * 0.28)}" fill="${H.gourdLight}" opacity="0.72"/>
    <ellipse cx="${cx - Math.round(bRx * 0.14)}" cy="${bCy - Math.round(bRy * 0.52)}"
      rx="${Math.round(bRx * 0.20)}" ry="${Math.round(bRy * 0.15)}" fill="${H.gourdHighlight}" opacity="0.6"/>
    <ellipse cx="${cx}" cy="${tCy}" rx="${tRx}" ry="${tRy}" fill="${H.gourdMid}"/>
    <ellipse cx="${cx - Math.round(tRx * 0.3)}" cy="${tCy - Math.round(tRy * 0.3)}"
      rx="${Math.round(tRx * 0.42)}" ry="${Math.round(tRy * 0.30)}" fill="${H.gourdLight}" opacity="0.70"/>
    <rect x="${cx - neckW}" y="${neckY1}" width="${neckW * 2}" height="${neckH}" fill="${H.gourdMid}"/>
    <rect x="${cx - 2}" y="${tCy - tRy - 7}" width="4" height="9" rx="2" fill="${H.gourdStem}"/>
    <path d="M${cx+2},${tCy-tRy-2} Q${cx+7},${tCy-tRy-9} ${cx+6},${tCy-tRy-16}" stroke="${H.gourdStem}" stroke-width="1.5" fill="none"/>
  `;
}

// ─── 잎 하나 ─────────────────────────────────────────────────────
function gourdLeaf(cx: number, cy: number, angle: number, scale: number): string {
  const w = Math.round(26 * scale), h = Math.round(16 * scale);
  return `
    <ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="${h}" fill="${H.leafMid}"
      transform="rotate(${angle} ${cx} ${cy})" opacity="0.92"/>
    <line x1="${cx}" y1="${cy - Math.round(h * 0.7)}" x2="${cx}" y2="${cy + Math.round(h * 0.7)}"
      stroke="${H.leafDark}" stroke-width="1" opacity="0.40"
      transform="rotate(${angle} ${cx} ${cy})"/>
  `;
}

/**
 * 박 덩굴 동적 생성 — 총 커밋 수에 비례하여 박 크기/개수 결정
 * 현판 받침대 아래 잔디 영역(y≈465~)에 표시
 *
 * - 0~49:   박 2개 (r×1.0)
 * - 50~199: 박 3개 (r×1.2)
 * - 200~399: 박 4개 (r×1.5)
 * - 400+:   박 5개 (r×1.8)
 */
export function createHeungbuPumpkins(totalCommits: number): string {
  // 커밋 수 → 개수와 성장 배율
  const count = totalCommits >= 400 ? 5
    : totalCommits >= 200 ? 4
    : totalCommits >= 50  ? 3
    : 2;
  const growFactor = Math.min(1.0 + totalCommits / 600, 1.9);

  // 박 배치 좌표 (translate(150, 390) 기준, VINE_Y=68에서 덩굴선)
  const allPositions: Array<{ x: number; baseSz: number }> = [
    { x:  80, baseSz: 12 },  // 좌측
    { x: 720, baseSz: 10 },  // 우측
    { x: 250, baseSz: 11 },  // 좌중
    { x: 490, baseSz:  9 },  // 중앙
    { x: 870, baseSz:  9 },  // 우끝
  ];
  const positions = allPositions.slice(0, count);

  const VINE_Y = 68; // 덩굴선 Y

  // 덩굴 줄기
  const vines = positions.slice(0, -1).map((g, i) => {
    const nx = positions[i + 1].x;
    const droop = 10 + (i % 3) * 3;
    return `<path d="M${g.x},${VINE_Y} C${g.x+18},${VINE_Y-droop} ${nx-18},${VINE_Y-droop} ${nx},${VINE_Y}"
      stroke="${H.vineGreen}" stroke-width="3.5" fill="none" opacity="0.9"/>`;
  }).join('\n    ');

  // 잎
  const leafDefs = positions.slice(0, -1).map((g, i) => ({
    x: Math.round((g.x + positions[i + 1].x) / 2),
    angle: i % 2 === 0 ? -24 : 22,
    scale: 1.0 + (i % 3) * 0.15,
  }));
  const leaves = leafDefs.map(({ x, angle, scale }) =>
    gourdLeaf(x, VINE_Y - 4, angle, scale)
  ).join('');

  // 박 호리병
  const gourds = positions.map(({ x, baseSz }) => {
    const sz = Math.round(baseSz * growFactor);
    const cy = VINE_Y - Math.round(sz * 1.98);
    return gourdSVG(x, cy, sz);
  }).join('');

  return `
<g id="pumpkins" transform="translate(150, 390)">
  <!-- 덩굴 줄기 -->
  ${vines}
  <!-- 잎 -->
  ${leaves}
  <!-- 박(호리병) -->
  ${gourds}
</g>`.trim();
}

// ─── 전경 (그리드 위) — 초가 shimmer 빛 반사 오버레이 ───────────
export function createHeungbuForeground(_config: SVGConfig): string {
  return `
<g id="heungbu-foreground">
  <!-- 초가 지붕 빛 반사 shimmer — CSS 애니메이션으로 좌→우 이동 -->
  <g clip-path="url(#heungbu-roof-clip)">
    <rect id="thatch-shimmer"
      x="${SIGN.x - 260}" y="${SIGN.y}"
      width="260" height="${SIGN.h}"
      fill="url(#thatchShimmerGrad)"/>
  </g>
</g>`.trim();
}

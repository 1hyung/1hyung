// 테마별 기여 레벨 아이템창 SVG 생성
// 출력: assets/sprite-guide-{mountain|farm|dragon}.svg
//       assets/section-divider-mountain.svg

import * as fs from 'fs';
import * as path from 'path';
import { createMountainSprite, getMountainSpriteSize } from './mountain-sprites';
import { createFarmSprite, getFarmSpriteSize } from './farm-sprites';
import {
  createDragonEggSprite,
  createDragonEggGlowSprite,
  createHatchingDragonSprite,
  createAdultDragonSprite,
} from './sprites';
import { DragonLevel } from './types';

// ── 패널 레이아웃 상수 ──────────────────────────────────────────
const PANEL_W = 850;
const PANEL_H = 112;
const BOX_W = 156;
const BOX_H = 102;
const BOX_GAP = 8;
// (850 - 5×156 - 4×8) / 2 = 19
const LEFT_MARGIN = Math.round((PANEL_W - BOX_W * 5 - BOX_GAP * 4) / 2);
const BOX_TOP = 5;

// 박스 내 상대 좌표
const LABEL_Y_REL = 12;        // 레벨 텍스트 Y
const SPRITE_ZONE_Y_REL = 16;  // 스프라이트 영역 시작 Y
const SPRITE_ZONE_H = 64;      // 스프라이트 영역 높이
const DESC_Y_REL = 93;         // 설명 텍스트 Y

// ── 테마별 색상 ─────────────────────────────────────────────────
interface ThemeColors {
  panelBg: string;
  panelBorder: string;
  boxBg: string;
  boxBorder: string;
  boxBorderHigh: string;  // Lv.4 강조 테두리
  labelColor: string;
  descColor: string;
  emptyColor: string;
}

const THEME_COLORS: Record<string, ThemeColors> = {
  mountain: {
    panelBg:      '#0d1b38',
    panelBorder:  '#2a3d5a',
    boxBg:        '#112040',
    boxBorder:    '#2a4060',
    boxBorderHigh:'#c0d8f8',
    labelColor:   '#c0d4f0',
    descColor:    '#6888b0',
    emptyColor:   '#2a3d5a',
  },
  farm: {
    panelBg:      '#1a3d10',
    panelBorder:  '#3a6020',
    boxBg:        '#1e4812',
    boxBorder:    '#3a6020',
    boxBorderHigh:'#90d840',
    labelColor:   '#d8e8c0',
    descColor:    '#80b060',
    emptyColor:   '#3a6020',
  },
  dragon: {
    panelBg:      '#0d1117',
    panelBorder:  '#30363d',
    boxBg:        '#161b22',
    boxBorder:    '#30363d',
    boxBorderHigh:'#f0c040',
    labelColor:   '#c9d1d9',
    descColor:    '#6e7681',
    emptyColor:   '#30363d',
  },
};

// ── 스프라이트 아이템 ────────────────────────────────────────────
interface SpriteItem {
  level: number;
  svg: string;
  width: number;
  height: number;
  label: string;
}

function getMountainItems(): SpriteItem[] {
  const labels = ['빈 땅', '소형 나무', '민둥산', '풀 덮힌 산', '설산'];
  return [0, 1, 2, 3, 4].map((lv) => {
    const size = getMountainSpriteSize(lv as DragonLevel);
    return {
      level: lv,
      svg: createMountainSprite(lv as DragonLevel),
      width: size.width,
      height: size.height,
      label: labels[lv],
    };
  });
}

function getFarmItems(): SpriteItem[] {
  const labels = ['빈 밭', '새싹', '묘목', '나무', '사과나무'];
  return [0, 1, 2, 3, 4].map((lv) => {
    const size = getFarmSpriteSize(lv as DragonLevel);
    return {
      level: lv,
      svg: createFarmSprite(lv as DragonLevel),
      width: size.width,
      height: size.height,
      label: labels[lv],
    };
  });
}

function getDragonItems(): SpriteItem[] {
  const labels = ['없음', '드래곤 알', '발광하는 알', '부화 중', '성체 드래곤'];
  const sprites = [
    '',
    createDragonEggSprite(),
    createDragonEggGlowSprite(),
    createHatchingDragonSprite(),
    createAdultDragonSprite(),
  ];
  const sizes = [
    { width: 0, height: 0 },
    { width: 20, height: 24 },
    { width: 20, height: 24 },
    { width: 26, height: 30 },
    { width: 32, height: 32 },
  ];
  return [0, 1, 2, 3, 4].map((lv) => ({
    level: lv,
    svg: sprites[lv],
    width: sizes[lv].width,
    height: sizes[lv].height,
    label: labels[lv],
  }));
}

// ── 박스 렌더링 ─────────────────────────────────────────────────
function renderBox(
  bx: number,
  item: SpriteItem,
  colors: ThemeColors,
): string {
  const by = BOX_TOP;
  const isLevel4 = item.level === 4;
  const border = isLevel4 ? colors.boxBorderHigh : colors.boxBorder;
  const strokeW = isLevel4 ? '1.5' : '1';

  // 스프라이트 스케일 — 스프라이트 영역(64×136px)에 최대한 크게
  let spriteEl = '';
  if (item.svg && item.height > 0) {
    const maxScaleH = (SPRITE_ZONE_H - 2) / item.height;
    const maxScaleW = (BOX_W - 20) / item.width;
    const scale = Math.min(2.5, maxScaleH, maxScaleW);

    const scaledW = item.width * scale;
    const scaledH = item.height * scale;
    // 스프라이트 영역 중앙 정렬
    const tx = bx + (BOX_W - scaledW) / 2;
    const ty = by + SPRITE_ZONE_Y_REL + (SPRITE_ZONE_H - scaledH) / 2;

    spriteEl = `<g transform="translate(${tx.toFixed(1)},${ty.toFixed(1)}) scale(${scale.toFixed(3)})">${item.svg}</g>`;
  } else {
    // 스프라이트 없음 (드래곤 Lv.0 등)
    const cx = bx + BOX_W / 2;
    const cy = by + SPRITE_ZONE_Y_REL + SPRITE_ZONE_H / 2 + 5;
    spriteEl = `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="monospace" font-size="20" fill="${colors.emptyColor}" opacity="0.5">—</text>`;
  }

  const centerX = bx + BOX_W / 2;
  return `
  <rect x="${bx}" y="${by}" width="${BOX_W}" height="${BOX_H}"
        fill="${colors.boxBg}" stroke="${border}" stroke-width="${strokeW}" rx="3"/>
  <text x="${centerX}" y="${by + LABEL_Y_REL}" text-anchor="middle"
        font-family="monospace" font-size="9" fill="${colors.labelColor}" opacity="0.65">Lv.${item.level}</text>
  ${spriteEl}
  <text x="${centerX}" y="${by + DESC_Y_REL}" text-anchor="middle"
        font-family="monospace" font-size="8" fill="${colors.descColor}">${item.label}</text>`;
}

// ── 패널 SVG 생성 ────────────────────────────────────────────────
function generatePanel(themeName: string): string {
  const items =
    themeName === 'mountain' ? getMountainItems() :
    themeName === 'farm'     ? getFarmItems() :
                               getDragonItems();
  const colors = THEME_COLORS[themeName];

  let boxes = '';
  for (let i = 0; i < 5; i++) {
    const bx = LEFT_MARGIN + i * (BOX_W + BOX_GAP);
    boxes += renderBox(bx, items[i], colors);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PANEL_W} ${PANEL_H}" width="${PANEL_W}" height="${PANEL_H}">
  <rect width="${PANEL_W}" height="${PANEL_H}" fill="${colors.panelBg}" rx="4"/>
  <rect width="${PANEL_W}" height="${PANEL_H}" fill="none" stroke="${colors.panelBorder}" stroke-width="1.5" rx="4"/>
  ${boxes}
</svg>`;
}

// ── 설산 스타일 섹션 구분선 SVG ──────────────────────────────────
function generateMountainDivider(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 30" width="1200" height="30">
  <rect width="1200" height="30" fill="#0d1b38"/>
  <path d="M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
        stroke="#3a6090" stroke-width="1.5" fill="none" opacity="0.8">
    <animate attributeName="d"
      values="M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
              M 0,15 Q 100,22 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15;
              M 0,15 Q 100,8 200,15 T 400,15 T 600,15 T 800,15 T 1000,15 T 1200,15"
      dur="5s" repeatCount="indefinite"/>
  </path>
  <g fill="#f0f4ff" opacity="0.45">
    <circle cx="120" cy="12" r="1.5"/>
    <circle cx="300" cy="19" r="1"/>
    <circle cx="480" cy="10" r="1.5"/>
    <circle cx="650" cy="21" r="1"/>
    <circle cx="820" cy="11" r="1.5"/>
    <circle cx="1000" cy="20" r="1"/>
    <circle cx="1100" cy="13" r="1.5"/>
  </g>
</svg>`;
}

// ── 메인 ────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const assetsDir = path.resolve(__dirname, '../../assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // 테마별 스프라이트 가이드 생성
  for (const theme of ['mountain', 'farm', 'dragon']) {
    const content = generatePanel(theme);
    const outPath = path.join(assetsDir, `sprite-guide-${theme}.svg`);
    fs.writeFileSync(outPath, content, 'utf8');
    console.log(`✓ 생성: assets/sprite-guide-${theme}.svg`);
  }

  // 설산 스타일 섹션 구분선 생성
  const divider = generateMountainDivider();
  fs.writeFileSync(path.join(assetsDir, 'section-divider-mountain.svg'), divider, 'utf8');
  console.log('✓ 생성: assets/section-divider-mountain.svg');

  console.log('\n스프라이트 가이드 생성 완료!');
}

main().catch((err) => {
  console.error('오류:', err);
  process.exit(1);
});

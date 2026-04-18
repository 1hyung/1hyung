// 흥부네 커밋 — 레벨별 박/씨앗 아이콘 (flat grid 14×14px 셀)
// Lv0: 빈 셀 (투명)
// Lv1: 씨앗 — 작은 연한 원형
// Lv2: 낟알 — 중간 황금 원형
// Lv3: 어린 박 — 호리병 실루엣
// Lv4: 황금 박 — 크고 빛나는 호리병

import { DragonLevel } from './types';
import { HEUNGBU_COLORS as H } from './heungbu-colors';

const BG_DARK = '#0d0800';
const BG_OP = '0.75';

/**
 * Lv1: 씨앗 — 작은 연한 원형 (아직 싹 트지 않음)
 */
function seedIcon(): string {
  return `<circle cx="7" cy="7" r="2.6" fill="#D4C060"/>
<circle cx="5.8" cy="5.8" r="0.9" fill="#F0E090" opacity="0.70"/>`;
}

/**
 * Lv2: 낟알 — 중간 황금 원형 (성장 시작)
 */
function grainIcon(): string {
  return `<circle cx="7" cy="7.5" r="3.8" fill="${H.gourdLight}"/>
<circle cx="5.5" cy="6.2" r="1.4" fill="${H.gourdHighlight}" opacity="0.65"/>`;
}

/**
 * Lv3: 어린 박 — 호리병 실루엣 (성장 중)
 */
function youngGourdIcon(): string {
  const col = H.gourdMid;
  const hl  = H.gourdLight;
  return `<ellipse cx="7" cy="9.6" rx="3.4" ry="2.7" fill="${col}"/>
<ellipse cx="7" cy="4.8" rx="2.1" ry="1.7" fill="${col}"/>
<rect x="6.2" y="6.5" width="1.6" height="1.4" fill="${col}"/>
<line x1="7" y1="2.9" x2="7" y2="1.3" stroke="${H.gourdStem}" stroke-width="1.4" stroke-linecap="round"/>
<ellipse cx="5.6" cy="9.0" rx="1.2" ry="0.9" fill="${hl}" opacity="0.55"/>`;
}

/**
 * Lv4: 황금 박 — 크고 빛나는 호리병 (수확기)
 */
function goldenGourdIcon(): string {
  return `<ellipse cx="7" cy="9.6" rx="3.9" ry="3.1" fill="#D4A020"/>
<ellipse cx="7" cy="4.5" rx="2.5" ry="2.0" fill="#D4A020"/>
<rect x="6.2" y="6.4" width="1.6" height="1.5" fill="#D4A020"/>
<line x1="7" y1="2.3" x2="7" y2="0.9" stroke="#406020" stroke-width="1.5" stroke-linecap="round"/>
<ellipse cx="5.4" cy="8.8" rx="1.5" ry="1.1" fill="#FFD840" opacity="0.68"/>
<ellipse cx="5.5" cy="3.8" rx="1.0" ry="0.8" fill="#FFD840" opacity="0.60"/>
<rect x="0" y="0" width="14" height="14" fill="none" stroke="#FFD700" stroke-width="0.6" opacity="0.50" rx="1.5"/>`;
}

export function createFlatHeungbuSprite(level: DragonLevel): string {
  if (level === 0) return '';

  let icon: string;
  switch (level) {
    case 1:  icon = seedIcon();       break;
    case 2:  icon = grainIcon();      break;
    case 3:  icon = youngGourdIcon(); break;
    case 4:  icon = goldenGourdIcon();break;
    default: return '';
  }

  return icon;
}

/** isometric 인터페이스 호환용 */
export function createHeungbuSprite(level: DragonLevel): string {
  return createFlatHeungbuSprite(level);
}

export function getHeungbuSpriteSize(_level: DragonLevel): { width: number; height: number } {
  return { width: 14, height: 14 };
}

// 흥부네 커밋 — 레벨별 아이콘 (Variant C: Dancheong Pop)
// 14×14px 네이티브, spriteScale≈2.86으로 확대
// 개선: 접지 그림자 + 진한 외곽선 + 상단 하이라이트/하단 음영 + 박 색조를 배경 일러스트에 정합
// Lv0: 배경(초가) 자연스럽게 비침 — 스프라이트 없음

import { DragonLevel } from './types';

// 박 색 팔레트 (배경 일러스트의 따뜻한 주황-탄에 맞춤)
const G_BODY = '#DB8A36';
const G_SHADE = '#B06A1E';
const G_HI = '#F6D27A';
const G_HI2 = '#FFF2B8';
const G_LINE = '#8A4A12';
const STEM = '#2A5C08';
const STEM_DK = '#1F4406';
const LEAF_HI = '#5AA828';
const LEAF_MD = '#4A8A30';
const LEAF_DK = '#3D7A26';

/** Lv1: 새싹 — 줄기 + 두 잎 + 단청 포인트 (접지 그림자·외곽선·하이라이트) */
function sproutIcon(): string {
  return `<ellipse cx="7" cy="12.9" rx="3.3" ry="0.85" fill="#33240f" opacity="0.20"/>
<line x1="7" y1="12.6" x2="7" y2="8" stroke="${STEM_DK}" stroke-width="2.3" stroke-linecap="round"/>
<line x1="7" y1="12.2" x2="7" y2="8.3" stroke="${LEAF_HI}" stroke-width="1.0" stroke-linecap="round"/>
<path d="M7 10 Q 3 9 2.5 6 Q 5 7.5 7 10 Z" fill="${LEAF_HI}" stroke="${STEM}" stroke-width="0.45"/>
<path d="M7 10 Q 11 9 11.5 6 Q 9 7.5 7 10 Z" fill="${LEAF_DK}" stroke="${STEM}" stroke-width="0.45"/>
<path d="M6.4 9.3 Q 4.3 8.4 3.4 6.7" stroke="#9BD85A" stroke-width="0.5" fill="none" opacity="0.75"/>
<circle cx="7" cy="6.7" r="0.95" fill="#D94A4A"/>
<circle cx="7" cy="6.7" r="0.4" fill="#F0C040"/>`;
}

/** Lv2: 덩굴 — S자 덩굴 + 잎 3장 + 빨간 덩굴손 (외곽선·접지 그림자) */
function vineIcon(): string {
  return `<ellipse cx="7" cy="13" rx="3.8" ry="0.85" fill="#33240f" opacity="0.18"/>
<path d="M1.5 13 Q 4 10 6 8 Q 8 6 12.5 2.5" stroke="${STEM_DK}" stroke-width="2.3" fill="none" stroke-linecap="round"/>
<path d="M1.5 13 Q 4 10 6 8 Q 8 6 12.5 2.5" stroke="#3D7A14" stroke-width="1.0" fill="none" stroke-linecap="round"/>
<path d="M3.5 11 Q 1.5 10 1 8 Q 3 9.2 4.5 11 Z" fill="${LEAF_HI}" stroke="${STEM}" stroke-width="0.4"/>
<path d="M7 8 Q 5 6.5 5 5 Q 7 6.5 7.8 7.7 Z" fill="${LEAF_DK}" stroke="${STEM}" stroke-width="0.4"/>
<path d="M10.5 4.8 Q 9 3.2 9 1.7 Q 10.8 3 11.3 4.5 Z" fill="${LEAF_HI}" stroke="${STEM}" stroke-width="0.4"/>
<path d="M10.8 3.5 Q 12.5 2 13.5 0.8" stroke="#D94A4A" stroke-width="0.9" fill="none" stroke-linecap="round"/>
<circle cx="4" cy="11" r="0.5" fill="#F0C040"/>`;
}

/** Lv3: 덩굴에 막 열린 작은 박 (외곽선·음영·하이라이트·접지 그림자) */
function vineSmallGourdIcon(): string {
  return `<ellipse cx="10.5" cy="11.7" rx="2.8" ry="0.8" fill="#33240f" opacity="0.20"/>
<path d="M1 13 Q 3 10 5.5 8.5 Q 8 7 12.5 5" stroke="${STEM_DK}" stroke-width="2.0" fill="none" stroke-linecap="round"/>
<path d="M1 13 Q 3 10 5.5 8.5 Q 8 7 12.5 5" stroke="#3D7A14" stroke-width="0.85" fill="none" stroke-linecap="round"/>
<path d="M3.5 11 Q 1.5 10 1 8.5 Q 3 9.5 4.2 11 Z" fill="${LEAF_HI}" stroke="${STEM}" stroke-width="0.4"/>
<path d="M7 8 Q 5.3 6.6 5.3 5.1 Q 7 6.2 7.8 7.5 Z" fill="${LEAF_DK}" stroke="${STEM}" stroke-width="0.4"/>
<circle cx="10.5" cy="9.5" r="2.4" fill="${G_BODY}" stroke="${G_LINE}" stroke-width="0.5"/>
<path d="M8.6 10.6 Q 10.5 11.7 12.4 10.6" stroke="${G_SHADE}" stroke-width="0.8" fill="none" opacity="0.7"/>
<ellipse cx="9.6" cy="8.7" rx="1.0" ry="0.65" fill="${G_HI}" opacity="0.8"/>
<circle cx="9.4" cy="8.5" r="0.3" fill="${G_HI2}" opacity="0.9"/>
<line x1="10.5" y1="7.2" x2="10.5" y2="6" stroke="${STEM}" stroke-width="1.2" stroke-linecap="round"/>`;
}

/** Lv4: 둥근 황금 박 + 잎 + 단청 포인트 (외곽선·음영·하이라이트·은은한 글로우) */
function bigGourdIcon(): string {
  return `<ellipse cx="7.5" cy="13.4" rx="4.6" ry="1.05" fill="#33240f" opacity="0.22"/>
<circle cx="7.5" cy="8.5" r="5.5" fill="${G_BODY}" stroke="${G_LINE}" stroke-width="0.6"/>
<path d="M3 10.6 Q 7.5 13.3 12 10.6" stroke="${G_SHADE}" stroke-width="1.3" fill="none" opacity="0.45"/>
<path d="M2.7 8.5 Q 7.5 11.6 12.3 8.5" stroke="${G_SHADE}" stroke-width="0.5" fill="none" opacity="0.6"/>
<path d="M2.7 8.5 Q 7.5 5.4 12.3 8.5" stroke="${G_SHADE}" stroke-width="0.4" fill="none" opacity="0.5"/>
<ellipse cx="5.4" cy="6.6" rx="2.4" ry="1.5" fill="${G_HI}" opacity="0.6"/>
<ellipse cx="5.8" cy="6.0" rx="1.1" ry="0.6" fill="${G_HI2}" opacity="0.8"/>
<line x1="7.5" y1="3.1" x2="7.5" y2="1.5" stroke="${STEM}" stroke-width="1.9" stroke-linecap="round"/>
<path d="M7.8 2 Q 10.5 1.2 12.5 0.4" stroke="${STEM}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<path d="M4.5 3.6 Q 3 2.6 2.6 1.2 Q 4 2.2 5 3.4 Z" fill="${LEAF_MD}" stroke="${STEM}" stroke-width="0.35"/>
<circle cx="10.5" cy="10" r="0.6" fill="#D94A4A" opacity="0.85"/>
<circle cx="10.8" cy="9.7" r="0.25" fill="#F0C040"/>
<circle cx="7.5" cy="8.5" r="5.5" fill="none" stroke="#F5C820" stroke-width="0.7" opacity="0.4"/>`;
}

export function createFlatHeungbuSprite(level: DragonLevel): string {
  switch (level) {
    case 0: return '';
    case 1: return sproutIcon();
    case 2: return vineIcon();
    case 3: return vineSmallGourdIcon();
    case 4: return bigGourdIcon();
    default: return '';
  }
}

export function createHeungbuSprite(level: DragonLevel): string {
  return createFlatHeungbuSprite(level);
}

export function getHeungbuSpriteSize(_level: DragonLevel): { width: number; height: number } {
  return { width: 14, height: 14 };
}

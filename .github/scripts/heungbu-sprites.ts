// 흥부네 커밋 — 레벨별 아이콘 (14×14px 네이티브, spriteScale≈2.86으로 확대)
// Lv0: 배경(초가) 자연스럽게 비침 — 스프라이트 없음
// Lv1: 새싹
// Lv2: 덩굴
// Lv3: 덩굴 + 작은 박
// Lv4: 큰 박 (황금 박)

import { DragonLevel } from './types';

/** Lv1: 새싹 — 줄기 + 두 잎 */
function sproutIcon(): string {
  return `<line x1="7" y1="13.5" x2="7" y2="8" stroke="#2E6010" stroke-width="1.5" stroke-linecap="round"/>
<ellipse cx="4.2" cy="6.2" rx="3.2" ry="1.7" fill="#72CB35" transform="rotate(-38 4.2 6.2)"/>
<ellipse cx="9.8" cy="5.6" rx="3.2" ry="1.7" fill="#58B828" transform="rotate(38 9.8 5.6)"/>
<line x1="7" y1="8" x2="7" y2="4.5" stroke="#2E6010" stroke-width="1.3" stroke-linecap="round"/>
<circle cx="7" cy="3.8" r="1.4" fill="#3A9016"/>`;
}

/** Lv2: 덩굴 — 줄기 구불구불 + 잎 3장 */
function vineIcon(): string {
  return `<path d="M2,13.5 C2,10 5,9 5,6 C5,3 9,2 12,4" stroke="#2E6010" stroke-width="1.7" fill="none" stroke-linecap="round"/>
<ellipse cx="3" cy="10.5" rx="3.1" ry="1.9" fill="#7ECB3C" transform="rotate(-22 3 10.5)"/>
<ellipse cx="7" cy="6.5" rx="2.6" ry="1.6" fill="#5CB028" transform="rotate(18 7 6.5)"/>
<ellipse cx="11.5" cy="4.2" rx="2.2" ry="1.4" fill="#72CB35" transform="rotate(-12 11.5 4.2)"/>`;
}

/** Lv3: 덩굴 + 작은 박 */
function vineSmallGourdIcon(): string {
  return `<path d="M1,13.5 C2,10.5 4,9 4,6.5 C4,4 7,3 8.5,3" stroke="#2E6010" stroke-width="1.4" fill="none" stroke-linecap="round"/>
<ellipse cx="2.5" cy="11.5" rx="2.6" ry="1.7" fill="#72CB35" transform="rotate(-18 2.5 11.5)"/>
<ellipse cx="6" cy="7.5" rx="2" ry="1.4" fill="#5CB028" transform="rotate(22 6 7.5)"/>
<ellipse cx="11.2" cy="10.5" rx="2.6" ry="2.1" fill="#C89020"/>
<ellipse cx="11.2" cy="6.8" rx="1.7" ry="1.4" fill="#C89020"/>
<rect x="10.4" y="7.9" width="1.6" height="1.5" fill="#C89020"/>
<line x1="11.2" y1="5.4" x2="11.2" y2="4" stroke="#2E5808" stroke-width="1.3" stroke-linecap="round"/>
<ellipse cx="9.8" cy="10" rx="1.1" ry="0.8" fill="#E8C848" opacity="0.65"/>`;
}

/** Lv4: 큰 박 — 황금 박 + 줄기 + 덩굴 */
function bigGourdIcon(): string {
  return `<ellipse cx="7" cy="10.2" rx="5.8" ry="3.6" fill="#D4A020"/>
<ellipse cx="7" cy="5.2" rx="3.4" ry="2.6" fill="#D4A020"/>
<rect x="6.2" y="7.2" width="1.6" height="1.8" fill="#D4A020"/>
<line x1="7" y1="2.6" x2="7" y2="1" stroke="#2E5808" stroke-width="1.8" stroke-linecap="round"/>
<path d="M7.6,2.2 Q10.5,1.5 11.5,0.5" stroke="#2E5808" stroke-width="1.3" fill="none"/>
<ellipse cx="4.6" cy="9.2" rx="2.3" ry="1.5" fill="#F0D050" opacity="0.62"/>
<ellipse cx="5.4" cy="4.5" rx="1.5" ry="1.1" fill="#F0D050" opacity="0.52"/>
<ellipse cx="7" cy="10.2" rx="5.8" ry="3.6" fill="none" stroke="#F5C820" stroke-width="0.9" opacity="0.75"/>`;
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

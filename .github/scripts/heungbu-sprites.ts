// 흥부네 커밋 — 레벨별 아이콘 (14×14px 네이티브, spriteScale≈2.86으로 확대)
// Lv0: 배경(초가) 자연스럽게 비침 — 스프라이트 없음
// Lv1: 새싹 (줄기 + 두 잎 — 막 돋아난 느낌)
// Lv2: 덩굴 (구불구불 줄기 + 잎 3장 + 덩굴손)
// Lv3: 덩굴 + 작은 박 (호리병 형태 명확)
// Lv4: 큰 황금 박 (셀 거의 전체를 채우는 풍성한 박)

import { DragonLevel } from './types';

/** Lv1: 새싹 — 줄기 하나 + 두 잎 */
function sproutIcon(): string {
  return `<line x1="7" y1="14" x2="7" y2="8.5" stroke="#2A5C08" stroke-width="1.7" stroke-linecap="round"/>
<path d="M7,11 C5.5,10.5 3.5,9 3,7 C5,8 6.5,9.5 7,11Z" fill="#70C828"/>
<path d="M7,11 C8.5,10.5 10.5,9 11,7 C9,8 7.5,9.5 7,11Z" fill="#5AB020"/>
<ellipse cx="7" cy="7.2" rx="1.5" ry="2.2" fill="#3A9012"/>`;
}

/** Lv2: 덩굴 — 구불구불 줄기 + 잎 3장 + 덩굴손 */
function vineIcon(): string {
  return `<path d="M2,14 C3,11.5 5,10.5 6,8.5 C7,6.5 8.5,4.5 11.5,3" stroke="#2A5C08" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<path d="M4.5,12 C4.5,12 2,11 1.5,9.5 C3,10.2 5,11 4.5,12Z" fill="#72CB35"/>
<path d="M7,9.5 C7,9.5 5.5,7.5 5.5,6 C7,7 8.5,8.5 7,9.5Z" fill="#5BB825"/>
<path d="M10.5,5.2 C10.5,5.2 9,3.5 9,2 C10.5,3 12,4.2 10.5,5.2Z" fill="#72CB35"/>
<path d="M10.8,3.8 Q12.5,2.5 13.5,1.5" stroke="#2A5C08" stroke-width="1" fill="none" stroke-linecap="round"/>`;
}

/** Lv3: 덩굴 + 작은 박 */
function vineSmallGourdIcon(): string {
  return `<path d="M1,14 C2,11.5 4,10 5,8 C5.5,6.5 6.5,5.5 7.5,5" stroke="#2A5C08" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<path d="M3.5,12 C3.5,12 1.5,11 1,9.5 C2.5,10.5 4,11.5 3.5,12Z" fill="#72CB35"/>
<path d="M6,8.5 C6,8.5 4.5,7 4.5,5.5 C6,6.5 7.5,7.8 6,8.5Z" fill="#5BB825"/>
<ellipse cx="11" cy="11.5" rx="2.7" ry="2.2" fill="#C48C18"/>
<ellipse cx="11" cy="7.2" rx="1.8" ry="1.5" fill="#C48C18"/>
<rect x="10.1" y="8.5" width="1.8" height="1.5" fill="#B87E12"/>
<line x1="11" y1="5.7" x2="11" y2="4.5" stroke="#2A5C08" stroke-width="1.3" stroke-linecap="round"/>
<ellipse cx="9.8" cy="10.5" rx="1" ry="0.75" fill="#E8C840" opacity="0.65"/>`;
}

/** Lv4: 큰 황금 박 — 셀 대부분을 차지하는 풍성한 황금 박 */
function bigGourdIcon(): string {
  return `<ellipse cx="7.5" cy="10.5" rx="6" ry="3.8" fill="#D09818"/>
<ellipse cx="7.5" cy="5" rx="3.5" ry="2.8" fill="#C89018"/>
<rect x="6.2" y="7.5" width="2.6" height="1.8" fill="#B87810"/>
<line x1="7.5" y1="2.2" x2="7.5" y2="0.5" stroke="#2A5C08" stroke-width="2" stroke-linecap="round"/>
<path d="M8,2 Q11,1.5 12.5,0.5" stroke="#2A5C08" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<ellipse cx="5.5" cy="9" rx="2.5" ry="1.6" fill="#F0D050" opacity="0.55"/>
<ellipse cx="6.2" cy="4.2" rx="1.5" ry="1" fill="#F0D050" opacity="0.48"/>
<ellipse cx="7.5" cy="10.5" rx="6" ry="3.8" fill="none" stroke="#F5C820" stroke-width="1" opacity="0.65"/>`;
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

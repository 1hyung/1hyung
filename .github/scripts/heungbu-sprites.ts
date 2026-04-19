// 흥부네 커밋 — 레벨별 아이콘 (Variant C: Dancheong Pop)
// 14×14px 네이티브, spriteScale≈2.86으로 확대
// Lv0: 배경(초가) 자연스럽게 비침 — 스프라이트 없음
// Lv1: 새싹 — 줄기 + 두 잎 + 단청 포인트 점
// Lv2: 덩굴 — S자 덩굴 + 잎 3장 + 빨간 덩굴손 + 골드 점
// Lv3: 덩굴에 막 열린 작은 박 하나 (원형, 하이라이트)
// Lv4: 둥근 황금 박 + 잎 + 단청 포인트

import { DragonLevel } from './types';

/** Lv1: 새싹 — 줄기 + 두 잎 + 단청 포인트 점 */
function sproutIcon(): string {
  return `<line x1="7" y1="14" x2="7" y2="8" stroke="#2A5C08" stroke-width="1.9" stroke-linecap="round"/>
<path d="M7 10 Q 3 9 2.5 6 Q 5 7.5 7 10 Z" fill="#72CB35"/>
<path d="M7 10 Q 11 9 11.5 6 Q 9 7.5 7 10 Z" fill="#4A8A30"/>
<circle cx="7" cy="7" r="0.9" fill="#D94A4A"/>
<circle cx="7" cy="7" r="0.4" fill="#F0C040"/>`;
}

/** Lv2: 덩굴 — S자 덩굴 + 잎 3장 + 빨간 덩굴손 + 골드 점 */
function vineIcon(): string {
  return `<path d="M1.5 13 Q 4 10 6 8 Q 8 6 12.5 2.5" stroke="#2A5C08" stroke-width="1.9" fill="none" stroke-linecap="round"/>
<path d="M3.5 11 Q 1.5 10 1 8 Q 3 9.2 4.5 11 Z" fill="#72CB35"/>
<path d="M7 8 Q 5 6.5 5 5 Q 7 6.5 7.8 7.7 Z" fill="#4A8A30"/>
<path d="M10.5 4.8 Q 9 3.2 9 1.7 Q 10.8 3 11.3 4.5 Z" fill="#72CB35"/>
<path d="M10.8 3.5 Q 12.5 2 13.5 0.8" stroke="#D94A4A" stroke-width="0.9" fill="none" stroke-linecap="round"/>
<circle cx="4" cy="11" r="0.5" fill="#F0C040"/>`;
}

/** Lv3: 덩굴에 막 열린 작은 박 하나 (원형) */
function vineSmallGourdIcon(): string {
  return `<path d="M1 13 Q 3 10 5.5 8.5 Q 8 7 12.5 5" stroke="#2A5C08" stroke-width="1.6" fill="none" stroke-linecap="round"/>
<path d="M3.5 11 Q 1.5 10 1 8.5 Q 3 9.5 4.2 11 Z" fill="#72CB35"/>
<path d="M7 8 Q 5.3 6.6 5.3 5.1 Q 7 6.2 7.8 7.5 Z" fill="#4A8A30"/>
<circle cx="10.5" cy="9.5" r="2.2" fill="#E89030"/>
<path d="M8.4 9.5 Q 10.5 11 12.6 9.5" stroke="#B8681A" stroke-width=".5" fill="none" opacity=".8"/>
<ellipse cx="9.7" cy="8.9" rx="0.9" ry="0.6" fill="#F4D070" opacity=".75"/>
<line x1="10.5" y1="7.3" x2="10.5" y2="6" stroke="#2A5C08" stroke-width="1.2" stroke-linecap="round"/>
<circle cx="12.2" cy="9.2" r="0.3" fill="#FFF2B8" opacity=".9"/>`;
}

/** Lv4: 둥근 황금 박 + 잎 + 단청 포인트 */
function bigGourdIcon(): string {
  return `<circle cx="7.5" cy="8.5" r="5.5" fill="#E89030"/>
<path d="M2.5 8.5 Q 7.5 11.5 12.5 8.5" stroke="#A84810" stroke-width=".5" fill="none"/>
<path d="M2.5 8.5 Q 7.5 5.5 12.5 8.5" stroke="#A84810" stroke-width=".4" fill="none" opacity=".8"/>
<ellipse cx="5.5" cy="7" rx="2.3" ry="1.5" fill="#FFD868" opacity=".6"/>
<ellipse cx="6" cy="6.3" rx="1.1" ry="0.6" fill="#FFF2B8" opacity=".75"/>
<line x1="7.5" y1="3.3" x2="7.5" y2="1.5" stroke="#2A5C08" stroke-width="1.9" stroke-linecap="round"/>
<path d="M7.8 2 Q 10.5 1.2 12.5 0.4" stroke="#2A5C08" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<path d="M4.5 3.6 Q 3 2.6 2.6 1.2 Q 4 2.2 5 3.4 Z" fill="#4A8A30"/>
<circle cx="10.5" cy="10" r="0.6" fill="#D94A4A" opacity=".85"/>
<circle cx="10.8" cy="9.7" r="0.25" fill="#F0C040"/>
<circle cx="7.5" cy="8.5" r="5.5" fill="none" stroke="#F5C820" stroke-width="0.9" opacity=".7"/>`;
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

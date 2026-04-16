// 흥부네 커밋 — 초가 지붕 박 스프라이트 (flat grid 14×14px 셀)

import { DragonLevel } from './types';
import { HEUNGBU_COLORS } from './heungbu-colors';

// 1×1 픽셀
const px = (x: number, y: number, c: string) =>
  `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`;

// 동일 색 픽셀 배열
const pxs = (coords: [number, number][], c: string) =>
  coords.map(([x, y]) => px(x, y, c)).join('');

// 2×2 블록
const blk = (x: number, y: number, c: string) =>
  `<rect x="${x}" y="${y}" width="2" height="2" fill="${c}"/>`;

/**
 * Level 1 — 새싹
 * 초가 위에 V자 녹색 싹 2개
 */
function createFlatSprout(): string {
  const { leafLight, leafMid, vineGreen } = HEUNGBU_COLORS;
  return [
    // 싹 1 (좌측)
    pxs([[3,11],[3,10],[3,9]], vineGreen),          // 줄기
    pxs([[1,9],[2,8]], leafMid),                    // 왼쪽 잎
    pxs([[5,9],[6,8]], leafMid),                    // 오른쪽 잎
    pxs([[2,7],[3,6]], leafLight),                  // 잎 밝은 끝
    pxs([[4,7],[5,7]], leafLight),

    // 싹 2 (우측)
    pxs([[9,10],[9,9],[9,8]], vineGreen),
    pxs([[7,8],[8,7]], leafMid),
    pxs([[11,8],[12,7]], leafMid),
    pxs([[8,6],[9,5]], leafLight),
    pxs([[10,6],[11,6]], leafLight),
  ].join('');
}

/**
 * Level 2 — 어린 덩굴
 * 덩굴이 퍼지며 잎 3장 + 작은 녹색 꽃봉오리
 */
function createFlatYoungVine(): string {
  const { leafLight, leafMid, leafDark, vineGreen } = HEUNGBU_COLORS;
  return [
    // 가로 덩굴 줄기
    pxs([[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],[12,9]], vineGreen),
    // 세로 브랜치
    pxs([[3,8],[3,7]], vineGreen),
    pxs([[7,8],[7,7],[7,6]], vineGreen),
    pxs([[11,8],[11,7]], vineGreen),

    // 잎 1 (좌측)
    blk(1,5, leafMid), blk(3,5, leafMid),
    blk(2,4, leafLight),
    px(1,7, leafMid), px(4,7, leafMid),

    // 잎 2 (중앙 — 가장 크게)
    blk(5,3, leafMid), blk(7,3, leafMid),
    blk(6,2, leafLight), blk(7,2, leafLight),
    px(5,6, leafMid), px(9,6, leafMid),
    px(6,1, leafLight), px(8,1, leafLight),
    px(7,0, leafLight),                            // 맨 위 밝은 끝

    // 잎 3 (우측)
    blk(9,5, leafMid), blk(11,5, leafMid),
    blk(10,4, leafLight),
    px(9,7, leafMid), px(12,7, leafMid),
  ].join('');
}

/**
 * Level 3 — 작은 박
 * 덩굴이 대부분을 덮고, 상단 중앙에 작은 연노란 박
 */
function createFlatSmallGourd(): string {
  const {
    leafLight, leafMid, leafDark, leafVeryDark, vineGreen,
    gourdHighlight, gourdLight, gourdMid, gourdDark, gourdStem
  } = HEUNGBU_COLORS;
  const W = 14;
  const row = (y: number, c: string) =>
    pxs(Array.from({ length: W }, (_, x) => [x, y] as [number, number]), c);

  return [
    // 하단 잎 레이어 (y=10~13)
    row(13, leafVeryDark), row(12, leafDark),
    row(11, leafMid),      row(10, leafVeryDark),

    // 중간 잎 (y=7~9)
    blk(0,7,leafMid), blk(2,7,leafDark), blk(4,7,leafMid),
    blk(6,7,leafDark), blk(8,7,leafMid), blk(10,7,leafDark), blk(12,7,leafMid),
    blk(1,8,leafDark), blk(3,8,leafMid), blk(5,8,leafMid),
    blk(7,8,leafMid), blk(9,8,leafMid), blk(11,8,leafDark),
    blk(2,9,leafLight), blk(6,9,leafLight), blk(10,9,leafLight),

    // 덩굴 줄기 (y=6)
    pxs([[4,6],[5,6],[6,6],[7,6],[8,6],[9,6]], vineGreen),

    // 위쪽 잎들 (y=4~5)
    blk(0,5,leafMid), blk(2,4,leafLight),
    blk(10,5,leafMid), blk(11,4,leafLight),

    // 박 꼭지
    pxs([[6,5],[7,5]], gourdStem),

    // 작은 박 (6×4px 타원, y=1~4)
    pxs([[5,1],[6,1],[7,1],[8,1]], gourdMid),
    pxs([[4,2],[5,2],[6,2],[7,2],[8,2],[9,2]], gourdLight),
    pxs([[4,3],[5,3],[6,3],[7,3],[8,3],[9,3]], gourdMid),
    pxs([[5,4],[6,4],[7,4],[8,4]], gourdDark),
    pxs([[6,1],[7,1]], gourdHighlight),             // 박 하이라이트
    px(5,2, gourdHighlight),
  ].join('');
}

/**
 * Level 4 — 큰 박
 * 풍성한 잎 + 크고 둥근 연노란 박 (14px 셀을 꽉 채움)
 */
function createFlatLargeGourd(): string {
  const {
    leafLight, leafMid, leafDark, leafVeryDark, vineGreen,
    gourdHighlight, gourdLight, gourdMid, gourdDark, gourdStem
  } = HEUNGBU_COLORS;
  const W = 14;
  const row = (y: number, c: string) =>
    pxs(Array.from({ length: W }, (_, x) => [x, y] as [number, number]), c);

  // 박 (y=0~6: 꼭지+타원)
  const gourd = [
    pxs([[6,0],[7,0]], gourdStem),                                // 꼭지
    pxs([[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1]], gourdLight),    // 상단
    pxs([[5,1],[6,1],[7,1],[8,1]], gourdHighlight),               // 하이라이트
    pxs([[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2]], gourdLight),  // 중상단
    pxs([[4,2],[5,2],[6,2]], gourdHighlight),
    pxs([[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3]], gourdMid),   // 중간 최대폭
    pxs([[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]], gourdMid),
    pxs([[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5]], gourdDark),               // 하단 축소
    pxs([[4,6],[5,6],[6,6],[7,6],[8,6],[9,6]], gourdDark),                            // 바닥
  ].join('');

  // 잎들 (y=7~13)
  const leaves = [
    row(7,  leafMid),
    row(8,  leafDark),
    row(9,  leafVeryDark),
    row(10, leafDark),
    row(11, leafMid),
    row(12, leafDark),
    row(13, leafVeryDark),
    // 밝은 잎 하이라이트
    blk(0,7,leafLight), blk(5,7,leafLight), blk(11,7,leafLight),
    blk(2,9,leafMid),   blk(8,9,leafMid),
    blk(1,11,leafMid),  blk(9,11,leafMid), blk(12,11,leafMid),
  ].join('');

  return leaves + gourd; // 잎 먼저 그린 후 박을 위에 덮어 깊이감
}

// ─── 공개 인터페이스 ──────────────────────────────────────────────

/**
 * flat grid 셀용 스프라이트 반환
 */
export function createFlatHeungbuSprite(level: DragonLevel): string {
  switch (level) {
    case 0: return '';
    case 1: return createFlatSprout();
    case 2: return createFlatYoungVine();
    case 3: return createFlatSmallGourd();
    case 4: return createFlatLargeGourd();
    default: return '';
  }
}

/** isometric 인터페이스 호환용 (flat 테마에서는 실제로 사용 안 함) */
export function createHeungbuSprite(level: DragonLevel): string {
  return createFlatHeungbuSprite(level);
}

export function getHeungbuSpriteSize(_level: DragonLevel): { width: number; height: number } {
  return { width: 14, height: 14 };
}

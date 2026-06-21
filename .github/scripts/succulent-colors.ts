// 농장 테마 색상 팔레트 — 노을 다육정원(Golden-Hour Succulent Garden)
// 신규 테마 색은 하단 블록에 정의. 상단 레거시 키는 generate-sections.ts 호환용으로 유지.

export const SUCCULENT_COLORS = {
  // 잔디/땅
  grassLight: '#7ec850',
  grassMid: '#5da83a',
  grassDark: '#4a8c38',
  soilDark: '#6b4423',
  soilMid: '#7a5232',
  soilLight: '#8b6243',
  soilFurrow: '#4a2f17',

  // 식물
  sproutGreen: '#90ee90',
  sproutDark: '#5cb85c',
  leafGreen: '#228b22',
  leafMid: '#2d9e2d',
  leafLight: '#4caf50',
  leafDark: '#006400',
  leafHighlight: '#66bb6a',

  // 나무 줄기
  trunkBrown: '#8b4513',
  trunkMid: '#7a3c10',
  trunkDark: '#5c2d0e',
  rootBrown: '#6b3810',

  // 사과
  appleRed: '#dc143c',
  appleDark: '#a01030',
  appleHighlight: '#ff6b6b',
  appleStem: '#5c2d0e',

  // UI 텍스트
  titleColor: '#f5e6d0',
  textDark: '#2d3a1e',
  textLight: '#c8e6c9',
  borderBrown: '#6b4423',

  // 배경
  bgGreen: '#4a8c38',
  bgDark: '#2d5a1e',
  bgLight: '#5da83a',

  // 햇빛
  sunYellow: '#ffd700',
  sunOrange: '#ffb300',

  // ──────────────────────────────────────────────────────
  // 노을 다육정원 (Golden-Hour Succulent Garden) — 신규 팔레트
  // ──────────────────────────────────────────────────────
  // 노을 하늘 그라데이션 (자두 → 코랄 → 따뜻한 호박빛)
  skyTop:   '#6d4a6b',
  skyMid:   '#b5746e',
  skyLow:   '#e9a06b',
  sunCore:  '#fff2d6',
  sunHalo:  '#ffd9a0',

  // 원경 메사(평정봉) 실루엣 — 뒤에서 앞으로 점점 따뜻하게
  mesaFar:  '#5a3a52',
  mesaMid:  '#7a4a4a',
  mesaNear: '#8a4f3a',

  // 흙/테라스 지면
  soilBase: '#2e1d18',
  soilDeep: '#231410',
  soilTill: '#46291f',
  soilEdge: '#5c3a2a',

  // 테라코타 화분 (그늘 / 본체 / 빛 / 림 / 흙)
  potShadow: '#7a3f28',
  potBody:   '#b5613a',
  potLight:  '#d98a5c',
  potRim:    '#caa078',
  potSoil:   '#3a2118',

  // 다육식물 세이지 (그늘 / 본체 / 하이라이트)
  succDark:  '#5f7048',
  succBody:  '#8aa06a',
  succLight: '#b3c48f',

  // 선인장 꽃 (포인트 컬러)
  bloomDeep: '#c83a52',
  bloom:     '#e84a5f',
  bloomLight:'#ff8aa0',
  bloomCore: '#ffd7df',

  // UI 텍스트
  sgTitle:    '#fbeee3',
  sgSubtitle: '#f0d4c0',
  sgTextDark: '#3a241c',
  sgPanel:    '#241712',
} as const;

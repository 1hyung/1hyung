// 흥부네 커밋 — 한국 전통 초가집 박 테마 색상 팔레트

export const HEUNGBU_COLORS = {
  // 볏짚 단계별 (기여도 레벨 0~4)
  strawLevel0:   '#EAD898',   // 빈 칸 — 창백한 밀짚
  strawLevel1:   '#D4B048',   // 레벨 1 — 연한 황금빛
  strawLevel2:   '#C09838',   // 레벨 2 — 중간 황금빛
  strawLevel3:   '#A87828',   // 레벨 3 — 진한 황금빛
  strawLevel4:   '#8E6018',   // 레벨 4 — 짙은 호박빛
  strawHighlight:'#F0E0A0',   // 볏짚 섬유 밝은 선
  strawShadow:   '#6A4810',   // 볏짚 묶음 하단 그림자

  // 볏짚 UI alias (처마/처마 장식용)
  strawLight:    '#F0D880',
  strawMid:      '#D4A853',
  strawDark:     '#C4983E',

  // 덩굴/잎
  leafLight:    '#90D060',
  leafMid:      '#5A9E3A',
  leafDark:     '#3D7A22',
  leafVeryDark: '#2A5A16',
  vineGreen:    '#4A8A30',

  // 박 (황금 호박형 — 레퍼런스 이미지 기준 주황/황금색)
  gourdHighlight: '#F8D870',
  gourdLight:     '#F0B840',
  gourdMid:       '#D09020',
  gourdDark:      '#A87010',
  gourdStem:      '#3A6010',
  gourdRidge:     '#C07818',   // 박 주름선

  // 배경 하늘
  skyTop:    '#5AA8D8',
  skyMid:    '#78C0E8',
  skyBottom: '#B8DCF0',

  // 땅 / 언덕
  groundGreen: '#5AB828',
  groundEdge:  '#4A9820',
  hillFar:     '#3A7020',
  hillMid:     '#4A8030',

  // 대나무 (통계 패널 테두리)
  bambooGreen: '#5A7830',
  bambooLight: '#7A9840',
  bambooJoint: '#3A5820',

  // 닭
  chickenBody:  '#C85828',
  chickenDark:  '#A03820',
  chickenBeak:  '#D4A030',
  chickenComb:  '#C02820',
  chickenLeg:   '#C09030',

  // UI
  titleColor:     '#F8E8C0',
  textLight:      '#F0DDB0',
  statsPanelColor:'#7A5030',
  statsTextColor: '#F8E8C0',
  statsDateColor: '#D0B870',
  hillNear:       '#5A9E3A',
} as const;

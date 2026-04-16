// 흥부네 커밋 — 한국 전통 초가집 박 테마 색상 팔레트

export const HEUNGBU_COLORS = {
  // 초가 (볏짚)
  strawLight:    '#f0d880',   // 밝은 볏짚
  strawMid:      '#d4a853',   // 중간 볏짚 (기본 셀)
  strawDark:     '#c4983e',   // 어두운 볏짚 (level 0 셀)
  strawShadow:   '#8a6020',   // 그림자 볏짚 (셀 하단 테두리)
  strawHighlight:'#e8c870',   // 하이라이트 볏짚 (셀 상단 테두리)

  // 덩굴/잎
  leafLight:    '#90d060',
  leafMid:      '#5a9e3a',
  leafDark:     '#3d7a22',
  leafVeryDark: '#2a5a16',
  vineGreen:    '#4a8a30',

  // 박 (박 고동색 꼭지 + 연노란 몸통)
  gourdHighlight: '#f8f0b0',
  gourdLight:     '#e8d890',
  gourdMid:       '#c8b860',
  gourdDark:      '#a89848',
  gourdStem:      '#5a7820',

  // 배경 하늘
  skyTop:    '#4a98c8',
  skyMid:    '#70b8e0',
  skyBottom: '#a8d8f0',

  // 언덕/땅
  hillFar:    '#3a7020',
  hillMid:    '#4a8030',
  hillNear:   '#5a9e3a',
  groundGreen:'#6ab840',

  // UI
  titleColor:     '#f8e8c0',
  textLight:      '#f0ddb0',
  statsPanelColor:'#6a4420',
  statsTextColor: '#f8e8c0',
  statsDateColor: '#d0b870',
} as const;

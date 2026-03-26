// Dragon-themed color palette

export const DRAGON_COLORS = {
  // Dragon body colors (enhanced contrast)
  dragonRed: '#d32f2f',
  dragonDarkRed: '#8b0000',
  dragonCream: '#fff8dc',
  dragonGold: '#ffd700',
  dragonOrange: '#ff6b35',

  // Wing colors
  wingMembrane: '#ff4444',
  wingBone: '#cc3333',

  // Eye colors
  eyeGold: '#ffd700',
  eyePupil: '#1a1a1a',

  // Egg colors (darker base, brighter highlights)
  eggBase: '#6b3410',
  eggLight: '#d2691e',
  eggSpeckle: '#f4a460',
  eggGold: '#ffd700',
  eggCrack: '#1a0f08',

  // Shell (for hatching)
  shellWhite: '#f5f5dc',
  shellCream: '#fffacd',

  // Background volcanic colors
  lavaBright: '#ff4500',
  lavaOrange: '#ff6600',
  lavaDark: '#cc3300',
  lavaGlow: '#ff8c00',

  rockDark: '#2d1b0e',
  rockMedium: '#4a3728',
  rockLight: '#6b5344',

  skyDark: '#1a0a00',
  skyMid: '#2d1408',
  skyGlow: '#4a1a0a',

  // Smoke/ash
  smokeLight: '#696969',
  smokeDark: '#2f2f2f',

  // Stats text
  textGold: '#ffd700',
  textWhite: '#ffffff',
  textShadow: '#1a0a00',
} as const;

export const GRADIENTS = {
  skyGradient: `
    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${DRAGON_COLORS.skyDark}"/>
      <stop offset="40%" style="stop-color:${DRAGON_COLORS.skyMid}"/>
      <stop offset="100%" style="stop-color:${DRAGON_COLORS.skyGlow}"/>
    </linearGradient>
  `,
  lavaGradient: `
    <linearGradient id="lavaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${DRAGON_COLORS.lavaDark}"/>
      <stop offset="50%" style="stop-color:${DRAGON_COLORS.lavaBright}"/>
      <stop offset="100%" style="stop-color:${DRAGON_COLORS.lavaDark}"/>
    </linearGradient>
  `,
  lavaPoolGradient: `
    <radialGradient id="lavaPoolGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:${DRAGON_COLORS.lavaGlow}"/>
      <stop offset="70%" style="stop-color:${DRAGON_COLORS.lavaBright}"/>
      <stop offset="100%" style="stop-color:${DRAGON_COLORS.lavaDark}"/>
    </radialGradient>
  `,
  eggGradient: `
    <radialGradient id="eggGradient" cx="40%" cy="30%" r="60%">
      <stop offset="0%" style="stop-color:${DRAGON_COLORS.eggLight}"/>
      <stop offset="100%" style="stop-color:${DRAGON_COLORS.eggBase}"/>
    </radialGradient>
  `,
  dragonBodyGradient: `
    <linearGradient id="dragonBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${DRAGON_COLORS.dragonRed}"/>
      <stop offset="100%" style="stop-color:${DRAGON_COLORS.dragonDarkRed}"/>
    </linearGradient>
  `,
} as const;

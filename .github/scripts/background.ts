import { DRAGON_COLORS, GRADIENTS } from './colors';
import { SVGConfig } from './types';

/**
 * Create gradient definitions for the background
 */
export function createBackgroundGradients(): string {
  return `
    ${GRADIENTS.skyGradient}
    ${GRADIENTS.lavaGradient}
    ${GRADIENTS.lavaPoolGradient}
    ${GRADIENTS.eggGradient}
    ${GRADIENTS.dragonBodyGradient}

    <!-- Glow filter for lava -->
    <filter id="lavaGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Smoke effect -->
    <filter id="smokeBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2"/>
    </filter>

    <!-- Drop shadow for sprites -->
    <filter id="spriteShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="${DRAGON_COLORS.rockDark}" flood-opacity="0.5"/>
    </filter>
  `;
}

/**
 * Create the volcanic sky background
 */
export function createSkyBackground(config: SVGConfig): string {
  return `
    <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="url(#skyGradient)"/>
  `;
}

/**
 * Create distant volcanoes
 */
export function createVolcanoes(config: SVGConfig): string {
  const { rockDark, rockMedium, lavaBright, lavaOrange } = DRAGON_COLORS;

  return `
    <g id="volcanoes">
      <!-- Distant volcano left -->
      <polygon points="0,180 120,60 240,180" fill="${rockDark}"/>
      <polygon points="100,80 120,60 140,80" fill="${lavaBright}"/>

      <!-- Distant volcano center-left -->
      <polygon points="200,180 350,30 500,180" fill="${rockMedium}"/>
      <polygon points="330,50 350,30 370,50" fill="${lavaOrange}"/>

      <!-- Distant volcano center-right -->
      <polygon points="700,180 900,20 1100,180" fill="${rockDark}"/>
      <polygon points="875,45 900,20 925,45" fill="${lavaBright}"/>
      <ellipse cx="900" cy="35" rx="15" ry="8" fill="${lavaOrange}" filter="url(#lavaGlow)"/>

      <!-- Distant volcano right -->
      <polygon points="1050,180 1180,50 ${config.width},180" fill="${rockMedium}"/>
      <polygon points="1160,70 1180,50 1200,70" fill="${lavaOrange}"/>

      <!-- Smoke plumes -->
      <g filter="url(#smokeBlur)" opacity="0.3">
        <ellipse cx="900" cy="10" rx="30" ry="15" fill="${DRAGON_COLORS.smokeLight}"/>
        <ellipse cx="910" cy="0" rx="20" ry="10" fill="${DRAGON_COLORS.smokeDark}"/>
        <ellipse cx="350" cy="20" rx="25" ry="12" fill="${DRAGON_COLORS.smokeLight}"/>
      </g>
    </g>
  `;
}

/**
 * Create rocky ground layer
 */
export function createGroundLayer(config: SVGConfig): string {
  const { rockDark, rockMedium, rockLight } = DRAGON_COLORS;
  const groundY = 180;

  return `
    <g id="ground">
      <!-- Main ground -->
      <rect x="0" y="${groundY}" width="${config.width}" height="${config.height - groundY}" fill="${rockDark}"/>

      <!-- Ground texture (layered rocks) -->
      <path d="M0,${groundY} Q100,${groundY - 10} 200,${groundY} T400,${groundY} T600,${groundY} T800,${groundY} T1000,${groundY} T1200,${groundY} L${config.width},${groundY} L${config.width},${groundY + 30} L0,${groundY + 30} Z" fill="${rockMedium}"/>

      <!-- Rock formations -->
      <polygon points="50,${groundY} 70,${groundY - 20} 90,${groundY}" fill="${rockLight}"/>
      <polygon points="150,${groundY} 180,${groundY - 30} 200,${groundY - 10} 220,${groundY}" fill="${rockMedium}"/>
      <polygon points="1100,${groundY} 1130,${groundY - 25} 1160,${groundY}" fill="${rockLight}"/>
      <polygon points="1180,${groundY} 1210,${groundY - 35} 1240,${groundY - 15} ${config.width},${groundY}" fill="${rockMedium}"/>
    </g>
  `;
}

/**
 * Create lava pools and streams
 */
export function createLavaElements(config: SVGConfig): string {
  const { lavaBright, lavaOrange, lavaGlow } = DRAGON_COLORS;

  return `
    <g id="lava-elements" filter="url(#lavaGlow)">
      <!-- Main lava river at bottom -->
      <path d="M0,${config.height - 50} Q200,${config.height - 70} 400,${config.height - 50} T800,${config.height - 60} T1200,${config.height - 45} L${config.width},${config.height - 55} L${config.width},${config.height} L0,${config.height} Z" fill="url(#lavaGradient)"/>

      <!-- Lava bubbles -->
      <circle cx="100" cy="${config.height - 40}" r="5" fill="${lavaGlow}">
        <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="300" cy="${config.height - 55}" r="4" fill="${lavaBright}">
        <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="600" cy="${config.height - 45}" r="6" fill="${lavaOrange}">
        <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="900" cy="${config.height - 50}" r="5" fill="${lavaGlow}">
        <animate attributeName="r" values="5;7;5" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1150" cy="${config.height - 42}" r="4" fill="${lavaBright}">
        <animate attributeName="r" values="4;7;4" dur="2.2s" repeatCount="indefinite"/>
      </circle>

      <!-- Small lava pools -->
      <ellipse cx="50" cy="${config.height - 100}" rx="30" ry="10" fill="url(#lavaPoolGradient)"/>
      <ellipse cx="${config.width - 80}" cy="${config.height - 120}" rx="40" ry="12" fill="url(#lavaPoolGradient)"/>
    </g>
  `;
}

/**
 * Create decorative elements (small rocks, embers)
 */
export function createDecorations(config: SVGConfig): string {
  const { rockLight, lavaOrange, lavaGlow } = DRAGON_COLORS;

  // Generate random ember positions
  const embers: string[] = [];
  for (let i = 0; i < 20; i++) {
    const x = Math.floor((i * 61) % config.width);
    const y = Math.floor(150 + ((i * 37) % 100));
    const delay = (i * 0.3) % 3;
    embers.push(`
      <circle cx="${x}" cy="${y}" r="2" fill="${i % 2 === 0 ? lavaOrange : lavaGlow}">
        <animate attributeName="cy" values="${y};${y - 50};${y}" dur="3s" begin="${delay}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0;1" dur="3s" begin="${delay}s" repeatCount="indefinite"/>
      </circle>
    `);
  }

  return `
    <g id="decorations">
      <!-- Small rocks on ground -->
      <circle cx="80" cy="195" r="3" fill="${rockLight}"/>
      <circle cx="250" cy="192" r="4" fill="${rockLight}"/>
      <circle cx="450" cy="194" r="3" fill="${rockLight}"/>
      <circle cx="750" cy="193" r="5" fill="${rockLight}"/>
      <circle cx="1050" cy="195" r="4" fill="${rockLight}"/>

      <!-- Floating embers -->
      <g class="embers" opacity="0.8">
        ${embers.join('')}
      </g>
    </g>
  `;
}

/**
 * Create the complete volcanic background
 */
export function createVolcanicBackground(config: SVGConfig): string {
  return `
    <g id="background">
      ${createSkyBackground(config)}
      ${createVolcanoes(config)}
      ${createGroundLayer(config)}
      ${createLavaElements(config)}
      ${createDecorations(config)}
    </g>
  `;
}

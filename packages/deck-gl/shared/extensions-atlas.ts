// FillStyleExtension chapter: a pattern atlas drawn on a canvas, with its mapping
export interface AtlasFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const PATTERN_NAMES = ['stripes', 'dots', 'checks', 'waves'] as const;
export type PatternName = (typeof PATTERN_NAMES)[number];

const TILE = 64;
const SIZE = TILE * 2;

/** Where each pattern sits on the 128 x 128 atlas, in the form fillPatternMapping takes. */
export const PATTERN_MAPPING: Record<PatternName, AtlasFrame> = {
  stripes: { x: 0, y: 0, width: TILE, height: TILE },
  dots: { x: TILE, y: 0, width: TILE, height: TILE },
  checks: { x: 0, y: TILE, width: TILE, height: TILE },
  waves: { x: TILE, y: TILE, width: TILE, height: TILE },
};

function drawTile(g: CanvasRenderingContext2D, name: PatternName, ink: string, paper: string | null): void {
  const f = PATTERN_MAPPING[name];
  g.save();
  g.beginPath();
  g.rect(f.x, f.y, f.width, f.height);
  g.clip();
  g.translate(f.x, f.y);
  if (paper) {
    g.fillStyle = paper;
    g.fillRect(0, 0, TILE, TILE);
  }
  g.fillStyle = ink;
  g.strokeStyle = ink;
  g.lineWidth = 6;
  if (name === 'stripes') {
    // Diagonal stripes that meet at the tile edges, so the tiling is seamless
    for (let k = -2; k < 4; k++) {
      g.beginPath();
      g.moveTo(k * 32 - 8, TILE + 8);
      g.lineTo(k * 32 + TILE + 8, -8);
      g.stroke();
    }
  } else if (name === 'dots') {
    for (const [x, y] of [[16, 16], [48, 48], [48, 16], [16, 48]] as const) {
      g.beginPath();
      g.arc(x, y, 7, 0, Math.PI * 2);
      g.fill();
    }
  } else if (name === 'checks') {
    g.fillRect(0, 0, 32, 32);
    g.fillRect(32, 32, 32, 32);
  } else {
    g.lineWidth = 5;
    for (const y of [16, 48]) {
      g.beginPath();
      for (let x = 0; x <= TILE; x += 2) g.lineTo(x, y + Math.sin((x / TILE) * Math.PI * 2) * 8);
      g.stroke();
    }
  }
  g.restore();
}

/**
 * A 128 x 128 atlas as a PNG data URL. `mask` atlases are white shapes on transparency
 * (the layer's fill colour paints them); colour atlases carry their own colours.
 */
export function patternAtlas(mask: boolean): string {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const g = canvas.getContext('2d')!;
  const colours: Record<PatternName, [string, string]> = {
    stripes: ['#ffd24a', '#c0392b'],
    dots: ['#ffffff', '#2471a3'],
    checks: ['#1e8449', '#a9dfbf'],
    waves: ['#f5eef8', '#8e44ad'],
  };
  for (const name of PATTERN_NAMES) {
    const [ink, paper] = colours[name];
    drawTile(g, name, mask ? '#ffffff' : ink, mask ? null : paper);
  }
  return canvas.toDataURL('image/png');
}

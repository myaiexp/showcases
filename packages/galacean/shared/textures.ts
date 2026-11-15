// Textures drawn on a 2D canvas in code and uploaded with setImageSource
import { type Engine, Texture2D, TextureWrapMode } from '@galacean/engine';

export type Draw = (g: CanvasRenderingContext2D, size: number) => void;

/** A canvas of `size`×`size` px with `draw` run on it. */
export function paint(size: number, draw: Draw): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d')!, size);
  return canvas;
}

/** A repeating sRGB Texture2D painted by `draw`, with mipmaps. Pass `srgb: false` for data maps. */
export function canvasTexture(engine: Engine, draw: Draw, { size = 256, srgb = true } = {}): Texture2D {
  const texture = new Texture2D(engine, size, size, undefined, true, srgb);
  texture.setImageSource(paint(size, draw));
  texture.generateMipmaps();
  texture.wrapModeU = texture.wrapModeV = TextureWrapMode.Repeat;
  return texture;
}

/** Two-colour checkerboard, `cells` squares per side. */
export const checker = (a = '#e8e4da', b = '#3b4252', cells = 8): Draw => (g, size) => {
  const s = size / cells;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      g.fillStyle = (x + y) % 2 ? b : a;
      g.fillRect(x * s, y * s, s, s);
    }
  }
};

/** A labelled UV grid: hue runs along u, lightness along v, with the corner letters for orientation. */
export const uvGrid: Draw = (g, size) => {
  const cells = 8;
  const s = size / cells;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      g.fillStyle = `hsl(${(x / cells) * 360} 60% ${30 + (y / cells) * 40}%)`;
      g.fillRect(x * s, y * s, s, s);
    }
  }
  g.strokeStyle = 'rgba(255,255,255,0.6)';
  g.lineWidth = Math.max(1, size / 256);
  for (let i = 0; i <= cells; i++) {
    g.beginPath();
    g.moveTo(i * s, 0);
    g.lineTo(i * s, size);
    g.moveTo(0, i * s);
    g.lineTo(size, i * s);
    g.stroke();
  }
  g.fillStyle = '#fff';
  g.font = `bold ${size / 8}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('UV', size / 2, size / 2);
};

/** Brick rows with mortar lines, for walls and floors. */
export const bricks = (brick = '#9c4a33', mortar = '#d8cfc4'): Draw => (g, size) => {
  g.fillStyle = mortar;
  g.fillRect(0, 0, size, size);
  const rows = 8;
  const h = size / rows;
  const w = size / 4;
  const gap = Math.max(1, size / 128);
  for (let r = 0; r < rows; r++) {
    const shift = r % 2 ? w / 2 : 0;
    for (let c = -1; c < 5; c++) {
      const tint = 0.85 + 0.15 * Math.sin(r * 7.1 + c * 3.7);
      g.fillStyle = brick;
      g.globalAlpha = tint;
      g.fillRect(c * w + shift + gap, r * h + gap, w - 2 * gap, h - 2 * gap);
    }
  }
  g.globalAlpha = 1;
};

/** A soft radial dot on transparent black: a sprite or particle texture. */
export const softDot = (color = '#ffffff'): Draw => (g, size) => {
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
};

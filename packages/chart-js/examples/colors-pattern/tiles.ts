// Small canvas tiles as CanvasPattern fills: stripes, dots, grid, zigzag
export const TILE_NAMES = ['stripes', 'dots', 'grid', 'zigzag'] as const;
export type TileName = (typeof TILE_NAMES)[number];

/** Draws one repeating tile of `size` pixels in `color` on a tinted background. */
export function tile(name: TileName, color: string, tint: string, size: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.fillStyle = tint;
  g.fillRect(0, 0, size, size);
  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = Math.max(1, size / 7);
  g.beginPath();
  if (name === 'stripes') {
    // Diagonal lines that join up across tile edges.
    g.moveTo(-1, size + 1);
    g.lineTo(size + 1, -1);
    g.moveTo(-1, 1);
    g.lineTo(1, -1);
    g.moveTo(size - 1, size + 1);
    g.lineTo(size + 1, size - 1);
    g.stroke();
  } else if (name === 'dots') {
    g.arc(size / 2, size / 2, size / 5, 0, Math.PI * 2);
    g.fill();
  } else if (name === 'grid') {
    g.moveTo(0, 0.5);
    g.lineTo(size, 0.5);
    g.moveTo(0.5, 0);
    g.lineTo(0.5, size);
    g.stroke();
  } else {
    g.moveTo(0, size * 0.7);
    g.lineTo(size / 2, size * 0.3);
    g.lineTo(size, size * 0.7);
    g.stroke();
  }
  return c;
}

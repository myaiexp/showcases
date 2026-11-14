// Brick textures in code: a colour map and a normal map with height in alpha
const SIZE = 256;
const ROWS = 8;
const COLS = 4;

/** Height 0..1: bricks raised, mortar lines sunk, with soft bevelled edges. */
function height(x: number, y: number): number {
  const row = Math.floor((y / SIZE) * ROWS);
  const bx = ((x / SIZE) * COLS + (row % 2) * 0.5) % 1;
  const by = ((y / SIZE) * ROWS) % 1;
  const edge = Math.min(bx, 1 - bx, (by * COLS) / ROWS * 2, ((1 - by) * COLS) / ROWS * 2);
  return Math.min(1, Math.max(0, (edge - 0.02) / 0.06));
}

function toDataUrl(fill: (data: Uint8ClampedArray, i: number, x: number, y: number) => void): string {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const g = canvas.getContext('2d')!;
  const img = g.createImageData(SIZE, SIZE);
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) fill(img.data, (y * SIZE + x) * 4, x, y);
  g.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

/** Red-brown bricks with per-brick variation, grey mortar. */
export function brickColor(): string {
  return toDataUrl((d, i, x, y) => {
    const h = height(x, y);
    const v = 0.85 + 0.15 * Math.sin(Math.floor((y / SIZE) * ROWS) * 7.3 + Math.floor((x / SIZE) * COLS) * 3.1);
    d[i] = (h > 0.5 ? 165 : 120) * v;
    d[i + 1] = (h > 0.5 ? 70 : 115) * v;
    d[i + 2] = (h > 0.5 ? 50 : 110) * v;
    d[i + 3] = 255;
  });
}

/**
 * Tangent-space normals from the height field's slope, packed into RGB, and the height
 * itself in alpha, which is where Babylon's parallax mapping reads it from.
 */
export function brickNormalHeight(): string {
  return toDataUrl((d, i, x, y) => {
    const dx = height(Math.min(SIZE - 1, x + 1), y) - height(Math.max(0, x - 1), y);
    const dy = height(x, Math.min(SIZE - 1, y + 1)) - height(x, Math.max(0, y - 1));
    const n = [-dx * 2, dy * 2, 1];
    const len = Math.hypot(n[0]!, n[1]!, n[2]!);
    d[i] = (n[0]! / len) * 127.5 + 127.5;
    d[i + 1] = (n[1]! / len) * 127.5 + 127.5;
    d[i + 2] = (n[2]! / len) * 127.5 + 127.5;
    d[i + 3] = height(x, y) * 255;
  });
}

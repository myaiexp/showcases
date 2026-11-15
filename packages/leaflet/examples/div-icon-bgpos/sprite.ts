// A 4 x 2 sprite sheet of marker shapes painted on a canvas
export const CELL = 32;
export const COLS = 4;
export const ROWS = 2;
export const SHAPES = ['circle', 'square', 'triangle', 'star'] as const;
const COLORS = ['#f58a3d', '#2fb8a6'];

export function sprite(): string {
  const canvas = document.createElement('canvas');
  canvas.width = CELL * COLS;
  canvas.height = CELL * ROWS;
  const c = canvas.getContext('2d');
  if (!c) return '';
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      c.save();
      c.translate(col * CELL + CELL / 2, row * CELL + CELL / 2);
      c.fillStyle = COLORS[row]!;
      c.strokeStyle = '#ffffff';
      c.lineWidth = 2;
      c.beginPath();
      if (col === 0) c.arc(0, 0, 12, 0, Math.PI * 2);
      else if (col === 1) c.rect(-11, -11, 22, 22);
      else if (col === 2) (c.moveTo(0, -13), c.lineTo(13, 11), c.lineTo(-13, 11), c.closePath());
      else {
        for (let k = 0; k < 10; k++) {
          const r = k % 2 ? 6 : 14;
          const a = (Math.PI * k) / 5 - Math.PI / 2;
          c[k ? 'lineTo' : 'moveTo'](Math.cos(a) * r, Math.sin(a) * r);
        }
        c.closePath();
      }
      c.fill();
      c.stroke();
      c.restore();
    }
  }
  return canvas.toDataURL();
}

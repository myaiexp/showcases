// Avatars for the images example: small patterned badges drawn once on a canvas, returned as loaded images
import { PALETTE } from '../../shared/data.ts';

const SIZE = 64;

/** One round badge: a coloured disc, a pattern chosen by `kind`, and the person's initial. */
function badge(initial: string, colour: string, kind: number): string {
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const g = c.getContext('2d')!;
  g.beginPath();
  g.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 1, 0, 2 * Math.PI);
  g.clip();
  g.fillStyle = colour;
  g.fillRect(0, 0, SIZE, SIZE);
  g.strokeStyle = 'rgba(255,255,255,0.35)';
  g.fillStyle = 'rgba(255,255,255,0.3)';
  g.lineWidth = 5;
  if (kind === 0) {
    for (let x = -SIZE; x < SIZE * 2; x += 14) {
      g.beginPath();
      g.moveTo(x, SIZE);
      g.lineTo(x + SIZE, 0);
      g.stroke();
    }
  } else if (kind === 1) {
    for (let x = 8; x < SIZE; x += 16) for (let y = 8; y < SIZE; y += 16) {
      g.beginPath();
      g.arc(x, y, 3.5, 0, 2 * Math.PI);
      g.fill();
    }
  } else if (kind === 2) {
    for (let r = 10; r < SIZE; r += 14) {
      g.beginPath();
      g.arc(SIZE / 2, SIZE / 2, r, 0, 2 * Math.PI);
      g.stroke();
    }
  } else {
    for (let x = 0; x < SIZE; x += 16) for (let y = 0; y < SIZE; y += 16) if ((x / 16 + y / 16) % 2) g.fillRect(x, y, 16, 16);
  }
  g.fillStyle = '#ffffff';
  g.font = `bold ${SIZE * 0.5}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.shadowColor = 'rgba(0,0,0,0.5)';
  g.shadowBlur = 4;
  g.fillText(initial, SIZE / 2, SIZE / 2 + 2);
  return c.toDataURL();
}

/** An `Image` per name, made once. Each is drawable when its `complete` is true (a data URL decodes at once or soon after). */
export function avatars(names: { name: string; group: number }[]): Map<string, HTMLImageElement> {
  const out = new Map<string, HTMLImageElement>();
  names.forEach(({ name, group }, i) => {
    const img = new Image();
    img.src = badge(name[0]!, PALETTE[(group + 3) % PALETTE.length]!, i % 4);
    out.set(name, img);
  });
  return out;
}

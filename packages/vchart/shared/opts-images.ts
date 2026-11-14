// Canvas-drawn icon pictures as data URLs, rows for the image cloud examples (no files, no network)
import { rng } from './components-data.ts';

const COLORS = ['#4d7cff', '#e5534b', '#fbbf24', '#3ec486', '#a78bfa', '#38bdf8', '#fb923c', '#f472b6'];

/** A 64x64 round badge with a letter, drawn on a canvas. */
export function badge(letter: string, color: string): string {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  if (!g) return '';
  g.fillStyle = color;
  g.beginPath();
  g.arc(32, 32, 30, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = 'rgba(255,255,255,0.85)';
  g.lineWidth = 3;
  g.stroke();
  g.fillStyle = '#ffffff';
  g.font = 'bold 32px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(letter, 32, 34);
  return c.toDataURL();
}

export interface IconRow {
  url: string;
  name: string;
  value: number;
}

/** `n` badges (A, B, C ...) with seeded weights. */
export function iconRows(n: number, seed = 5): IconRow[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const letter = String.fromCharCode(65 + (i % 26));
    return { url: badge(letter, COLORS[i % COLORS.length] as string), name: `Icon ${letter}${i}`, value: Math.round(10 + r() * 90) };
  });
}

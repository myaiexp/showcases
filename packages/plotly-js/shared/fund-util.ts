// Helpers for the Fundamentals examples: GUI-style relayout, canvas-drawn images, seeded scatter
import Plotly from 'plotly.js';
import type { PlotlyHTMLElement } from 'plotly.js';
import { rng } from './stat-data.ts';

/**
 * Plotly._guiRelayout: relayout as the mode bar and the mouse do it. It records the old
 * values, which is what uirevision needs to know a change came from the reader; plain
 * relayout does not, so a scripted zoom would be forgotten by the next react.
 */
export function guiRelayout(div: PlotlyHTMLElement | HTMLElement, update: Record<string, unknown>): Promise<unknown> {
  const api = Plotly as unknown as { _guiRelayout: (gd: unknown, u: Record<string, unknown>) => Promise<unknown> };
  return api._guiRelayout(div, update);
}

/**
 * A small image drawn on a canvas and returned as a data URL: layout.images sources must
 * not hit the network, and a data URL is a source like any other.
 */
export function badge(label: string, hue: number, size = 160): string {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  if (!g) return '';
  const grad = g.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, `hsl(${hue} 80% 62%)`);
  grad.addColorStop(1, `hsl(${(hue + 50) % 360} 75% 38%)`);
  g.fillStyle = grad;
  g.beginPath();
  g.roundRect(4, 4, size - 8, size - 8, size / 5);
  g.fill();
  g.fillStyle = 'rgba(255,255,255,0.92)';
  g.font = `bold ${Math.round(size / 2.6)}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(label, size / 2, size / 2 + size / 24);
  return c.toDataURL('image/png');
}

/** n seeded points uniform in [lo, hi] on both axes: the docs' Math.random()*(hi-lo)+lo clouds. */
export function cloud(seed: number, n: number, lo: number, hi: number): { x: number[]; y: number[] } {
  const r = rng(seed);
  return {
    x: Array.from({ length: n }, () => r() * (hi - lo) + lo),
    y: Array.from({ length: n }, () => r() * (hi - lo) + lo),
  };
}

/** n seeded values in [0, mul], the docs' getrandom(num, mul) (which returns num + 1 of them). */
export function randoms(rand: () => number, num: number, mul: number): number[] {
  return Array.from({ length: num + 1 }, () => rand() * mul);
}

/**
 * An n by n grid of heights shaped like a saddle with ripples: stands in for the docs'
 * sin_saddle.csv (a michaelbabyn gist, not a vendored dataset), same idea, generated.
 */
export function saddle(n: number): number[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      const x = (i / (n - 1)) * 2 - 1;
      const y = (j / (n - 1)) * 2 - 1;
      return x * x - y * y + 0.15 * Math.sin(10 * x) * Math.cos(10 * y);
    }),
  );
}

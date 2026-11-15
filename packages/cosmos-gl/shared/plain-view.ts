// A plain 2D canvas that draws point positions a graph handed back
import type { Stage } from './stage.ts';
import type { Rgba } from './color.ts';
import { bounds } from './shapes.ts';

export interface PlainDrawOptions {
  /** One RGBA per point, 0..1; white when left out. */
  colors?: Float32Array;
  /** [source, target, …] pairs, drawn as thin lines. */
  links?: Float32Array;
  /** Point radius in px (default 2). */
  radius?: number;
  /** Points to ring in yellow. */
  mark?: readonly number[];
}

export interface PlainView {
  readonly canvas: HTMLCanvasElement;
  /** Draws `[x1, y1, x2, y2, …]` scaled to fit the box; the frame eases toward the data. */
  draw(positions: ArrayLike<number>, options?: PlainDrawOptions): void;
}

const css = (c: Rgba | Float32Array, o: number): string =>
  `rgb(${((c[o] ?? 1) * 255) | 0} ${((c[o + 1] ?? 1) * 255) | 0} ${((c[o + 2] ?? 1) * 255) | 0} / ${c[o + 3] ?? 1})`;

/** Adds a 2D canvas over the stage's graph box, for graphs that own no canvas of their own. */
export function plainView(stage: Stage): PlainView {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  stage.div.append(canvas);
  stage.onDispose(() => canvas.remove());
  const g = canvas.getContext('2d');
  let frame: number[] | undefined;
  return {
    canvas,
    draw(p, o = {}) {
      if (!g) return;
      const w = stage.div.clientWidth;
      const h = stage.div.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const b = bounds(p);
      frame = frame ? frame.map((v, i) => v + ((b[i] ?? v) - v) * 0.15) : b;
      const [x0 = 0, y0 = 0, x1 = 1, y1 = 1] = frame;
      const pad = 14;
      const s = Math.min((w - pad * 2) / Math.max(1, x1 - x0), (h - pad * 2) / Math.max(1, y1 - y0));
      const mx = (x: number): number => w / 2 + (x - (x0 + x1) / 2) * s;
      const my = (y: number): number => h / 2 + (y - (y0 + y1) / 2) * s;
      g.clearRect(0, 0, w, h);
      const n = Math.floor(p.length / 2);
      if (o.links) {
        g.strokeStyle = 'rgb(120 128 145 / 0.45)';
        g.lineWidth = 1;
        g.beginPath();
        for (let l = 0; l < o.links.length; l += 2) {
          const a = o.links[l] ?? 0;
          const t = o.links[l + 1] ?? 0;
          g.moveTo(mx(p[a * 2] ?? 0), my(p[a * 2 + 1] ?? 0));
          g.lineTo(mx(p[t * 2] ?? 0), my(p[t * 2 + 1] ?? 0));
        }
        g.stroke();
      }
      const r = o.radius ?? 2;
      for (let i = 0; i < n; i++) {
        const x = p[i * 2] ?? NaN;
        const y = p[i * 2 + 1] ?? NaN;
        if (Number.isNaN(x) || Number.isNaN(y)) continue;
        g.fillStyle = o.colors ? css(o.colors, i * 4) : '#d8dce6';
        g.fillRect(mx(x) - r, my(y) - r, r * 2, r * 2);
      }
      g.strokeStyle = '#ffd84d';
      g.lineWidth = 2;
      for (const i of o.mark ?? []) {
        g.beginPath();
        g.arc(mx(p[i * 2] ?? 0), my(p[i * 2 + 1] ?? 0), r + 4, 0, Math.PI * 2);
        g.stroke();
      }
    },
  };
}

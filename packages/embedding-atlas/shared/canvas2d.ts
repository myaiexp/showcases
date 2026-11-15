// A plain 2D-canvas scatter for algorithm results, so they show without WebGPU
import { defaultCategoryColors } from 'embedding-atlas';

export interface Scatter {
  canvas: HTMLCanvasElement;
  /** Draws interleaved [x0, y0, x1, y1, …] points, coloured by category, fitted to the canvas. */
  draw(xy: ArrayLike<number>, category?: ArrayLike<number> | null, opts?: DrawOptions): void;
  /** Canvas pixel of a data point under the last fit. */
  toPixel(x: number, y: number): [number, number];
  /** Data point under a canvas pixel under the last fit. */
  toData(px: number, py: number): [number, number];
  /** The 2D context, for drawing extra marks after `draw`. */
  g: CanvasRenderingContext2D;
}

export interface DrawOptions {
  /** Dot radius in CSS pixels (default 1.6). */
  size?: number;
  alpha?: number;
  /** Keep the previous fit instead of refitting to these points (stops animations jumping). */
  keepFit?: boolean;
  /** Ease the fit toward these points by this fraction per draw (0..1), for smooth motion. */
  ease?: number;
}

/** A canvas of `width` × `height` CSS pixels at the device pixel ratio (capped at 2). */
export function createScatter(parent: HTMLElement, width: number, height: number): Scatter {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.cssText = `display:block;width:${width}px;height:${height}px`;
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  g.scale(dpr, dpr);
  const colors = defaultCategoryColors(32);
  let fit = { cx: 0, cy: 0, s: 1 };
  const pad = 10;

  const target = (xy: ArrayLike<number>): typeof fit => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (let i = 0; i + 1 < xy.length; i += 2) {
      const x = xy[i]!, y = xy[i + 1]!;
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    if (!Number.isFinite(x0)) return fit;
    const s = Math.min((width - 2 * pad) / (x1 - x0 || 1), (height - 2 * pad) / (y1 - y0 || 1));
    return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, s };
  };

  const toPixel = (x: number, y: number): [number, number] => [
    width / 2 + (x - fit.cx) * fit.s,
    height / 2 - (y - fit.cy) * fit.s,
  ];

  return {
    canvas,
    g,
    toPixel,
    toData: (px, py) => [(px - width / 2) / fit.s + fit.cx, -(py - height / 2) / fit.s + fit.cy],
    draw(xy, category, opts = {}) {
      if (!opts.keepFit) {
        const t = target(xy);
        const e = opts.ease ?? 1;
        fit = { cx: fit.cx + (t.cx - fit.cx) * e, cy: fit.cy + (t.cy - fit.cy) * e, s: fit.s + (t.s - fit.s) * e };
      }
      g.clearRect(0, 0, width, height);
      g.fillStyle = '#0b0d12';
      g.fillRect(0, 0, width, height);
      const r = opts.size ?? 1.6;
      g.globalAlpha = opts.alpha ?? 0.85;
      for (let i = 0, n = 0; i + 1 < xy.length; i += 2, n++) {
        const [px, py] = toPixel(xy[i]!, xy[i + 1]!);
        g.fillStyle = category ? colors[category[n]! % colors.length]! : '#7aa2f7';
        g.fillRect(px - r, py - r, r * 2, r * 2);
      }
      g.globalAlpha = 1;
    },
  };
}

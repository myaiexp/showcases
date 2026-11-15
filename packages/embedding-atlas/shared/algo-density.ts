// Helpers for density clustering examples: density map, cluster canvas
import type { Cluster } from 'embedding-atlas';
import { defaultCategoryColors } from 'embedding-atlas';
import { topicPoints, type Points } from './data.ts';
import type { Stage } from './stage.ts';

/** The topic points used by every density example, in a ±10.5 square. */
export function samplePoints(count: number, topics = 6, seed = 7): Points {
  return topicPoints({ count, topics, seed, noise: 0.04 });
}

export const EXTENT = 10.5;

/**
 * A density map for `findClusters`: points binned into a `size` × `size` grid over
 * [-EXTENT, EXTENT]², blurred with a Gaussian of `sigma` pixels, scaled so the peak is 1.
 */
export function densityMap(p: Points, size: number, sigma: number): Float32Array {
  const grid = new Float32Array(size * size);
  const to = (v: number): number => Math.floor(((v + EXTENT) / (2 * EXTENT)) * size);
  for (let i = 0; i < p.count; i++) {
    const x = to(p.x[i]!), y = to(p.y[i]!);
    if (x >= 0 && x < size && y >= 0 && y < size) grid[y * size + x]! += 1;
  }
  const radius = Math.max(1, Math.ceil(sigma * 3));
  const kernel = Array.from({ length: 2 * radius + 1 }, (_, i) => Math.exp(-((i - radius) ** 2) / (2 * sigma * sigma)));
  const pass = (src: Float32Array, horizontal: boolean): Float32Array => {
    const out = new Float32Array(size * size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let s = 0;
        for (let k = -radius; k <= radius; k++) {
          const xx = horizontal ? x + k : x;
          const yy = horizontal ? y : y + k;
          if (xx >= 0 && xx < size && yy >= 0 && yy < size) s += src[yy * size + xx]! * kernel[k + radius]!;
        }
        out[y * size + x] = s;
      }
    }
    return out;
  };
  const blurred = pass(pass(grid, true), false);
  let peak = 0;
  for (const v of blurred) peak = Math.max(peak, v);
  for (let i = 0; i < blurred.length; i++) blurred[i]! /= peak || 1;
  return blurred;
}

export interface DensityView {
  canvas: HTMLCanvasElement;
  g: CanvasRenderingContext2D;
  /** Canvas pixels per density-map pixel. */
  scale: number;
  clear(): void;
  /** The density map as a heat map. */
  heat(map: Float32Array, size: number): void;
  /** The data points, in data units. */
  dots(p: Points): void;
  /** Polygons given in density-map pixels. */
  polygons(polys: [number, number][][], stroke: string, fill?: string): void;
  /** Rectangles `[x1, y1, x2, y2]` in density-map pixels. */
  rects(rs: [number, number, number, number][], stroke: string, fill?: string): void;
  marker(x: number, y: number, color: string, shape?: 'dot' | 'cross'): void;
  text(x: number, y: number, label: string, color?: string): void;
  /** A colour for cluster `id`, stable across redraws. */
  color(id: number): string;
}

/** A square canvas filling the stage's view, with drawing in density-map pixel coordinates. */
export function createDensityView(stage: Stage, size: number, host: HTMLElement = stage.view): DensityView {
  const side = Math.min(stage.width, stage.height);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement('canvas');
  canvas.width = side * dpr;
  canvas.height = side * dpr;
  canvas.style.cssText = `display:block;width:${side}px;height:${side}px;margin:0 auto`;
  host.append(canvas);
  const g = canvas.getContext('2d')!;
  g.scale(dpr, dpr);
  const scale = side / size;
  const palette = defaultCategoryColors(32);
  const color = (id: number): string => palette[id % palette.length]!;
  return {
    canvas,
    g,
    scale,
    color,
    clear() {
      g.fillStyle = '#0b0d12';
      g.fillRect(0, 0, side, side);
    },
    heat(map, n) {
      const img = new ImageData(n, n);
      for (let i = 0; i < map.length; i++) {
        const v = Math.sqrt(map[i]!);
        img.data.set([20 + 60 * v, 25 + 90 * v, 45 + 150 * v, 255], i * 4);
      }
      const off = document.createElement('canvas');
      off.width = off.height = n;
      off.getContext('2d')!.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = true;
      g.drawImage(off, 0, 0, side, side);
    },
    dots(p) {
      g.fillStyle = 'rgba(255,255,255,0.35)';
      for (let i = 0; i < p.count; i++) {
        const x = ((p.x[i]! + EXTENT) / (2 * EXTENT)) * side;
        const y = ((p.y[i]! + EXTENT) / (2 * EXTENT)) * side;
        g.fillRect(x - 0.7, y - 0.7, 1.4, 1.4);
      }
    },
    polygons(polys, stroke, fill) {
      g.strokeStyle = stroke;
      g.lineWidth = 1.6;
      for (const poly of polys) {
        g.beginPath();
        poly.forEach(([x, y], i) => (i ? g.lineTo(x * scale, y * scale) : g.moveTo(x * scale, y * scale)));
        g.closePath();
        if (fill) {
          g.fillStyle = fill;
          g.fill();
        }
        g.stroke();
      }
    },
    rects(rs, stroke, fill) {
      g.strokeStyle = stroke;
      g.lineWidth = 1;
      for (const [x1, y1, x2, y2] of rs) {
        if (fill) {
          g.fillStyle = fill;
          g.fillRect(x1 * scale, y1 * scale, (x2 - x1) * scale, (y2 - y1) * scale);
        }
        g.strokeRect(x1 * scale, y1 * scale, (x2 - x1) * scale, (y2 - y1) * scale);
      }
    },
    marker(x, y, c, shape = 'dot') {
      g.strokeStyle = g.fillStyle = c;
      g.lineWidth = 2;
      const px = x * scale, py = y * scale;
      if (shape === 'dot') {
        g.beginPath();
        g.arc(px, py, 4, 0, Math.PI * 2);
        g.fill();
      } else {
        g.beginPath();
        g.moveTo(px - 5, py - 5);
        g.lineTo(px + 5, py + 5);
        g.moveTo(px + 5, py - 5);
        g.lineTo(px - 5, py + 5);
        g.stroke();
      }
    },
    text(x, y, label, c = '#fff') {
      g.font = '12px ui-monospace, monospace';
      g.textAlign = 'center';
      g.lineWidth = 3;
      g.strokeStyle = '#0b0d12';
      g.strokeText(label, x * scale, y * scale);
      g.fillStyle = c;
      g.fillText(label, x * scale, y * scale);
    },
  };
}

export type { Cluster };

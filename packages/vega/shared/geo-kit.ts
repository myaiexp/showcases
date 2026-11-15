// Geographic-transform helpers: seeded point clouds and raster grids made in code
import { normals, rng } from './cards.ts';

export interface Cluster {
  /** Centre in pixels. */
  cx: number;
  cy: number;
  /** Spread in pixels (standard deviation). */
  sx: number;
  sy: number;
  n: number;
  group?: string;
  /** Weight of each point; default 1. */
  weight?: number;
}

export interface CloudPoint {
  x: number;
  y: number;
  group: string;
  weight: number;
}

/** Seeded Gaussian blobs of pixel points, the input every kde2d, contour and heatmap example needs. */
export function cloud(seed: number, clusters: readonly Cluster[]): CloudPoint[] {
  const gauss = normals(rng(seed));
  const out: CloudPoint[] = [];
  for (const c of clusters) {
    for (let i = 0; i < c.n; i++) {
      out.push({
        x: Math.round((c.cx + gauss() * c.sx) * 10) / 10,
        y: Math.round((c.cy + gauss() * c.sy) * 10) / 10,
        group: c.group ?? 'a',
        weight: c.weight ?? 1,
      });
    }
  }
  return out;
}

/** The raster grid object isocontour and heatmap read: `{width, height, values}`, row-major. */
export interface Grid {
  width: number;
  height: number;
  values: number[];
}

/** A grid of `fn(column, row)` samples. */
export function gridOf(width: number, height: number, fn: (x: number, y: number) => number): Grid {
  const values: number[] = [];
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) values.push(Math.round(fn(x, y) * 1e4) / 1e4);
  return { width, height, values };
}

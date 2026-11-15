// A grid index over x/y arrays: nearest-point lookups for querySelection
import type { DataPoint } from 'embedding-atlas';
import type { Points } from './data.ts';

export interface PointIndex {
  /** Index of the nearest point within `radius` (data units) of (x, y), or -1. */
  nearest(x: number, y: number, radius: number): number;
  /** Indexes of every point inside the rectangle. */
  inRect(xMin: number, yMin: number, xMax: number, yMax: number): number[];
}

/** Buckets points into a square grid of `cell`-sized cells (data units). */
export function pointIndex(x: Float32Array, y: Float32Array, cell = 0.25): PointIndex {
  const cells = new Map<string, number[]>();
  const key = (cx: number, cy: number): string => `${cx},${cy}`;
  for (let i = 0; i < x.length; i++) {
    const k = key(Math.floor(x[i]! / cell), Math.floor(y[i]! / cell));
    let list = cells.get(k);
    if (!list) cells.set(k, (list = []));
    list.push(i);
  }
  return {
    nearest(px, py, radius) {
      const r = Math.max(1, Math.ceil(radius / cell));
      const cx = Math.floor(px / cell), cy = Math.floor(py / cell);
      let best = -1, bestD = radius * radius;
      for (let gx = cx - r; gx <= cx + r; gx++) {
        for (let gy = cy - r; gy <= cy + r; gy++) {
          for (const i of cells.get(key(gx, gy)) ?? []) {
            const d = (x[i]! - px) ** 2 + (y[i]! - py) ** 2;
            if (d <= bestD) {
              bestD = d;
              best = i;
            }
          }
        }
      }
      return best;
    },
    inRect(xMin, yMin, xMax, yMax) {
      const out: number[] = [];
      for (let gx = Math.floor(xMin / cell); gx <= Math.floor(xMax / cell); gx++) {
        for (let gy = Math.floor(yMin / cell); gy <= Math.floor(yMax / cell); gy++) {
          for (const i of cells.get(key(gx, gy)) ?? []) {
            if (x[i]! >= xMin && x[i]! <= xMax && y[i]! >= yMin && y[i]! <= yMax) out.push(i);
          }
        }
      }
      return out;
    },
  };
}

/** The DataPoint the view expects for point `i` of a sample set: position, category, text, id. */
export function dataPoint(p: Points, i: number): DataPoint {
  return { x: p.x[i]!, y: p.y[i]!, category: p.category[i]!, text: p.text(i), identifier: i };
}

/** True when (x, y) lies inside the closed polygon (ray casting). */
export function inPolygon(x: number, y: number, poly: readonly { x: number; y: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]!, b = poly[j]!;
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

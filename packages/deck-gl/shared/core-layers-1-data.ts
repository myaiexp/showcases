// Sample data for the core layers chapter, part 1: grids, column points, shapes
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { pointCloud, seeded, type LngLat, type SamplePoint } from './data.ts';

export interface GridCell {
  /** Bottom-left corner of the cell, [lng, lat]. */
  position: LngLat;
  /** 0..1 height of the sample surface under the cell. */
  value: number;
}

/**
 * A `cols` x `rows` lattice of square cells of `cellSize` metres, its bottom-left corner at
 * `origin`, with a smooth seeded surface in `value`. Degrees per metre are approximate.
 */
export function gridCells(cols: number, rows: number, cellSize: number, origin: LngLat, seed = 3): GridCell[] {
  const rand = seeded(seed);
  const bumps = Array.from({ length: 4 }, () => ({ x: rand() * cols, y: rand() * rows, r: 2 + rand() * 4 }));
  const dLat = cellSize / 111_320;
  const dLng = dLat / Math.cos((origin[1] * Math.PI) / 180);
  const cells: GridCell[] = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let v = 0;
      for (const b of bumps) v += Math.exp(-((i - b.x) ** 2 + (j - b.y) ** 2) / (2 * b.r * b.r));
      cells.push({ position: [origin[0] + i * dLng, origin[1] + j * dLat], value: Math.min(1, v / 1.4) });
    }
  }
  return cells;
}

/** `n` seeded points in one cloud around `centre`; `value` grows away from the centre. */
export function columnPoints(n: number, centre: LngLat, spread = 0.12, seed = 5): SamplePoint[] {
  return pointCloud(n, { seed, spread, centres: [centre] });
}

export interface ShapeProps {
  name: string;
  /** Height in metres for extrusion. */
  height: number;
  /** Icon name for pointType 'icon'. */
  icon: string;
}

function ngon(cx: number, cy: number, r: number, n: number, squash = 0.7): LngLat[] {
  const ring: LngLat[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    ring.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * squash]);
  }
  ring.push(ring[0]!);
  return ring;
}

const feat = (name: string, height: number, icon: string, geometry: Geometry): Feature<Geometry, ShapeProps> => ({
  type: 'Feature',
  properties: { name, height, icon },
  geometry,
});

/** Polygons (one with a hole), lines and points around central Europe, all in one collection. */
export const SHAPES: FeatureCollection<Geometry, ShapeProps> = {
  type: 'FeatureCollection',
  features: [
    feat('Square with hole', 400_000, 'star', { type: 'Polygon', coordinates: [ngon(5, 51, 2.2, 4, 0.8), ngon(5, 51, 0.9, 4, 0.8).reverse()] }),
    feat('Hexagon', 900_000, 'pin', { type: 'Polygon', coordinates: [ngon(11, 48.5, 1.8, 6)] }),
    feat('Heptagon', 200_000, 'ring', { type: 'Polygon', coordinates: [ngon(15.5, 52.2, 2, 7)] }),
    feat('Zigzag', 0, 'arrow', {
      type: 'LineString',
      coordinates: [[1, 46.5], [4, 48], [6, 46.2], [9, 47.6], [12, 45.6], [15, 47.2], [18, 45.2]],
    }),
    feat('Two strands', 0, 'arrow', {
      type: 'MultiLineString',
      coordinates: [
        [[8, 55], [11, 53.8], [14, 54.6], [17, 53.4]],
        [[6, 54], [9, 52.6], [12, 52.2]],
      ],
    }),
    feat('Hub A', 0, 'pin', { type: 'Point', coordinates: [5, 51] }),
    feat('Hub B', 0, 'star', { type: 'Point', coordinates: [11, 48.5] }),
    feat('Hub C', 0, 'ring', { type: 'Point', coordinates: [15.5, 52.2] }),
    feat('Outposts', 0, 'arrow', { type: 'MultiPoint', coordinates: [[2, 49], [8.5, 50.5], [13, 50.4], [19, 49.5]] }),
  ],
};

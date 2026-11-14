// Aggregation chapter: weighted spots over Europe, a shared view and colour ramps
import type { Color, MapViewState } from '@deck.gl/core';
import { pointCloud, type LngLat } from './data.ts';

export interface Spot {
  position: LngLat;
  /** 1..16: heavier near each cluster's core and in later clusters. */
  weight: number;
  /** Index of the cluster the spot came from, 0..3. */
  cluster: number;
}

/** `n` seeded weighted points in four clouds (Paris, Berlin, Madrid, Rome). */
export function spots(n: number, seed = 3): Spot[] {
  return pointCloud(n, { seed, spread: 1.1 }).map((p) => ({
    position: p.position,
    weight: 1 + Math.round((1 - p.value) * 6) + p.cluster * 3,
    cluster: p.cluster,
  }));
}

/** Europe view framing all four clouds; cards zoom out for their 260px width. */
export function europeView(preview: boolean, extra: Partial<MapViewState> = {}): MapViewState {
  return { longitude: 5.5, latitude: 46.5, zoom: preview ? 2.8 : 3.8, pitch: 0, bearing: 0, ...extra };
}

/** Sample colour ramps for the colorRange props (the docs' default is 6-class YlOrRd). */
export const RAMPS: Record<string, Color[]> = {
  'YlOrRd (default)': [[255, 255, 178], [254, 217, 118], [254, 178, 76], [253, 141, 60], [240, 59, 32], [189, 0, 38]],
  'Blues': [[239, 243, 255], [198, 219, 239], [158, 202, 225], [107, 174, 214], [49, 130, 189], [8, 81, 156]],
  'Viridis': [[68, 1, 84], [65, 68, 135], [42, 120, 142], [34, 168, 132], [122, 209, 81], [253, 231, 37]],
  'Magenta to cyan': [[255, 0, 128], [200, 40, 180], [140, 80, 220], [80, 140, 240], [40, 200, 240], [0, 255, 220]],
};

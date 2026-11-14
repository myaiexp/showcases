// Seeded points around Paris and a zoom-stop interpolator for the zoom-dependent examples
import { gaussian, seeded, type LngLat } from './data.ts';

export const PARIS: LngLat = [2.35, 48.86];

/** `n` points in a few Gaussian neighbourhoods around Paris, 0.12 degrees wide. */
export function parisPoints(n: number, seed = 3): LngLat[] {
  const rand = seeded(seed);
  const hoods: LngLat[] = [[2.35, 48.86], [2.25, 48.9], [2.45, 48.82], [2.3, 48.8], [2.4, 48.92]];
  const out: LngLat[] = [];
  for (let i = 0; i < n; i++) {
    const [lng, lat] = hoods[Math.floor(rand() * hoods.length)]!;
    out.push([lng + gaussian(rand) * 0.04, lat + gaussian(rand) * 0.03]);
  }
  return out;
}

export type ZoomStops = [zoom: number, value: number][];

/** Linear between stops, clamped at both ends (the style spec's ["interpolate", ["linear"], ["zoom"]]). */
export function interpolateZoom(zoom: number, stops: ZoomStops): number {
  if (zoom <= stops[0]![0]) return stops[0]![1];
  for (let i = 1; i < stops.length; i++) {
    const [z1, v1] = stops[i]!;
    if (zoom <= z1) {
      const [z0, v0] = stops[i - 1]!;
      return v0 + ((v1 - v0) * (zoom - z0)) / (z1 - z0);
    }
  }
  return stops[stops.length - 1]![1];
}

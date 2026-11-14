// Seeded towers around a point, for camera transitions at city zoom (no basemap)
import type { Color } from '@deck.gl/core';
import { seeded, type LngLat } from './data.ts';

export interface Tower {
  position: LngLat;
  /** Height in metres. */
  height: number;
  color: Color;
}

/** `count` towers scattered in a disc of `radius` degrees; tall ones are warm, short ones cool. */
export function towers(center: LngLat, { count = 60, radius = 0.014, seed = 5 } = {}): Tower[] {
  const rand = seeded(seed);
  const out: Tower[] = [];
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * radius;
    const height = 40 + rand() ** 2 * 520;
    const warm = height / 560;
    out.push({
      position: [center[0] + Math.cos(a) * r * 1.5, center[1] + Math.sin(a) * r],
      height,
      color: [Math.round(70 + warm * 185), Math.round(150 - warm * 20), Math.round(240 - warm * 190), 235],
    });
  }
  return out;
}

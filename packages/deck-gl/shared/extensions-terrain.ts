// TerrainExtension chapter: a trail and a lat/lng grid laid over the drawn terrain
import { TERRAIN_BOUNDS } from './geo-layers-art.ts';
import type { LngLat } from './data.ts';

const [W, S, E, N] = TERRAIN_BOUNDS;

/** A winding trail across the terrain bounds, `n` vertices from south-west to north-east. */
export function trail(n = 120): LngLat[] {
  return Array.from({ length: n }, (_, i) => {
    const s = i / (n - 1);
    return [W + (E - W) * (0.1 + 0.8 * s) + 0.05 * Math.sin(s * 14), S + (N - S) * (0.12 + 0.76 * s) + 0.04 * Math.cos(s * 11)];
  });
}

/** Every 8th vertex of the trail, as waypoints. */
export function waypoints(): LngLat[] {
  return trail().filter((_, i) => i % 8 === 0);
}

/** A graticule: lines every 0.05 degrees across the bounds. */
export function graticule(): LngLat[][] {
  const lines: LngLat[][] = [];
  for (let x = W; x <= E + 1e-9; x += 0.05) lines.push([[x, S], [x, N]]);
  for (let y = S; y <= N + 1e-9; y += 0.05) lines.push([[W, y], [E, y]]);
  return lines;
}

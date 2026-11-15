// Typed-array generators for big graphs: clustered points, links and colours
import { CENTER, rng } from './data.ts';
import { PALETTE } from './color.ts';

export interface BigGraph {
  count: number;
  positions: Float32Array;
  /** About `count × linksPerPoint` links, each inside one cluster. */
  links: Float32Array;
  /** RGBA by cluster. */
  colors: Float32Array;
}

/**
 * `count` points in `clusters` blobs round a circle, built in one pass over typed arrays so
 * a million points take well under a second. Link i joins point i to an earlier point of its
 * own cluster (clusters are point index modulo `clusters`).
 */
export function bigGraph(count: number, linksPerPoint = 1, clusters = 24, seed = 5): BigGraph {
  const r = rng(seed);
  const positions = new Float32Array(count * 2);
  const colors = new Float32Array(count * 4);
  const spread = 90 + Math.sqrt(count) * 0.35;
  const ringRadius = 300 + Math.sqrt(count) * 0.5;
  for (let i = 0; i < count; i++) {
    const c = i % clusters;
    const a = (c / clusters) * Math.PI * 2;
    const t = r() * Math.PI * 2;
    const d = (r() + r() + r()) / 3 * spread * 1.6;
    positions[i * 2] = CENTER + Math.cos(a) * ringRadius + Math.cos(t) * d;
    positions[i * 2 + 1] = CENTER + Math.sin(a) * ringRadius + Math.sin(t) * d;
    colors.set(PALETTE[c % PALETTE.length] ?? [1, 1, 1, 1], i * 4);
  }
  const total = Math.max(0, Math.floor(count * linksPerPoint));
  const links = new Float32Array(total * 2);
  for (let l = 0; l < total; l++) {
    const i = clusters + (l % Math.max(1, count - clusters));
    const earlier = Math.floor(r() * ((i - (i % clusters)) / clusters));
    links[l * 2] = i;
    links[l * 2 + 1] = (i % clusters) + earlier * clusters;
  }
  return { count, positions, links, colors };
}

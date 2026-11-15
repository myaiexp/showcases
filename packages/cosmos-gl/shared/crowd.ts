// Sized points piled in a heap, and a count of how many pairs still overlap
import { CENTER, rng, scatter, type GraphData } from './data.ts';
import { colors, hsl } from './color.ts';

export interface Crowd {
  data: GraphData;
  /** Point sizes (diameters) for setPointSizes. */
  sizes: Float32Array;
  /** One colour per point, by size. */
  colors: Float32Array;
}

/**
 * `count` points of different sizes (min..max diameter) in a tight heap around CENTER,
 * each linked to a nearby earlier point so the links pull the heap inward.
 */
export function crowd(count: number, seed = 1, min = 6, max = 26, heap = 30): Crowd {
  const r = rng(seed);
  const sizes = new Float32Array(count);
  const links: number[] = [];
  for (let i = 0; i < count; i++) {
    sizes[i] = min + r() * r() * (max - min);
    if (i > 0) links.push(Math.floor(r() * i), i);
  }
  const data: GraphData = { count, positions: scatter(count, heap, seed + 1), links: new Float32Array(links), group: new Array<number>(count).fill(0) };
  const col = colors(count, (i) => hsl(210 - (((sizes[i] ?? min) - min) / (max - min)) * 190, 0.7, 0.62));
  return { data, sizes, colors: col };
}

/** A hub with `leaves` leaves around it, every link pulling toward the hub. */
export function hub(leaves: number, seed = 1, size = 12): Crowd {
  const count = leaves + 1;
  const links: number[] = [];
  for (let i = 1; i < count; i++) links.push(0, i);
  const positions = scatter(count, 25, seed);
  positions[0] = CENTER;
  positions[1] = CENTER;
  const sizes = new Float32Array(count).fill(size);
  sizes[0] = size * 1.8;
  const data: GraphData = { count, positions, links: new Float32Array(links), group: new Array<number>(count).fill(0) };
  return { data, sizes, colors: colors(count, (i) => (i === 0 ? hsl(35, 0.9, 0.6) : hsl(205, 0.7, 0.62))) };
}

/** How many pairs of points overlap, given positions and sizes (diameters). */
export function overlaps(positions: ArrayLike<number>, sizes: ArrayLike<number>): number {
  const n = sizes.length;
  let hits = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = (positions[i * 2] ?? 0) - (positions[j * 2] ?? 0);
      const dy = (positions[i * 2 + 1] ?? 0) - (positions[j * 2 + 1] ?? 0);
      const touch = ((sizes[i] ?? 0) + (sizes[j] ?? 0)) / 2;
      if (dx * dx + dy * dy < touch * touch * 0.98) hits++;
    }
  }
  return hits;
}

/** Rewrites the caption every `ms` with `note()` and the current overlap count. */
export function reportOverlaps(
  stage: { every(ms: number, fn: () => void): void; say(t: string): void },
  graph: { isReady: boolean; getPointPositions(): ArrayLike<number> },
  sizes: ArrayLike<number>,
  note: () => string,
  ms = 700,
): void {
  stage.every(ms, () => {
    if (graph.isReady) stage.say(`${note()}. Overlapping pairs: ${overlaps(graph.getPointPositions(), sizes)}.`);
  });
}

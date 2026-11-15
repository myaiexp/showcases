// Layout helpers for the force engine examples: throw the nodes about, so a layout has to settle again
import { rng } from './data.ts';

interface Positioned {
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
}

/**
 * Moves every node to a random point inside a cube of half-size `spread` and stops it, as the
 * d3 engine keeps positions and velocities on the node objects themselves. Follow it with
 * `d3ReheatSimulation()`. `dims` leaves y and z alone below 3 (they are erased by numDimensions).
 */
export function scramble(nodes: readonly object[], spread: number, dims: 1 | 2 | 3 = 3, seed = Math.floor(Math.random() * 1e6)): void {
  const r = rng(seed);
  for (const n of nodes as Positioned[]) {
    n.x = (r() * 2 - 1) * spread;
    if (dims > 1) n.y = (r() * 2 - 1) * spread;
    if (dims > 2) n.z = (r() * 2 - 1) * spread;
    n.vx = n.vy = n.vz = 0;
  }
}

/** Mean speed of the nodes (d3 keeps `vx`, `vy`, `vz` on each node object). */
export function meanSpeed(nodes: readonly object[]): number {
  if (!nodes.length) return 0;
  let sum = 0;
  for (const n of nodes as Positioned[]) sum += Math.hypot(n.vx ?? 0, n.vy ?? 0, n.vz ?? 0);
  return sum / nodes.length;
}

// Hand-placed layouts for styling demos: a spider web and a spiral
import { CENTER, type GraphData } from './data.ts';

/**
 * A spider web: point 0 in the middle, then `rings` rings of `spokes` points. Links run
 * along every spoke and every ring, so link lengths grow outward. group = ring (0 = hub).
 */
export function web(spokes: number, rings: number, gap = 40): GraphData {
  const count = 1 + spokes * rings;
  const positions = new Float32Array(count * 2);
  const links: number[] = [];
  const group: number[] = [0];
  positions[0] = CENTER;
  positions[1] = CENTER;
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < spokes; s++) {
      const i = 1 + r * spokes + s;
      const a = (s / spokes) * Math.PI * 2 - Math.PI / 2;
      positions[i * 2] = CENTER + Math.cos(a) * gap * (r + 1);
      positions[i * 2 + 1] = CENTER + Math.sin(a) * gap * (r + 1);
      group.push(r + 1);
      links.push(r === 0 ? 0 : i - spokes, i);
      links.push(i, 1 + r * spokes + ((s + 1) % spokes));
    }
  }
  return { count, positions, links: new Float32Array(links), group };
}

/** `count` points on an outward spiral, `gap` apart along the arc. */
export function spiral(count: number, gap = 14): Float32Array {
  const out = new Float32Array(count * 2);
  let angle = 0.4;
  for (let i = 0; i < count; i++) {
    const radius = gap * 0.55 * angle;
    out[i * 2] = CENTER + Math.cos(angle) * radius;
    out[i * 2 + 1] = CENTER + Math.sin(angle) * radius;
    angle += gap / Math.max(radius, gap);
  }
  return out;
}

export interface WebLinks {
  data: GraphData;
  linkCount: number;
  /** Ring (1..rings) of the point at the outer end of link `k`. */
  ringOf(k: number): number;
  /** Links alternate: even = spoke (inward to outward), odd = ring (around). */
  isSpoke(k: number): boolean;
}

/** `web()` plus what link examples need to style its links by kind and ring. */
export function webLinks(spokes = 8, rings = 3, gap = 40): WebLinks {
  const data = web(spokes, rings, gap);
  return {
    data,
    linkCount: data.links.length / 2,
    ringOf: (k) => data.group[1 + Math.floor(k / 2)] ?? 1,
    isSpoke: (k) => k % 2 === 0,
  };
}

// The docs' big 3D grids (clebsch-cubic, streamtube-wind), thinned to card size on request
import { csv, unpackNum } from './data.ts';

export interface Grid {
  x: number[];
  y: number[];
  z: number[];
  value: number[];
}

/** clebsch-cubic.csv: a 25x25x25 scalar field. thin keeps every other node along each axis (13^3). */
export async function clebsch(thin: boolean): Promise<Grid> {
  const rows = await csv('clebsch-cubic.csv');
  const g: Grid = { x: unpackNum(rows, 'x'), y: unpackNum(rows, 'y'), z: unpackNum(rows, 'z'), value: unpackNum(rows, 'value') };
  if (!thin) return g;
  // Nodes sit at -1 + k/12: keep the even k on every axis.
  const keep = g.x.map((_, n) => [g.x[n]!, g.y[n]!, g.z[n]!].every((v) => Math.round((v + 1) * 12) % 2 === 0));
  const pick = (a: number[]): number[] => a.filter((_, n) => keep[n]);
  return { x: pick(g.x), y: pick(g.y), z: pick(g.z), value: pick(g.value) };
}

export interface Wind extends Grid {
  u: number[];
  v: number[];
  w: number[];
}

/** streamtube-wind.csv: 41x35x15 wind vectors. thin keeps every other x and y node. */
export async function wind(thin: boolean): Promise<Wind> {
  const rows = await csv('streamtube-wind.csv');
  const w: Wind = {
    x: unpackNum(rows, 'x'),
    y: unpackNum(rows, 'y'),
    z: unpackNum(rows, 'z'),
    u: unpackNum(rows, 'u'),
    v: unpackNum(rows, 'v'),
    w: unpackNum(rows, 'w'),
    value: [],
  };
  if (!thin) return w;
  const odd = (vals: number[]): Set<number> => new Set([...new Set(vals)].sort((a, b) => a - b).filter((_, i) => i % 2 === 1));
  const dropX = odd(w.x);
  const dropY = odd(w.y);
  const keep = w.x.map((xv, n) => !dropX.has(xv) && !dropY.has(w.y[n]!));
  const pick = (a: number[]): number[] => a.filter((_, n) => keep[n]);
  return { x: pick(w.x), y: pick(w.y), z: pick(w.z), u: pick(w.u), v: pick(w.v), w: pick(w.w), value: [] };
}

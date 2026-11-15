// Seeded trees, order tables, word lists and flights for layout examples
import { rng } from './cards.ts';

/** One row of a flat tree table, ready for the stratify transform. */
export interface TreeRow {
  id: string;
  /** The short label: the last part of the id. */
  name: string;
  parent: string | null;
  /** Leaf weight; 0 on internal nodes, whose value is the sum of their children. */
  size: number;
  /** The top-level module a node sits under (the root is its own branch). */
  branch: string;
  /** Row position, for expressions that need an index. */
  i: number;
}

const PACKAGE_TREE: Record<string, string[]> = {
  ui: ['button', 'input', 'modal', 'table', 'tabs', 'menu'],
  data: ['store', 'cache', 'query', 'schema'],
  net: ['http', 'socket', 'retry'],
  util: ['date', 'string', 'math', 'color', 'id'],
  core: ['router', 'events', 'state', 'plugin'],
};

/** A small package tree (root app, five modules, leaves with file sizes), seeded and flat. */
export function packageTree(seed = 7): TreeRow[] {
  const rand = rng(seed);
  const rows: TreeRow[] = [{ id: 'app', name: 'app', parent: null, size: 0, branch: 'app', i: 0 }];
  for (const [mod, leaves] of Object.entries(PACKAGE_TREE)) {
    rows.push({ id: mod, name: mod, parent: 'app', size: 0, branch: mod, i: rows.length });
    for (const leaf of leaves) {
      rows.push({ id: `${mod}/${leaf}`, name: leaf, parent: mod, size: Math.round(4 + rand() ** 2 * 60), branch: mod, i: rows.length });
    }
  }
  return rows;
}

/** A tiny tree of nine nodes, for layouts that label every node. */
export function smallTree(): TreeRow[] {
  const rows: [string, string | null, number][] = [
    ['A', null, 0],
    ['B', 'A', 0],
    ['C', 'A', 0],
    ['D', 'A', 3],
    ['E', 'B', 4],
    ['F', 'B', 2],
    ['G', 'C', 5],
    ['H', 'C', 1],
    ['I', 'C', 3],
  ];
  return rows.map(([id, parent, size], i) => ({ id, name: id, parent, size, branch: id, i }));
}

/** Orders: a flat table to nest by region, then product. */
export function orders(seed = 3, n = 24): { id: string; region: string; product: string; amount: number }[] {
  const rand = rng(seed);
  const regions = ['North', 'South', 'East', 'West'];
  const products = ['Tea', 'Coffee', 'Cocoa'];
  return Array.from({ length: n }, (_, i) => ({
    id: `o${i + 1}`,
    region: regions[Math.floor(rand() * regions.length)] ?? 'North',
    product: products[Math.floor(rand() * products.length)] ?? 'Tea',
    amount: Math.round(5 + rand() * 40),
  }));
}

const VOCAB =
  'data chart scale signal mark axis legend filter layout encode stream event bind group query field value range domain palette stack bin map link tree force label group path shape area line rule text symbol image arc grid band point time color size width height view parse render'.split(
    ' ',
  );

/** Words with Zipf-like counts, as `{text, count}` rows. */
export function words(seed = 5, n = 40): { text: string; count: number }[] {
  const rand = rng(seed);
  const pool = [...VOCAB];
  const out: { text: string; count: number }[] = [];
  for (let i = 0; i < n && pool.length; i++) {
    const w = pool.splice(Math.floor(rand() * pool.length), 1)[0] ?? 'data';
    out.push({ text: w, count: Math.max(1, Math.round(60 / (i + 1) + rand() * 3)) });
  }
  return out;
}

/** Flights like the docs' cross-filter example: delay (minutes), time (hour of day), distance (miles). */
export function flights(seed = 11, n = 4000): { delay: number; time: number; distance: number }[] {
  const rand = rng(seed);
  const gauss = (): number => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  return Array.from({ length: n }, () => {
    const time = Math.min(23.9, Math.max(0, 13 + gauss() * 4.2));
    const distance = Math.round(Math.min(2399, 120 + -Math.log(1 - rand()) * 520));
    // later and longer flights run later on average
    const delay = Math.round(Math.min(179, Math.max(-60, -6 + time * 0.9 + distance * 0.004 + gauss() * 14 + (rand() < 0.08 ? rand() * 120 : 0))));
    return { delay, time: Math.round(time * 100) / 100, distance };
  });
}

/** Seeded points on a unit square, as `{id, u, v}` rows. */
export function scatter(seed: number, n: number): { id: number; u: number; v: number }[] {
  const rand = rng(seed);
  return Array.from({ length: n }, (_, id) => ({ id, u: Math.round(rand() * 1000) / 1000, v: Math.round(rand() * 1000) / 1000 }));
}

/** A ring of n nodes with a chord every `skip` steps; links index into the node array. */
export function ringGraph(n: number, skip = 5): { nodes: { id: number; group: number }[]; links: { source: number; target: number }[] } {
  const nodes = Array.from({ length: n }, (_, id) => ({ id, group: id % 4 }));
  const links = nodes.map((d) => ({ source: d.id, target: (d.id + 1) % n }));
  for (let i = 0; i < n; i += skip) links.push({ source: i, target: (i + Math.floor(n / 3)) % n });
  return { nodes, links };
}

/** n bubbles of seeded radius, as `{id, r, group}` rows. */
export function bubbles(seed: number, n: number, rMin = 4, rMax = 18): { id: number; r: number; group: string }[] {
  const rand = rng(seed);
  return Array.from({ length: n }, (_, id) => ({
    id,
    r: Math.round((rMin + rand() ** 2 * (rMax - rMin)) * 10) / 10,
    group: 'ABC'.charAt(Math.floor(rand() * 3)),
  }));
}

/** n scattered points with a word each, as `{name, u, v, size}` rows on a unit square. */
export function namedPoints(seed: number, n: number): { name: string; u: number; v: number; size: number }[] {
  const rand = rng(seed);
  return words(seed, n).map((w) => ({ name: w.text, u: Math.round(rand() * 1000) / 1000, v: Math.round(rand() * 1000) / 1000, size: w.count }));
}

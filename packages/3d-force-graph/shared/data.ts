// Seeded sample graphs in the README's { nodes, links } input shape

export interface SampleNode {
  id: string | number;
  name?: string;
  group?: number;
  val?: number;
  [key: string]: unknown;
}

export interface SampleLink {
  source: string | number;
  target: string | number;
  value?: number;
  [key: string]: unknown;
}

export interface SampleGraph<N extends SampleNode = SampleNode, L extends SampleLink = SampleLink> {
  nodes: N[];
  links: L[];
}

/** A small deterministic random number generator (mulberry32), so every visit draws the same graph. */
export function rng(seed = 1): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A random tree: node `i` links to one earlier node. Ids are numbers 0..n-1. */
export function randomTree(n: number, seed = 1): SampleGraph<SampleNode, SampleLink> {
  const r = rng(seed);
  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, name: `node ${i}` }));
  const links = nodes.slice(1).map((node) => ({ source: node.id, target: Math.floor(r() * (node.id as number)) }));
  return { nodes, links };
}

/**
 * `groups` clusters of `size` nodes each. Nodes link mostly inside their own group and now and
 * then across, so a force layout pulls each group together. Every node has `group` and `val`.
 */
export function clusters(groups: number, size: number, seed = 3): SampleGraph {
  const r = rng(seed);
  const nodes: SampleNode[] = [];
  const links: SampleLink[] = [];
  for (let g = 0; g < groups; g++) {
    for (let i = 0; i < size; i++) {
      const id = `${g}-${i}`;
      nodes.push({ id, name: `group ${g + 1} · ${i + 1}`, group: g + 1, val: 1 + Math.floor(r() * 4) });
      if (i > 0) links.push({ source: id, target: `${g}-${Math.floor(r() * i)}`, value: 1 + Math.floor(r() * 3) });
    }
  }
  for (let k = 0; k < groups; k++) {
    const a = Math.floor(r() * groups);
    const b = (a + 1 + Math.floor(r() * (groups - 1))) % groups;
    links.push({ source: `${a}-${Math.floor(r() * size)}`, target: `${b}-${Math.floor(r() * size)}`, value: 1 });
  }
  return { nodes, links };
}

/** A layered graph with no cycles: `levels` rows of up to `width` nodes, each linked from the row above. */
export function layeredDag(levels: number, width: number, seed = 5): SampleGraph {
  const r = rng(seed);
  const nodes: SampleNode[] = [{ id: 'root', name: 'root', level: 0 }];
  const links: SampleLink[] = [];
  let above: string[] = ['root'];
  for (let l = 1; l < levels; l++) {
    const count = 1 + Math.floor(r() * width);
    const row: string[] = [];
    for (let i = 0; i < count; i++) {
      const id = `L${l}-${i}`;
      nodes.push({ id, name: id, level: l });
      links.push({ source: above[Math.floor(r() * above.length)]!, target: id });
      // A second parent now and then, so it is a DAG and not only a tree.
      if (above.length > 1 && r() < 0.25) links.push({ source: above[Math.floor(r() * above.length)]!, target: id });
      row.push(id);
    }
    above = row;
  }
  // Drop duplicate parent links a second draw may have made.
  const seen = new Set<string>();
  return {
    nodes,
    links: links.filter((l) => {
      const key = `${l.source}>${l.target}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }),
  };
}

/** People in three teams, with named links: a graph for labels, colour by group and hover. */
export function team(): SampleGraph {
  const people: [string, number][] = [
    ['Ada', 1], ['Ben', 1], ['Cleo', 1], ['Dev', 1], ['Eli', 1],
    ['Fay', 2], ['Gus', 2], ['Hana', 2], ['Ivo', 2], ['Juno', 2],
    ['Kai', 3], ['Lea', 3], ['Milo', 3], ['Nia', 3], ['Oto', 3], ['Pia', 3],
  ];
  const pairs: [string, string, string][] = [
    ['Ada', 'Ben', 'pairs with'], ['Ada', 'Cleo', 'mentors'], ['Ben', 'Dev', 'reviews'], ['Cleo', 'Eli', 'pairs with'],
    ['Dev', 'Eli', 'reviews'], ['Ada', 'Fay', 'reports to'], ['Fay', 'Gus', 'mentors'], ['Gus', 'Hana', 'pairs with'],
    ['Hana', 'Ivo', 'reviews'], ['Ivo', 'Juno', 'pairs with'], ['Fay', 'Juno', 'mentors'], ['Fay', 'Kai', 'reports to'],
    ['Kai', 'Lea', 'mentors'], ['Lea', 'Milo', 'pairs with'], ['Milo', 'Nia', 'reviews'], ['Nia', 'Oto', 'pairs with'],
    ['Oto', 'Pia', 'reviews'], ['Kai', 'Pia', 'mentors'], ['Eli', 'Hana', 'reviews'], ['Juno', 'Milo', 'pairs with'],
  ];
  return {
    nodes: people.map(([name, group]) => ({ id: name, name, group, val: name === 'Ada' || name === 'Fay' || name === 'Kai' ? 6 : 1 })),
    links: pairs.map(([source, target, name], i) => ({ source, target, name, value: 1 + ((i * 7) % 4) })),
  };
}

/** A palette that reads on the dark scene background. */
export const PALETTE = ['#e4572e', '#29335c', '#f3a712', '#669bbc', '#a8c686', '#8e5572', '#2a9d8f'] as const;

/** How many links touch each node id. Call it before `graphData`, while link ends are still ids. */
export function degrees(data: { links: { source: unknown; target: unknown }[] }): Map<string | number, number> {
  const deg = new Map<string | number, number>();
  const end = (e: unknown): string | number => (typeof e === 'object' && e !== null ? (e as SampleNode).id : (e as string | number));
  for (const l of data.links) {
    for (const e of [end(l.source), end(l.target)]) deg.set(e, (deg.get(e) ?? 0) + 1);
  }
  return deg;
}

/** The id of a link end, whether the library has already replaced it with the node object or not. */
export function endId(e: unknown): string | number {
  return typeof e === 'object' && e !== null ? (e as SampleNode).id : (e as string | number);
}

/** Node and link shapes for typing a graph: `new ForceGraph3D(el) as ForceGraph3DInstance<TNode, TLink>`. */
export interface TNode {
  index?: number;
  id: string | number;
  name?: string;
  group?: number;
  val?: number;
  color?: string;
  x?: number;
  y?: number;
  z?: number;
}
export interface TLink {
  source: string | number | TNode;
  target: string | number | TNode;
  value?: number;
  name?: string;
  type?: string;
  color?: string;
}
export interface TData {
  nodes: TNode[];
  links: TLink[];
}

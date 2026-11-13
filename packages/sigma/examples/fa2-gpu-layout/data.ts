// Seeded community graph that starts from a random scatter, so the layout has work to do
import Graph from 'graphology';

const PALETTE = ['#e22653', '#277da1', '#f9a03f', '#43aa8b', '#9b5de5', '#577590'];

// mulberry32: seeded PRNG so the graph is identical on every load
export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function communityGraph(nodeCount: number, communities: number): Graph {
  const rand = mulberry32(8);
  const graph = new Graph();
  const members: string[][] = Array.from({ length: communities }, () => []);
  for (let i = 0; i < nodeCount; i++) {
    const c = i % communities;
    graph.addNode(`n${i}`, { x: 0, y: 0, size: 1, color: PALETTE[c % PALETTE.length] });
    members[c]?.push(`n${i}`);
  }
  members.forEach((group) => {
    for (let i = 1; i < group.length; i++) {
      const s = group[i];
      // Two links back into the group: dense enough that communities pull together.
      for (let k = 0; k < 2; k++) {
        const t = group[Math.floor(rand() * i)];
        if (s && t) graph.mergeEdge(s, t, { size: 0.15, color: '#cbd5e1' });
      }
    }
  });
  // Sparse links between communities.
  for (let k = 0; k < nodeCount / 12; k++) {
    const s = `n${Math.floor(rand() * nodeCount)}`;
    const t = `n${Math.floor(rand() * nodeCount)}`;
    if (s !== t) graph.mergeEdge(s, t, { size: 0.15, color: '#cbd5e1' });
  }
  return graph;
}

// Overwrites every node position with a uniform random point in a square.
export function scatter(graph: Graph, extent: number, seed: number): void {
  const rand = mulberry32(seed);
  graph.forEachNode((node) => {
    graph.mergeNodeAttributes(node, { x: (rand() - 0.5) * extent, y: (rand() - 0.5) * extent });
  });
}

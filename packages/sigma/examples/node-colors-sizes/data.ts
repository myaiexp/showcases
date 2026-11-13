// Seeded clustered graph: each node carries community, score, and pre-baked color and size
import Graph from 'graphology';

export const COMMUNITIES = ['science', 'art', 'tech', 'sport', 'music'] as const;
export const PALETTE = ['#2a9d8f', '#e22653', '#277da1', '#f4a261', '#8e5ea2'];

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(perCommunity: number): Graph {
  const rand = mulberry32(7);
  const graph = new Graph();
  COMMUNITIES.forEach((community, c) => {
    const angle = (c / COMMUNITIES.length) * Math.PI * 2;
    const cx = 30 * Math.cos(angle);
    const cy = 30 * Math.sin(angle);
    for (let i = 0; i < perCommunity; i++) {
      const score = Math.round(rand() ** 2 * 100);
      graph.addNode(`${community}-${i}`, {
        x: cx + (rand() - 0.5) * 22,
        y: cy + (rand() - 0.5) * 22,
        community,
        score,
        // The "stored as is" attributes used by the first mode.
        color: PALETTE[c],
        size: 1 + (score / 100) * 2.5,
      });
    }
  });
  graph.forEachNode((node, attrs) => {
    for (let k = 0; k < 2; k++) {
      const same = rand() < 0.85;
      const pool = graph.filterNodes((_, a) => (a['community'] === attrs['community']) === same);
      const other = pool[Math.floor(rand() * pool.length)];
      if (other && other !== node && !graph.hasEdge(node, other)) graph.addEdge(node, other, { size: 0.15, color: '#ddd' });
    }
  });
  return graph;
}

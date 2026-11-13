// Seeded cloud of large overlapping nodes so alpha blending is visible
import Graph from 'graphology';

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLORS = ['#e22653', '#277da1', '#2a9d8f', '#f4a261'];

export function buildGraph(count: number): Graph {
  const rand = mulberry32(11);
  const graph = new Graph();
  for (let i = 0; i < count; i++) {
    graph.addNode(`n${i}`, {
      x: (rand() - 0.5) * 40,
      y: (rand() - 0.5) * 28,
      size: 2 + rand() * 2.2,
      color: COLORS[i % COLORS.length],
      opacity: 1,
    });
  }
  for (let i = 0; i < count; i++) {
    const target = Math.floor(rand() * count);
    if (target !== i && !graph.hasEdge(`n${i}`, `n${target}`)) graph.addEdge(`n${i}`, `n${target}`, { size: 0.5, opacity: 1 });
  }
  return graph;
}

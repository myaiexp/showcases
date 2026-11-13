// Seeded small graph with varied node sizes, so the picking colours differ visibly
import Graph from 'graphology';

const PALETTE = ['#e22653', '#277da1', '#f9a03f', '#43aa8b', '#9b5de5'];

// mulberry32: seeded PRNG so the layout is identical on every load
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickingGraph(nodeCount: number): Graph {
  const rand = mulberry32(12);
  const graph = new Graph();
  for (let i = 0; i < nodeCount; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 50;
    graph.addNode(`n${i}`, {
      x: Math.cos(a) * r,
      y: Math.sin(a) * r,
      size: 1.5 + rand() * 3.5,
      color: PALETTE[i % PALETTE.length],
      label: `n${i}`,
    });
  }
  for (let i = 1; i < nodeCount; i++) {
    graph.addEdge(`n${i}`, `n${Math.floor(rand() * i)}`, { size: 0.5 + rand() * 0.8, color: '#9ca3af' });
  }
  // A few extra edges so the picking layer has crossings to show.
  for (let k = 0; k < nodeCount / 3; k++) {
    const s = `n${Math.floor(rand() * nodeCount)}`;
    const t = `n${Math.floor(rand() * nodeCount)}`;
    if (s !== t) graph.mergeEdge(s, t, { size: 0.5, color: '#9ca3af' });
  }
  return graph;
}

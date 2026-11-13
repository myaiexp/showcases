// A dense pile of overlapping large nodes, so which one is on top is obvious
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

export function buildPile(): Graph {
  const rand = mulberry32(13);
  const graph = new Graph();
  const palette = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#8ecae6'];
  for (let i = 0; i < 40; i++) {
    graph.addNode(`n${i}`, {
      label: `${i}`,
      x: rand() * 24,
      y: rand() * 14,
      size: 1 + rand() * 0.9,
      color: palette[i % palette.length],
    });
  }
  return graph;
}

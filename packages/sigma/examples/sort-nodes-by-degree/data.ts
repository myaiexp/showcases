// A hub-and-spoke blob where node size follows degree and nodes overlap heavily
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

export function buildBlob(): Graph {
  const rand = mulberry32(99);
  const graph = new Graph();
  const palette = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
  const n = 90;
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 14;
    graph.addNode(`n${i}`, { x: r * Math.cos(a), y: r * Math.sin(a), color: palette[i % palette.length] });
  }
  // Preferential attachment: early nodes collect many links and become hubs.
  for (let i = 1; i < n; i++) {
    for (let k = 0; k < 2; k++) {
      const target = Math.floor(Math.pow(rand(), 2) * i);
      if (target !== i && !graph.hasEdge(`n${i}`, `n${target}`)) graph.addEdge(`n${i}`, `n${target}`, { size: 0.05, color: '#ddd' });
    }
  }
  graph.forEachNode((node) => {
    const degree = graph.degree(node);
    graph.mergeNodeAttributes(node, { degree, size: 0.6 + Math.min(degree, 24) * 0.1, order: degree });
  });
  return graph;
}

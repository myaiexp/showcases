// Seeded sample graph: a few clusters of labelled nodes on a ring
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

const PALETTE = ['#e4572e', '#17bebb', '#ffc914', '#76b041', '#6d5acf', '#f08cae'];
const SYLLABLES = ['ar', 'bel', 'cor', 'dun', 'el', 'fa', 'gor', 'hin', 'ju', 'kal', 'lum', 'mir'];

export function buildGraph(nodeCount: number, clusterCount: number, seed = 7): Graph {
  const rand = mulberry32(seed);
  const graph = new Graph();
  for (let i = 0; i < nodeCount; i++) {
    const cluster = i % clusterCount;
    const angle = (cluster / clusterCount) * Math.PI * 2;
    const spread = () => (rand() + rand() + rand() - 1.5) * 28;
    const name = SYLLABLES[Math.floor(rand() * 12)]! + SYLLABLES[Math.floor(rand() * 12)]!;
    graph.addNode(`n${i}`, {
      label: name.charAt(0).toUpperCase() + name.slice(1),
      x: Math.cos(angle) * 45 + spread(),
      y: Math.sin(angle) * 45 + spread(),
      size: 2.2,
      color: PALETTE[cluster % PALETTE.length],
    });
  }
  for (let i = clusterCount; i < nodeCount; i++) {
    // Mostly wire inside the cluster, now and then across clusters.
    const back = rand() < 0.12 ? 1 + Math.floor(rand() * clusterCount) : clusterCount * (1 + Math.floor(rand() * 3));
    const other = Math.max(0, i - back);
    if (other !== i) graph.mergeEdge(`n${i}`, `n${other}`, { size: 0.4, color: '#c9ced6' });
  }
  return graph;
}

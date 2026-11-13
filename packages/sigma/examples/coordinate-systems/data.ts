// A seeded clustered random graph spread over roughly 100 x 100 graph units
import Graph from 'graphology';

const COLORS = ['#e22653', '#277da1', '#43aa8b', '#f9a03f', '#7b5ea7', '#577590'];

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildClusterGraph(clusters: number, perCluster: number, seed = 7): Graph {
  const rand = mulberry32(seed);
  const graph = new Graph();
  for (let c = 0; c < clusters; c++) {
    const angle = (c / clusters) * Math.PI * 2;
    const cx = Math.cos(angle) * 40;
    const cy = Math.sin(angle) * 40;
    for (let i = 0; i < perCluster; i++) {
      const r = 3 + rand() * 12;
      const a = rand() * Math.PI * 2;
      graph.addNode(`${c}-${i}`, {
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        size: 1 + rand() * 0.8,
        color: COLORS[c % COLORS.length],
        label: `Node ${c}-${i}`,
      });
    }
    for (let i = 1; i < perCluster; i++) {
      graph.addEdge(`${c}-${i}`, `${c}-${Math.floor(rand() * i)}`, { size: 0.25 });
    }
  }
  // A few bridges keep the clusters connected into one graph.
  for (let c = 0; c < clusters; c++) {
    graph.addEdge(`${c}-0`, `${(c + 1) % clusters}-0`, { size: 0.25 });
  }
  return graph;
}

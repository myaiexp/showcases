// Small nodes with big blockers parked in a higher depth bucket, hiding the labels beneath them
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
  const rand = mulberry32(5);
  const graph = new Graph();
  const palette = ['#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#8ecae6'];
  for (let i = 0; i < 24; i++) {
    graph.addNode(`n${i}`, {
      label: `Item ${i}`,
      x: rand() * 30,
      y: rand() * 18,
      size: 0.9 + rand() * 0.5,
      color: palette[i % palette.length],
      depth: 'nodes',
      labelDepth: 'nodes',
    });
  }
  // Big dark "blockers" sit in the higher bucket, right on top of some regular nodes.
  for (let i = 0; i < 5; i++) {
    const host = graph.getNodeAttributes(`n${i * 4}`);
    graph.addNode(`blocker${i}`, {
      label: `Blocker ${i}`,
      x: Number(host['x']) + 0.8,
      y: Number(host['y']) + 0.4,
      size: 2.6,
      color: '#bde0fe',
      depth: 'topNodes',
      labelDepth: 'topNodes',
    });
  }
  return graph;
}

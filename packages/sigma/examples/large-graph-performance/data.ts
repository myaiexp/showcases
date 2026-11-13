// Seeded big graph: blobs of nodes on a ring, mostly intra-blob edges, built to a target edge count
import Graph from 'graphology';

const PALETTE = ['#e22653', '#277da1', '#f9a03f', '#43aa8b', '#9b5de5', '#577590', '#f94144', '#90be6d'];

// mulberry32: seeded PRNG so every load draws the same graph
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function bigGraph(nodeCount: number, edgeCount: number, blobs = 8): Graph {
  const rand = mulberry32(17);
  const graph = new Graph();
  const members: string[][] = Array.from({ length: blobs }, () => []);

  for (let i = 0; i < nodeCount; i++) {
    const b = i % blobs;
    const angle = (b / blobs) * Math.PI * 2;
    // Sum of three uniforms approximates a gaussian cloud around the blob centre.
    const gx = (rand() + rand() + rand() - 1.5) * 30;
    const gy = (rand() + rand() + rand() - 1.5) * 30;
    const key = `n${i}`;
    graph.addNode(key, {
      x: Math.cos(angle) * 90 + gx,
      y: Math.sin(angle) * 90 + gy,
      size: 0.9,
      color: PALETTE[b % PALETTE.length],
      label: `Node ${i}`,
    });
    members[b]?.push(key);
  }

  // Bounded attempts: duplicate pairs are skipped by mergeEdge, so size grows a bit slower than tries.
  for (let tries = 0; graph.size < edgeCount && tries < edgeCount * 3; tries++) {
    const b = Math.floor(rand() * blobs);
    const from = members[b] ?? [];
    const to = rand() < 0.85 ? from : (members[Math.floor(rand() * blobs)] ?? from);
    const s = from[Math.floor(rand() * from.length)];
    const t = to[Math.floor(rand() * to.length)];
    if (s && t && s !== t) graph.mergeEdge(s, t, { size: 0.12, color: '#c9ccd3' });
  }
  return graph;
}

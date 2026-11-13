// Seeded clustered random graph: communities placed on a ring, nodes scattered around each centre
import Graph from 'graphology';

export const PALETTE = ['#e22653', '#277da1', '#f9a03f', '#43aa8b', '#9b5de5', '#577590'];

export interface Community {
  id: number;
  color: string;
  nodes: string[];
}

// mulberry32: tiny seeded PRNG so the layout is identical on every load
export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clusteredGraph(communityCount: number, perCommunity: number, seed = 7) {
  const rand = mulberry32(seed);
  const graph = new Graph();
  const communities: Community[] = [];

  for (let c = 0; c < communityCount; c++) {
    const angle = (c / communityCount) * Math.PI * 2;
    const cx = Math.cos(angle) * 60;
    const cy = Math.sin(angle) * 60;
    const color = PALETTE[c % PALETTE.length] ?? '#888';
    const nodes: string[] = [];
    for (let i = 0; i < perCommunity; i++) {
      const key = `c${c}n${i}`;
      // Sum of two uniforms gives a soft bell shape around the centre.
      const r = (rand() + rand()) * 11;
      const a = rand() * Math.PI * 2;
      graph.addNode(key, {
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        size: 1.6,
        color,
        label: i === 0 ? `Community ${c + 1}` : '',
      });
      nodes.push(key);
    }
    for (let i = 1; i < nodes.length; i++) {
      const other = nodes[Math.floor(rand() * i)];
      const self = nodes[i];
      if (other && self) graph.addEdge(self, other, { size: 0.25, color: '#d4d4d8' });
    }
    communities.push({ id: c, color, nodes });
  }
  return { graph, communities };
}

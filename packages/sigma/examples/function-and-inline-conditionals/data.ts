// A seeded, clustered random graph (about 100 units wide) with typed attributes to style
import Graph from 'graphology';

export const COMMUNITIES = ['science', 'art', 'tech', 'sport'] as const;

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Four communities placed around a ring; edges mostly stay inside a community. */
export function buildGraph(perCommunity = 22, seed = 7): Graph {
  const rand = mulberry32(seed);
  const graph = new Graph();
  const members: string[][] = COMMUNITIES.map(() => []);

  COMMUNITIES.forEach((community, c) => {
    const angle = (c / COMMUNITIES.length) * Math.PI * 2 + Math.PI / 4;
    const cx = Math.cos(angle) * 34;
    const cy = Math.sin(angle) * 34;
    for (let i = 0; i < perCommunity; i++) {
      const id = `${community}-${i}`;
      const r = Math.sqrt(rand()) * 22;
      const theta = rand() * Math.PI * 2;
      graph.addNode(id, {
        label: id,
        x: cx + Math.cos(theta) * r,
        y: cy + Math.sin(theta) * r,
        community,
        type: rand() < 0.5 ? 'person' : 'company',
        score: Math.round(rand() * 100),
        important: rand() < 0.15,
      });
      members[c]?.push(id);
    }
  });

  const connect = (a: string, b: string): void => {
    if (a === b || graph.hasEdge(a, b) || graph.hasEdge(b, a)) return;
    graph.addEdge(a, b, { type: rand() < 0.5 ? 'citation' : 'coauthorship' });
  };
  members.forEach((group) => {
    group.forEach((id) => {
      for (let k = 0; k < 2; k++) connect(id, group[Math.floor(rand() * group.length)] ?? id);
      if (rand() < 0.08) {
        const other = members[Math.floor(rand() * members.length)] ?? group;
        connect(id, other[Math.floor(rand() * other.length)] ?? id);
      }
    });
  });

  graph.forEachNode((node) => graph.setNodeAttribute(node, 'degree', graph.degree(node)));
  return graph;
}

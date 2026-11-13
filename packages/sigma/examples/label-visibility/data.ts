// A clustered random graph of ~160 nodes: hubs are larger, so they win label culling
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

export function buildClusters(): Graph {
  const rand = mulberry32(21);
  const graph = new Graph();
  const centers = [
    [20, 20],
    [75, 25],
    [45, 70],
    [90, 80],
  ] as const;
  const colors = ['#e22653', '#277da1', '#f9c74f', '#43aa8b'];
  let id = 0;
  centers.forEach(([cx, cy], c) => {
    const members: string[] = [];
    for (let i = 0; i < 40; i++) {
      const name = `n${id++}`;
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * 18;
      graph.addNode(name, {
        label: `Node ${name.slice(1)}`,
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a),
        size: 0.8,
        color: colors[c],
        group: c,
        // "auto" lets sigma decide; the select in the full view overwrites it.
        vis: 'auto',
      });
      members.push(name);
    }
    members.forEach((m, i) => {
      for (let k = 0; k < 2; k++) {
        const other = members[Math.floor(rand() * (i + 1))];
        if (other && other !== m && !graph.hasEdge(m, other)) graph.addEdge(m, other, { size: 0.1, color: '#ddd' });
      }
    });
  });
  // Size by degree after wiring, so well-connected nodes stand out.
  graph.forEachNode((node) => graph.setNodeAttribute(node, 'size', 0.6 + graph.degree(node) * 0.35));
  return graph;
}

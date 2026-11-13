// Synthetic stand-in for the docs' wikipedia.json: same shape, generated from a seeded PRNG
export interface DatasetNode {
  key: string;
  label: string;
  tag: string;
  cluster: string;
  x: number;
  y: number;
  score: number;
}
export interface DatasetCluster {
  key: string;
  color: string;
  clusterLabel: string;
}
export interface Dataset {
  nodes: DatasetNode[];
  edges: [string, string][];
  clusters: DatasetCluster[];
}

const CLUSTERS: DatasetCluster[] = [
  { key: '0', color: '#6c3e81', clusterLabel: 'Graph theory' },
  { key: '1', color: '#e22653', clusterLabel: 'Charts' },
  { key: '2', color: '#277da1', clusterLabel: 'Tools' },
  { key: '3', color: '#f9a03f', clusterLabel: 'Statistics' },
  { key: '4', color: '#43aa8b', clusterLabel: 'Maps' },
  { key: '5', color: '#90be6d', clusterLabel: 'Design' },
  { key: '6', color: '#577590', clusterLabel: 'Networks' },
];
const TAGS = ['Tool', 'Concept', 'Chart type', 'Person'];

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Roughly Gaussian noise, from the sum of three uniforms. */
function noise(rand: () => number): number {
  return (rand() + rand() + rand() - 1.5) / 1.5;
}

export function makeDataset(nodeCount: number, seed = 7): Dataset {
  const rand = mulberry32(seed);
  const nodes: DatasetNode[] = [];
  const byCluster = new Map<string, string[]>();

  CLUSTERS.forEach((cluster, c) => {
    // Cluster centres sit on a ring, like the clumps of the real dataset.
    const angle = (c / CLUSTERS.length) * Math.PI * 2;
    const cx = Math.cos(angle) * 600;
    const cy = Math.sin(angle) * 600;
    byCluster.set(cluster.key, []);
    const count = Math.round(nodeCount / CLUSTERS.length);
    for (let i = 0; i < count; i++) {
      const key = `n${cluster.key}-${i}`;
      nodes.push({
        key,
        label: `${cluster.clusterLabel} ${i}`,
        tag: TAGS[Math.floor(rand() * TAGS.length)] ?? 'Concept',
        cluster: cluster.key,
        x: cx + noise(rand) * 380,
        y: cy + noise(rand) * 380,
        // Heavy-tailed: a few important articles, many minor ones.
        score: Math.pow(rand(), 4) * 0.01,
      });
      byCluster.get(cluster.key)?.push(key);
    }
  });

  const edges: [string, string][] = [];
  const seen = new Set<string>();
  const link = (a: string, b: string): void => {
    const id = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (a === b || seen.has(id)) return;
    seen.add(id);
    edges.push([a, b]);
  };
  for (const node of nodes) {
    const mates = byCluster.get(node.cluster) ?? [];
    for (let i = 0; i < 2; i++) {
      const mate = mates[Math.floor(rand() * mates.length)];
      if (mate) link(node.key, mate);
    }
    if (rand() < 0.15) {
      const other = nodes[Math.floor(rand() * nodes.length)];
      if (other) link(node.key, other.key);
    }
  }
  return { nodes, edges, clusters: CLUSTERS };
}

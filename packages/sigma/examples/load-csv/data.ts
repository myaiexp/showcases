// Builds two inline CSV texts (nodes.csv and edges.csv) for a small ring-and-hub network
const COLORS = ['#e22653', '#277da1', '#43aa8b', '#f9a03f'];

// mulberry32: seeded PRNG so the CSV text is identical on every load
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface CsvFiles {
  nodesCSV: string;
  edgesCSV: string;
}

export function buildCsv(hubs = 4, spokes = 8): CsvFiles {
  const rand = mulberry32(9);
  const nodes = ['id,label,x,y,size,color'];
  const edges = ['source,target,weight'];

  for (let h = 0; h < hubs; h++) {
    const a = (h / hubs) * Math.PI * 2;
    const hx = Math.cos(a) * 45;
    const hy = Math.sin(a) * 45;
    nodes.push(`hub${h},Hub ${h + 1},${hx.toFixed(1)},${hy.toFixed(1)},4,${COLORS[h % COLORS.length]}`);
    // Every hub is linked to the next one, closing a ring.
    edges.push(`hub${h},hub${(h + 1) % hubs},3`);
    for (let s = 0; s < spokes; s++) {
      const sa = rand() * Math.PI * 2;
      const d = 8 + rand() * 10;
      // An empty size cell shows the `|| 10`-style fallback of the docs' loader.
      const size = s % 3 === 0 ? '' : (1 + rand() * 1.5).toFixed(2);
      const color = s % 4 === 0 ? '' : (COLORS[h % COLORS.length] ?? '');
      nodes.push(
        `h${h}s${s},Node ${h + 1}.${s + 1},${(hx + Math.cos(sa) * d).toFixed(1)},${(hy + Math.sin(sa) * d).toFixed(1)},${size},${color}`,
      );
      edges.push(`hub${h},h${h}s${s},${(0.5 + rand() * 1.5).toFixed(2)}`);
    }
  }
  return { nodesCSV: nodes.join('\n') + '\n', edgesCSV: edges.join('\n') + '\n' };
}

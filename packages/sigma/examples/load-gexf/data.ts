// Generates an inline GEXF document (XML) describing a small clustered network, with viz data
const COLORS: Array<[number, number, number]> = [
  [226, 38, 83],
  [39, 125, 161],
  [67, 170, 139],
  [249, 160, 63],
];
const GROUPS = ['north', 'east', 'south', 'west'];

// mulberry32: seeded PRNG so the generated file is identical on every load
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGexf(perGroup = 14): string {
  const rand = mulberry32(3);
  const nodes: string[] = [];
  const edges: string[] = [];
  const keysByGroup: string[][] = GROUPS.map(() => []);

  GROUPS.forEach((group, g) => {
    const angle = (g / GROUPS.length) * Math.PI * 2;
    const [r, gr, b] = COLORS[g] ?? [100, 100, 100];
    for (let i = 0; i < perGroup; i++) {
      const id = `${group[0]}${i}`;
      const a = rand() * Math.PI * 2;
      const d = 6 + rand() * 12;
      const x = Math.cos(angle) * 40 + Math.cos(a) * d;
      const y = Math.sin(angle) * 40 + Math.sin(a) * d;
      keysByGroup[g]?.push(id);
      nodes.push(
        `      <node id="${id}" label="${group} ${i}">
        <attvalues><attvalue for="0" value="${group}"/></attvalues>
        <viz:size value="${(1.5 + rand() * 2).toFixed(2)}"/>
        <viz:position x="${x.toFixed(2)}" y="${y.toFixed(2)}" z="0"/>
        <viz:color r="${r}" g="${gr}" b="${b}"/>
      </node>`,
      );
    }
  });

  let e = 0;
  keysByGroup.forEach((keys, g) => {
    keys.forEach((key, i) => {
      const peer = keys[Math.floor(rand() * i)];
      if (peer) edges.push(`      <edge id="e${e++}" source="${key}" target="${peer}" weight="1"/>`);
      // A few bridges to the next group so the clusters are connected.
      if (i % 5 === 0) {
        const next = keysByGroup[(g + 1) % GROUPS.length]?.[i];
        if (next) edges.push(`      <edge id="e${e++}" source="${key}" target="${next}" weight="1"/>`);
      }
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://www.gexf.net/1.2draft" xmlns:viz="http://www.gexf.net/1.2draft/viz" version="1.2">
  <graph defaultedgetype="undirected">
    <attributes class="node">
      <attribute id="0" title="group" type="string"/>
    </attributes>
    <nodes>
${nodes.join('\n')}
    </nodes>
    <edges>
${edges.join('\n')}
    </edges>
  </graph>
</gexf>
`;
}

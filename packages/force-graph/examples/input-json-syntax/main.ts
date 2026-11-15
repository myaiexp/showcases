// Input JSON syntax: the README's { nodes: [{id, name, val}], links: [{source, target}] } shape, edited live
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import type { GLink, GNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

// The README's example, filled out a little so it has something to lay out.
const SAMPLES = [
  `{
  "nodes": [
    { "id": "id1", "name": "name1", "val": 1 },
    { "id": "id2", "name": "name2", "val": 10 },
    { "id": "id3", "name": "name3", "val": 4 },
    { "id": "id4", "name": "name4", "val": 2 }
  ],
  "links": [
    { "source": "id1", "target": "id2" },
    { "source": "id2", "target": "id3" },
    { "source": "id2", "target": "id4" }
  ]
}`,
  `{
  "nodes": [
    { "id": "id1", "name": "name1", "val": 1 },
    { "id": "id2", "name": "name2", "val": 10 },
    { "id": "id3", "name": "name3", "val": 4 },
    { "id": "id4", "name": "name4", "val": 2 },
    { "id": "id5", "name": "name5", "val": 6 },
    { "id": "id6", "name": "name6", "val": 1 }
  ],
  "links": [
    { "source": "id1", "target": "id2" },
    { "source": "id2", "target": "id3" },
    { "source": "id2", "target": "id4" },
    { "source": "id4", "target": "id5" },
    { "source": "id5", "target": "id6" },
    { "source": "id6", "target": "id1" }
  ]
}`,
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the JSON: each valid change is handed to graphData. Nodes need an id; links point at ids with source and target; val sets the area.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .nodeAutoColorBy('id')
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.3)')
    // Name next to each node, so the parsed result can be read against the text.
    .nodeCanvasObjectMode(() => 'after')
    .nodeCanvasObject((n, c, scale) => {
      c.font = `${(stage.preview ? 9 : 11) / scale}px sans-serif`;
      c.textAlign = 'center';
      c.fillStyle = '#333';
      c.fillText(String(n.name ?? n.id), n.x ?? 0, (n.y ?? 0) + Math.sqrt(n.val ?? 1) * 4 + 9 / scale);
    })
    .cooldownTime(2000)
    .onEngineStop(() => graph.zoomToFit(300, 30));

  const parse = (text: string): { nodes: GNode[]; links: GLink[] } => {
    const data = JSON.parse(text) as { nodes?: unknown; links?: unknown };
    if (!Array.isArray(data.nodes) || !Array.isArray(data.links)) throw new Error('needs "nodes" and "links" arrays');
    return data as { nodes: GNode[]; links: GLink[] };
  };

  if (stage.bar) {
    const area = document.createElement('textarea');
    area.value = SAMPLES[0]!;
    area.spellcheck = false;
    area.rows = 14;
    area.style.cssText = 'width:min(100%,720px);font:12px/1.4 ui-monospace,monospace;background:var(--bg-2, #111);color:inherit;border:1px solid #444;border-radius:6px;padding:8px';
    stage.box.insertBefore(area, stage.bar);
    const note = readout(stage.bar, '');
    const apply = (): void => {
      try {
        const data = parse(area.value);
        graph.graphData(data);
        note.textContent = `${data.nodes.length} nodes, ${data.links.length} links`;
      } catch (err) {
        // A broken draft keeps the last good graph on screen.
        note.textContent = `not applied: ${(err as Error).message}`;
      }
    };
    area.addEventListener('input', apply);
    apply();
  } else {
    let i = 0;
    const next = (): void => {
      graph.graphData(parse(SAMPLES[i++ % SAMPLES.length]!));
    };
    next();
    stage.every(4500, next);
  }

  return stage.dispose;
};

export default mount;

// Data input: nodeId tells the graph which node field the links' source and target refer to
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

type Node = { id?: string | number; key?: string; label?: string; x?: number };
type Link = { source: string | Node; target: string | Node };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No node has an id field: they have key, and the links point at those keys.' });
  const log = stage.bar && readout(stage.bar);

  let n = 3;
  const nodes: Node[] = [{ key: 'k0', label: 'zero' }, { key: 'k1', label: 'one' }, { key: 'k2', label: 'two' }];
  const links: Link[] = [{ source: 'k0', target: 'k1' }, { source: 'k1', target: 'k2' }];

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, Link>)
    .nodeId('key')
    .nodeLabel((d) => `${d.label} (${d.key})`)
    .graphData({ nodes, links });

  const grow = (): void => {
    const cur = graph.graphData();
    const key = `k${n}`;
    const parent = cur.nodes[(n * 7) % cur.nodes.length]!.key!;
    graph.graphData({
      nodes: [...cur.nodes, { key, label: `node ${n}` }],
      links: [...cur.links, { source: key, target: parent }],
    });
    n++;
    if (log) log.textContent = `${cur.nodes.length + 1} nodes keyed by key; newest: ${key}`;
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    stage.every(600, () => {
      if (n > 40) {
        n = 3;
        graph.graphData({ nodes: nodes.map((d) => ({ key: d.key, label: d.label })), links: links.map((l) => ({ source: l.source as string, target: l.target as string })) });
      } else grow();
      stage.after(300, () => cam.fit(15));
    });
  } else {
    for (let i = 0; i < 12; i++) grow();
    fitOnce(graph);
  }

  if (stage.bar) button(stage.bar, 'Add a node', grow);

  return stage.dispose;
};

export default mount;

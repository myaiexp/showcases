// Data input: linkSource('from') and linkTarget('to') read links that are not shaped { source, target }
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { team, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

interface Edge {
  from?: string;
  to?: string;
  name?: string;
  source?: string | number | TNode;
  target?: string | number | TNode;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Links are written { from, to }: the graph is told which fields to read.' });
  const log = stage.bar && readout(stage.bar);

  const base = team();
  const edges: Edge[] = base.links.map((l) => ({ from: String(l.source), to: String(l.target), name: String((l as { name?: string }).name) }));

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, Edge>)
    .linkSource('from')
    .linkTarget('to')
    .graphData({ nodes: base.nodes as TNode[], links: edges })
    .nodeLabel('name')
    .linkLabel('name')
    .linkWidth(1);

  if (log) {
    // The graph keeps from/to as they are and also fills source/target with the node objects it resolved.
    stage.after(400, () => {
      const e = edges[0]!;
      log.textContent = `{ from: "${e.from}", to: "${e.to}" }  ->  source is ${typeof e.source === 'object' ? `the node object "${(e.source as TNode).name}"` : 'not set yet'}`;
    });
  }

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
  } else {
    fitOnce(graph);
  }

  return stage.dispose;
};

export default mount;

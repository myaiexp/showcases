// Node styling: nodeAutoColorBy assigns one colour per distinct value of a field or function
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const MODES = ['attribute: group', 'function: val > 2', 'function: first digit of id'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each distinct value gets its own colour; nodes that already have one keep it.' });
  const data = clusters(4, stage.preview ? 7 : 10) as TData;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeOpacity(0.95)
    .nodeAutoColorBy('group');
  const use = (mode: (typeof MODES)[number]): void => {
    // The colour lands on the node (node.color) and wins from then on: clear it to recolour.
    for (const n of data.nodes) delete n.color;
    if (mode === MODES[0]) graph.nodeAutoColorBy('group');
    else if (mode === MODES[1]) graph.nodeAutoColorBy((n) => ((n.val ?? 0) > 2 ? 'big' : 'small'));
    else graph.nodeAutoColorBy((n) => String(n.id).charAt(0));
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(1800, () => use(MODES[++i % MODES.length]!));
  }

  if (stage.bar) select(stage.bar, 'nodeAutoColorBy', MODES, use);

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;

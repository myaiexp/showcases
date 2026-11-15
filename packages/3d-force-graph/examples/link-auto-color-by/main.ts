// Link styling: linkAutoColorBy assigns one colour per distinct value of a field or function
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { endId, team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const MODES = ['attribute: name', 'function: source team', 'function: value'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each distinct value gets a colour; links that already have one keep it.' });
  const data = team() as TData;
  const groupOf = new Map(data.nodes.map((n) => [n.id, n.group!]));

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor(() => '#c0caf5')
    .linkWidth(1.2)
    .linkOpacity(0.85)
    .linkAutoColorBy('name');
  const use = (mode: (typeof MODES)[number]): void => {
    // The colour is written to link.color and wins from then on: clear it to regroup.
    for (const l of data.links) delete l.color;
    if (mode === MODES[0]) graph.linkAutoColorBy('name');
    else if (mode === MODES[1]) graph.linkAutoColorBy((l) => `team ${groupOf.get(endId(l.source))}`);
    else graph.linkAutoColorBy((l) => `value ${l.value}`);
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(1800, () => use(MODES[++i % MODES.length]!));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) select(stage.bar, 'linkAutoColorBy', MODES, use);

  return stage.dispose;
};

export default mount;

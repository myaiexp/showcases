// Node styling: nodeColor as an attribute name or as a function of the node
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { degrees, team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const MODES = ['attribute: color', 'function: by team', 'function: by links'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same nodes, coloured three ways.' });
  const data = team() as TData;
  const deg = degrees(data);
  const teamColors = ['#7aa2f7', '#ff9e64', '#9ece6a'];
  // The attribute form: the data itself carries the colour.
  for (const n of data.nodes) n.color = `hsl(${(String(n.id).charCodeAt(0) * 37) % 360}, 80%, 62%)`;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeOpacity(0.9)
    .nodeLabel('name')
    .nodeColor('color');
  const use = (mode: (typeof MODES)[number]): void => {
    if (mode === MODES[0]) graph.nodeColor('color');
    else if (mode === MODES[1]) graph.nodeColor((n) => teamColors[n.group! - 1]!);
    else graph.nodeColor((n) => `hsl(${200 - (deg.get(n.id) ?? 0) * 30}, 85%, 60%)`);
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(1600, () => use(MODES[++i % MODES.length]!));
  }

  if (stage.bar) select(stage.bar, 'nodeColor', MODES, use);

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;

// Link styling: linkColor as an attribute name or as a function of the link
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { endId, team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const MODES = ['attribute: color', 'function: by type', 'function: by source team'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same links, coloured three ways.' });
  const data = team() as TData;
  const groupOf = new Map(data.nodes.map((n) => [n.id, n.group!]));
  const typeColors: Record<string, string> = { 'pairs with': '#7aa2f7', mentors: '#ff9e64', reviews: '#9ece6a', 'reports to': '#f7768e' };
  const teamColors = ['#7aa2f7', '#ff9e64', '#9ece6a'];
  // The attribute form: the data carries the colour.
  data.links.forEach((l, i) => (l.color = `hsl(${(i * 47) % 360}, 80%, 65%)`));

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor(() => '#c0caf5')
    .linkWidth(1.2)
    .linkOpacity(0.8)
    .linkColor('color');
  const use = (mode: (typeof MODES)[number]): void => {
    if (mode === MODES[0]) graph.linkColor('color');
    else if (mode === MODES[1]) graph.linkColor((l) => typeColors[l.name!]!);
    else graph.linkColor((l) => teamColors[groupOf.get(endId(l.source))! - 1]!);
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(1600, () => use(MODES[++i % MODES.length]!));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) select(stage.bar, 'linkColor', MODES, use);

  return stage.dispose;
};

export default mount;

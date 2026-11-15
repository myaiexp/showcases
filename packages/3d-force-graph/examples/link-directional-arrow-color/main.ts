// Link styling: linkDirectionalArrowColor colours the arrow heads independently of the links
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const MODES = ['function: by type', 'function: by value', 'follow link colour'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The links are one grey; the arrows carry the colour.' });
  const typeColors: Record<string, string> = { 'pairs with': '#7aa2f7', mentors: '#ff9e64', reviews: '#9ece6a', 'reports to': '#f7768e' };
  const valueColors = ['#7dcfff', '#9ece6a', '#e0af68', '#f7768e'];

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeVal(2)
    .linkColor(() => '#8890b0')
    .linkOpacity(0.6)
    .linkDirectionalArrowLength(12)
    .linkDirectionalArrowColor((l) => typeColors[l.name!]!);
  const use = (mode: (typeof MODES)[number]): void => {
    if (mode === MODES[0]) graph.linkDirectionalArrowColor((l) => typeColors[l.name!]!);
    else if (mode === MODES[1]) graph.linkDirectionalArrowColor((l) => valueColors[(l.value ?? 1) - 1]!);
    else graph.linkDirectionalArrowColor(graph.linkColor());
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(1600, () => use(MODES[++i % MODES.length]!));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) select(stage.bar, 'arrow colour', MODES, use);

  return stage.dispose;
};

export default mount;

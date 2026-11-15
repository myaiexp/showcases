// Link styling: linkDirectionalArrowLength puts an arrow head on each link, pointing source to target
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Arrows point from each link\'s source to its target. 0 hides them.' });
  let length = 10;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeVal(2)
    .linkColor(() => '#c0caf5')
    .linkDirectionalArrowColor(() => '#ffb454')
    .linkDirectionalArrowLength(() => length);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.every(120, () => {
      length = 9 + 6 * Math.sin(performance.now() / 700);
      graph.linkDirectionalArrowLength(() => length);
    });
  } else {
    fitOnce(graph);
  }

  if (stage.bar) {
    slider(stage.bar, 'arrow length', 0, 24, 1, length, (v) => {
      length = v;
      graph.linkDirectionalArrowLength(() => length);
    });
  }

  return stage.dispose;
};

export default mount;

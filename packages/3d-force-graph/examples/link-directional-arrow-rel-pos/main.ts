// Link styling: linkDirectionalArrowRelPos slides each arrow along its link (0 source end, 1 target end)
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: '0 puts the arrow at the source, 1 at the target.' });
  let pos = 0.5;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeVal(2)
    .linkColor(() => '#8890b0')
    .linkDirectionalArrowLength(12)
    .linkDirectionalArrowColor(() => '#ffb454')
    // Read on every tick: no need to set it again.
    .linkDirectionalArrowRelPos(() => pos);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.loop((_dt, t) => {
      pos = 0.5 + 0.5 * Math.sin(t * 0.9);
    });
  } else {
    fitOnce(graph);
  }

  if (stage.bar) slider(stage.bar, 'arrow position', 0, 1, 0.05, pos, (v) => (pos = v), (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;

// Link styling: linkCurvature bends links into bezier curves; the accessor is read on every tick
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: '0 is straight, 1 about a semicircle, negative bends the other way.' });
  let curvature = 0.3;

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData(randomTree(stage.preview ? 30 : 60, 19))
    .nodeVal(2)
    .linkColor(() => '#bb9af7')
    .linkOpacity(0.8)
    // Read on every tick, so changing the variable is enough.
    .linkCurvature(() => curvature);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.loop((_dt, t) => {
      curvature = 0.6 * Math.sin(t * 0.9);
    });
  } else {
    fitOnce(graph);
  }

  if (stage.bar) slider(stage.bar, 'linkCurvature', -1.5, 1.5, 0.05, curvature, (v) => (curvature = v), (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;

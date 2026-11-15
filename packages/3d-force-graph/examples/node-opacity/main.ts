// Node styling: nodeOpacity makes the spheres more or less see-through
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'At 1 the spheres are solid; near 0 only the links remain.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData({ ...randomTree(stage.preview ? 30 : 60, 14), })
    .nodeVal(8)
    .linkOpacity(0.5)
    .nodeOpacity(0.75);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.every(120, () => {
      graph.nodeOpacity(0.5 + 0.5 * Math.sin(performance.now() / 600));
    });
  }

  if (stage.bar) slider(stage.bar, 'nodeOpacity', 0, 1, 0.05, 0.75, (v) => graph.nodeOpacity(v), (v) => v.toFixed(2));

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;

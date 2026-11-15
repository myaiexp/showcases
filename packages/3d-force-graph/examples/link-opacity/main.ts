// Link styling: linkOpacity fades the links in and out
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The default opacity is 0.2.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData(randomTree(stage.preview ? 40 : 80, 24))
    .nodeVal(2)
    .linkColor(() => '#ffffff')
    .linkWidth(1)
    .linkOpacity(0.2);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.every(120, () => graph.linkOpacity(0.5 + 0.5 * Math.sin(performance.now() / 600)));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) slider(stage.bar, 'linkOpacity', 0, 1, 0.05, 0.2, (v) => graph.linkOpacity(v), (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;

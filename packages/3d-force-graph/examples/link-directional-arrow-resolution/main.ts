// Link styling: linkDirectionalArrowResolution sets the faces of each arrow cone
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Big arrows, close up. The default is 8 segments.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData(randomTree(5, 6))
    .nodeVal(1)
    .linkColor(() => '#8890b0')
    .linkDirectionalArrowLength(24)
    .linkDirectionalArrowColor(() => '#ffb454')
    .linkDirectionalArrowResolution(8);
  graph.cooldownTime(2000).onEngineStop(() => graph.zoomToFit(300, 10));

  if (stage.preview) {
    const steps = [3, 4, 6, 8, 16, 32];
    let i = 0;
    stage.every(1100, () => graph.linkDirectionalArrowResolution(steps[++i % steps.length]!));
  }

  if (stage.bar) slider(stage.bar, 'arrow resolution', 3, 32, 1, 8, (v) => graph.linkDirectionalArrowResolution(v));

  return stage.dispose;
};

export default mount;

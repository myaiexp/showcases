// Link styling: linkResolution sets the radial segments of link cylinders, from a triangular bar to a smooth tube
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fat links, close up. The default is 6 segments.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData(randomTree(5, 3))
    .nodeVal(1)
    .linkColor(() => '#9ece6a')
    .linkOpacity(1)
    .linkWidth(9)
    .linkResolution(6);
  graph.cooldownTime(2000).onEngineStop(() => graph.zoomToFit(300, 10));

  if (stage.preview) {
    const steps = [3, 4, 6, 12, 24];
    let i = 0;
    stage.every(1100, () => graph.linkResolution(steps[++i % steps.length]!));
  }

  if (stage.bar) slider(stage.bar, 'linkResolution', 3, 32, 1, 6, (v) => graph.linkResolution(v));

  return stage.dispose;
};

export default mount;

// Link styling: linkDirectionalParticleResolution sets the segments of each particle sphere
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Large particles, close up. The default is 4 segments.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData(randomTree(5, 9))
    .nodeVal(1)
    .linkColor(() => '#6a7090')
    .linkDirectionalParticles(1)
    .linkDirectionalParticleSpeed(0.004)
    .linkDirectionalParticleWidth(12)
    .linkDirectionalParticleColor(() => '#ffb454')
    .linkDirectionalParticleResolution(4);
  graph.cooldownTime(2000).onEngineStop(() => graph.zoomToFit(300, 10));

  if (stage.preview) {
    const steps = [3, 4, 6, 10, 24];
    let i = 0;
    stage.every(1100, () => graph.linkDirectionalParticleResolution(steps[++i % steps.length]!));
  }

  if (stage.bar) slider(stage.bar, 'particle resolution', 3, 32, 1, 4, (v) => graph.linkDirectionalParticleResolution(v));

  return stage.dispose;
};

export default mount;

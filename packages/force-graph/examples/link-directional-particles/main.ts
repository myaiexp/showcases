// Link styling: linkDirectionalParticles sends dots along each link, source to target
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Particles travel from each link\'s source to its target.' });

  let count = 2;
  let speed = 0.01;
  const graph = stage.own(new ForceGraph(stage.container))
    .graphData(randomTree(stage.preview ? 30 : 60, 7))
    .linkDirectionalParticles(() => count)
    .linkDirectionalParticleSpeed(() => speed)
    .linkDirectionalParticleWidth(3)
    .linkDirectionalParticleColor(() => '#e4572e');

  if (stage.preview) graph.cooldownTime(3000).onEngineStop(() => graph.zoomToFit(400, 10));

  if (stage.bar) {
    // The particle count is read when the prop is set, so set the accessor again.
    slider(stage.bar, 'particles', 0, 8, 1, count, (v) => {
      count = v;
      graph.linkDirectionalParticles(() => count);
    });
    slider(stage.bar, 'speed', 0.002, 0.05, 0.002, speed, (v) => {
      speed = v;
    }, (v) => v.toFixed(3));
  }

  return stage.dispose;
};

export default mount;

// Link styling: linkDirectionalParticleSpeed per link, here proportional to the link's value
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Value 1 links are slow, value 4 links are four times as fast.' });
  let scale = 0.004;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeVal(2)
    .linkColor(() => '#6a7090')
    .linkOpacity(0.4)
    .linkDirectionalParticles(2)
    .linkDirectionalParticleWidth(3.5)
    .linkDirectionalParticleColor(() => '#ffb454')
    // Read on every tick, so changing `scale` is enough.
    .linkDirectionalParticleSpeed((l) => (l.value ?? 1) * scale);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) slider(stage.bar, 'speed per value', 0, 0.01, 0.0005, scale, (v) => (scale = v), (v) => v.toFixed(4));

  return stage.dispose;
};

export default mount;

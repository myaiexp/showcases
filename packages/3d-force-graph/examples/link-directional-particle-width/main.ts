// Link styling: linkDirectionalParticleWidth sets the size of the travelling particles
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Width is in scene units; here it is the slider times the link value.' });
  let width = 3;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeVal(2)
    .linkColor(() => '#6a7090')
    .linkOpacity(0.4)
    .linkDirectionalParticles(2)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleColor(() => '#ffb454')
    .linkDirectionalParticleWidth((l) => width * (0.5 + (l.value ?? 1) / 4));
  const apply = (v: number): void => {
    width = v;
    graph.linkDirectionalParticleWidth(graph.linkDirectionalParticleWidth());
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.every(250, () => apply(4 + 2.5 * Math.sin(performance.now() / 700)));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) slider(stage.bar, 'width', 1, 10, 0.5, width, apply, (v) => v.toFixed(1));

  return stage.dispose;
};

export default mount;

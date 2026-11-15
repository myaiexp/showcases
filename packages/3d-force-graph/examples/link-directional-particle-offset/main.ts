// Link styling: linkDirectionalParticleOffset staggers the particles between links
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One particle per link: with no stagger they travel in step.' });
  let stagger = 1;
  const data = team() as TData;
  const slot = new Map(data.links.map((l, i) => [l, (i * 0.37) % 1]));

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeVal(2)
    .linkColor(() => '#6a7090')
    .linkOpacity(0.4)
    .linkDirectionalParticles(1)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleWidth(4)
    .linkDirectionalParticleColor(() => '#ffb454')
    .linkDirectionalParticleOffset((l) => (slot.get(l) ?? 0) * stagger);
  const apply = (v: number): void => {
    stagger = v;
    // A particle reads its offset once, when it is first moved: only new particles see a change.
    // Drop all particles, then bring them back on the next digest.
    graph.linkDirectionalParticles(0);
    stage.after(60, () => graph.linkDirectionalParticles(1));
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(2200, () => apply(i++ % 2 ? 1 : 0));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) slider(stage.bar, 'stagger', 0, 1, 0.1, stagger, apply, (v) => v.toFixed(1));

  return stage.dispose;
};

export default mount;

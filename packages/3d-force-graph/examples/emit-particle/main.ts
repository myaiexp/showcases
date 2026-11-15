// Link styling: emitParticle sends a single particle along a link, here on a click
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a link to send one particle from its source to its target.' });
  const data = team() as TData;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeVal(2)
    .linkWidth(1.2)
    .linkColor(() => '#6a7090')
    .linkOpacity(0.6)
    .linkLabel('name')
    // These style the emitted particles too.
    .linkDirectionalParticleSpeed(0.015)
    .linkDirectionalParticleWidth(4)
    .linkDirectionalParticleColor(() => '#ffb454')
    .onLinkClick((link) => graph.emitParticle(link));

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(350, () => graph.emitParticle(data.links[(i += 5) % data.links.length]!));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) button(stage.bar, 'Emit on every link', () => data.links.forEach((l) => graph.emitParticle(l)));

  return stage.dispose;
};

export default mount;

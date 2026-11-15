// Link styling: linkDirectionalParticleOffset sets where along the link a particle starts, so starts can be staggered
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One particle per link. With no offset they all leave together; staggered, each link starts at its own point.' });
  const data = network(3, stage.preview ? 6 : 10);
  const index = new Map<NetworkLink, number>(data.links.map((l, i) => [l, i]));
  let spread = 0;

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(data)
    .nodeColor(() => '#9aa3ad')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .linkDirectionalParticleWidth(5)
    .linkDirectionalParticleColor(() => '#e4572e')
    .linkDirectionalParticleSpeed(0.005);
  const apply = (v: number): void => {
    spread = v;
    graph.linkDirectionalParticleOffset((l) => (((index.get(l) ?? 0) % 6) / 6) * spread);
    // The offset is only used when a particle is created: setting the count creates them again.
    graph.linkDirectionalParticles(1);
  };
  apply(0);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let on = false;
    stage.after(2800, () => stage.every(2600, () => apply((on = !on) ? 1 : 0)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    slider(stage.bar, 'offset spread', 0, 1, 0.1, spread, apply, (v) => v.toFixed(1));
  }

  return stage.dispose;
};

export default mount;

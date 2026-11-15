// Link styling: linkDirectionalParticleSpeed from a link attribute, as a share of the link length per frame
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each link\'s particles move at a speed taken from its value (1 slow, 5 fast).' });
  let scale = 0.0025;

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(3, stage.preview ? 6 : 10))
    .nodeColor(() => '#9aa3ad')
    .linkColor((l) => KIND_COLOR[l.type])
    .linkWidth(1.5)
    .linkLabel((l) => `value ${l.value}`)
    .linkDirectionalParticles(2)
    .linkDirectionalParticleWidth(4)
    // The speed accessor is read every frame, so a changed multiplier takes effect at once.
    .linkDirectionalParticleSpeed((l) => l.value * scale);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    slider(stage.bar, 'speed per value', 0.0005, 0.006, 0.0005, scale, (v) => {
      scale = v;
    }, (v) => v.toFixed(4));
  }

  return stage.dispose;
};

export default mount;

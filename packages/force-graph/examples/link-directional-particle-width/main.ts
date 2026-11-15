// Link styling: linkDirectionalParticleWidth is the particle diameter, constant or taken from the link
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['constant', 'by value'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The width is a diameter in pixels: one number for every link, or a function of the link.' });
  let mode: (typeof MODES)[number] = 'constant';
  let px = 6;

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(3, stage.preview ? 6 : 10))
    .nodeColor(() => '#9aa3ad')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .linkDirectionalParticles(2)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleColor(() => '#3d5a80');
  const apply = (): void => {
    graph.linkDirectionalParticleWidth(mode === 'constant' ? px : (l) => l.value * 2);
  };
  apply();

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    // Breathe a constant width, then switch to widths by value.
    stage.after(2800, () => stage.every(500, () => {
      const t = performance.now() / 1000;
      mode = Math.floor(t / 4) % 2 ? 'by value' : 'constant';
      px = 6 + 4 * Math.sin(t * 2.5);
      apply();
    }));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'width', MODES, (m) => {
      mode = m;
      apply();
    });
    slider(stage.bar, 'constant width', 1, 14, 1, px, (v) => {
      px = v;
      apply();
    }, (v) => `${v}px`);
  }

  return stage.dispose;
};

export default mount;

// Link styling: emitParticle sends a single particle down one link, on demand
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a link to send one particle from its source to its target.' });
  const data = network(3, stage.preview ? 6 : 10);
  const log = stage.bar && readout(stage.bar, 'Click a link');
  let hovered: NetworkLink | null = null;

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkWidth((l) => (l === hovered ? 4 : 2))
    .linkColor((l) => (l === hovered ? 'rgba(228,87,46,0.6)' : 'rgba(0,0,0,0.25)'))
    .linkHoverPrecision(8)
    .linkDirectionalParticleWidth(7)
    .linkDirectionalParticleColor(() => '#e4572e')
    .linkDirectionalParticleSpeed(0.012)
    .linkLabel((l) => l.name)
    .onLinkHover((l) => {
      hovered = l;
    })
    .onLinkClick((l) => {
      graph.emitParticle(l);
      if (log) log.textContent = `emitParticle(${l.name})`;
    })
    .autoPauseRedraw(false);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    // No pointer in a card: emit on random links on a timer.
    stage.after(2800, () => stage.every(450, () => {
      const l = data.links[Math.floor(Math.random() * data.links.length)];
      if (l) graph.emitParticle(l);
    }));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    button(stage.bar, 'Emit on every link', () => data.links.forEach((l) => graph.emitParticle(l)));
  }

  return stage.dispose;
};

export default mount;

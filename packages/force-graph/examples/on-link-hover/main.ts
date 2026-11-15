// Interaction: onLinkHover gives the hovered link particles and a thicker line
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { linkTour } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a link: it widens and sends particles from source to target.' });
  const data = network(3, stage.preview ? 6 : 9) as { nodes: Node[]; links: NetworkLink[] };
  let hovered: NetworkLink | null = null;

  const graph = stage.own(new ForceGraph<Node, NetworkLink>(stage.container))
    .graphData(data)
    .nodeColor(() => '#9aa3ad')
    .linkLabel('name')
    .linkColor((l) => (l === hovered ? KIND_COLOR[l.type] : 'rgba(0,0,0,0.25)'))
    .linkWidth((l) => (l === hovered ? 4 : 1.5))
    .linkDirectionalParticles((l) => (l === hovered ? 4 : 0))
    .linkDirectionalParticleWidth(4)
    .linkDirectionalParticleSpeed(0.01)
    .autoPauseRedraw(false)
    .onLinkHover((l) => {
      hovered = l;
      // Particle counts are read when the prop is set, so set it again for the new hover.
      graph.linkDirectionalParticles(graph.linkDirectionalParticles());
      say(l ? `hovering ${l.name}` : 'Hover a link');
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 20));
  const say = status(stage, 'Hover a link');

  if (stage.preview) linkTour(stage, stage.ghost(graph), () => data.links.filter((_, i) => i % 4 === 1));

  return stage.dispose;
};

export default mount;

// Link styling: linkLabel is the tooltip shown when the pointer is over a link
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { linkTour } from '../../shared/tour.ts';

type End = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a link (not a node): its tooltip is built from the link\'s own attributes.' });
  const data = network(3, stage.preview ? 6 : 10);

  let hovered: NetworkLink | null = null;
  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(data)
    .nodeLabel(() => '')
    .nodeColor(() => '#9aa3ad')
    .linkLabel((l) => {
      const a = l.source as unknown as End;
      const b = l.target as unknown as End;
      return `<b>${l.name}</b><br/>${a.name} to ${b.name}<br/>capacity ${l.value}`;
    })
    .linkColor((l) => (l === hovered ? '#e4572e' : 'rgba(0,0,0,0.3)'))
    .linkWidth((l) => (l === hovered ? 3 : 1.5))
    .onLinkHover((l) => {
      hovered = l;
    })
    .autoPauseRedraw(false);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    linkTour(stage, stage.ghost(graph), () => [3, 8, 12, 5, 10].map((i) => data.links[i]), { every: 2000 });
  } else {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
  }

  return stage.dispose;
};

export default mount;

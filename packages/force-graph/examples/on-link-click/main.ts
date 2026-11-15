// Interaction: onLinkClick selects a link: it is drawn thicker and in colour, with its label in the status line
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { linkMid, script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a link to select it. Click empty space to clear.' });
  const data = network(3, stage.preview ? 6 : 9);
  let selected: NetworkLink | null = null;

  const graph = stage.own(new ForceGraph<Node, NetworkLink>(stage.container))
    .graphData(data as { nodes: Node[]; links: NetworkLink[] })
    .nodeColor(() => '#9aa3ad')
    .linkLabel('name')
    .linkColor((l) => (l === selected ? KIND_COLOR[l.type] : 'rgba(0,0,0,0.25)'))
    .linkWidth((l) => (l === selected ? 5 : 1.5))
    .autoPauseRedraw(false)
    .onLinkClick((l) => {
      selected = l;
      say(`selected ${l.name} (${l.type})`);
    })
    .onBackgroundClick(() => {
      selected = null;
      say('no link selected');
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 20));
  const say = status(stage, 'Click a link');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    let i = 0;
    script(stage, async (wait) => {
      const mid = linkMid(data.links[(i++ * 5) % data.links.length]);
      if (mid) {
        ghost.at(mid.x, mid.y);
        await wait(1100);
        ghost.click();
      }
      await wait(1800);
    });
  }

  return stage.dispose;
};

export default mount;

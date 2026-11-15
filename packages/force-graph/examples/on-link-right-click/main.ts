// Interaction: onLinkRightClick removes the clicked link by setting graphData without it
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { linkMid, script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Right-click a link to delete it. The nodes it held together drift apart.' });
  const fresh = (): { nodes: Node[]; links: NetworkLink[] } => network(2, stage.preview ? 6 : 9) as { nodes: Node[]; links: NetworkLink[] };
  let data = fresh();

  const graph = stage.own(new ForceGraph<Node, NetworkLink>(stage.container))
    .graphData(data)
    .nodeColor(() => '#9aa3ad')
    .linkLabel('name')
    .linkColor((l) => KIND_COLOR[l.type])
    .linkWidth(2)
    .cooldownTime(2500)
    .onLinkRightClick((link) => {
      // Node objects stay, so the layout continues from where it is.
      data = { nodes: data.nodes, links: data.links.filter((l) => l !== link) };
      graph.graphData(data);
      say(`removed ${link.name}: ${data.links.length} links left`);
    })
    .onEngineStop(() => graph.zoomToFit(300, 20));
  const say = status(stage, 'Right-click a link');
  const reset = (): void => {
    data = fresh();
    graph.graphData(data);
    say(`${data.links.length} links`);
  };

  if (stage.bar) {
    button(stage.bar, 'restore all links', reset);
  } else {
    const ghost = stage.ghost(graph);
    let i = 0;
    script(stage, async (wait) => {
      if (data.links.length <= 6) {
        reset();
        await wait(3000);
        return;
      }
      const mid = linkMid(data.links[(i++ * 3) % data.links.length]);
      if (mid) {
        ghost.at(mid.x, mid.y);
        await wait(1100);
        ghost.click(2);
      }
      await wait(1900);
    });
  }

  return stage.dispose;
};

export default mount;

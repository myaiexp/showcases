// Interaction: onNodeRightClick pins a node where it is (fx, fy) and unpins it on the next right-click
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Right-click a node to pin it with a ring; right-click again to let it go. Pinned nodes ignore the forces.' });
  const data = clusters(3, stage.preview ? 7 : 11);

  const pinned = (n: GNode): boolean => n.fx !== undefined;
  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .autoPauseRedraw(false)
    .nodeCanvasObjectMode((n) => (pinned(n) ? 'after' : undefined))
    .nodeCanvasObject((n, c, scale) => {
      c.beginPath();
      c.arc(n.x ?? 0, n.y ?? 0, Math.sqrt(n.val ?? 1) * 4 + 2.5, 0, 2 * Math.PI);
      c.strokeStyle = '#111';
      c.lineWidth = 1.5 / scale;
      c.stroke();
    })
    .onNodeRightClick((n) => {
      if (pinned(n)) {
        n.fx = undefined;
        n.fy = undefined;
      } else {
        n.fx = n.x;
        n.fy = n.y;
      }
      say(`${n.name}: ${pinned(n) ? 'pinned' : 'released'}`);
      graph.d3ReheatSimulation();
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 20));
  const say = status(stage, 'Right-click a node');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    const nodes = data.nodes as GNode[];
    let i = 0;
    script(stage, async (wait) => {
      // Pin four nodes one by one, then release them in the same order.
      const n = nodes[((i++ % 8) % 4) * 5 % nodes.length]!;
      ghost.node(n);
      await wait(1100);
      ghost.click(2);
      await wait(1000);
      graph.zoomToFit(300, 20);
    });
  }

  return stage.dispose;
};

export default mount;

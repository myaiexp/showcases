// Interaction: pin nodes after dragging: set fx and fy in onNodeDragEnd, and clear them on a click
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a node and let go: it stays (the ring). Click a pinned node to release it.' });
  const data = clusters(3, stage.preview ? 6 : 10);
  const pinned = (n: GNode): boolean => n.fx !== undefined;
  const count = (): number => data.nodes.filter((n) => pinned(n as GNode)).length;

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
    // Dragging sets fx/fy while it lasts and clears them on release; set them again to keep the node.
    .onNodeDragEnd((n) => {
      n.fx = n.x;
      n.fy = n.y;
      say(`${n.name} pinned (${count()} pinned)`);
    })
    .onNodeClick((n) => {
      if (!pinned(n)) return;
      n.fx = undefined;
      n.fy = undefined;
      graph.d3ReheatSimulation();
      say(`${n.name} released (${count()} pinned)`);
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  const say = status(stage, '0 pinned');

  if (stage.bar) {
    button(stage.bar, 'release all', () => {
      for (const n of data.nodes as GNode[]) {
        n.fx = undefined;
        n.fy = undefined;
      }
      graph.d3ReheatSimulation();
      say('0 pinned');
    });
  } else {
    const ghost = stage.ghost(graph);
    const hubs = data.nodes.filter((n) => String(n.id).endsWith('-0')) as GNode[];
    let i = 0;
    script(stage, async (wait) => {
      const hub = hubs[i % hubs.length]!;
      if (i++ % 4 === 3) {
        // Every fourth round, click a pinned hub to let it go.
        const held = hubs.find(pinned);
        if (held) {
          ghost.node(held);
          await wait(1100);
          ghost.click();
          await wait(1600);
        }
        return;
      }
      await ghost.drag(hub, i % 2 ? 36 : -36, 22, 900);
      await wait(1800);
      graph.zoomToFit(400, 30);
    });
  }

  return stage.dispose;
};

export default mount;

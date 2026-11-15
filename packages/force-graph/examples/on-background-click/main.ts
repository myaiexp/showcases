// Interaction: onBackgroundClick and onBackgroundRightClick fire for empty space: clear the selection, reset the zoom
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node to select it, click empty space to clear. Right-click empty space to fit the view.' });
  const data = clusters(3, stage.preview ? 7 : 11);
  let selected: GNode | null = null;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .nodeCanvasObjectMode((n) => (n === selected ? 'after' : undefined))
    .nodeCanvasObject((n, c, scale) => {
      c.beginPath();
      c.arc(n.x ?? 0, n.y ?? 0, Math.sqrt(n.val ?? 1) * 4 + 3, 0, 2 * Math.PI);
      c.strokeStyle = '#e4572e';
      c.lineWidth = 2 / scale;
      c.stroke();
    })
    .autoPauseRedraw(false)
    .onNodeClick((n) => {
      selected = n;
      say(`selected ${n.name}`);
    })
    // Handlers for empty space also make the canvas ignore clicks that end a pan.
    .onBackgroundClick(() => {
      selected = null;
      say('selection cleared');
    })
    .onBackgroundRightClick(() => {
      graph.zoomToFit(500, 20);
      say('onBackgroundRightClick: zoomToFit');
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 20));
  const say = status(stage, 'Click a node');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    const nodes = data.nodes as GNode[];
    let i = 0;
    script(stage, async (wait) => {
      const n = nodes[(i++ * 5) % nodes.length]!;
      ghost.node(n);
      await wait(1100);
      ghost.click();
      await wait(1200);
      ghost.px(5, 5);
      await wait(1100);
      ghost.click();
      await wait(1000);
      if (i % 2 === 0) {
        graph.zoom(3, 300);
        await wait(700);
        ghost.click(2);
        await wait(1000);
      }
    });
  }

  return stage.dispose;
};

export default mount;

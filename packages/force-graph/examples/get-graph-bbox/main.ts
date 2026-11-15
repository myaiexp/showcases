// Utility: getGraphBbox returns {x: [min, max], y: [min, max]} of the nodes: drawn here as a frame in onRenderFramePost
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { scramble } from '../../shared/shake.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed frame is getGraphBbox() read every frame: it hugs the outermost nodes, including their radius.' });
  let show = true;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 11))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .autoPauseRedraw(false)
    .cooldownTime(2500)
    .onRenderFramePost((c, scale) => {
      const box = graph.getGraphBbox();
      if (!box || !show) return;
      const [x0, x1] = box.x;
      const [y0, y1] = box.y;
      c.setLineDash([5 / scale, 4 / scale]);
      c.strokeStyle = '#e4572e';
      c.lineWidth = 1.5 / scale;
      c.strokeRect(x0, y0, x1 - x0, y1 - y0);
      c.setLineDash([]);
      say(`width ${(x1 - x0).toFixed(0)}  height ${(y1 - y0).toFixed(0)}`);
    });
  keepFitted(graph, 22);
  const say = status(stage);

  const shake = (): void => {
    scramble(graph, 140);
    graph.d3ReheatSimulation();
  };
  if (stage.bar) {
    checkbox(stage.bar, 'draw the box', true, (v) => (show = v));
    button(stage.bar, 'scramble and reheat', shake);
  } else {
    stage.every(4000, shake);
  }

  return stage.dispose;
};

export default mount;

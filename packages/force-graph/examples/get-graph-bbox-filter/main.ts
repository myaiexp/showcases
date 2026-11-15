// Utility: getGraphBbox takes a node filter, so each group gets a box of its own
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, PALETTE, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { scramble } from '../../shared/shake.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One getGraphBbox(n => n.group === g) per group, drawn behind the nodes. The boxes can overlap even when the groups do not.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 11))
    .nodeColor((n) => PALETTE[(n.group ?? 1) - 1]!)
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .autoPauseRedraw(false)
    .cooldownTime(2500)
    .onRenderFramePre((c, scale) => {
      for (const g of [1, 2, 3]) {
        const box = graph.getGraphBbox((n) => n.group === g);
        if (!box) continue;
        c.fillStyle = PALETTE[g - 1]! + '22';
        c.strokeStyle = PALETTE[g - 1]!;
        c.lineWidth = 1.5 / scale;
        c.fillRect(box.x[0], box.y[0], box.x[1] - box.x[0], box.y[1] - box.y[0]);
        c.strokeRect(box.x[0], box.y[0], box.x[1] - box.x[0], box.y[1] - box.y[0]);
      }
    });
  keepFitted(graph, 22);

  const shake = (): void => {
    scramble(graph, 140);
    graph.d3ReheatSimulation();
  };
  if (stage.bar) button(stage.bar, 'scramble and reheat', shake);
  else stage.every(4000, shake);

  return stage.dispose;
};

export default mount;

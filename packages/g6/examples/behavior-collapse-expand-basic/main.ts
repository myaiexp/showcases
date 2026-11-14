// collapse-expand: double-click a combo to fold its children into it and again to open it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simDblClick } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 70, y: 50 } },
            { id: 'node2', combo: 'combo1', style: { x: 140, y: 50 } },
            { id: 'node3', combo: 'combo2', style: { x: 100, y: 130 } },
          ],
          edges: [{ source: 'node2', target: 'node3' }],
          combos: [
            { id: 'combo1', combo: 'combo2', style: { labelText: 'combo1' } },
            { id: 'combo2', style: { labelText: 'combo2' } },
          ],
        },
        behaviors: [{ type: 'collapse-expand', key: 'collapse', animation: true }],
        autoFit: 'view',
        padding: 16,
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Double-click a combo to collapse it, double-click again to expand.';
      toggle(stage.bar, 'animation', true, (animation) => graph.updateBehavior({ key: 'collapse', animation }));
    } else {
      // combo1 sits inside combo2; the same double click folds it and then opens it again.
      stage.every(2200, () => simDblClick(stage, graph, graph.getElementPosition('combo1')));
    }
  });

export default mount;

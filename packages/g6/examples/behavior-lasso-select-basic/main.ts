// lasso-select: hold Shift and draw a free-form loop around the nodes to select
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { clearStates, loop, simDrag } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        behaviors: [{ type: 'lasso-select', key: 'lasso', trigger: stage.preview ? [] : ['shift'] }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Hold Shift and drag a loop around some nodes.';
    else {
      stage.every(3000, async () => {
        await clearStates(graph);
        const [x, y] = cell(1, 1, 64);
        await simDrag(stage, graph, loop(x + 32, y, 55, 45, 18), 55);
      });
    }
  });

export default mount;

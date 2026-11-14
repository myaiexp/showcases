// lasso-select with immediately: true: elements switch state while the loop is drawn
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { clearStates, loop, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 }, custom: { fill: '#eb2f96', size: 30 } } },
        edge: { state: { selected: { stroke: '#ffa940', lineWidth: 3 }, custom: { stroke: '#eb2f96', lineWidth: 3 } } },
        behaviors: [{ type: 'lasso-select', key: 'lasso', trigger: [], immediately: true, enableElements: ['node', 'edge'] }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag a loop with no key held; nodes, and edges between selected nodes, switch state.';
      toggle(stage.bar, 'immediately', true, (immediately) => graph.updateBehavior({ key: 'lasso', immediately }));
      select(stage.bar, 'state', ['selected', 'custom'], 'selected', (state) => graph.updateBehavior({ key: 'lasso', state }));
    } else {
      stage.every(3600, async () => {
        await clearStates(graph);
        const [x, y] = cell(1, 2, 64);
        await simDrag(stage, graph, loop(x - 32, y, 70, 60, 24), 100);
      });
    }
  });

export default mount;

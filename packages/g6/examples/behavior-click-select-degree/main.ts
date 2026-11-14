// click-select degree: how many hops of neighbours share the selection
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simClick, sleep } from '../../shared/behavior-sim.ts';
import { clearStates } from '../../shared/behavior-sim.ts';
import { readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node-1', style: { x: 140, y: 30, fill: '#E4504D', labelText: 'degree 0' } },
            { id: 'node-2-1', style: { x: 190, y: 90, fill: '#FFC40C', labelText: 'degree 1' } },
            { id: 'node-2-2', style: { x: 90, y: 90, fill: '#FFC40C', labelText: 'degree 1' } },
            { id: 'node-3-1', style: { x: 240, y: 150, fill: '#0f0', labelText: 'degree 2' } },
            { id: 'node-3-2', style: { x: 40, y: 150, fill: '#0f0', labelText: 'degree 2' } },
          ],
          edges: [
            { source: 'node-1', target: 'node-2-1' },
            { source: 'node-1', target: 'node-2-2' },
            { source: 'node-2-1', target: 'node-3-1' },
            { source: 'node-2-2', target: 'node-3-2' },
          ],
        },
        node: {
          style: { labelFill: '#ccc', labelFontSize: 11, labelPlacement: 'bottom' },
          state: { selected: { stroke: '#fff', lineWidth: 3 }, inactive: { opacity: 0.25 } },
        },
        edge: { style: { lineWidth: 2 }, state: { selected: { stroke: '#fff' } } },
        behaviors: [{ type: 'click-select', key: 'click', degree: 0, unselectedState: 'inactive' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Click a node. degree 1 adds its neighbours, degree 2 their neighbours.';
      slider(stage.bar, 'degree', [0, 3, 1], 0, (degree) => graph.updateBehavior({ key: 'click', degree }));
    } else {
      stage.every(2400, async (i) => {
        graph.updateBehavior({ key: 'click', degree: (i - 1) % 3 });
        await clearStates(graph);
        await sleep(200);
        await simClick(stage, graph, [140, 30]);
      });
    }
  });

export default mount;

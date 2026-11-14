// brush-select: hold Shift and drag a box to select the nodes inside it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node-1', style: { x: 100, y: 80 } },
            { id: 'node-2', style: { x: 220, y: 80 } },
            { id: 'node-3', style: { x: 160, y: 150 } },
            { id: 'node-4', style: { x: 100, y: 150 } },
          ],
          edges: [
            { source: 'node-1', target: 'node-2' },
            { source: 'node-1', target: 'node-3' },
            { source: 'node-2', target: 'node-3' },
          ],
        },
        behaviors: [{ type: 'brush-select', key: 'brush', trigger: stage.preview ? [] : ['shift'] }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Hold Shift and drag a box over the nodes.';
    } else {
      stage.every(2600, async (i) => {
        if (i % 2 === 0) return graph.setElementState({ 'node-1': [], 'node-2': [], 'node-3': [], 'node-4': [] });
        await simDrag(stage, graph, line([60, 50], [260, 120], 8));
      });
    }
  });

export default mount;

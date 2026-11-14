// drag-canvas: drag empty canvas to pan the whole view
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(6, 4, 55),
        node: { style: { size: 16 } },
        behaviors: ['drag-canvas'],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Drag the empty canvas to pan.';
    else {
      // Start on empty canvas near the corner, drag across, and back on the next tick.
      stage.every(1500, async (i) => {
        const a = graph.getCanvasByViewport(i % 2 ? [190, 180] : [60, 25]);
        const b = graph.getCanvasByViewport(i % 2 ? [60, 100] : [190, 110]);
        await simDrag(stage, graph, line(a, b, 12), 40);
      });
    }
  });

export default mount;

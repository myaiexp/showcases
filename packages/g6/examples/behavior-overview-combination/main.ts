// behaviors: string names and option objects side by side, drag-canvas, zoom-canvas and click-select
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simClick, simDrag, simWheel } from '../../shared/behavior-sim.ts';
import { readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(6, 4, 55),
        node: { style: { size: 16 }, state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        behaviors: [
          // A string takes the defaults; an object takes options and a key to find it by.
          'drag-canvas',
          { type: 'zoom-canvas', sensitivity: 1.5, key: 'zoom-behavior' },
          'click-select',
        ],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag to pan, scroll to zoom, click a node to select it.';
      slider(stage.bar, 'zoom sensitivity', [0.2, 4, 0.1], 1.5, (sensitivity) => graph.updateBehavior({ key: 'zoom-behavior', sensitivity }));
    } else {
      stage.every(900, async (i) => {
        const phase = i % 6;
        if (phase === 0) await simClick(stage, graph, cell(1, 2, 55));
        else if (phase === 1) simWheel(graph, [100, 75], -50);
        else if (phase === 2) await simDrag(stage, graph, line(graph.getCanvasByViewport([40, 175]), graph.getCanvasByViewport([100, 120]), 8), 40);
        else if (phase === 3) await simClick(stage, graph, cell(2, 4, 55));
        else if (phase === 4) simWheel(graph, [100, 75], 50);
        else await simDrag(stage, graph, line(graph.getCanvasByViewport([100, 120]), graph.getCanvasByViewport([40, 175]), 8), 40);
      });
    }
  });

export default mount;

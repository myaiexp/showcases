// drag-canvas range: how many viewport sizes the view may be dragged away from the graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { line, overlay, simDrag } from '../../shared/behavior-sim.ts';
import { readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(6, 4, 55),
        node: { style: { size: 16 } },
        behaviors: [{ type: 'drag-canvas', key: 'drag', range: 0.5 }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag far in one direction: the view stops once it is range viewport sizes from the start.';
      slider(stage.bar, 'range', [0, 3, 0.25], 0.5, (range) => graph.updateBehavior({ key: 'drag', range }));
    } else {
      const say = overlay(stage);
      const ranges = [0.2, 1.5];
      stage.every(2200, async (i) => {
        const range = ranges[Math.floor((i - 1) / 2) % ranges.length]!;
        graph.updateBehavior({ key: 'drag', range });
        say(`range: ${range}`);
        // Far longer than the card: only the first part moves the view when range is small.
        const [a, b] = i % 2 ? [[250, 100], [20, 100]] : [[20, 100], [250, 100]];
        await simDrag(stage, graph, line(graph.getCanvasByViewport(a as [number, number]), graph.getCanvasByViewport(b as [number, number]), 14), 35);
      });
    }
  });

export default mount;

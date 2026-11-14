// drag-element: drag a node to move it, with its edges following
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        behaviors: [{ type: 'drag-element', key: 'drag', animation: true }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag a node: its edges follow.';
      toggle(stage.bar, 'animation', true, (animation) => graph.updateBehavior({ key: 'drag', animation }));
    } else {
      // Push the middle node up-left and back down-right, alternately.
      const [x, y] = cell(1, 1, 64);
      stage.every(1800, async (i) => {
        const [fx, fy] = i % 2 ? [x - 30, y - 30] : [x, y];
        const [tx, ty] = i % 2 ? [x, y] : [x - 30, y - 30];
        await simDrag(stage, graph, line([fx, fy], [tx, ty], 10), 30);
      });
    }
  });

export default mount;

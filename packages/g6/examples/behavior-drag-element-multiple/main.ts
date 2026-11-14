// drag-element state: dragging one selected node moves every node in that state
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
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
        behaviors: [
          { type: 'click-select', key: 'click', multiple: true, state: 'selected', trigger: stage.preview ? [] : ['shift'] },
          { type: 'drag-element', key: 'drag', state: 'selected' },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Shift-click several nodes, then drag one of them: all selected nodes move together.';
    else {
      // Select three nodes through the data, then drag one of them back and forth.
      await graph.setElementState({ n01: 'selected', n11: 'selected', n12: 'selected' });
      const [x, y] = cell(1, 1, 64);
      stage.every(1800, async (i) => {
        const dir = i % 2 ? 1 : -1;
        const from: [number, number] = [x + (dir < 0 ? 28 : 0), y + (dir < 0 ? 28 : 0)];
        const to: [number, number] = [x + (dir < 0 ? 0 : 28), y + (dir < 0 ? 0 : 28)];
        await simDrag(stage, graph, line(from, to, 10), 30);
      });
    }
  });

export default mount;

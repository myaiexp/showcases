// brush-select with immediately: true and no trigger key: states follow the box while dragging
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
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        behaviors: [{ type: 'brush-select', key: 'brush', trigger: [], immediately: true }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag a box on the canvas. With immediately on, nodes light up while the box moves.';
      toggle(stage.bar, 'immediately', true, (immediately) => graph.updateBehavior({ key: 'brush', immediately }));
    } else {
      stage.every(3000, async () => {
        await graph.setElementState({ n00: [], n01: [], n02: [], n03: [], n10: [], n11: [], n12: [], n13: [], n20: [], n21: [], n22: [], n23: [] });
        const [x0, y0] = cell(0, 0, 64);
        const [x1, y1] = cell(2, 3, 64);
        await simDrag(stage, graph, line([x0 - 20, y0 - 20], [x1 + 20, y1 + 20], 14), 90);
      });
    }
  });

export default mount;

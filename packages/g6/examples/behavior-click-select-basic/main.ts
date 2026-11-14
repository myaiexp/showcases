// click-select: click a node or edge to select it, click the canvas to clear
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
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
        edge: { style: { lineWidth: 3 }, state: { selected: { stroke: '#ffa940' } } },
        behaviors: [{ type: 'click-select', key: 'click' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Click a node or an edge. Click it again, or the canvas, to clear.';
      toggle(stage.bar, 'animation', true, (animation) => graph.updateBehavior({ key: 'click', animation }));
    } else {
      // Node, edge midpoint, a different node, then empty canvas to clear.
      const targets = [cell(1, 1, 64), [32, 0], cell(2, 3, 64), [-60, 140]] as [number, number][];
      stage.every(1300, (i) => simClick(stage, graph, targets[i % targets.length]!));
    }
  });

export default mount;

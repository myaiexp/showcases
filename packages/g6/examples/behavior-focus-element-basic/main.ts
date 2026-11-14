// focus-element: click an element and the view moves to centre it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(8, 5, 70),
        node: { style: { size: 18, labelText: (d) => String(d.id), labelFill: '#ddd', labelFontSize: 10, labelPlacement: 'bottom' } },
        behaviors: ['focus-element', 'drag-canvas'],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Click a node or an edge: the view slides to centre it. Drag to pan.';
    else {
      // Whatever the view shows, click the node that is farthest from the middle.
      const targets: [number, number][] = [cell(0, 0, 70), cell(4, 7, 70), cell(0, 6, 70), cell(3, 1, 70)];
      stage.every(1800, (i) => simClick(stage, graph, targets[i % targets.length]!).catch(() => undefined));
    }
  });

export default mount;

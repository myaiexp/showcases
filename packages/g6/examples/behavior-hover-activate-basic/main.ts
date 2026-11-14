// hover-activate: the hovered node and its edges switch to the active state
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simHover } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        behaviors: ['hover-activate'],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Move the pointer over a node.';
    else {
      const path = [cell(0, 1, 64), cell(1, 1, 64), cell(1, 2, 64), cell(2, 3, 64), null];
      stage.every(1000, (i) => simHover(graph, path[i % path.length]!));
    }
  });

export default mount;

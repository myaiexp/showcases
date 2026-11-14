// scroll-canvas: the wheel moves the view instead of zooming it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simWheel } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(7, 5, 55),
        node: { style: { size: 16 } },
        behaviors: [{ type: 'scroll-canvas', key: 'scroll' }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Scroll the wheel (or two-finger swipe) over the graph; use Shift for horizontal.';
    else {
      overlay(stage)('wheel');
      // Down, down, then diagonal, then back: the zoom level never changes.
      const moves: [number, number][] = [[0, 60], [0, 60], [50, 50], [-50, -60], [0, -60]];
      stage.every(450, (i) => {
        const [dx, dy] = moves[i % moves.length]!;
        simWheel(graph, [130, 100], dy, dx);
      });
    }
  });

export default mount;

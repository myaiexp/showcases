// drag-canvas direction: pan both ways, or only along x or y
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { line, overlay, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const dirs = ['both', 'x', 'y'] as const;
type Dir = (typeof dirs)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(6, 4, 55),
        node: { style: { size: 16 } },
        behaviors: [{ type: 'drag-canvas', key: 'drag', direction: 'both' }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (direction: Dir) => graph.updateBehavior({ key: 'drag', direction });
    if (stage.bar) {
      readout(el).textContent = 'Drag diagonally and watch which axes move.';
      select(stage.bar, 'direction', dirs, 'both', apply);
    } else {
      const say = overlay(stage);
      stage.every(1600, async (i) => {
        const d = dirs[Math.floor((i - 1) / 2) % dirs.length]!;
        apply(d);
        say(`direction: '${d}'`);
        const [p, q] = i % 2 ? [[50, 40], [160, 130]] : [[160, 130], [50, 40]];
        await simDrag(stage, graph, line(graph.getCanvasByViewport(p as [number, number]), graph.getCanvasByViewport(q as [number, number]), 12), 40);
      });
    }
  });

export default mount;

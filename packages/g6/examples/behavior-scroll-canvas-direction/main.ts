// scroll-canvas direction: scroll only horizontally, only vertically, or freely
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simWheel } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const dirs = ['free', 'x', 'y'] as const;
type Dir = (typeof dirs)[number];

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
    // updateBehavior ignores undefined values, so 'free' has to rebuild the behavior without a direction.
    const apply = (d: Dir) =>
      graph.setBehaviors([d === 'free' ? { type: 'scroll-canvas', key: 'scroll' } : { type: 'scroll-canvas', key: 'scroll', direction: d }]);
    if (stage.bar) {
      readout(el).textContent = 'Scroll diagonally: direction x or y drops the other axis.';
      select(stage.bar, 'direction', dirs, 'free', apply);
    } else {
      const say = overlay(stage);
      stage.every(500, (i) => {
        const d = dirs[Math.floor((i - 1) / 6) % dirs.length]!;
        if ((i - 1) % 6 === 0) {
          apply(d);
          say(`direction: ${d === 'free' ? 'undefined' : `'${d}'`}`);
        }
        const s = (i - 1) % 6 < 3 ? 1 : -1;
        simWheel(graph, [130, 100], 40 * s, 40 * s);
      });
    }
  });

export default mount;

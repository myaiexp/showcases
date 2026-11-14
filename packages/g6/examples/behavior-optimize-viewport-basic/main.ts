// optimize-viewport-transform: edges are hidden while the view moves, then drawn again
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(stage.preview ? 14 : 24, stage.preview ? 8 : 14, stage.preview ? 24 : 28),
        node: { style: { size: 6 } },
        behaviors: ['drag-canvas', 'zoom-canvas', { type: 'optimize-viewport-transform', key: 'optimize', debounce: stage.preview ? 700 : 200 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag or zoom the graph: edges disappear while the view moves, and return 200 ms after it stops.';
      toggle(stage.bar, 'enable', true, (enable) => graph.updateBehavior({ key: 'optimize', enable }));
    } else {
      const say = overlay(stage);
      say('moving: edges hidden');
      stage.every(2400, (i) => graph.translateBy(i % 2 ? [-50, 20] : [50, -20], { duration: 900 }));
    }
  });

export default mount;

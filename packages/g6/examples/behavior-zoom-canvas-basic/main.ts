// zoom-canvas: the wheel zooms the view around the pointer
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { simWheel } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(5, 4, 50),
        behaviors: [{ type: 'zoom-canvas', key: 'zoom' }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      const out = readout(el);
      out.textContent = 'Scroll the wheel over the graph to zoom.';
      graph.on('aftertransform', () => (out.textContent = `zoom ${graph.getZoom().toFixed(2)}`));
      toggle(stage.bar, 'animation', true, (on) => graph.updateBehavior({ key: 'zoom', animation: on ? { duration: 200 } : false }));
    } else {
      const ticks = [-60, -60, -60, -60, 60, 60, 60, 60];
      stage.every(500, (i) => simWheel(graph, [100, 75], ticks[i % ticks.length]!));
    }
  });

export default mount;

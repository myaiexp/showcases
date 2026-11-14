// zoomRange on the graph: the limits the zoom-canvas behavior cannot pass
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simWheel } from '../../shared/behavior-sim.ts';
import { readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(5, 4, 50),
        zoomRange: [0.5, 2],
        behaviors: ['zoom-canvas'],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      const out = readout(el);
      let [lo, hi] = [0.5, 2];
      const show = () => (out.textContent = `zoomRange [${lo}, ${hi}] -- zoom ${graph.getZoom().toFixed(2)}`);
      show();
      graph.on('aftertransform', show);
      slider(stage.bar, 'min', [0.1, 1, 0.1], lo, (v) => ((lo = v), graph.setZoomRange([lo, hi]), show()));
      slider(stage.bar, 'max', [1, 5, 0.5], hi, (v) => ((hi = v), graph.setZoomRange([lo, hi]), show()));
    } else {
      const say = overlay(stage);
      stage.every(300, (i) => {
        const phase = (i - 1) % 24;
        say(`zoomRange [0.5, 2]  zoom ${graph.getZoom().toFixed(2)}`);
        simWheel(graph, [100, 75], phase < 12 ? -80 : 80);
      });
    }
  });

export default mount;

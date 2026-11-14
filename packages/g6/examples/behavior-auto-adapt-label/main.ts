// auto-adapt-label: labels that would overlap are hidden as the view zooms out
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(7, 5, 44),
        node: { style: { size: 14, labelText: (d) => String(d.id), labelPlacement: 'bottom', labelFontSize: 11 } },
        behaviors: ['drag-canvas', 'zoom-canvas', { type: 'auto-adapt-label', key: 'adapt', throttle: 100 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Scroll to zoom: labels thin out as they start to collide.';
    else {
      const zooms = [0.45, 1.6, 1, 0.7];
      stage.every(2200, (i) => graph.zoomTo(zooms[i % zooms.length]!, { duration: 900 }));
    }
  });

export default mount;

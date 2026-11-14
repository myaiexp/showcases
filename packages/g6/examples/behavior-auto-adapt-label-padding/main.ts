// auto-adapt-label padding and throttle, changed live with updateBehavior
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(6, 4, 52),
        node: { style: { size: 12, labelText: (d) => `node ${d.id}`, labelPlacement: 'bottom', labelFontSize: 10 } },
        behaviors: ['drag-canvas', 'zoom-canvas', { type: 'auto-adapt-label', key: 'adapt', padding: 0, throttle: 100 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      slider(stage.bar, 'padding', [0, 40, 1], 0, (padding) => graph.updateBehavior({ key: 'adapt', padding }));
      slider(stage.bar, 'throttle', [0, 900, 100], 100, (throttle) => graph.updateBehavior({ key: 'adapt', throttle }));
    } else {
      // Padding widens each kept label's claim on space, so more neighbours are hidden.
      const pads = [0, 14, 30, 6];
      stage.every(1800, (i) => graph.updateBehavior({ key: 'adapt', padding: pads[i % pads.length] }));
    }
  });

export default mount;

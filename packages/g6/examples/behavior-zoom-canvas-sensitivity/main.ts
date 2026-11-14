// zoom-canvas sensitivity: how much one wheel step changes the zoom
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
        behaviors: [{ type: 'zoom-canvas', key: 'zoom', sensitivity: 1 }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      const out = readout(el);
      out.textContent = 'Scroll to zoom; change sensitivity and compare.';
      graph.on('aftertransform', () => (out.textContent = `zoom ${graph.getZoom().toFixed(2)}`));
      slider(stage.bar, 'sensitivity', [0.2, 5, 0.1], 1, (sensitivity) => graph.updateBehavior({ key: 'zoom', sensitivity }));
    } else {
      const say = overlay(stage);
      const levels = [0.3, 1, 3];
      stage.every(450, (i) => {
        const phase = (i - 1) % 8;
        const s = levels[Math.floor((i - 1) / 8) % levels.length]!;
        if (phase === 0) {
          graph.updateBehavior({ key: 'zoom', sensitivity: s });
          say(`sensitivity: ${s}`);
        }
        simWheel(graph, [100, 75], phase < 4 ? -40 : 40);
      });
    }
  });

export default mount;

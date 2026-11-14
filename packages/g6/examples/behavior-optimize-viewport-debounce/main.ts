// optimize-viewport-transform debounce: how long after the move the hidden elements return
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(stage.preview ? 12 : 20, stage.preview ? 7 : 12, stage.preview ? 26 : 30),
        node: { style: { size: 6 } },
        behaviors: ['drag-canvas', 'zoom-canvas', { type: 'optimize-viewport-transform', key: 'optimize', debounce: 200 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag the canvas and let go: edges come back after the debounce time.';
      slider(stage.bar, 'debounce (ms)', [0, 2000, 100], 200, (debounce) => graph.updateBehavior({ key: 'optimize', debounce }));
    } else {
      const say = overlay(stage);
      stage.every(3200, async (i) => {
        const debounce = i % 2 ? 1500 : 100;
        graph.updateBehavior({ key: 'optimize', debounce });
        say(`debounce: ${debounce}`);
        await graph.translateBy(i % 2 ? [-40, 15] : [40, -15], { duration: 500 });
      });
    }
  });

export default mount;

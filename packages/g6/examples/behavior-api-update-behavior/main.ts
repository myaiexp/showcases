// graph.updateBehavior: change one behavior by key, here switching drag-canvas off and on
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { line, overlay, simDrag, simWheel } from '../../shared/behavior-sim.ts';
import { readout, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(6, 4, 55),
        node: { style: { size: 16 } },
        // A key is what updateBehavior finds the behavior by.
        behaviors: [
          { type: 'drag-canvas', key: 'main-drag' },
          { type: 'zoom-canvas', key: 'main-zoom', sensitivity: 1 },
        ],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Switch drag-canvas off and the canvas stops panning; change the zoom sensitivity.';
      toggle(stage.bar, 'main-drag enable', true, (enable) => graph.updateBehavior({ key: 'main-drag', enable }));
      slider(stage.bar, 'main-zoom sensitivity', [0.2, 4, 0.1], 1, (sensitivity) => graph.updateBehavior({ key: 'main-zoom', sensitivity }));
    } else {
      const say = overlay(stage);
      stage.every(1700, async (i) => {
        const enable = i % 4 < 2;
        const sens = i % 4 < 2 ? 1 : 3;
        graph.updateBehavior({ key: 'main-drag', enable });
        graph.updateBehavior({ key: 'main-zoom', sensitivity: sens });
        say(`main-drag enable: ${enable}, zoom sensitivity: ${sens}`);
        simWheel(graph, [130, 100], i % 2 ? 40 : -40);
        const a = graph.getCanvasByViewport([40, 170]);
        const b = graph.getCanvasByViewport([140, 110]);
        await simDrag(stage, graph, i % 2 ? line(a, b, 8) : line(b, a, 8), 40);
      });
    }
  });

export default mount;

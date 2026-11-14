// drag-canvas trigger: arrow keys pan the canvas, with sensitivity and animation
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { simKeys } from '../../shared/behavior-sim.ts';
import { readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(5, 4, 50),
        node: { style: { size: 16 } },
        behaviors: [
          {
            type: 'drag-canvas',
            key: 'drag',
            trigger: { up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'] },
            sensitivity: 10,
            animation: { duration: 100 },
          },
        ],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Click the graph, then press the arrow keys.';
      slider(stage.bar, 'sensitivity', [1, 60, 1], 10, (sensitivity) => graph.updateBehavior({ key: 'drag', sensitivity }));
    } else {
      const keys = ['ArrowRight', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowLeft', 'ArrowUp'];
      stage.every(500, (i) => simKeys(stage, graph, [keys[i % keys.length]!], 80));
    }
  });

export default mount;

// edge-bundling simulation parameters exposed as sliders
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(
    el,
    ctx,
    async (stage) => {
      const data = await dataset('circular');
      const graph = stage.keep(
        new Graph({
          container: stage.container,
          theme: 'dark',
          data,
          node: { style: { size: stage.preview ? 8 : 20, fill: '#00c9c9' } },
          edge: { style: { stroke: '#8b9baf', lineWidth: 1 } },
          layout: { type: 'circular' },
          autoFit: 'view',
          padding: 20,
          plugins: [
            { type: 'edge-bundling', key: 'bundling', bundleThreshold: 0.6, cycles: 6, divisions: 3, divRate: 2, iterations: 90, iterRate: 2 / 3, K: 0.1, lambda: 0.1 },
          ],
        }),
      );
      await graph.render();

      const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'bundling', ...o });
      if (stage.bar) {
        slider(stage.bar, 'cycles', [1, 20, 1], 6, (cycles) => up({ cycles }));
        slider(stage.bar, 'divisions', [1, 10, 1], 3, (divisions) => up({ divisions }));
        slider(stage.bar, 'divRate', [1, 5, 0.1], 2, (divRate) => up({ divRate }));
        slider(stage.bar, 'iterations', [10, 200, 10], 90, (iterations) => up({ iterations }));
        slider(stage.bar, 'iterRate', [0.1, 1, 0.01], 0.67, (iterRate) => up({ iterRate }));
        slider(stage.bar, 'lambda', [0.01, 1, 0.01], 0.1, (lambda) => up({ lambda }));
      } else {
        stage.every(2200, (i) => up({ cycles: [2, 6, 10][i % 3], divisions: [1, 3, 5][i % 3] }));
      }
    },
    { height: 520 },
  );

export default mount;

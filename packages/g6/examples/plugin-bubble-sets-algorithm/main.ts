// bubble-sets algorithm options exposed as sliders
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(
    el,
    ctx,
    async (stage) => {
      const graph = stage.keep(
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: hullData(),
          node: { style: { fill: '#ffd666' } },
          edge: { style: { stroke: '#8b9baf' } },
          behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
          autoFit: 'view',
          padding: 24,
          plugins: [
            { type: 'bubble-sets', key: 'bubbles', members: ['node-0', 'node-1', 'node-2', 'node-3', 'node-4'], label: false, fill: '#1783ff', stroke: '#1783ff', fillOpacity: 0.15 },
          ],
        }),
      );
      await graph.render();

      const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'bubbles', ...o });
      if (stage.bar) {
        slider(stage.bar, 'nodeR0', [0, 50, 1], 15, (nodeR0) => up({ nodeR0 }));
        slider(stage.bar, 'nodeR1', [0, 50, 1], 50, (nodeR1) => up({ nodeR1 }));
        slider(stage.bar, 'morphBuffer', [0, 20, 1], 10, (morphBuffer) => up({ morphBuffer }));
        slider(stage.bar, 'threshold', [-1, 1, 0.1], 1, (threshold) => up({ threshold }));
        slider(stage.bar, 'memberInfluenceFactor', [-1, 1, 0.1], 1, (memberInfluenceFactor) => up({ memberInfluenceFactor }));
        slider(stage.bar, 'pixelGroup', [1, 20, 1], 4, (pixelGroup) => up({ pixelGroup }));
        slider(stage.bar, 'maxRoutingIterations', [1, 200, 1], 100, (maxRoutingIterations) => up({ maxRoutingIterations }));
        slider(stage.bar, 'maxMarchingIterations', [1, 40, 1], 20, (maxMarchingIterations) => up({ maxMarchingIterations }));
        toggle(stage.bar, 'virtualEdges', true, (virtualEdges) => up({ virtualEdges }));
      } else {
        stage.every(1500, (i) => up({ nodeR1: 20 + (i % 3) * 25, morphBuffer: 2 + (i % 3) * 8 }));
      }
    },
    { height: 520 },
  );

export default mount;

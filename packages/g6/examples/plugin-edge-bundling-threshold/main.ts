// edge-bundling bundleThreshold and K, changed with updatePlugin
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('circular');
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: stage.preview ? 8 : 20, fill: '#1783ff' } },
        edge: { style: { stroke: '#8b9baf', lineWidth: 1 } },
        layout: { type: 'circular' },
        autoFit: 'view',
        padding: 20,
        plugins: [{ type: 'edge-bundling', key: 'bundling', bundleThreshold: 0.6, K: 0.1 }],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'bundling', ...o });
    if (stage.bar) {
      slider(stage.bar, 'bundleThreshold', [0.05, 1, 0.05], 0.6, (bundleThreshold) => up({ bundleThreshold }));
      slider(stage.bar, 'K', [0.01, 0.5, 0.01], 0.1, (K) => up({ K }));
    } else {
      const levels = [0.1, 0.4, 0.8, 0.4];
      stage.every(2000, (i) => up({ bundleThreshold: levels[i % levels.length] }));
    }
  });

export default mount;

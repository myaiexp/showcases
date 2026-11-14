// edge-bundling plugin on the circular dataset
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('circular');
    const bundling = { type: 'edge-bundling', key: 'bundling', bundleThreshold: 0.1 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: stage.preview ? 8 : 20, fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf', lineWidth: 1 } },
        layout: { type: 'circular' },
        behaviors: ['drag-canvas', 'drag-element'],
        autoFit: 'view',
        padding: 20,
        plugins: [bundling],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'edge-bundling', true, (on) => graph.setPlugins(on ? [bundling] : []));
    } else {
      stage.every(2200, (i) => graph.setPlugins(i % 2 ? [] : [bundling]));
    }
  });

export default mount;

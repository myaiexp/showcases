// force layout motion parameters with animated re-runs
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force', animation: true, preventOverlap: true, nodeSize: 14, damping: 0.9, maxSpeed: 200, interval: 0.02 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: clusterGraph(3, 8),
        node: {
          style: { size: 14 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      sliderOption(stage, graph, layout, 'damping', [0.1, 0.99, 0.01], 0.9, []);
      sliderOption(stage, graph, layout, 'maxSpeed', [5, 500, 5], 200, []);
      sliderOption(stage, graph, layout, 'interval', [0.005, 0.1, 0.005], 0.02, []);
    } else {
      const steps = [{ interval: 0.02, damping: 0.9 }, { interval: 0.005, damping: 0.5 }, { interval: 0.08, damping: 0.97 }];
      stage.every(3200, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;

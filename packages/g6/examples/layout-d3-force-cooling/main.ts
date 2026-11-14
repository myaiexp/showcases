// d3-force cooling options with animated re-runs
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'd3-force', animation: true, manyBody: { strength: -50 }, link: { distance: 35 }, alphaDecay: 0.028, velocityDecay: 0.4, alpha: 1 };
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
      sliderOption(stage, graph, layout, 'alphaDecay', [0.005, 0.1, 0.005], 0.028, []);
      sliderOption(stage, graph, layout, 'velocityDecay', [0.05, 0.95, 0.05], 0.4, []);
      sliderOption(stage, graph, layout, 'alpha', [0.05, 1, 0.05], 1, []);
    } else {
      const steps = [{ alphaDecay: 0.1, velocityDecay: 0.4 }, { alphaDecay: 0.01, velocityDecay: 0.15 }, { alphaDecay: 0.028, velocityDecay: 0.7 }];
      stage.every(3400, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;

// force layout repulsion parameters
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: false, nodeStrength: 1000, factor: 1, coulombDisScale: 0.005 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: clusterGraph(3, 7),
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
      sliderOption(stage, graph, layout, 'nodeStrength', [-2000, 5000, 100], 1000, []);
      sliderOption(stage, graph, layout, 'factor', [0.1, 10, 0.1], 1, []);
      sliderOption(stage, graph, layout, 'coulombDisScale', [0.001, 0.05, 0.001], 0.005, []);
    } else {
      const steps = [{ factor: 1 }, { factor: 6 }, { factor: 0.2 }, { factor: 3 }];
      stage.every(2400, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;

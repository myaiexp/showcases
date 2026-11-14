// force layout edge spring parameters
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: false, edgeStrength: 200, linkDistance: 100 };
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
      sliderOption(stage, graph, layout, 'linkDistance', [20, 300, 10], 100, []);
      sliderOption(stage, graph, layout, 'edgeStrength', [10, 1000, 10], 200, []);
    } else {
      const steps = [{ linkDistance: 100 }, { linkDistance: 220 }, { linkDistance: 40 }, { linkDistance: 150 }];
      stage.every(2400, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;

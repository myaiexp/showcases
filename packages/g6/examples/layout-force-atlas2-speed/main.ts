// force-atlas2 speed and oscillation tolerance
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force-atlas2', preventOverlap: true, kr: 20, ks: 0.1, ksmax: 10, tao: 0.1, nodeSize: 10 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('relations'),
        node: {
          style: { size: 10 },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      sliderOption(stage, graph, layout, 'ks', [0.01, 1, 0.01], 0.1, []);
      sliderOption(stage, graph, layout, 'ksmax', [1, 20, 1], 10, []);
      sliderOption(stage, graph, layout, 'tao', [0.01, 1, 0.01], 0.1, []);
    } else {
      const steps = [{ ks: 0.1, tao: 0.1 }, { ks: 0.8, tao: 0.5 }, { ks: 0.02, tao: 0.05 }];
      stage.every(3000, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;

// force-atlas2 repulsion and gravity on the relations dataset
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force-atlas2', preventOverlap: true, kr: 20, kg: 1, nodeSize: 10 };
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

    sliderOption(stage, graph, layout, 'kr', [1, 100, 1], 20, [20, 5, 60, 30]);
    if (stage.bar) sliderOption(stage, graph, layout, 'kg', [0, 10, 0.5], 1, []);
  });

export default mount;

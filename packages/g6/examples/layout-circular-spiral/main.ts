// Circular layout as a spiral: the radius grows from startRadius to endRadius
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'circular', startRadius: 10, endRadius: 300 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('circular'),
        node: { style: { labelText: (d) => d.id, labelFill: '#fff', labelPlacement: 'center', labelFontSize: 9 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    sliderOption(stage, graph, layout, 'startRadius', [0, 200, 5], 10, [10, 80, 10, 120]);
    sliderOption(stage, graph, layout, 'endRadius', [50, 400, 10], 300, [300, 150, 400, 250]);
  });

export default mount;

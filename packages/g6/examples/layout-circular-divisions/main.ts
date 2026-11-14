// Circular layout divisions only act when endRadius differs from startRadius
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'circular', startRadius: 40, endRadius: 200, divisions: 1 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('circular'),
        node: { style: { size: 14, labelText: (d) => d.id, labelFill: '#fff', labelPlacement: 'center', labelFontSize: 8 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    sliderOption(stage, graph, layout, 'divisions', [1, 8, 1], 1, [1, 2, 3, 5]);
  });

export default mount;

// The docs' basic circular layout with the clockwise option
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'circular', clockwise: true };
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

    toggleOption(stage, graph, layout, 'clockwise', { clockwise: true }, { clockwise: false }, true);
  });

export default mount;

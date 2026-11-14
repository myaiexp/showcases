// antv-dagre ranker algorithms compared
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';

import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { selectOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'antv-dagre', ranker: 'network-simplex', ranksep: 40 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('dagre'),
        node: {
          style: { size: 24, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 10 },
        },
        edge: { type: 'polyline', style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    selectOption(stage, graph, layout, 'ranker', ['network-simplex', 'tight-tree', 'longest-path'] as const, 'network-simplex');
  });

export default mount;

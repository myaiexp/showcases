// antv-dagre per-node spacing callbacks
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';

import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'antv-dagre', nodesepFunc: () => 40, ranksepFunc: () => 40 };
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

    const flat = { nodesepFunc: () => 40, ranksepFunc: () => 40 };
    const uneven = {
      nodesepFunc: (d?: { id: string }) => (Number(d?.id) % 2 ? 90 : 15),
      ranksepFunc: (d?: { id: string }) => (Number(d?.id) % 3 ? 70 : 25),
    };
    toggleOption(stage, graph, layout, 'per-node gaps', uneven, flat, false);
  });

export default mount;

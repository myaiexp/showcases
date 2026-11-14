// dagre nodeSize callback with controlPoints
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';

import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'dagre', rankdir: 'LR', controlPoints: true, nodeSize: [24, 24] };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('dagre'),
        node: {
          style: { size: [60, 24], labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 10 },
        },
        edge: { type: 'polyline', style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // Wide boxes in the layout let dagre leave room; the drawn nodes below are 60 wide to match.
    toggleOption(stage, graph, layout, 'wide node boxes', { nodeSize: [60, 24] }, { nodeSize: [24, 24] }, false);
  });

export default mount;

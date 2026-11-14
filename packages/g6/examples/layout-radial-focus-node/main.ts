// Radial focusNode: re-centre the rings on any node id
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { selectOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'radial', nodeSize: 32, unitRadius: 70, linkDistance: 100, focusNode: '0' };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('radial'),
        node: { style: { size: 22, labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id, labelFontSize: 9 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    selectOption(stage, graph, layout, 'focusNode', ['0', '5', '12', '20', '28'] as const, '0', 2600);
  });

export default mount;

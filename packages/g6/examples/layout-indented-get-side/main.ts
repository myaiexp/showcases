// indented getSide from the docs on algorithm-category
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'indented', direction: 'H', indent: 80, getHeight: () => 16, getWidth: () => 32 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(await treeDataset('algorithm-category')),
        node: {
          style: { size: 8, labelText: (d) => d.id, labelPlacement: 'right', labelFill: '#fff', labelFontSize: 9 },
        },
        edge: { type: 'polyline' },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const custom = { getSide: (d?: NodeData) => (d?.id === 'Regression' || d?.id === 'Classification' ? 'left' : 'right') };
    toggleOption(stage, graph, layout, 'custom getSide', custom, { getSide: undefined }, true, 2600);
  }, { height: 560 });

export default mount;

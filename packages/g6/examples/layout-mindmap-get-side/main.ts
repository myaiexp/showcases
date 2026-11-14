// mindmap getSide with direction H
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'mindmap', direction: 'H', getWidth: () => 80, getHeight: () => 20, getHGap: () => 24, getVGap: () => 8 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(await treeDataset('file-system')),
        node: {
          type: 'rect',
          style: { size: [80, 20], radius: 3, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 },
        },
        edge: { type: 'cubic-horizontal' },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const left = new Set(['animations', 'behaviors', 'layouts']);
    const custom = { getSide: (d?: NodeData) => (left.has(String(d?.id)) ? 'left' : 'right') };
    toggleOption(stage, graph, layout, 'custom getSide', custom, { getSide: undefined }, false);
  });

export default mount;

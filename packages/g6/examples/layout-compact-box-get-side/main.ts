// compact-box H direction with a getSide callback
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'compact-box', direction: 'H', getWidth: () => 80, getHeight: () => 20, getHGap: () => 24, getVGap: () => 8 };
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

    // Only the branches named here go left; elements and themes stay right.
    const left = new Set(['runtime', 'layouts', 'spec']);
    const custom = { getSide: ({ data }: { data?: NodeData }) => (left.has(String(data?.id)) ? 'left' : 'right') };
    toggleOption(stage, graph, layout, 'custom getSide', custom, { getSide: undefined }, false);
  });

export default mount;

// The docs' compact-box tree: LR, getWidth/getHeight/getVGap/getHGap and collapse-expand
import { Graph, treeToGraphData } from '@antv/g6';
import type { NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';

const isLeafNode = (d: NodeData): boolean => !d.children || d.children.length === 0;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(await treeDataset('algorithm-category')),
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
        node: {
          style: {
            labelText: (d) => d.id,
            labelFill: '#fff',
            labelFontSize: 10,
            labelPlacement: (d) => (isLeafNode(d) ? 'right' : 'left'),
            labelBackground: true,
            ports: [{ placement: 'right' }, { placement: 'left' }],
          },
          animation: { enter: false },
        },
        edge: { type: 'cubic-horizontal', animation: { enter: false } },
        layout: {
          type: 'compact-box',
          direction: 'LR',
          getHeight: () => 32,
          getWidth: () => 32,
          getVGap: () => 10,
          getHGap: () => 100,
        },
      }),
    );
    await graph.render();

    // No pointer in a card: fold and unfold the Classification branch.
    if (stage.preview) {
      stage.every(2400, (i) => (i % 2 ? graph.expandElement('Classification') : graph.collapseElement('Classification')));
    }
  });

export default mount;

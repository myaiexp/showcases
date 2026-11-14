// snapline with drag-element; cards replay the drag events it listens for
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dragNode } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node-0', style: { x: 70, y: 50 } },
            { id: 'node-1', style: { x: 190, y: 50 } },
            { id: 'node-2', style: { x: 70, y: 150 } },
            { id: 'node-3', style: { x: 190, y: 170 } },
            { id: 'node-4', style: { x: 130, y: 100 } },
          ],
          edges: [
            { source: 'node-0', target: 'node-1' },
            { source: 'node-2', target: 'node-3' },
            { source: 'node-0', target: 'node-2' },
          ],
        },
        node: { style: { fill: '#7e3feb', size: 28 } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['drag-canvas', 'drag-element'],
        autoFit: 'center',
        plugins: [{ type: 'snapline', key: 'snapline', verticalLineStyle: { stroke: '#f08f56', lineWidth: 2 }, horizontalLineStyle: { stroke: '#17c76f', lineWidth: 2 } }],
      }),
    );
    await graph.render();

    if (stage.preview) {
      // node-3 slides up to the height of node-2, then back down.
      const [, y2 = 0] = graph.getElementPosition('node-2');
      const [x3 = 0, y3 = 0] = graph.getElementPosition('node-3');
      stage.every(1800, (i) => dragNode(graph, 'node-3', i % 2 ? [x3, y2] : [x3, y3]));
    }
  });

export default mount;

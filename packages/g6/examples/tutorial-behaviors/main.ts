// Three behaviors by name: drag the canvas, wheel-zoom it, drag the nodes
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'node-1', style: { x: 50, y: 50 } },
            { id: 'node-2', style: { x: 150, y: 50 } },
          ],
          edges: [{ source: 'node-1', target: 'node-2' }],
        },
        node: {
          type: (datum: NodeData) => (datum.id === 'node-1' ? 'circle' : 'rect'),
          style: {
            fill: 'pink',
            size: 20,
          },
        },
        edge: {
          style: {
            stroke: 'lightgreen',
          },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );

    await graph.render();
  });

export default mount;

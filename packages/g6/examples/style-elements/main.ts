// node.style and edge.style in the graph options style every node and edge at once
import { Graph } from '@antv/g6';
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
          style: {
            fill: 'pink',
          },
        },
        edge: {
          style: {
            stroke: 'lightgreen',
          },
        },
      }),
    );

    await graph.render();
  });

export default mount;

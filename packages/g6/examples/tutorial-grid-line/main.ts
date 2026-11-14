// plugins: ['grid-line'], the shorthand form of a plugin, draws a grid behind the graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: Array.from({ length: 10 }).map((_, i) => ({
            id: `node-${i}`,
            data: { category: i === 0 ? 'central' : 'around' },
          })),
          edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
        },
        node: {
          style: {
            size: 20,
          },
          palette: {
            field: 'category',
            color: 'tableau',
          },
        },
        edge: {
          style: {
            stroke: 'lightgreen',
          },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        layout: {
          type: 'd3-force',
        },
        plugins: ['grid-line'],
      }),
    );

    await graph.render();
  });

export default mount;

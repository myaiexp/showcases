// Ten unplaced nodes: the d3-force layout pulls the star into shape
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        // No positions in the data: without a layout every node would sit at (0, 0).
        data: {
          nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
          edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
        },
        node: {
          style: {
            size: 20,
            fill: 'pink',
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
      }),
    );

    await graph.render();

    // A card re-runs the layout so the simulation plays again.
    if (stage.preview) stage.every(5000, () => graph.layout());
  });

export default mount;

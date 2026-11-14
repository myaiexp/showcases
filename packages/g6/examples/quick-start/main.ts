// The docs' Quick Start graph: d3-force layout, a tableau palette, drag and zoom
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // The docs fetch graph.json; the repo's cluster.json has the same shape with a
    // `cluster` field to colour by.
    const data = await dataset('cluster');

    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data,
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'cluster',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3-force',
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );

    await graph.render();

    // A card has no pointer: it re-runs the simulation so the graph settles again.
    if (stage.preview) stage.every(6000, () => graph.layout());
  });

export default mount;

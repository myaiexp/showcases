// legend plugin: categories read from data.cluster on nodes and edges
import { Graph } from '@antv/g6';
import type { EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { legendData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: legendData(),
        node: { style: { size: 24 }, palette: { field: 'cluster' } },
        edge: { style: { lineWidth: 2, stroke: (d: EdgeData) => (d.data?.cluster === 'edge-type1' ? '#1783ff' : '#f08f56') } },
        layout: { type: 'grid', cols: 2 },
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'view',
        padding: stage.preview ? [60, 20, 20, 20] : [90, 20, 20, 20],
        plugins: [
          {
            type: 'legend',
            key: 'legend',
            nodeField: 'cluster',
            edgeField: 'cluster',
            itemLabelFill: '#d6dcea',
            // Keeps the key clear of the graph in the small card.
            position: stage.preview ? 'bottom-right' : 'top-left',
          },
        ],
      }),
    );
    await graph.render();

    // Cards: pan the graph under the legend so the legend stays put while the data moves.
    if (stage.preview) stage.every(1400, (i) => graph.translateBy([i % 2 ? 20 : -20, 0], { duration: 900 }));
  });

export default mount;

// edge-filter-lens styles for the lens, its nodes and its edges, plus a filter
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';
import { atNode, lensHandler } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('circular');
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: stage.preview ? 8 : 16, fill: '#8b9baf' } },
        edge: { style: { stroke: '#8b9baf44' } },
        layout: { type: 'circular' },
        autoFit: 'view',
        padding: 20,
        plugins: [
          {
            type: 'edge-filter-lens',
            key: 'lens',
            r: stage.preview ? 50 : 100,
            style: { fill: '#2a1a4a', fillOpacity: 0.6, stroke: '#7e3feb', strokeOpacity: 0.8, lineWidth: 1.5 },
            nodeStyle: { size: stage.preview ? 12 : 24, fill: '#7e3feb', stroke: '#5719c9', lineWidth: 1, label: true, labelFill: '#ffffff', labelFontSize: 12, labelFontWeight: 'bold' },
            edgeStyle: { stroke: '#d3adf7', lineWidth: 2, label: false, opacity: 0.9 },
            // Node 0 never takes part in the lens.
            filter: (id: string) => id !== '0',
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const move = lensHandler(graph.getPluginInstance('lens'), 'onEdgeFilter');
      // The lens's first move fails on node labels; park it off-canvas once so later moves work.
      if (stage.preview) move({ canvas: { x: -9999, y: -9999 } });
      const path = ['5', '12', '20', '28'];
      stage.every(900, (i) => move(atNode(graph, path[i % path.length]!)));
    }
  });

export default mount;

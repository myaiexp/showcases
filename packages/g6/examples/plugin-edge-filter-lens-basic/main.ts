// edge-filter-lens with defaults; cards move the lens by calling its handler
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
        node: { style: { size: stage.preview ? 8 : 16, fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf55' } },
        layout: { type: 'circular' },
        autoFit: 'view',
        padding: 20,
        plugins: [{ type: 'edge-filter-lens', key: 'lens', trigger: 'pointermove', r: stage.preview ? 45 : 90, nodeType: 'both' }],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const move = lensHandler(graph.getPluginInstance('lens'), 'onEdgeFilter');
      // The lens's first move fails on node labels; park it off-canvas once so later moves work.
      if (stage.preview) move({ canvas: { x: -9999, y: -9999 } });
      const path = ['0', '8', '17', '25'];
      stage.every(900, (i) => move(atNode(graph, path[i % path.length]!)));
    }
  });

export default mount;

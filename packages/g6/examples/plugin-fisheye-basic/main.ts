// fisheye with defaults (pointermove); cards move the lens through its handler
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { gridData } from '../../shared/plugin-data.ts';
import { atNode, lensHandler } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const cols = stage.preview ? 9 : 12;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(stage.preview ? 27 : 60, cols),
        node: { style: { size: stage.preview ? 10 : 14, fill: '#7e3feb', labelText: (d) => d.id, labelFill: '#fff', labelFontSize: 9 } },
        edge: { style: { stroke: '#8b9baf88' } },
        layout: { type: 'grid', cols },
        autoFit: 'view',
        padding: 16,
        plugins: [{ type: 'fisheye', key: 'fisheye', r: stage.preview ? 60 : 120, d: 1.5, showDPercent: true }],
      }),
    );
    await graph.render();

    if (stage.preview) {
      // No pointer: hand the lens a point on the canvas, as its pointermove listener would.
      const move = lensHandler(graph.getPluginInstance('fisheye'), 'onCreateFisheye');
      // The lens's first move fails on node labels; park it off-canvas once so later moves work.
      if (stage.preview) move({ canvas: { x: -9999, y: -9999 } });
      const path = ['g4', 'g12', 'g14', 'g22', 'g13'];
      stage.every(700, (i) => move(atNode(graph, path[i % path.length]!)));
    }
  });

export default mount;

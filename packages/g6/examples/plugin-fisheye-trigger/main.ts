// fisheye trigger: pointermove, click or drag
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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
        node: { style: { size: stage.preview ? 10 : 14, fill: '#1783ff', labelText: (d) => d.id, labelFill: '#fff', labelFontSize: 9 } },
        edge: { style: { stroke: '#8b9baf88' } },
        layout: { type: 'grid', cols },
        behaviors: ['drag-canvas'],
        autoFit: 'view',
        padding: 16,
        plugins: [{ type: 'fisheye', key: 'fisheye', trigger: 'click', r: stage.preview ? 60 : 120, d: 2 }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'trigger', ['click', 'pointermove', 'drag'], 'click', (trigger) => graph.updatePlugin({ key: 'fisheye', trigger }));
    } else {
      // A click trigger jumps between points rather than gliding.
      const jump = lensHandler(graph.getPluginInstance('fisheye'), 'onCreateFisheye');
      // The lens's first move fails on node labels; park it off-canvas once so later moves work.
      if (stage.preview) jump({ canvas: { x: -9999, y: -9999 } });
      const spots = ['g3', 'g20', 'g8', 'g14'];
      stage.every(1100, (i) => jump(atNode(graph, spots[i % spots.length]!)));
    }
  });

export default mount;

// fisheye radius and distortion, set by option and adjustable by wheel or drag
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
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
        node: { style: { size: stage.preview ? 10 : 14, fill: '#00c9c9', labelText: (d) => d.id, labelFill: '#fff', labelFontSize: 9 } },
        edge: { style: { stroke: '#8b9baf88' } },
        layout: { type: 'grid', cols },
        autoFit: 'view',
        padding: 16,
        plugins: [
          { type: 'fisheye', key: 'fisheye', r: stage.preview ? 50 : 120, d: 1.5, minR: 40, maxR: 200, minD: 0, maxD: 5, scaleRBy: 'wheel', scaleDBy: 'drag' },
        ],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'fisheye', ...o });
    const move = lensHandler(graph.getPluginInstance('fisheye'), 'onCreateFisheye');
    // The lens's first move fails on node labels; park it off-canvas once so later moves work.
    if (stage.preview) move({ canvas: { x: -9999, y: -9999 } });
    if (stage.bar) {
      slider(stage.bar, 'r', [40, 200, 5], 120, (r) => up({ r }));
      slider(stage.bar, 'd', [0, 5, 0.1], 1.5, (d) => up({ d }));
      select(stage.bar, 'scaleRBy', ['wheel', 'drag'], 'wheel', (scaleRBy) => up({ scaleRBy }));
      select(stage.bar, 'scaleDBy', ['drag', 'wheel'], 'drag', (scaleDBy) => up({ scaleDBy }));
    } else {
      // r and d apply on the next lens move, so each step changes them and moves.
      stage.every(900, (i) => {
        up({ r: 40 + (i % 3) * 20, d: 1 + (i % 4) });
        move(atNode(graph, 'g13'));
      });
    }
  });

export default mount;

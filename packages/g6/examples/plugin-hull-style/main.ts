// hull style options passed straight on the plugin object
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const FILLS = ['#7e3feb', '#1783ff', '#00c9c9', '#f08f56'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hullData(),
        node: { style: { fill: '#ffd666' } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        autoFit: 'view',
        padding: 24,
        plugins: [
          {
            type: 'hull',
            key: 'hull',
            members: ['node-1', 'node-2', 'node-3'],
            stroke: '#ff0000aa',
            fill: '#7e3feb',
            fillOpacity: 0.2,
            lineWidth: 2,
            padding: 15,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'fill', FILLS, FILLS[0]!, (fill) => graph.updatePlugin({ key: 'hull', fill }));
      slider(stage.bar, 'fillOpacity', [0, 1, 0.05], 0.2, (fillOpacity) => graph.updatePlugin({ key: 'hull', fillOpacity }));
      slider(stage.bar, 'lineWidth', [0, 8, 1], 2, (lineWidth) => graph.updatePlugin({ key: 'hull', lineWidth }));
      slider(stage.bar, 'padding', [0, 40, 1], 15, (padding) => graph.updatePlugin({ key: 'hull', padding }));
    } else {
      stage.every(1200, (i) =>
        graph.updatePlugin({ key: 'hull', fill: FILLS[i % FILLS.length], padding: 8 + (i % 4) * 8, fillOpacity: 0.15 + (i % 3) * 0.1 }),
      );
    }
  });

export default mount;

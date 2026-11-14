// bubble-sets contour styled with fill and stroke options
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
        autoFit: 'view',
        padding: 24,
        plugins: [
          { type: 'bubble-sets', key: 'bubbles', members: ['node-0', 'node-1', 'node-2', 'node-3'], label: false, fill: '#7e3feb', fillOpacity: 0.15, stroke: '#7e3feb', strokeOpacity: 1 },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'colour', FILLS, FILLS[0]!, (c) => graph.updatePlugin({ key: 'bubbles', fill: c, stroke: c }));
      slider(stage.bar, 'fillOpacity', [0, 1, 0.05], 0.15, (fillOpacity) => graph.updatePlugin({ key: 'bubbles', fillOpacity }));
      slider(stage.bar, 'strokeOpacity', [0, 1, 0.05], 1, (strokeOpacity) => graph.updatePlugin({ key: 'bubbles', strokeOpacity }));
    } else {
      stage.every(1200, (i) => {
        const c = FILLS[i % FILLS.length];
        graph.updatePlugin({ key: 'bubbles', fill: c, stroke: c, fillOpacity: 0.1 + (i % 3) * 0.12 });
      });
    }
  });

export default mount;

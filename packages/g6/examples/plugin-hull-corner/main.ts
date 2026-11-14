// hull corner: rounded, smooth or sharp outline joints
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const CORNERS = ['rounded', 'smooth', 'sharp'];

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
          { type: 'hull', key: 'hull', members: ['node-0', 'node-1', 'node-2', 'node-3'], corner: 'rounded', padding: 14, fill: '#1783ff', stroke: '#1783ff', fillOpacity: 0.2, labelText: 'corner' },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'corner', CORNERS, 'rounded', (corner) => graph.updatePlugin({ key: 'hull', corner, labelText: corner }));
    } else {
      stage.every(1200, (i) => {
        const corner = CORNERS[i % CORNERS.length];
        graph.updatePlugin({ key: 'hull', corner, labelText: corner });
      });
    }
  });

export default mount;

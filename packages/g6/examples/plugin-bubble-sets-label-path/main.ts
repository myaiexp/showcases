// bubble-sets label path options: close to path, auto rotate, offsets
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hullData(),
        node: { style: { fill: '#ffd666' } },
        edge: { style: { stroke: '#8b9baf' } },
        autoFit: 'center',
        plugins: [
          {
            type: 'bubble-sets',
            key: 'bubbles',
            members: ['node-0', 'node-1', 'node-2', 'node-3'],
            labelText: 'cluster-a',
            labelFill: '#fff',
            labelCloseToPath: true,
            labelAutoRotate: true,
            fill: '#00c9c9',
            stroke: '#00c9c9',
            fillOpacity: 0.12,
          },
        ],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'bubbles', ...o });
    if (stage.bar) {
      toggle(stage.bar, 'labelCloseToPath', true, (labelCloseToPath) => up({ labelCloseToPath }));
      toggle(stage.bar, 'labelAutoRotate', true, (labelAutoRotate) => up({ labelAutoRotate }));
      slider(stage.bar, 'labelOffsetX', [0, 40, 1], 0, (labelOffsetX) => up({ labelOffsetX }));
      slider(stage.bar, 'labelOffsetY', [0, 40, 1], 0, (labelOffsetY) => up({ labelOffsetY }));
    } else {
      stage.every(1300, (i) => up({ labelCloseToPath: i % 4 < 2, labelAutoRotate: i % 2 === 0 }));
    }
  });

export default mount;

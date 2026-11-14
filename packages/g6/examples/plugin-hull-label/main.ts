// hull label placement, background and rotation options
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const PLACEMENTS = ['bottom', 'top', 'left', 'right', 'center'];

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
            type: 'hull',
            key: 'hull',
            members: ['node-0', 'node-1', 'node-2'],
            label: true,
            labelText: 'hull-a',
            labelPlacement: 'top',
            labelBackground: true,
            labelPadding: 5,
            labelFill: '#fff',
            labelBackgroundFill: '#1783ff',
            fill: '#1783ff',
            stroke: '#1783ff',
            fillOpacity: 0.15,
          },
        ],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'hull', ...o });
    if (stage.bar) {
      select(stage.bar, 'labelPlacement', PLACEMENTS, 'top', (labelPlacement) => up({ labelPlacement }));
      toggle(stage.bar, 'labelBackground', true, (labelBackground) => up({ labelBackground }));
      toggle(stage.bar, 'labelCloseToPath', true, (labelCloseToPath) => up({ labelCloseToPath }));
      toggle(stage.bar, 'labelAutoRotate', true, (labelAutoRotate) => up({ labelAutoRotate }));
      slider(stage.bar, 'labelOffsetX', [0, 40, 1], 0, (labelOffsetX) => up({ labelOffsetX }));
      slider(stage.bar, 'labelOffsetY', [0, 40, 1], 0, (labelOffsetY) => up({ labelOffsetY }));
    } else {
      stage.every(1200, (i) => up({ labelPlacement: PLACEMENTS[i % PLACEMENTS.length], labelAutoRotate: i % 2 === 0 }));
    }
  });

export default mount;

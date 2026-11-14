// bubble-sets label placement, background, padding and max width
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const PLACEMENTS = ['top', 'bottom', 'left', 'right', 'center'];

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
            label: true,
            labelText: 'cluster-a: a long label that may be cut',
            labelPlacement: 'top',
            labelBackground: true,
            labelPadding: 5,
            labelFill: '#fff',
            labelBackgroundFill: '#7e3feb',
            fill: '#7e3feb',
            stroke: '#7e3feb',
            fillOpacity: 0.12,
          },
        ],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'bubbles', ...o });
    if (stage.bar) {
      select(stage.bar, 'labelPlacement', PLACEMENTS, 'top', (labelPlacement) => up({ labelPlacement }));
      toggle(stage.bar, 'labelBackground', true, (labelBackground) => up({ labelBackground }));
      slider(stage.bar, 'labelPadding', [0, 20, 1], 5, (labelPadding) => up({ labelPadding }));
      slider(stage.bar, 'labelMaxWidth', [40, 300, 10], 300, (labelMaxWidth) => up({ labelMaxWidth }));
    } else {
      stage.every(1200, (i) => up({ labelPlacement: PLACEMENTS[i % PLACEMENTS.length], labelMaxWidth: i % 2 ? 300 : 90 }));
    }
  });

export default mount;

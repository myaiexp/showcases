// toolbar plugin position: eight placements, switched with updatePlugin
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom', 'right-top', 'right-bottom'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 48,
        plugins: [
          {
            type: 'toolbar',
            key: 'toolbar',
            position: 'top-left',
            getItems: () => [
              { id: 'zoom-in', value: 'zoom-in' },
              { id: 'zoom-out', value: 'zoom-out' },
              { id: 'undo', value: 'undo' },
              { id: 'redo', value: 'redo' },
              { id: 'auto-fit', value: 'auto-fit' },
            ],
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'position', POSITIONS, 'top-left', (position) => graph.updatePlugin({ key: 'toolbar', position }));
    } else {
      stage.every(1200, (i) => graph.updatePlugin({ key: 'toolbar', position: POSITIONS[i % POSITIONS.length] }));
    }
  });

export default mount;

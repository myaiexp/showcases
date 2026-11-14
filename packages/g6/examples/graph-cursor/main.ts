// cursor sets the CSS cursor over the canvas; setOptions changes it at runtime
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const CURSORS = ['default', 'pointer', 'crosshair', 'move', 'grab', 'grabbing', 'zoom-in', 'zoom-out', 'help', 'not-allowed', 'wait', 'text'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [{ id: 'cursor', style: { x: 0, y: 0 } }],
        },
        node: {
          style: {
            size: 90,
            labelText: 'cursor: crosshair',
            labelPlacement: 'center',
            labelFontSize: 14,
          },
        },
        autoFit: 'center',
        cursor: 'crosshair',
      }),
    );
    await graph.render();

    const set = async (cursor: (typeof CURSORS)[number]): Promise<void> => {
      graph.setOptions({ cursor });
      graph.updateNodeData([{ id: 'cursor', style: { labelText: `cursor: ${cursor}` } }]);
      await graph.draw();
    };

    // Hover the canvas to see the pointer; a card has no pointer, so its label cycles instead.
    if (stage.bar) select(stage.bar, 'cursor', CURSORS, 'default', (v) => void set(v));
    else stage.every(1100, (i) => set(CURSORS[i % CURSORS.length]!));
  });

export default mount;

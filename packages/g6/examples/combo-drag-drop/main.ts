// drag-element dropEffect on combos: link makes the dragged element a child, move only moves it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const EFFECTS = ['link', 'move', 'none'] as const;
type Effect = (typeof EFFECTS)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'n1', combo: 'left', style: { x: 60, y: 70 } },
            { id: 'n2', combo: 'left', style: { x: 100, y: 120 } },
            { id: 'n3', combo: 'right', style: { x: 220, y: 90 } },
            { id: 'free', style: { x: 140, y: 175 } },
          ],
          combos: [{ id: 'left' }, { id: 'right' }],
        },
        node: { style: { fill: '#7e3feb', labelText: (d) => d.id, labelPlacement: 'center', labelFontSize: 9, labelFill: '#fff' } },
        combo: { style: { padding: 16, labelText: (d) => d.id, fillOpacity: 0.12 } },
        behaviors: [{ type: 'drag-element', dropEffect: 'link' }],
      }),
    );
    await graph.render();
    const set = (v: Effect): void => {
      graph.setBehaviors([{ type: 'drag-element', dropEffect: v }]);
    };
    if (stage.bar) select(stage.bar, 'dropEffect', EFFECTS, 'link', set);
    else {
      // No pointer in a card: move the free node into a combo and out again via its data.
      stage.every(1500, async (i) => {
        graph.updateNodeData([{ id: 'free', combo: ['left', 'right', undefined][i % 3] }]);
        await graph.draw();
      });
    }
  });

export default mount;

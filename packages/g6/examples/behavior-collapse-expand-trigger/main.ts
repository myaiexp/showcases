// collapse-expand trigger: fold on a single click or on a double click
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 70, y: 50 } },
            { id: 'node2', combo: 'combo1', style: { x: 140, y: 50 } },
            { id: 'node3', combo: 'combo2', style: { x: 100, y: 130 } },
          ],
          edges: [{ source: 'node2', target: 'node3' }],
          combos: [
            { id: 'combo1', combo: 'combo2', style: { labelText: 'combo1' } },
            { id: 'combo2', style: { labelText: 'combo2' } },
          ],
        },
        // The card uses click: a single synthetic click folds the combo.
        behaviors: [{ type: 'collapse-expand', key: 'collapse', trigger: stage.preview ? 'click' : 'dblclick' }],
        autoFit: 'view',
        padding: 16,
      }),
    );
    await graph.render();
    if (stage.bar) {
      const hint = readout(el);
      hint.textContent = 'trigger: dblclick. Double-click a combo.';
      select(stage.bar, 'trigger', ['dblclick', 'click'] as const, 'dblclick', (trigger) => {
        graph.updateBehavior({ key: 'collapse', trigger });
        hint.textContent = `trigger: ${trigger}. ${trigger === 'click' ? 'Click' : 'Double-click'} a combo.`;
      });
    } else {
      stage.every(1800, () => simClick(stage, graph, graph.getElementPosition('combo1')));
    }
  });

export default mount;

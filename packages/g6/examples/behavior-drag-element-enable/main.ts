// drag-element enable as a function and trigger: choose what can be dragged, and with which key
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, overlay, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const rules = {
  'node, combo': (e: { targetType: string }) => ['node', 'combo'].includes(e.targetType),
  node: (e: { targetType: string }) => e.targetType === 'node',
  combo: (e: { targetType: string }) => e.targetType === 'combo',
  none: () => false,
};
type Rule = keyof typeof rules;
const names = Object.keys(rules) as Rule[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'c1', style: { x: 60, y: 80 } },
            { id: 'b', combo: 'c1', style: { x: 60, y: 130 } },
            { id: 'c', style: { x: 220, y: 100 } },
          ],
          edges: [{ source: 'b', target: 'c' }],
          combos: [{ id: 'c1', style: { labelText: 'combo' } }],
        },
        behaviors: [{ type: 'drag-element', key: 'drag', enable: rules['node, combo'] }],
        autoFit: 'view',
        padding: 20,
      }),
    );
    await graph.render();
    const apply = (r: Rule) => graph.updateBehavior({ key: 'drag', enable: rules[r] });
    if (stage.bar) {
      readout(el).textContent = 'Drag the lone node and the combo: enable decides which of them move.';
      select(stage.bar, 'enable', names, 'node, combo', apply);
      select(stage.bar, 'trigger', ['none', 'Shift'] as const, 'none', (k) =>
        graph.setBehaviors([{ type: 'drag-element', key: 'drag', enable: rules['node, combo'], ...(k === 'Shift' ? { trigger: ['shift'] } : {}) }]),
      );
    } else {
      const say = overlay(stage);
      stage.every(2000, async (i) => {
        const r = names[Math.floor((i - 1) / 2) % names.length]!;
        if (i % 2 === 1) {
          apply(r);
          say(`enable: ${r}`);
          const p = graph.getElementPosition('c');
          await simDrag(stage, graph, line(p, [p[0] - 25, p[1] - 25], 8), 30);
        } else {
          const p = graph.getElementPosition('c1');
          await simDrag(stage, graph, line([p[0] + 0, p[1] - 5], [p[0] + 20, p[1] - 5], 8), 30);
          await sleep(50);
          graph.updateNodeData([{ id: 'c', style: { x: 220, y: 100 } }]);
          graph.updateComboData([{ id: 'c1', style: {} }]);
          await graph.draw();
        }
      });
    }
  });

export default mount;

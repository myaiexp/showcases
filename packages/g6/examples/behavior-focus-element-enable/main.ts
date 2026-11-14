// focus-element enable and collapse-expand: focus only on nodes, next to collapsible combos
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { overlay, simClick } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const rules = {
  'any element': () => true,
  'nodes only': (e: { targetType: string }) => e.targetType === 'node',
  'combos only': (e: { targetType: string }) => e.targetType === 'combo',
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
            { id: 'node1', combo: 'combo1', style: { x: 40, y: 80, labelText: 'node1' } },
            { id: 'node2', combo: 'combo1', style: { x: 120, y: 80, labelText: 'node2' } },
            { id: 'node3', combo: 'combo2', style: { x: 330, y: 220, labelText: 'node3' } },
            { id: 'node4', style: { x: 330, y: 60, labelText: 'node4' } },
          ],
          edges: [{ source: 'node1', target: 'node2' }, { source: 'node2', target: 'node4' }],
          combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
        },
        node: { style: { labelFill: '#ddd', labelPlacement: 'bottom' } },
        behaviors: ['collapse-expand', { type: 'focus-element', key: 'focus', enable: rules['any element'] }, 'drag-canvas'],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (r: Rule) => graph.updateBehavior({ key: 'focus', enable: rules[r] });
    if (stage.bar) {
      readout(el).textContent = 'Click nodes and combos; enable decides which of them the view focuses. Double-click a combo to fold it.';
      select(stage.bar, 'enable', names, 'any element', apply);
    } else {
      const say = overlay(stage);
      const clicks: ('node4' | 'node1' | 'combo2')[] = ['node4', 'node1', 'combo2'];
      stage.every(1700, async (i) => {
        if (i % 6 === 1) {
          const r = names[Math.floor(i / 6) % names.length]!;
          apply(r);
          say(`enable: ${r}`);
        }
        await simClick(stage, graph, graph.getElementPosition(clicks[i % clicks.length]!));
      });
    }
  });

export default mount;

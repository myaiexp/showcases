// fix-element-size enable: hold the size only when zooming out, only in, or both
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const rules = {
  'zoomed out (scale < 1)': (e: { data: { scale: number } }) => e.data.scale < 1,
  'zoomed in (scale > 1)': (e: { data: { scale: number } }) => e.data.scale > 1,
  always: () => true,
};
type Rule = keyof typeof rules;
const names = Object.keys(rules) as Rule[];
const nodes = [['a', 100, 100], ['b', 260, 100], ['c', 180, 200], ['d', 340, 200]] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: nodes.map(([id, x, y]) => ({ id, style: { x, y, labelText: id } })),
          edges: ([['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd']] as [string, string][]).map(([source, target]) => ({ source, target })),
        },
        node: { style: { labelPlacement: 'bottom', labelFill: '#ddd' } },
        behaviors: ['zoom-canvas', 'drag-canvas', { type: 'fix-element-size', key: 'fix', enable: rules['zoomed out (scale < 1)'] }],
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();
    const apply = (r: Rule) => graph.updateBehavior({ key: 'fix', enable: rules[r] });
    if (stage.bar) {
      readout(el).textContent = 'Zoom out and in: only the direction chosen here keeps elements at their size.';
      select(stage.bar, 'enable', names, 'zoomed out (scale < 1)', apply);
    } else {
      const say = overlay(stage);
      stage.every(1700, async (i) => {
        const r = names[Math.floor((i - 1) / 2) % names.length]!;
        if (i % 2 === 1) {
          apply(r);
          say(r);
          await graph.zoomTo(0.4, { duration: 800 });
        } else await graph.zoomTo(2, { duration: 800 });
      });
    }
  });

export default mount;

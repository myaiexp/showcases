// lasso-select style: the outline drawn while the loop is traced
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { clearStates, loop, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const looks = {
  default: { lineWidth: 1, lineDash: [0], stroke: '#1677FF', fill: '#1677FF', fillOpacity: 0.1 },
  'dashed pink': { lineWidth: 4, lineDash: [2, 2], stroke: 'pink', fill: '#ff69b4', fillOpacity: 0.2 },
  'thick green': { lineWidth: 6, lineDash: [0], stroke: '#52c41a', fill: '#52c41a', fillOpacity: 0.25 },
};
type Look = keyof typeof looks;
const names = Object.keys(looks) as Look[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { state: { selected: { fill: '#ffa940' } } },
        behaviors: [{ type: 'lasso-select', key: 'lasso', trigger: [], style: { ...looks.default, pointerEvents: 'none' } }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (l: Look) => graph.updateBehavior({ key: 'lasso', style: looks[l] });
    if (stage.bar) {
      readout(el).textContent = 'Drag a loop; style is the outline and fill shown while drawing.';
      select(stage.bar, 'look', names, 'default', apply);
      slider(stage.bar, 'lineWidth', [1, 10, 1], 1, (lineWidth) => graph.updateBehavior({ key: 'lasso', style: { lineWidth } }));
    } else {
      stage.every(3000, async (i) => {
        await clearStates(graph);
        apply(names[i % names.length]!);
        const [x, y] = cell(1, 1, 64);
        await simDrag(stage, graph, loop(x + 32, y, 90, 60, 28), 80);
      });
    }
  });

export default mount;

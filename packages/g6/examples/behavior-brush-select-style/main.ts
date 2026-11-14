// brush-select style: the rectangle drawn while brushing
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const looks = {
  default: { lineWidth: 1, lineDash: [0], stroke: '#1677FF', fill: '#1677FF', fillOpacity: 0.1 },
  'dashed pink': { lineWidth: 4, lineDash: [2, 2], stroke: 'pink', fill: '#ff69b4', fillOpacity: 0.2 },
  gradient: {
    lineWidth: 2,
    lineDash: [0],
    stroke: '#fff',
    fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
    fillOpacity: 0.3,
  },
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
        behaviors: [{ type: 'brush-select', key: 'brush', trigger: [], style: { ...looks.default, pointerEvents: 'none' } }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (l: Look) => graph.updateBehavior({ key: 'brush', style: looks[l] });
    if (stage.bar) {
      readout(el).textContent = 'Drag a box; style is the rectangle shown while brushing.';
      select(stage.bar, 'look', names, 'default', apply);
      slider(stage.bar, 'lineWidth', [1, 10, 1], 1, (lineWidth) => graph.updateBehavior({ key: 'brush', style: { lineWidth } }));
    } else {
      stage.every(2800, async (i) => {
        apply(names[i % names.length]!);
        const [x0, y0] = cell(0, 0, 64);
        const [x1, y1] = cell(2, 3, 64);
        await simDrag(stage, graph, line([x0 - 25, y0 - 25], [x1 + 25, y1 + 25], 18), 90);
      });
    }
  });

export default mount;

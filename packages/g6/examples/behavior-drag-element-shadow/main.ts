// drag-element shadow: a ghost follows the pointer and the node moves on release
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, overlay, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const looks = {
  default: { shadowFill: '#F3F9FF', shadowFillOpacity: 0.5, shadowStroke: '#1890FF', shadowStrokeOpacity: 0.9, shadowLineDash: [5, 5] },
  'orange solid': { shadowFill: '#ffa940', shadowFillOpacity: 0.4, shadowStroke: '#ffa940', shadowStrokeOpacity: 1, shadowLineDash: [0] },
  'green dashed': { shadowFill: '#52c41a', shadowFillOpacity: 0.3, shadowStroke: '#52c41a', shadowStrokeOpacity: 1, shadowLineDash: [2, 3] },
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
        behaviors: [{ type: 'drag-element', key: 'drag', shadow: true, ...looks.default }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag a node: a ghost follows the pointer and the node jumps there on release.';
      toggle(stage.bar, 'shadow', true, (shadow) => graph.updateBehavior({ key: 'drag', shadow }));
      select(stage.bar, 'ghost style', names, 'default', (l) => graph.updateBehavior({ key: 'drag', ...looks[l] }));
    } else {
      const say = overlay(stage);
      const [x, y] = cell(1, 1, 64);
      stage.every(2200, async (i) => {
        const l = names[Math.floor((i - 1) / 2) % names.length]!;
        graph.updateBehavior({ key: 'drag', ...looks[l] });
        say(`shadow: ${l}`);
        const back = i % 2 === 0;
        await simDrag(stage, graph, back ? line([x + 40, y + 40], [x, y], 12) : line([x, y], [x + 40, y + 40], 12), 60);
      });
    }
  });

export default mount;

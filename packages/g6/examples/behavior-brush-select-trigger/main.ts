// brush-select trigger: the key held while dragging, next to drag-canvas
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const triggers = { Shift: ['shift'], Alt: ['alt'], Control: ['control'], 'Shift + Alt': ['shift', 'alt'] } satisfies Record<string, string[]>;
type Key = keyof typeof triggers;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        // A bare drag pans the canvas, so brushing needs a key. trigger: ['drag'] would break drag-canvas.
        // The card has no keys, so it drops drag-canvas and brushes with no trigger.
        behaviors: stage.preview
          ? [{ type: 'brush-select', key: 'brush', trigger: [] }]
          : ['drag-canvas', { type: 'brush-select', key: 'brush', trigger: ['shift'] }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      const hint = readout(el);
      const say = (k: Key) => (hint.textContent = `Hold ${k} and drag to brush; drag with no key pans the canvas.`);
      say('Shift');
      select(stage.bar, 'trigger', Object.keys(triggers) as Key[], 'Shift', (k) => {
        graph.updateBehavior({ key: 'brush', trigger: triggers[k] });
        say(k);
      });
    } else {
      stage.every(3000, async () => {
        await graph.setElementState(Object.fromEntries(lattice(4, 3).nodes.map((n) => [n.id, []])));
        const [x0, y0] = cell(0, 1, 64);
        const [x1, y1] = cell(1, 3, 64);
        await simDrag(stage, graph, line([x0 - 20, y0 - 20], [x1 + 20, y1 + 20], 10), 70);
      });
    }
  });

export default mount;

// click-select multiple with a trigger key, next to drag-element moving the selection
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { clearStates, simClick, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const triggers = { Shift: ['shift'], Meta: ['Meta'], Alt: ['alt'] } satisfies Record<string, string[]>;
type Key = keyof typeof triggers;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        behaviors: [
          // The card has no keys: an empty trigger means every click adds to the selection.
          { type: 'click-select', key: 'click', multiple: true, trigger: stage.preview ? [] : ['shift'] },
          'drag-element',
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      const hint = readout(el);
      const say = (k: Key) => (hint.textContent = `Hold ${k} and click to add nodes to the selection. Drag one to move them all.`);
      say('Shift');
      select(stage.bar, 'trigger', Object.keys(triggers) as Key[], 'Shift', (k) => {
        graph.updateBehavior({ key: 'click', trigger: triggers[k] });
        say(k);
      });
    } else {
      const picks = [cell(0, 1, 64), cell(1, 2, 64), cell(2, 1, 64)];
      stage.every(4200, async () => {
        await clearStates(graph);
        for (const p of picks) {
          await simClick(stage, graph, p);
          await sleep(700);
        }
      });
    }
  });

export default mount;

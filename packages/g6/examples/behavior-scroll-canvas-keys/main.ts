// scroll-canvas trigger: scroll with the arrow keys, alone or with a modifier
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simKeys } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const arrows = (mod: string[]) => ({
  up: [...mod, 'ArrowUp'],
  down: [...mod, 'ArrowDown'],
  left: [...mod, 'ArrowLeft'],
  right: [...mod, 'ArrowRight'],
});
const sets = { 'Arrow keys': [] as string[], 'Shift + arrows': ['Shift'], 'Control + arrows': ['Control'] };
type Set = keyof typeof sets;
const names = Object.keys(sets) as Set[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(7, 5, 55),
        node: { style: { size: 16 } },
        behaviors: [{ type: 'scroll-canvas', key: 'scroll', trigger: arrows([]), sensitivity: 1 }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (s: Set) => graph.updateBehavior({ key: 'scroll', trigger: arrows(sets[s]) });
    if (stage.bar) {
      const hint = readout(el);
      const say = (s: Set) => (hint.textContent = `Click the graph, then press ${s}.`);
      say('Arrow keys');
      select(stage.bar, 'trigger', names, 'Arrow keys', (s) => {
        apply(s);
        say(s);
      });
    } else {
      const say = overlay(stage);
      const keys = ['ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowUp'];
      stage.every(500, (i) => {
        const s = names[Math.floor((i - 1) / 8) % names.length]!;
        if ((i - 1) % 8 === 0) {
          apply(s);
          say(s);
        }
        return simKeys(stage, graph, [...sets[s], keys[i % keys.length]!], 80);
      });
    }
  });

export default mount;

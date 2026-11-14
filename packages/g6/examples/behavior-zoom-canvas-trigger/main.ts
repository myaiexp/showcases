// zoom-canvas trigger: zoom with the wheel only while a modifier key is held
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simKeys, simWheel } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const keys = { 'wheel only': [] as string[], 'Control + wheel': ['Control'], 'Shift + wheel': ['Shift'] };
type Key = keyof typeof keys;
const names = Object.keys(keys) as Key[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(5, 4, 50),
        behaviors: [{ type: 'zoom-canvas', key: 'zoom', trigger: [] }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (k: Key) => graph.updateBehavior({ key: 'zoom', trigger: keys[k] });
    if (stage.bar) {
      const hint = readout(el);
      const say = (k: Key) => (hint.textContent = `trigger: ${k}. Scroll over the graph${k === 'wheel only' ? '' : ' while holding the key'}.`);
      say('wheel only');
      select(stage.bar, 'trigger', names, 'wheel only', (k) => {
        apply(k);
        say(k);
      });
    } else {
      const say = overlay(stage);
      stage.every(900, async (i) => {
        const k = names[Math.floor((i - 1) / 4) % names.length]!;
        const phase = (i - 1) % 4;
        if (phase === 0) {
          apply(k);
          say(k);
        }
        // Phases 0-1 zoom in holding the keys, 2-3 zoom out without them: the second pair does nothing for keyed triggers.
        if (phase < 2) {
          const hold = simKeys(stage, graph, keys[k], 250);
          setTimeout(() => simWheel(graph, [100, 75], -60), 80);
          await hold;
        } else simWheel(graph, [100, 75], 60);
      });
    }
  });

export default mount;

// scroll-canvas sensitivity and range: scroll speed, and how far the view may travel
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simWheel } from '../../shared/behavior-sim.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const ranges = { '1 (default)': 1, '0.3': 0.3, '[0.3, 2, 0.3, 2]': [0.3, 2, 0.3, 2] } satisfies Record<string, number | number[]>;
type Range = keyof typeof ranges;
const names = Object.keys(ranges) as Range[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(7, 5, 55),
        node: { style: { size: 16 } },
        behaviors: [{ type: 'scroll-canvas', key: 'scroll', sensitivity: 1, range: 1 }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Scroll past the edge: range stops the view; sensitivity scales every wheel step.';
      slider(stage.bar, 'sensitivity', [0.2, 4, 0.1], 1, (sensitivity) => graph.updateBehavior({ key: 'scroll', sensitivity }));
      select(stage.bar, 'range', names, '1 (default)', (r) => graph.updateBehavior({ key: 'scroll', range: ranges[r] }));
    } else {
      const say = overlay(stage);
      const picks: [number, Range][] = [[1, '0.3'], [3, '0.3'], [1, '1 (default)']];
      stage.every(450, (i) => {
        const [sens, r] = picks[Math.floor((i - 1) / 8) % picks.length]!;
        if ((i - 1) % 8 === 0) {
          graph.updateBehavior({ key: 'scroll', sensitivity: sens, range: ranges[r] });
          say(`sensitivity: ${sens}, range: ${r}`);
        }
        simWheel(graph, [130, 100], (i - 1) % 8 < 4 ? 60 : -60, 0);
      });
    }
  });

export default mount;

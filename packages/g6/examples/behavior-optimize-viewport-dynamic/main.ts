// optimize-viewport-transform from a behavior function: enabled only for large graphs
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const sizes = { small: [4, 3], large: [14, 9] } as const;
type Size = keyof typeof sizes;
const names = Object.keys(sizes) as Size[];
// Edges plus nodes beyond this count switch the optimisation on.
const LIMIT = 100;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const make = (s: Size) => lattice(sizes[s][0], sizes[s][1], stage.preview ? 18 : 28);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: make('small'),
        node: { style: { size: 6 } },
        behaviors: [
          'drag-canvas',
          'zoom-canvas',
          // A function is evaluated by the graph with `this` set to it, when behaviors are applied.
          function (this: Graph) {
            const enable = this.getNodeData().length + this.getEdgeData().length > LIMIT;
            return { type: 'optimize-viewport-transform', key: 'optimize', enable, debounce: 700 };
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const say = stage.preview ? overlay(stage) : null;
    const status = stage.bar ? readout(el) : null;
    const load = async (s: Size) => {
      graph.setData(make(s));
      await graph.render();
      // Re-applying the behaviors re-runs the function against the new data.
      graph.setBehaviors((b) => [...b]);
      const n = graph.getNodeData().length + graph.getEdgeData().length;
      const text = `${s}: ${n} elements, optimisation ${n > LIMIT ? 'on' : 'off'}`;
      const short = `${n} elements: ${n > LIMIT ? 'on' : 'off'}`;
      say?.(short);
      if (status) status.textContent = `${text}. Drag the canvas and watch the edges.`;
    };
    if (stage.bar) {
      await load('small');
      select(stage.bar, 'data', names, 'small', load);
    } else {
      stage.every(2800, async (i) => {
        await load(names[i % names.length]!);
        await graph.translateBy([-30, 10], { duration: 900 });
        await graph.translateBy([30, -10], { duration: 900 });
      });
    }
  });

export default mount;

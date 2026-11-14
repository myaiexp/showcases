// hover-activate degree and direction: how far, and along which edges, activation spreads
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simHover } from '../../shared/behavior-sim.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// A small flow: edges point left to right, so in and out differ.
const nodes = [
  ['a', 20, 80], ['b', 80, 30], ['c', 80, 130], ['d', 150, 30], ['e', 150, 130], ['f', 220, 80],
] as const;
const links = [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'e'], ['d', 'f'], ['e', 'f']] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: nodes.map(([id, x, y]) => ({ id, style: { x, y, labelText: id, labelPlacement: 'center', labelFill: '#fff' } })),
          edges: links.map(([source, target]) => ({ source, target })),
        },
        node: { style: { size: 24 }, state: { active: { fill: '#ffa940' } } },
        edge: { style: { endArrow: true, lineWidth: 2 }, state: { active: { stroke: '#ffa940' } } },
        behaviors: [{ type: 'hover-activate', key: 'hover', degree: 1, direction: 'out' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Hover a node: degree hops outward, direction picks edges leaving, entering or both.';
      slider(stage.bar, 'degree', [0, 4, 1], 1, (degree) => graph.updateBehavior({ key: 'hover', degree }));
      select(stage.bar, 'direction', ['both', 'in', 'out'] as const, 'out', (direction) => graph.updateBehavior({ key: 'hover', direction }));
    } else {
      const combos = [[1, 'out'], [1, 'in'], [2, 'both'], [2, 'out']] as const;
      let k = 0;
      stage.every(1700, (i) => {
        if (i % 2 === 1) {
          const [degree, direction] = combos[k++ % combos.length]!;
          graph.updateBehavior({ key: 'hover', degree, direction });
          simHover(graph, [80, 30]);
        } else simHover(graph, null);
      });
    }
  });

export default mount;

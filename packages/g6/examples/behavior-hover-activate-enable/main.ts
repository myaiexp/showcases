// hover-activate enable as a function: react to nodes only, edges only or both
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simHover } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const rules = { 'nodes only': ['node'], 'edges only': ['edge'], both: ['node', 'edge'] };
type Rule = keyof typeof rules;
const names = Object.keys(rules) as Rule[];
const enableFor = (r: Rule) => (e: { targetType: string }) => rules[r].includes(e.targetType);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = lattice(4, 3, 64);
    data.nodes.push({ id: 'caption', style: { x: 96, y: -44, size: 1, labelText: 'both', labelFontSize: 13, labelFill: '#fff' } });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { state: { active: { fill: '#ffa940' } } },
        edge: { style: { lineWidth: 4 }, state: { active: { stroke: '#ffa940' } } },
        behaviors: [{ type: 'hover-activate', key: 'hover', enable: enableFor('both') }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Hover nodes and edges; enable decides which target types react.';
      select(stage.bar, 'enable', names, 'both', (r) => graph.updateBehavior({ key: 'hover', enable: enableFor(r) }));
    } else {
      stage.every(1000, (i) => {
        if (i % 6 === 1) {
          const r = names[Math.floor(i / 6) % names.length]!;
          graph.updateBehavior({ key: 'hover', enable: enableFor(r) });
          graph.updateNodeData([{ id: 'caption', style: { labelText: r } }]);
          void graph.draw();
        }
        // Over a node, then over the middle of an edge (the lattice edge between n11 and n12).
        const [nx, ny] = cell(1, 1, 64);
        simHover(graph, i % 2 === 0 ? [nx, ny] : [nx + 32, ny]);
      });
    }
  });

export default mount;

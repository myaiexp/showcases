// brush-select enableElements: choose whether nodes, edges or combos can be selected
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Kind = 'node' | 'edge' | 'combo';
const choices = { 'node, edge, combo': ['node', 'edge', 'combo'], node: ['node'], edge: ['edge'], combo: ['combo'], 'node, combo': ['node', 'combo'] } satisfies Record<string, Kind[]>;
type Choice = keyof typeof choices;
const names = Object.keys(choices) as Choice[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'c1', style: { x: 40, y: 60 } },
            { id: 'b', combo: 'c1', style: { x: 120, y: 60 } },
            { id: 'c', combo: 'c2', style: { x: 40, y: 150 } },
            { id: 'd', combo: 'c2', style: { x: 120, y: 150 } },
            { id: 'caption', style: { x: 80, y: 0, size: 1, labelText: '', labelFontSize: 13, labelFill: '#fff' } },
          ],
          edges: [
            { source: 'a', target: 'b' },
            { source: 'c', target: 'd' },
            { source: 'b', target: 'd' },
          ],
          combos: [{ id: 'c1' }, { id: 'c2' }],
        },
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        edge: { state: { selected: { stroke: '#ffa940', lineWidth: 4 } } },
        combo: { state: { selected: { stroke: '#ffa940', lineWidth: 3 } } },
        behaviors: [{ type: 'brush-select', key: 'brush', trigger: [], enableElements: ['node', 'edge', 'combo'] }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (c: Choice) => graph.updateBehavior({ key: 'brush', enableElements: choices[c] });
    if (stage.bar) {
      readout(el).textContent = 'Drag a box around everything, then change enableElements and brush again.';
      select(stage.bar, 'enableElements', names, names[0]!, apply);
    } else {
      stage.every(3000, async (i) => {
        const c = names[(i - 1) % names.length]!;
        apply(c);
        graph.updateNodeData([{ id: 'caption', style: { labelText: c } }]);
        await graph.draw();
        await graph.setElementState(Object.fromEntries(['a', 'b', 'c', 'd', 'c1', 'c2'].map((id) => [id, []])));
        await sleep(300);
        await simDrag(stage, graph, line([-30, 20], [170, 190], 8), 60);
      });
    }
  });

export default mount;

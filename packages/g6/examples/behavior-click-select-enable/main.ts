// click-select enable as a function: only some target types react to a click
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { clearStates, simClick, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const kinds = { 'nodes only': ['node', 'canvas'], 'edges only': ['edge', 'canvas'], 'nodes and edges': ['node', 'edge', 'canvas'] };
type Kind = keyof typeof kinds;
const names = Object.keys(kinds) as Kind[];
// The canvas stays in every list: without it a click on empty space would not clear the selection.
const enableFor = (k: Kind) => (event: { targetType: string }) => kinds[k].includes(event.targetType);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', style: { x: 40, y: 100 } },
            { id: 'b', style: { x: 140, y: 100 } },
            { id: 'c', style: { x: 240, y: 100 } },
            { id: 'caption', style: { x: 140, y: 20, size: 1, labelText: '', labelFontSize: 13, labelFill: '#fff' } },
          ],
          edges: [
            { source: 'a', target: 'b' },
            { source: 'b', target: 'c' },
          ],
        },
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        edge: { style: { lineWidth: 4 }, state: { selected: { stroke: '#ffa940' } } },
        behaviors: [{ type: 'click-select', key: 'click', enable: enableFor('nodes and edges') }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Click nodes and edges; enable decides by event.targetType which ones respond.';
      select(stage.bar, 'enable', names, 'nodes and edges', (k) => graph.updateBehavior({ key: 'click', enable: enableFor(k) }));
    } else {
      stage.every(3600, async (i) => {
        const k = names[(i - 1) % names.length]!;
        graph.updateBehavior({ key: 'click', enable: enableFor(k) });
        graph.updateNodeData([{ id: 'caption', style: { labelText: k } }]);
        await graph.draw();
        await clearStates(graph);
        await simClick(stage, graph, [40, 100]);
        await sleep(900);
        await simClick(stage, graph, [90, 100]);
      });
    }
  });

export default mount;

// lasso-select mode: default, union, intersect and diff against an existing selection
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { loop, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const modes = ['default', 'union', 'intersect', 'diff'] as const;
type Mode = (typeof modes)[number];
const ids = ['n00', 'n01', 'n02', 'n03', 'n10', 'n11', 'n12', 'n13', 'n20', 'n21', 'n22', 'n23'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = lattice(4, 3, 64);
    data.nodes.push({ id: 'caption', style: { x: 96, y: -44, size: 1, labelText: 'mode: default', labelFontSize: 13, labelFill: '#fff' } });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        behaviors: [{ type: 'lasso-select', key: 'lasso', trigger: [], mode: 'default' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const setMode = (mode: Mode) => graph.updateBehavior({ key: 'lasso', mode });
    if (stage.bar) {
      readout(el).textContent = 'Draw loops over the nodes: default replaces the selection, union adds, intersect keeps, diff toggles.';
      select(stage.bar, 'mode', modes, 'default', setMode);
    } else {
      stage.every(4200, async (i) => {
        const mode = modes[(i - 1) % modes.length]!;
        setMode(mode);
        graph.updateNodeData([{ id: 'caption', style: { labelText: `mode: ${mode}` } }]);
        await graph.draw();
        await graph.setElementState(Object.fromEntries(ids.map((id) => [id, /[01]$/.test(id) ? 'selected' : []])));
        await sleep(500);
        const [x, y] = cell(1, 1, 64);
        await simDrag(stage, graph, loop(x + 32, y, 55, 70, 18), 60);
      });
    }
  });

export default mount;

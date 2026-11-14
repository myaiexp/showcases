// brush-select mode: default, union, intersect and diff against an existing selection
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const modes = ['default', 'union', 'intersect', 'diff'] as const;
type Mode = (typeof modes)[number];
const nodeIds = ['n00', 'n01', 'n02', 'n03', 'n10', 'n11', 'n12', 'n13', 'n20', 'n21', 'n22', 'n23'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = lattice(4, 3, 64);
    // A node with no edges that carries the current mode as its label, for the card.
    data.nodes.push({ id: 'caption', style: { x: 96, y: -44, size: 1, labelText: 'mode: default', labelFontSize: 13, labelFill: '#fff' } });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        behaviors: [{ type: 'brush-select', key: 'brush', trigger: [], mode: 'default' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const setMode = (mode: Mode) => graph.updateBehavior({ key: 'brush', mode });
    if (stage.bar) {
      readout(el).textContent =
        'Drag boxes over the nodes. default replaces the selection, union adds, intersect keeps those already selected, diff toggles.';
      select(stage.bar, 'mode', modes, 'default', setMode);
    } else {
      stage.every(4200, async (i) => {
        const mode = modes[(i - 1) % modes.length]!;
        setMode(mode);
        graph.updateNodeData([{ id: 'caption', style: { labelText: `mode: ${mode}` } }]);
        await graph.draw();
        // Select the first column and a half, then brush the middle two columns over it.
        await graph.setElementState(Object.fromEntries(nodeIds.map((id) => [id, id.endsWith('0') || id.endsWith('1') ? 'selected' : []])));
        await sleep(500);
        const [x0, y0] = cell(0, 1, 64);
        const [x1, y1] = cell(2, 2, 64);
        await simDrag(stage, graph, line([x0 - 20, y0 - 20], [x1 + 20, y1 + 20], 8), 60);
      });
    }
  });

export default mount;

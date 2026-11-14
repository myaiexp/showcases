// brush-select state and onSelect: which state is applied, and the callback with the result
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const states = ['selected', 'active', 'custom'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Drag a box; onSelect reports the states it is about to apply.';
    const data = lattice(4, 3, 64);
    data.nodes.push({ id: 'caption', style: { x: 96, y: -44, size: 1, labelText: 'state: selected', labelFontSize: 13, labelFill: '#fff' } });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: {
          state: {
            selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 },
            active: { fill: '#52c41a', halo: true, haloStroke: '#52c41a' },
            custom: { fill: '#eb2f96', size: 30 },
          },
        },
        behaviors: [
          {
            type: 'brush-select',
            key: 'brush',
            trigger: [],
            state: 'selected',
            onSelect: (picked: Record<string, string | string[]>) => {
              if (log) log.textContent = `onSelect: ${Object.keys(picked).length} elements -> ${JSON.stringify(Object.values(picked)[0] ?? [])}`;
              return picked;
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) select(stage.bar, 'state', states, 'selected', (state) => graph.updateBehavior({ key: 'brush', state }));
    else {
      stage.every(3000, async (i) => {
        const state = states[(i - 1) % states.length]!;
        graph.updateBehavior({ key: 'brush', state });
        graph.updateNodeData([{ id: 'caption', style: { labelText: `state: ${state}` } }]);
        await graph.draw();
        await graph.setElementState(Object.fromEntries(lattice(4, 3).nodes.map((n) => [n.id, []])));
        const [x0, y0] = cell(0, 0, 64);
        const [x1, y1] = cell(1, 2, 64);
        await simDrag(stage, graph, line([x0 - 20, y0 - 20], [x1 + 20, y1 + 20], 8), 60);
      });
    }
  });

export default mount;

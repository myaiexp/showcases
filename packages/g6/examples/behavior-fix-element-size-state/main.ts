// fix-element-size state, reset and nodeFilter: only chosen elements keep their size
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const modes = ['state: selected', 'nodeFilter: size > 20', 'all elements'] as const;
type Mode = (typeof modes)[number];
const nodes = [['a', 100, 100, 40], ['b', 260, 100, 20], ['c', 180, 200, 40], ['d', 340, 200, 20], ['e', 20, 200, 20]] as const;

const config = (m: Mode) => {
  const base = { type: 'fix-element-size', key: 'fix', enable: true, reset: true };
  if (m === 'state: selected') return { ...base, state: 'selected' };
  if (m === 'nodeFilter: size > 20') return { ...base, nodeFilter: (d: { style?: { size?: number } }) => (d.style?.size ?? 0) > 20 };
  return base;
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: nodes.map(([id, x, y, size]) => ({ id, style: { x, y, size, labelText: id }, states: id === 'a' || id === 'b' ? ['selected'] : [] })),
          edges: ([['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'e']] as [string, string][]).map(([source, target]) => ({ source, target })),
        },
        node: { style: { labelPlacement: 'bottom', labelFill: '#ddd' }, state: { selected: { stroke: '#ffa940', lineWidth: 3 } } },
        behaviors: ['zoom-canvas', 'drag-canvas', config('state: selected')],
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();
    const apply = (m: Mode) => graph.setBehaviors(['zoom-canvas', 'drag-canvas', config(m)]);
    if (stage.bar) {
      readout(el).textContent = 'Nodes a and b are selected, a and c are large. Zoom out to see which keep their size.';
      select(stage.bar, 'limit to', modes, 'state: selected', apply);
    } else {
      const say = overlay(stage);
      stage.every(1800, async (i) => {
        if (i % 2 === 1) {
          const m = modes[Math.floor((i - 1) / 2) % modes.length]!;
          apply(m);
          say(m);
          await graph.zoomTo(0.4, { duration: 800 });
        } else await graph.zoomTo(1, { duration: 800 });
      });
    }
  });

export default mount;

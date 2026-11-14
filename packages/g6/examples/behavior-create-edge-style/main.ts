// create-edge style: stroke, width, dash and arrow of the edge being created
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const pos: Record<string, [number, number]> = { a: [40, 50], b: [220, 50], c: [40, 140], d: [220, 140] };
const looks = {
  red: { stroke: 'red', lineWidth: 3 },
  'dashed green': { stroke: '#52c41a', lineWidth: 2, lineDash: [6, 4], endArrow: true },
  'thick gold': { stroke: '#faad14', lineWidth: 6, endArrow: true },
};
type Look = keyof typeof looks;
const names = Object.keys(looks) as Look[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const made: string[] = [];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: Object.entries(pos).map(([id, [x, y]]) => ({ id, style: { x, y } })), edges: [] },
        node: { style: { size: 26 } },
        behaviors: [
          {
            type: 'create-edge',
            key: 'create',
            style: looks.red,
            onFinish: (edge: { id?: string }) => {
              if (edge.id) made.push(edge.id);
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (l: Look) => graph.updateBehavior({ key: 'create', style: looks[l] });
    if (stage.bar) {
      readout(el).textContent = 'Drag from node to node; style is applied to the edge both while dragging and once created.';
      select(stage.bar, 'style', names, 'red', apply);
    } else {
      const pairs = [['a', 'b'], ['c', 'd'], ['a', 'd']];
      stage.every(2200, async (i) => {
        if (i % 4 === 0) {
          graph.removeEdgeData(made.splice(0));
          await graph.draw();
          return;
        }
        apply(names[(i % 4) - 1]!);
        const [s, t] = pairs[(i % 4) - 1]!;
        await simDrag(stage, graph, line(pos[s!]!, pos[t!]!, 12), 30);
        await sleep(50);
      });
    }
  });

export default mount;

// create-edge onCreate and onFinish: reshape the edge data first, then react to it
import { Graph } from '@antv/g6';
import type { EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const pos: Record<string, [number, number]> = { a: [40, 50], b: [220, 50], c: [40, 140], d: [220, 140] };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Drag from node to node; onCreate labels the edge, onFinish reports it.';
    const made: string[] = [];
    let n = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: Object.entries(pos).map(([id, [x, y]]) => ({ id, style: { x, y, labelText: id, labelPlacement: 'center', labelFill: '#fff' } })), edges: [] },
        node: { style: { size: 26 } },
        edge: { style: { endArrow: true } },
        behaviors: [
          {
            type: 'create-edge',
            key: 'create',
            // Returning the data adds the edge; returning nothing would drop it.
            onCreate: (edge: EdgeData): EdgeData => {
              n += 1;
              return { ...edge, style: { ...edge.style, labelText: `link ${n}`, labelFill: '#fff', labelBackground: true } };
            },
            onFinish: (edge: EdgeData) => {
              made.push(String(edge.id));
              if (log) log.textContent = `onFinish: ${edge.source} -> ${edge.target}`;
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (!stage.bar) {
      const pairs = [['a', 'b'], ['c', 'd'], ['b', 'c']];
      stage.every(2200, async (i) => {
        if (i % 4 === 0) {
          graph.removeEdgeData(made.splice(0));
          n = 0;
          await graph.draw();
          return;
        }
        const [s, t] = pairs[(i % 4) - 1]!;
        await simDrag(stage, graph, line(pos[s!]!, pos[t!]!, 12), 30);
        await sleep(50);
      });
    }
  });

export default mount;

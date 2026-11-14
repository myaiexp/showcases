// create-edge with trigger: 'drag': drag from one node to another to join them
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const pos: Record<string, [number, number]> = { a: [40, 40], b: [220, 40], c: [40, 140], d: [220, 140], e: [130, 90] };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const made: string[] = [];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: Object.entries(pos).map(([id, [x, y]]) => ({ id, style: { x, y, labelText: id, labelPlacement: 'center', labelFill: '#fff' } })),
          edges: [],
        },
        node: { style: { size: 26 } },
        edge: { style: { endArrow: true } },
        behaviors: [
          {
            type: 'create-edge',
            key: 'create',
            trigger: 'drag',
            // Remember the ids so the card can clear what it made.
            onFinish: (edge: { id?: string }) => {
              if (edge.id) made.push(edge.id);
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Press on a node and drag onto another one. Releasing elsewhere cancels the edge.';
      button(stage.bar, 'remove new edges', () => {
        graph.removeEdgeData(made.splice(0));
        void graph.draw();
      });
    } else {
      const pairs = [['a', 'b'], ['c', 'e'], ['d', 'a'], ['e', 'b']];
      stage.every(2200, async (i) => {
        if (i % 4 === 0) {
          graph.removeEdgeData(made.splice(0));
          await graph.draw();
          return;
        }
        const [s, t] = pairs[i % pairs.length]!;
        await simDrag(stage, graph, line(pos[s!]!, pos[t!]!, 12), 30);
        await sleep(100);
      });
    }
  });

export default mount;

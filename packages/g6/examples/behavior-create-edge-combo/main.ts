// create-edge between combos: combos are valid ends of a new edge, like nodes
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const made: string[] = [];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 50, y: 70 } },
            { id: 'node2', combo: 'combo1', style: { x: 50, y: 120 } },
            { id: 'node3', combo: 'combo2', style: { x: 220, y: 90 } },
            { id: 'node4', style: { x: 135, y: 30 } },
          ],
          edges: [],
          combos: [
            { id: 'combo1', style: { labelText: 'combo1' } },
            { id: 'combo2', style: { labelText: 'combo2' } },
          ],
        },
        edge: { style: { endArrow: true, lineWidth: 2 } },
        behaviors: [
          {
            type: 'create-edge',
            key: 'create',
            onFinish: (edge: { id?: string }) => {
              if (edge.id) made.push(edge.id);
            },
          },
        ],
        autoFit: 'view',
        padding: 16,
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Drag from a combo or a node onto a combo or a node.';
    else {
      stage.every(2400, async (i) => {
        if (i % 3 === 0) {
          graph.removeEdgeData(made.splice(0));
          await graph.draw();
          return;
        }
        const [a, b] = i % 3 === 1 ? ['combo1', 'combo2'] : ['node4', 'combo1'];
        await simDrag(stage, graph, line(graph.getElementPosition(a!), graph.getElementPosition(b!), 12), 30);
        await sleep(50);
      });
    }
  });

export default mount;

// create-edge with trigger: 'click': click a source node, then a target node
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simClick, sleep } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
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
            trigger: 'click',
            onFinish: (edge: { id?: string }) => {
              if (edge.id) made.push(edge.id);
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Click a node, move the pointer, then click another node. Click the canvas to cancel.';
    else {
      const pairs = [['a', 'e'], ['e', 'd'], ['c', 'b']];
      stage.every(2600, async (i) => {
        if (i % 4 === 0) {
          graph.removeEdgeData(made.splice(0));
          await graph.draw();
          return;
        }
        const [s, t] = pairs[i % pairs.length]!;
        await simClick(stage, graph, pos[s!]!);
        await sleep(900);
        await simClick(stage, graph, pos[t!]!);
      });
    }
  });

export default mount;

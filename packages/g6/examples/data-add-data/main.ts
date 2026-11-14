// addData() adds nodes and edges together, with an object or with a function of the previous data
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(6, 'n', 90),
        node: { style: { size: 24, labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      {
        label: 'addData({ nodes, edges })',
        run: () =>
          graph.addData({
            nodes: [{ id: 'x1', style: { x: 200, y: -30 } }, { id: 'x2', style: { x: 200, y: 50 } }],
            edges: [{ source: 'x1', target: 'x2' }, { source: 'n1', target: 'x1' }],
          }),
      },
      {
        // The function receives the current data; only what it returns is added.
        label: 'addData(prev => ({ nodes, edges }))',
        run: () =>
          graph.addData((prev) => ({
            nodes: [{ id: `x${(prev.nodes ?? []).length}`, style: { x: 270, y: 10 } }],
            edges: [{ source: 'n0', target: `x${(prev.nodes ?? []).length}` }],
            combos: [],
          })),
      },
      { label: 'Reset', run: () => graph.setData(ring(6, 'n', 90)) },
    ]);
  });

export default mount;

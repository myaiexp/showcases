// setData() replaces the graph's data, with an object or with a function of the previous data
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
        autoFit: 'view',
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      {
        label: 'setData({ nodes, edges })',
        run: () =>
          graph.setData({
            nodes: [
              { id: 'a', style: { x: 0, y: 0 } },
              { id: 'b', style: { x: 120, y: -40 } },
              { id: 'c', style: { x: 120, y: 40 } },
            ],
            edges: [{ source: 'a', target: 'b' }, { source: 'a', target: 'c' }],
          }),
      },
      {
        label: 'setData(prev => ({ ...prev, nodes: [...] }))',
        run: () =>
          graph.setData((prev) => ({
            ...prev,
            nodes: [...(prev.nodes ?? []), { id: `n${(prev.nodes ?? []).length}`, style: { x: 60, y: 90 } }],
          })),
      },
      { label: 'Reset', run: () => graph.setData(ring(6, 'n', 90)) },
    ]);
  });

export default mount;

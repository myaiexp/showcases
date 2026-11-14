// updateEdgeData() merges new style or data into edges, found by id
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
        node: { style: { size: 22, labelText: (d) => d.id } },
        edge: { style: { stroke: '#4a5a7a', labelText: (d) => d.data?.label as string | undefined, labelBackground: true } },
        autoFit: 'view',
        animation: { duration: 600 },
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: "updateEdgeData([{ id: 'n0-n1', style: { lineWidth: 2 } }])", run: () => graph.updateEdgeData([{ id: 'n0-n1', style: { lineWidth: 5 } }]) },
      {
        label: "updateEdgeData([{ id, style, data }]) colour and label",
        run: () => graph.updateEdgeData([{ id: 'n2-n3', style: { stroke: '#ff9f43', lineWidth: 3 }, data: { label: 'updated' } }]),
      },
      {
        label: 'updateEdgeData(prev => ...) add arrows',
        run: () => graph.updateEdgeData((prev) => prev.map((e) => ({ id: e.id, style: { endArrow: true } }))),
      },
      { label: 'Reset', run: () => graph.setData(ring(6, 'n', 90)) },
    ]);
  });

export default mount;

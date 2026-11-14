// edge.type as a function of the edge datum: pick polyline or line per edge
import { Graph, type EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'a', style: { x: 40, y: 40 } },
            { id: 'b', style: { x: 220, y: 100 } },
            { id: 'c', style: { x: 40, y: 160 } },
          ],
          edges: [
            { id: 'a-b', source: 'a', target: 'b', data: { edgeType: 'polyline' } },
            { id: 'c-b', source: 'c', target: 'b', data: { edgeType: 'line' } },
          ],
        },
        edge: {
          // Called once per edge with its data; the return value is the edge type.
          type: (datum: EdgeData) => String(datum.data?.edgeType ?? 'line'),
          style: { lineWidth: 2, endArrow: true, labelText: (d) => String(d.data?.edgeType), labelBackground: true },
        },
      }),
    );
    await graph.render();

    const types = ['line', 'polyline', 'quadratic', 'cubic'] as const;
    const set = async (t: string): Promise<void> => {
      graph.updateEdgeData([{ id: 'a-b', data: { edgeType: t } }]);
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, "edge a-b's data.edgeType", types, 'polyline', (v) => void set(v));
    else stage.every(1500, (i) => set(types[i % types.length]!));
  });

export default mount;

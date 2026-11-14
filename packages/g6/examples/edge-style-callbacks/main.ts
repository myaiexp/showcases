// Edge style properties as functions of the edge datum
import { Graph, type EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = rows(3, { gap: 50 });
    data.edges![0]!.data = { important: true, kind: 'solid', arrow: true };
    data.edges![1]!.data = { important: false, kind: 'dashed', arrow: true };
    data.edges![2]!.data = { important: false, kind: 'solid', arrow: false };

    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data,
        edge: {
          style: {
            stroke: '#5CACEE',
            lineWidth: (d: EdgeData) => (d.data?.important ? 6 : 1),
            lineDash: (d: EdgeData) => (d.data?.kind === 'dashed' ? [6, 4] : []),
            endArrow: (d: EdgeData) => Boolean(d.data?.arrow),
            labelText: (d: EdgeData) => `${d.id}: ${d.data?.important ? 'important' : 'normal'}`,
            labelBackground: true,
            labelOffsetY: -8,
          },
        },
      }),
    );
    await graph.render();

    const flip = async (): Promise<void> => {
      const e = graph.getEdgeData();
      graph.updateEdgeData(e.map((d) => ({ id: d.id, data: { ...d.data, important: !d.data?.important, arrow: !d.data?.arrow } })));
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'flip data.important and data.arrow', () => void flip());
    else stage.every(1500, flip);
  });

export default mount;

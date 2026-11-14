// Edge visibility: hide and show an edge while its nodes stay put
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(3, { gap: 50 }),
        edge: {
          style: {
            lineWidth: 2,
            stroke: '#5CACEE',
            endArrow: true,
            labelText: (d) => String(d.id),
            labelBackground: true,
            // The middle edge starts hidden; the data carries the value.
            visibility: (d) => (d.style?.visibility === 'hidden' ? 'hidden' : 'visible'),
          },
        },
      }),
    );
    await graph.render();
    const set = async (visible: boolean): Promise<void> => {
      graph.updateEdgeData([{ id: 'e1', style: { visibility: visible ? 'visible' : 'hidden' } }]);
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'e1 visible', true, (v) => void set(v));
    else stage.every(1300, (i) => set(i % 2 === 1));
  });

export default mount;

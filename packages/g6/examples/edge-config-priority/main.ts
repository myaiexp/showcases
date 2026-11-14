// Edge data style versus global style: a callback lets the data win
import { Graph, type EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
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
            { id: 'a', style: { x: 40, y: 30 } },
            { id: 'b', style: { x: 220, y: 30 } },
            { id: 'c', style: { x: 40, y: 110 } },
            { id: 'd', style: { x: 220, y: 110 } },
          ],
          edges: [
            // This edge carries orange in its own data.
            { id: 'orange', source: 'a', target: 'b', style: { stroke: 'orange' } },
            { id: 'plain', source: 'c', target: 'd' },
          ],
        },
        edge: {
          type: 'line',
          // A plain value here would override the data; the callback reads the data first.
          style: { lineWidth: 4, stroke: (d: EdgeData) => d.style?.stroke ?? '#5CACEE', labelText: (d) => String(d.id) },
        },
      }),
    );
    await graph.render();

    // graph.setEdge has the highest priority of the three ways to configure edges.
    const setPriority = async (dataWins: boolean): Promise<void> => {
      graph.setEdge({
        type: 'line',
        style: {
          lineWidth: 4,
          stroke: dataWins ? (d: EdgeData) => d.style?.stroke ?? '#5CACEE' : '#5CACEE',
          labelText: (d: EdgeData) => String(d.id),
        },
      });
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'data style wins', true, (v) => void setPriority(v));
    else stage.every(1600, (i) => setPriority(i % 2 === 0));
  });

export default mount;

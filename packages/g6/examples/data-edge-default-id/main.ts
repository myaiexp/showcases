// An edge without an id gets "source-target"; labels show the generated ids
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mark } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', style: { x: 0, y: 0 } },
            { id: 'node2', style: { x: 160, y: -50 } },
            { id: 'node3', style: { x: 160, y: 60 } },
          ],
          // No ids here, except on the last edge, which keeps its own.
          edges: [
            { source: 'node1', target: 'node2' },
            { source: 'node1', target: 'node3' },
            { id: 'my-edge', source: 'node2', target: 'node3' },
          ],
        },
        node: { style: { size: 26, labelText: (d) => d.id } },
        edge: { style: { endArrow: true, lineWidth: 2, labelText: (d) => d.id, labelBackground: true } },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    if (stage.bar) {
      readout(el).textContent = `getEdgeData().map(e => e.id) -> ${JSON.stringify(graph.getEdgeData().map((e) => e.id))}`;
    } else {
      const ids = graph.getEdgeData().map((e) => String(e.id));
      stage.every(1100, (i) => mark(graph, { [ids[i % ids.length]!]: 'highlight' }));
    }
  });

export default mount;

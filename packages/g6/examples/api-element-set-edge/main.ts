// setEdge replaces the edge style mapping: type, colour, width and arrow change for all edges
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', style: { x: 0, y: 0 } },
            { id: 'b', style: { x: 100, y: -50 } },
            { id: 'c', style: { x: 100, y: 50 } },
            { id: 'd', style: { x: 200, y: 0 } },
          ],
          edges: [
            { id: 'a-b', source: 'a', target: 'b' },
            { id: 'a-c', source: 'a', target: 'c' },
            { id: 'b-d', source: 'b', target: 'd' },
            { id: 'c-d', source: 'c', target: 'd' },
          ],
        },
        node: { style: { size: 30, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "setEdge({ style: { stroke: 'orange' } })", run: async () => (graph.setEdge({ style: { stroke: 'orange', lineWidth: 2 } }), graph.draw()) },
      { label: "setEdge({ type: 'cubic', style: { endArrow } })", run: async () => (graph.setEdge({ type: 'cubic-horizontal', style: { stroke: '#61DDAA', lineWidth: 3, endArrow: true } }), graph.draw()) },
      { label: "setEdge({ style: { lineDash: [6, 4] } })", run: async () => (graph.setEdge({ type: 'line', style: { stroke: '#5B8FF9', lineWidth: 3, lineDash: [6, 4] } }), graph.draw()) },
    ]);
  });

export default mount;

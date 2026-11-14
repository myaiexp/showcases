// getElementType names the type an element is drawn with, for nodes, edges and a combo
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
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
            { id: 'a', type: 'circle', combo: 'box', style: { x: 0, y: 0 } },
            { id: 'b', type: 'rect', style: { x: 110, y: 0 } },
            { id: 'c', type: 'diamond', style: { x: 220, y: 0 } },
            { id: 'd', type: 'star', style: { x: 110, y: 90 } },
          ],
          edges: [
            { id: 'a-b', source: 'a', target: 'b', type: 'line' },
            { id: 'b-c', source: 'b', target: 'c', type: 'quadratic' },
            { id: 'b-d', source: 'b', target: 'd', type: 'cubic' },
          ],
          combos: [{ id: 'box', type: 'rect' }],
        },
        node: {
          style: { size: 36, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' },
          state: { selected: { fill: '#F6BD16', stroke: '#fff', lineWidth: 2 } },
        },
        edge: { style: { lineWidth: 2 }, state: { selected: { stroke: '#F6BD16', lineWidth: 4 } } },
        combo: { state: { selected: { stroke: '#F6BD16', lineWidth: 3 } } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    // Each step asks for one id and marks it, so the answer and its element are seen together.
    const ask = (id: string) => async (): Promise<string> => {
      await mark(graph, { [id]: 'selected' });
      return graph.getElementType(id);
    };
    steps(stage, el, ['a', 'b', 'c', 'd', 'a-b', 'b-c', 'b-d', 'box'].map((id) => ({ label: `getElementType('${id}')`, run: ask(id) })), {
      ms: 1300,
    });
  });

export default mount;

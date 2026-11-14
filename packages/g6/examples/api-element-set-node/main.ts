// setNode replaces the node style mapping: every node is restyled at once, draw applies it
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps, strip } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: strip(4, 70),
        node: { style: { size: 34, fill: '#5B8FF9', labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "setNode({ style: { fill: 'red' } })", run: async () => (graph.setNode({ style: { fill: 'red' } }), graph.draw()) },
      {
        label: "setNode({ type: 'rect', style: { size: 40 } })",
        run: async () => (graph.setNode({ type: 'rect', style: { size: 40, fill: '#F6BD16', radius: 6 } }), graph.draw()),
      },
      {
        label: "setNode({ type: 'star', style: { size: 46 } })",
        run: async () => (graph.setNode({ type: 'star', style: { size: 46, fill: '#61DDAA' } }), graph.draw()),
      },
      {
        label: 'setNode({ style: { size: 34 } })',
        run: async () => (graph.setNode({ style: { size: 34, fill: '#5B8FF9', labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } }), graph.draw()),
      },
    ]);
  });

export default mount;

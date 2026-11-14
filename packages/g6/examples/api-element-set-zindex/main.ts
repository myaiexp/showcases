// setElementZIndex on one element: the chosen overlapping node moves above or below the others
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const COLORS = ['#5B8FF9', '#F6BD16', '#E86452', '#61DDAA'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: COLORS.map((fill, i) => ({ id: `n${i + 1}`, style: { x: i * 40, y: i % 2 ? 24 : 0, fill } })) },
        node: { style: { size: 76, stroke: '#fff', lineWidth: 2, labelText: (d: NodeData) => d.id, labelPlacement: 'center', labelFill: '#000' } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "setElementZIndex('n1', 10)", run: () => graph.setElementZIndex('n1', 10) },
      { label: "setElementZIndex('n3', 20)", run: () => graph.setElementZIndex('n3', 20) },
      { label: "setElementZIndex('n4', -1)", run: () => graph.setElementZIndex('n4', -1) },
      { label: "setElementZIndex('n2', 30)", run: () => graph.setElementZIndex('n2', 30) },
    ], { ms: 1400 });
  });

export default mount;

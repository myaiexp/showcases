// getElementZIndex reads each overlapping circle's zIndex while setElementZIndex reorders them
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const COLORS = ['#5B8FF9', '#F6BD16', '#E86452'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: COLORS.map((fill, i) => ({ id: `n${i + 1}`, style: { x: i * 45, y: 0, fill } })) },
        node: { style: { size: 80, stroke: '#fff', lineWidth: 2, labelText: (d: NodeData) => d.id, labelPlacement: 'center', labelFill: '#000' } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const all = (): string => ['n1', 'n2', 'n3'].map((id) => `${id}:${graph.getElementZIndex(id)}`).join('  ');
    steps(stage, el, [
      { label: 'getElementZIndex(n1..n3)', run: all },
      { label: "setElementZIndex('n1', 10)", run: async () => (await graph.setElementZIndex('n1', 10), all()) },
      { label: "setElementZIndex('n2', 20)", run: async () => (await graph.setElementZIndex('n2', 20), all()) },
      { label: "setElementZIndex('n1', -5)", run: async () => (await graph.setElementZIndex('n1', -5), all()) },
    ]);
  });

export default mount;

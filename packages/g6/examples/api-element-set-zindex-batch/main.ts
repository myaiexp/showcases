// setElementZIndex with an id-to-zIndex map reorders every overlapping node in one call
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
      { label: '{ n1: 1, n2: 2, n3: 3, n4: 4 }', run: () => graph.setElementZIndex({ n1: 1, n2: 2, n3: 3, n4: 4 }) },
      { label: '{ n1: 4, n2: 3, n3: 2, n4: 1 }', run: () => graph.setElementZIndex({ n1: 4, n2: 3, n3: 2, n4: 1 }) },
      { label: '{ n2: 9, n4: 8, n1: 0, n3: 0 }', run: () => graph.setElementZIndex({ n2: 9, n4: 8, n1: 0, n3: 0 }) },
    ], { ms: 1500 });
  });

export default mount;

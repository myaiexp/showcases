// frontElement with an array: a selected group is lifted above the rest, keeping its own order
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const COLORS = ['#5B8FF9', '#F6BD16', '#E86452', '#61DDAA', '#B37FEB'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: COLORS.map((fill, i) => ({ id: `n${i + 1}`, style: { x: i * 34, y: i % 2 ? 22 : 0, fill } })) },
        node: { style: { size: 70, stroke: '#fff', lineWidth: 2, labelText: (d: NodeData) => d.id, labelPlacement: 'center', labelFill: '#000' } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "frontElement(['n1', 'n3', 'n5'])", run: () => graph.frontElement(['n1', 'n3', 'n5']) },
      { label: "frontElement(['n2', 'n4'])", run: () => graph.frontElement(['n2', 'n4']) },
      { label: "frontElement(['n5', 'n4', 'n3'])", run: () => graph.frontElement(['n5', 'n4', 'n3']) },
    ], { ms: 1500 });
  });

export default mount;

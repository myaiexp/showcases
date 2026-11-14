// translateElementTo with an id-to-position map arranges several nodes into a new layout, animated
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const ids = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: ids.map((id, i) => ({ id, style: { x: i * 42, y: 0 } })),
          edges: ids.slice(1).map((id, i) => ({ id: `e${i}`, source: ids[i]!, target: id })),
        },
        node: { style: { size: 28, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const place = (f: (i: number) => [number, number]) => () =>
      graph.translateElementTo(Object.fromEntries(ids.map((id, i) => [id, f(i)])), true);
    steps(stage, el, [
      { label: 'a circle: { n1: [x, y], ... }', run: place((i) => [Math.cos((i / 6) * Math.PI * 2) * 70 + 105, Math.sin((i / 6) * Math.PI * 2) * 70]) },
      { label: 'two rows', run: place((i) => [(i % 3) * 70 + 35, i < 3 ? -35 : 35]) },
      { label: 'back in a line', run: place((i) => [i * 42, 0]) },
    ], { ms: 1800 });
  });

export default mount;

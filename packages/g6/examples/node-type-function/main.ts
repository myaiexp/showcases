// node.type as a function of the datum: one circle, one rect, both size 20
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Size = '20' | '[20, 10]' | '[10, 30]';
const SIZES: Record<Size, number | [number, number]> = { '20': 20, '[20, 10]': [20, 10], '[10, 30]': [10, 30] };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'node-1', style: { x: 50, y: 50 } },
            { id: 'node-2', style: { x: 150, y: 50 } },
          ],
          edges: [{ source: 'node-1', target: 'node-2' }],
        },
        node: {
          // Called once per node with its data; the return value is the node type.
          type: (datum: NodeData) => (datum.id === 'node-1' ? 'circle' : 'rect'),
          style: {
            fill: 'pink',
            size: 20,
          },
        },
        edge: {
          style: {
            stroke: 'lightgreen',
          },
        },
      }),
    );

    await graph.render();

    // A number is the circle's diameter and the rect's side; an array is [width, height].
    const setSize = async (size: Size): Promise<void> => {
      graph.setNode({ type: (d: NodeData) => (d.id === 'node-1' ? 'circle' : 'rect'), style: { fill: 'pink', size: SIZES[size] } });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'size', Object.keys(SIZES) as Size[], '20', (v) => void setSize(v));
    else {
      const order: Size[] = ['20', '[20, 10]', '[10, 30]'];
      stage.every(2000, (i) => setSize(order[i % order.length]!));
    }
  });

export default mount;

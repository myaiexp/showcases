// Orth router padding: the minimum distance between a node and the first corner
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const edgeOf = (padding: number): EdgeOptions => ({
  type: 'polyline',
  style: { stroke: '#FFC53D', lineWidth: 2, endArrow: true, router: { type: 'orth', padding }, labelText: `padding ${padding}`, labelAutoRotate: false, labelBackground: true, labelFill: '#222', labelBackgroundFill: '#fffbe6' },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let padding = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          // The target sits left of and below the source, so the path must wrap round the nodes.
          nodes: [
            { id: 'node1', style: { x: 180, y: 50 } },
            { id: 'node2', style: { x: 90, y: 130 } },
          ],
          edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
        },
        edge: edgeOf(padding),
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const set = async (p: number): Promise<void> => {
      graph.setEdge(edgeOf(p));
      await graph.draw();
    };
    if (stage.bar) slider(stage.bar, 'router.padding', [0, 60, 1], padding, (v) => void set(v));
    else stage.every(1100, (i) => set([0, 30, 60, 15][i % 4]!));
  });

export default mount;

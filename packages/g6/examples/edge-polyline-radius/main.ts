// Polyline radius rounds each corner of an orthogonally routed edge
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const edgeOf = (radius: number): EdgeOptions => ({
  type: 'polyline',
  style: { stroke: '#7e3feb', lineWidth: 3, radius, router: { type: 'orth' }, labelText: `radius ${radius}`, labelAutoRotate: false, labelBackground: true, labelFill: '#222', labelBackgroundFill: '#f9f0ff' },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let radius = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'node1', style: { x: 40, y: 150 } },
            { id: 'node2', style: { x: 240, y: 40 } },
          ],
          edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
        },
        edge: edgeOf(radius),
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const set = async (r: number): Promise<void> => {
      graph.setEdge(edgeOf(r));
      await graph.draw();
    };
    if (stage.bar) slider(stage.bar, 'radius', [0, 100, 1], radius, (v) => void set(v));
    else stage.every(1000, (i) => set([0, 20, 50, 20][i % 4]!));
  });

export default mount;

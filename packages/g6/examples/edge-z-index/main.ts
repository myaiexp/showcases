// Edge zIndex: which of two crossing edges is drawn on top
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const edgeOf = (redZ: number): EdgeOptions => ({
  style: {
    lineWidth: 10,
    stroke: (d) => (d.id === 'red' ? '#F5222D' : '#1890FF'),
    zIndex: (d) => (d.id === 'red' ? redZ : 1),
    labelText: (d) => `${d.id} zIndex ${d.id === 'red' ? redZ : 1}`,
    labelFill: '#fff',
    labelFontSize: 11,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let redZ = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'a', style: { x: 40, y: 20 } },
            { id: 'b', style: { x: 220, y: 140 } },
            { id: 'c', style: { x: 40, y: 140 } },
            { id: 'd', style: { x: 220, y: 20 } },
          ],
          edges: [
            { id: 'red', source: 'a', target: 'b' },
            { id: 'blue', source: 'c', target: 'd' },
          ],
        },
        edge: edgeOf(redZ),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(redZ));
      await graph.draw();
    };
    if (stage.bar) slider(stage.bar, 'red edge zIndex (blue is 1)', [-1, 3, 1], redZ, (v) => ((redZ = v), void apply()));
    else stage.every(1300, (i) => ((redZ = i % 2 ? 0 : 2), apply()));
  });

export default mount;

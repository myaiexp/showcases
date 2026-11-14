// transforms rewrite data before drawing: parallel edges are fanned out, node size follows degree
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Mode = 'bundle' | 'merge';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: ['hub', 'a', 'b', 'c', 'd', 'e'].map((id, i) => ({
            id,
            style: id === 'hub' ? { x: 0, y: 0 } : { x: Math.cos(i * 1.256) * 130, y: Math.sin(i * 1.256) * 110 },
          })),
          edges: [
            { id: 'h-a-1', source: 'hub', target: 'a' },
            { id: 'h-a-2', source: 'hub', target: 'a' },
            { id: 'h-a-3', source: 'hub', target: 'a' },
            { id: 'h-b', source: 'hub', target: 'b' },
            { id: 'h-c', source: 'hub', target: 'c' },
            { id: 'h-d', source: 'hub', target: 'd' },
            { id: 'h-e', source: 'hub', target: 'e' },
            { id: 'b-c', source: 'b', target: 'c' },
          ],
        },
        node: { style: { labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        autoFit: 'view',
        transforms: [
          // Registered name 'process-parallel-edges': the three hub-a edges no longer overlap.
          { type: 'process-parallel-edges', key: 'parallel', mode: 'bundle', distance: 20 },
          // The docs' example writes field/max/min; 5.1.1 takes centrality, minSize and maxSize.
          { type: 'map-node-size', centrality: { type: 'degree' }, minSize: 14, maxSize: 44 },
        ],
      }),
    );
    await graph.render();

    const mode = async (m: Mode): Promise<void> => {
      graph.updateTransform({ key: 'parallel', mode: m });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'parallel edges mode', ['bundle', 'merge'] as const, 'bundle', (v) => void mode(v));
    else stage.every(1800, (i) => mode(i % 2 ? 'bundle' : 'merge'));
  });

export default mount;

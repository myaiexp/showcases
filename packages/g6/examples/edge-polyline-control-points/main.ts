// Polyline controlPoints read from the edge data with a style callback
import { Graph, type EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'node-1', style: { x: 30, y: 140 } },
            { id: 'node-2', style: { x: 250, y: 40 } },
          ],
          // controlPoints sit on the edge datum itself, outside style.
          edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', controlPoints: [[190, 130]] }],
        },
        edge: {
          type: 'polyline',
          style: { stroke: '#7e3feb', lineWidth: 2, endArrow: true, controlPoints: (d: EdgeData) => d.controlPoints as [number, number][] },
        },
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const sets = [[[190, 130]], [[60, 40]], [[150, 90], [150, 20]], [[]]] as unknown as [number, number][][];
    let k = 0;
    const next = async (): Promise<void> => {
      k++;
      graph.updateEdgeData([{ id: 'edge-1', controlPoints: sets[k % sets.length] } as never]);
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'next control points', () => void next());
    else stage.every(1500, next);
  });

export default mount;

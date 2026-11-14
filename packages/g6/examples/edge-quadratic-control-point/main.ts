// Quadratic controlPoints given explicitly: drag the orange node to bend the edge
import { Graph, type IElementEvent, type Point } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const cp: Point = [140, 20];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'a', style: { x: 30, y: 110 } },
            { id: 'b', style: { x: 250, y: 110 } },
            // A handle at the control point.
            { id: 'cp', type: 'circle', style: { x: cp[0], y: cp[1], size: 8, fill: 'orange' } },
          ],
          edges: [{ id: 'e', type: 'quadratic', source: 'a', target: 'b', style: { controlPoints: [cp] } }],
        },
        edge: { style: { stroke: '#7e3feb', lineWidth: 2 } },
        behaviors: [{ type: 'drag-element', enable: (e: IElementEvent) => e.target.id === 'cp' }],
      }),
    );
    await graph.render();
    const sync = async (): Promise<void> => {
      graph.updateEdgeData([{ id: 'e', style: { controlPoints: [graph.getElementPosition('cp').slice(0, 2) as Point] } }]);
      await graph.draw();
    };
    if (stage.bar) graph.on('node:drag', () => void sync());
    else {
      stage.every(1200, async (i) => {
        await graph.translateElementTo({ cp: [i % 2 ? 60 : 200, i % 3 ? 20 : 180] }, true);
        await sync();
      });
    }
  });

export default mount;

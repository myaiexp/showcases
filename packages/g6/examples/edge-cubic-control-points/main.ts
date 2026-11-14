// Cubic controlPoints given explicitly: drag the two orange nodes to bend the edge
import { Graph, type IElementEvent, type Point } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const cps: [Point, Point] = [[90, 20], [190, 150]];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'a', style: { x: 30, y: 90 } },
            { id: 'b', style: { x: 250, y: 90 } },
            // Handles that show where each control point sits.
            { id: 'cp0', type: 'circle', style: { x: cps[0][0], y: cps[0][1], size: 8, fill: 'orange' } },
            { id: 'cp1', type: 'circle', style: { x: cps[1][0], y: cps[1][1], size: 8, fill: 'orange' } },
          ],
          edges: [{ id: 'e', type: 'cubic', source: 'a', target: 'b', style: { controlPoints: cps } }],
        },
        edge: { style: { stroke: '#7e3feb', lineWidth: 2 } },
        // The pointer moves only the handles; the endpoints stay put.
        behaviors: [{ type: 'drag-element', enable: (e: IElementEvent) => String(e.target.id).startsWith('cp') }],
      }),
    );
    await graph.render();
    const sync = async (): Promise<void> => {
      const p = ['cp0', 'cp1'].map((id) => graph.getElementPosition(id).slice(0, 2) as Point);
      graph.updateEdgeData([{ id: 'e', style: { controlPoints: p } }]);
      await graph.draw();
    };
    if (stage.bar) graph.on('node:drag', () => void sync());
    else {
      stage.every(1200, async (i) => {
        await graph.translateElementTo({ cp0: [90, i % 2 ? 150 : 20], cp1: [190, i % 2 ? 20 : 150] }, true);
        await sync();
      });
    }
  });

export default mount;

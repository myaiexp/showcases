// HTML badges positioned with getViewportByCanvas follow their nodes through pan and zoom
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { gridData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 80];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 50, 45),
        node: { style: { size: 18, fill: '#3d4f78' } },
        edge: { style: { stroke: '#2f3d5c' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    const ids = ['n-0-0', 'n-2-1', `n-${cols - 1}-${rows - 1}`];
    const badges = ids.map((id, i) => {
      const b = document.createElement('div');
      b.textContent = `${i + 1}`;
      b.style.cssText =
        'position:absolute;width:18px;height:18px;margin:-30px 0 0 -9px;border-radius:9px;background:#ff7a45;color:#000;font:bold 11px/18px sans-serif;text-align:center;pointer-events:none;z-index:3';
      stage.container.append(b);
      return { id, b };
    });
    const place = () => {
      for (const { id, b } of badges) {
        const [x, y] = graph.getViewportByCanvas(graph.getElementPosition(id));
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
      }
    };
    graph.on(GraphEvent.AFTER_TRANSFORM, place);
    place();

    if (stage.preview) {
      const moves: [number, number][] = [[40, 15], [0, -25], [-40, 10], [0, 0]];
      stage.every(1000, async (i) => {
        await graph.zoomBy(i % 2 ? 0.8 : 1.25, { duration: 500 });
        await graph.translateBy(moves[i % moves.length]!, { duration: 500 });
      });
    }
  });

export default mount;

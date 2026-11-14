// Viewport point to canvas point, used to find the node under the pointer
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, gridData, hud, pointerDrive } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [5, 3, 45] : [8, 5, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 30, 30),
        node: {
          style: { size: 16, fill: '#3d4f78' },
          state: { active: { fill: '#ff7a45', size: 26 } },
        },
        edge: { style: { stroke: '#2f3d5c' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    await graph.zoomTo(stage.preview ? 1.2 : 1.4, false, [0, 0]);
    await graph.translateBy([20, 10], false);
    const show = hud(stage, el);
    show('move the pointer over the graph');
    let lit = '';
    const box = pointerDrive(stage, (cx, cy) => {
      // Viewport coordinates are measured from the canvas box's top-left corner.
      const r = box();
      const vp: [number, number] = [cx - r.left, cy - r.top];
      const [x = 0, y = 0] = graph.getCanvasByViewport(vp);
      let best = '';
      let bestD = 30;
      for (const n of graph.getNodeData()) {
        const d = Math.hypot((n.style?.x as number) - x, (n.style?.y as number) - y);
        if (d < bestD) [best, bestD] = [String(n.id), d];
      }
      if (best !== lit) {
        graph.setElementState(Object.fromEntries([...(lit ? [[lit, []]] : []), ...(best ? [[best, ['active']]] : [])]));
        lit = best;
      }
      show(
        stage.preview
          ? `viewport ${fmt(vp)}\ncanvas ${fmt([x, y])}\nnearest ${best || 'none'}`
          : `viewport ${fmt(vp)}\ncanvas   ${fmt([x, y])}  getCanvasByViewport(viewport)\nnearest  ${best || 'none within 30'}`,
      );
    });
  });

export default mount;

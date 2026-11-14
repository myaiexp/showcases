// All four coordinate conversions on the pointer, with round trips
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
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
        node: { style: { size: 14, fill: '#3d4f78' } },
        edge: { style: { stroke: '#2f3d5c' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    await graph.zoomTo(stage.preview ? 1.2 : 1.5, false, [0, 0]);
    await graph.translateBy([30, 20], false);
    const show = hud(stage, el);
    show('move the pointer over the graph');
    const box = pointerDrive(stage, (cx, cy) => {
      const r = box();
      const client: [number, number] = [cx, cy];
      const viewport: [number, number] = [cx - r.left, cy - r.top];
      const canvas = graph.getCanvasByClient(client);
      const lines = [
          `client    ${fmt(client)}`,
          stage.preview ? `viewport ${fmt(viewport)} canvas ${fmt(canvas)}` : `viewport  ${fmt(viewport)}   canvas ${fmt(canvas)}`,
          `getCanvasByViewport(viewport) ${fmt(graph.getCanvasByViewport(viewport))}`,
          `getViewportByCanvas(canvas)   ${fmt(graph.getViewportByCanvas(canvas))}`,
          `getClientByCanvas(canvas) ${fmt(graph.getClientByCanvas(canvas))}`,
          `graph position ${fmt(graph.getPosition())}  zoom ${graph.getZoom().toFixed(2)}`,
      ];
      show((stage.preview ? [lines[0], lines[1]] : lines).join('\n'));
    });
    if (stage.bar) button(stage.bar, 'reset viewport', () => void graph.zoomTo(1, false).then(() => graph.translateTo([0, 0], false)));
  });

export default mount;

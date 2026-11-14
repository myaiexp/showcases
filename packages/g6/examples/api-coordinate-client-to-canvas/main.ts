// Pointer client position to canvas position, shown by a marker node under the pointer
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, gridData, hud, pointerDrive } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [5, 3, 45] : [8, 5, 70];
    const data = gridData(cols, rows, gap, 30, 30);
    data.nodes.push({ id: 'marker', style: { x: -50, y: -50, size: 12, fill: '#ff7a45', zIndex: 10 } });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        // node.style wins over the data's own style, so the marker's look is chosen here.
        node: {
          style: {
            size: (d) => (d.id === 'marker' ? 12 : 14),
            fill: (d) => (d.id === 'marker' ? '#ff7a45' : '#3d4f78'),
          },
        },
        edge: { style: { stroke: '#2f3d5c' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    // Start away from the identity transform so canvas and client coordinates differ.
    await graph.zoomTo(stage.preview ? 1.2 : 1.4, false, [0, 0]);
    await graph.translateBy([20, 10], false);
    const show = hud(stage, el);
    show('move the pointer over the graph');
    pointerDrive(stage, (cx, cy) => {
      const [x = 0, y = 0] = graph.getCanvasByClient([cx, cy]);
      graph.updateNodeData([{ id: 'marker', style: { x, y } }]);
      void graph.draw();
      show(`client  ${fmt([cx, cy], 0)}\ncanvas  ${fmt([x, y], 0)}${stage.preview ? '' : '  getCanvasByClient(client)'}`);
    });
  });

export default mount;

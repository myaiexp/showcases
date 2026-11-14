// A marker node pinned to getViewportCenter() while the canvas is moved under it
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 70];
    const data = gridData(cols, rows, gap, 80, 70);
    data.nodes.push({ id: 'marker', style: { x: 0, y: 0, labelText: 'viewport center', zIndex: 5 } });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: {
          style: {
            size: (d) => (d.id === 'marker' ? 10 : 18),
            fill: (d) => (d.id === 'marker' ? '#ff7a45' : '#5b8ff9'),
          },
        },
        edge: { style: { stroke: '#4a5a78' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const follow = () => {
      const [x = 0, y = 0] = graph.getViewportCenter();
      graph.updateNodeData([{ id: 'marker', style: { x, y } }]);
      void graph.draw();
      show(
        stage.preview
          ? `canvas center ${fmt(graph.getCanvasCenter(), 0)} fixed\nviewport center ${fmt([x, y], 0)} moves`
          : `getCanvasCenter()   ${fmt(graph.getCanvasCenter())}  (viewport coords, fixed)\ngetViewportCenter() ${fmt([x, y])}  (canvas coords, moves)`,
      );
    };
    graph.on(GraphEvent.AFTER_TRANSFORM, follow);
    follow();

    if (stage.preview) {
      stage.every(1300, (i) => (i % 2 ? graph.translateBy([-60, -30], { duration: 700 }) : graph.translateBy([60, 30], { duration: 700 })));
    }
  });

export default mount;

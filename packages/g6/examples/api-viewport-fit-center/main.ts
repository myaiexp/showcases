// graph.fitCenter: centers the graph, zoom untouched
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { fmt, gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 45] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 0, 0),
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#4a5a78' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    await graph.fitCenter();
    const show = hud(stage, el);
    const center = async () => {
      await graph.fitCenter({ duration: 500, easing: 'ease-in' });
      show(`fitCenter()  zoom ${graph.getZoom().toFixed(2)}  position ${fmt(graph.getPosition())}`);
    };

    if (stage.bar) {
      button(stage.bar, 'fitCenter', () => void center());
      button(stage.bar, 'shift graph', () => void graph.translateBy([180, 90], { duration: 300 }));
    } else {
      stage.every(1200, (i) => (i % 2 ? center() : graph.translateBy([70, 40], { duration: 500 })));
    }
  });

export default mount;

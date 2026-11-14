// A zoom range that clamps programmatic and wheel zoom
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 80, 70),
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#4a5a78' } },
        zoomRange: [0.5, 2],
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const report = () => show(`zoom ${graph.getZoom().toFixed(2)}  getZoomRange() ${JSON.stringify(graph.getZoomRange() ?? null)}`);
    graph.on(GraphEvent.AFTER_TRANSFORM, report);
    report();

    if (stage.bar) {
      let min = 0.5;
      let max = 2;
      const apply = () => {
        graph.setZoomRange([min, Math.max(min, max)]);
        report();
      };
      slider(stage.bar, 'min', [0.1, 1, 0.1], min, (v) => ((min = v), apply()));
      slider(stage.bar, 'max', [1, 5, 0.5], max, (v) => ((max = v), apply()));
      button(stage.bar, 'no limit', () => {
        graph.setZoomRange(undefined);
        report();
      });
      button(stage.bar, 'zoomTo(10)', () => void graph.zoomTo(10, { duration: 400 }));
      button(stage.bar, 'zoomTo(0.05)', () => void graph.zoomTo(0.05, { duration: 400 }));
    } else {
      // Asks for 4x and 0.1x; the range [0.5, 2] stops both.
      stage.every(1500, (i) => graph.zoomTo(i % 2 ? 0.1 : 4, { duration: 700 }));
    }
  });

export default mount;

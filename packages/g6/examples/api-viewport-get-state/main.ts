// Reads zoom, position and rotation after every viewport transform
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { fmt, gridData, hud } from '../../shared/fr-kit.ts';
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
        // rotate-canvas turns the canvas on shift plus drag, so drag-canvas keeps plain drags.
        behaviors: [
          'drag-canvas',
          'zoom-canvas',
          { type: 'rotate-canvas', trigger: ['shift'] },
        ],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const report = () => {
      const deg = (graph.getRotation() * 180) / Math.PI;
      show(`zoom      ${graph.getZoom().toFixed(3)}\nposition  ${fmt(graph.getPosition())}\nrotation  ${graph.getRotation().toFixed(3)} rad (${deg.toFixed(1)} deg)`);
    };
    graph.on(GraphEvent.AFTER_TRANSFORM, report);
    report();

    if (stage.bar) {
      button(stage.bar, 'reset', () => {
        void graph.rotateTo(0, false).then(() => graph.zoomTo(1, false)).then(() => graph.translateTo([0, 0], false));
      });
    } else {
      stage.every(1200, async (i) => {
        await graph.zoomBy(i % 2 ? 0.7 : 1.4, { duration: 500 });
        await graph.rotateBy(0.35, { duration: 500 });
        await graph.translateBy([i % 2 ? -25 : 25, 0], { duration: 500 });
      });
    }
  });

export default mount;

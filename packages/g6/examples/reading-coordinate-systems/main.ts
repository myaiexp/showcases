// A node's three coordinates while the canvas moves: only the canvas one is constant
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { fmt, gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 80];
    const data = gridData(cols, rows, gap, 50, 45);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: {
          style: { size: 18, fill: '#3d4f78' },
          state: { active: { fill: '#ff7a45' } },
        },
        edge: { style: { stroke: '#2f3d5c' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    graph.setElementState('n-1-1', 'active');
    const show = hud(stage, el);
    const report = () => {
      const canvas = graph.getElementPosition('n-1-1');
      const lines = [
          `node n-1-1 (orange)`,
          `canvas    ${fmt(canvas)}  fixed`,
          `viewport  ${fmt(graph.getViewportByCanvas(canvas))}  moves with pan and zoom`,
          `client    ${fmt(graph.getClientByCanvas(canvas))}  also moves with the page`,
          `viewport center in canvas coordinates ${fmt(graph.getViewportCenter())}`,
      ];
      show((stage.preview ? lines.slice(1, 4) : lines).join('\n'));
    };
    graph.on(GraphEvent.AFTER_TRANSFORM, report);
    report();

    if (stage.bar) {
      button(stage.bar, 'reset', () => void graph.zoomTo(1, false).then(() => graph.translateTo([0, 0], false)));
    } else {
      stage.every(1300, async (i) => {
        await graph.zoomBy(i % 2 ? 0.8 : 1.25, { duration: 500 });
        await graph.translateBy([i % 2 ? -20 : 20, 0], { duration: 500 });
      });
    }
  });

export default mount;

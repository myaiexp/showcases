// graph.fitView options: fit only on overflow, or always, along x, y or both
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { fmt, gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [6, 3, 45] : [10, 5, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 0, 0),
        node: { style: { size: 14 } },
        edge: { style: { stroke: '#4a5a78' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    type When = 'overflow' | 'always';
    type Dir = 'x' | 'y' | 'both';
    const fit = async (when: When, direction: Dir) => {
      await graph.fitView({ when, direction }, { duration: 700 });
      show(`fitView(${when}, ${direction})\nzoom ${graph.getZoom().toFixed(2)}  position ${fmt(graph.getPosition())}`);
    };
    const mess = () => graph.zoomTo(0.4, false).then(() => graph.translateTo([20, 10], false));

    if (stage.bar) {
      let when: When = 'always';
      let direction: Dir = 'both';
      select(stage.bar, 'when', ['overflow', 'always'] as const, when, (v) => (when = v));
      select(stage.bar, 'direction', ['both', 'x', 'y'] as const, direction, (v) => (direction = v));
      button(stage.bar, 'fitView', () => void fit(when, direction));
      button(stage.bar, 'zoom out and shift', () => void mess());
    } else {
      const dirs: Dir[] = ['both', 'x', 'y'];
      stage.every(2000, async (i) => {
        if (i % 2) await mess();
        else await fit('always', dirs[(i / 2) % dirs.length]!);
      });
    }
  });

export default mount;

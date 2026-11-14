// graph.zoomBy: relative zoom that compounds with every call
import { Graph } from '@antv/g6';
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
        behaviors: ['drag-canvas'],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    let duration = 300;
    const by = async (ratio: number) => {
      await graph.zoomBy(ratio, { duration }, graph.getCanvasCenter());
      show(`last ratio ${ratio}  zoom ${graph.getZoom().toFixed(3)}`);
    };
    show(`zoom ${graph.getZoom().toFixed(3)}`);

    if (stage.bar) {
      slider(stage.bar, 'duration ms', [0, 1500, 50], duration, (v) => (duration = v));
      button(stage.bar, 'zoomBy(1.2)', () => void by(1.2));
      button(stage.bar, 'zoomBy(0.8)', () => void by(0.8));
      button(stage.bar, 'zoomBy(2)', () => void by(2));
      button(stage.bar, 'zoomBy(0.5)', () => void by(0.5));
    } else {
      const ratios = [1.5, 1.5, 0.5, 1.2, 0.8];
      stage.every(1300, (i) => by(ratios[i % ratios.length]!));
    }
  });

export default mount;

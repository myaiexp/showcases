// graph.zoomTo to an absolute scale, with an optional animation and fixed origin
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select, slider, toggle } from '../../shared/controls.ts';
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
        node: { style: { size: 18, labelText: (d) => String(d.id).replace('n-', '') } },
        edge: { style: { stroke: '#4a5a78' } },
        behaviors: ['drag-canvas'],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const report = () => show(`zoom ${graph.getZoom().toFixed(2)}  position ${fmt(graph.getPosition())}`);
    report();

    let zoom = 2;
    let animate = true;
    let origin: 'none' | 'viewport center' | 'top-left' = 'viewport center';
    const run = async (z = zoom) => {
      const o = origin === 'none' ? undefined : origin === 'top-left' ? ([0, 0] as [number, number]) : graph.getCanvasCenter();
      await graph.zoomTo(z, animate ? { duration: 600, easing: 'ease-in-out' } : false, o);
      report();
    };

    if (stage.bar) {
      slider(stage.bar, 'zoom', [0.3, 3, 0.1], zoom, (v) => (zoom = v));
      select(stage.bar, 'origin', ['none', 'viewport center', 'top-left'] as const, origin, (v) => (origin = v));
      toggle(stage.bar, 'animation', animate, (v) => (animate = v));
      button(stage.bar, 'zoomTo', () => void run());
      button(stage.bar, 'reset', () => void graph.zoomTo(1, false).then(report));
    } else {
      origin = 'viewport center';
      stage.every(1800, (i) => run(i % 2 ? 0.6 : 1.8));
    }
  });

export default mount;

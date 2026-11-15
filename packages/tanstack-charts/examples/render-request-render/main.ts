// requestRender(true): repaint after state that only the renderer knows about changes
import { barY, defineChart } from '@tanstack/charts';
import type { ChartRenderer, ChartSurface, SceneNode, SceneRect } from '@tanstack/charts';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

type Units = 'px' | '%';

function createUnitsRenderer() {
  let units: Units = 'px';
  let request: ((force?: boolean) => void) | null = null;
  const renderer: ChartRenderer = {
    id: 'showcase-units',
    prerender: (scene, o) => `<pre class="units-chart" aria-label="${o.ariaLabel}">${scene.width} x ${scene.height}</pre>`,
    mount(container, requestRender) {
      request = requestRender;
      const el = document.createElement('pre');
      el.className = 'units-chart';
      el.style.margin = '0';
      container.append(el);
      const surface: ChartSurface = {
        renderer,
        element: el,
        render(scene, options) {
          el.setAttribute('role', 'img');
          el.setAttribute('aria-label', options.ariaLabel);
          const f = (v: number, size: number): string => (units === 'px' ? `${v.toFixed(0)}px` : `${((v / size) * 100).toFixed(1)}%`);
          const bars: SceneRect[] = [];
          const collect = (nodes: readonly SceneNode[]): void => {
            for (const n of nodes) {
              if (n.kind === 'rect') bars.push(n);
              else if (n.kind === 'group' && !n.focus) collect(n.children);
            }
          };
          collect(scene.nodes);
          el.textContent = `${bars.length} bars in a ${scene.width} x ${scene.height} scene\n` + bars.map((n) => `${n.key.split(':').pop()!.padEnd(4)} left ${f(n.x, scene.width).padStart(7)}  top ${f(n.y, scene.height).padStart(7)}  height ${f(n.height, scene.height).padStart(7)}`).join('\n');
        },
        paintFocus() {},
        destroy: () => el.remove(),
      };
      return surface;
    },
  };
  return {
    renderer,
    setUnits(next: Units) {
      units = next;
      // Nothing about the chart or its size changed, so the repaint has to be forced.
      request?.(true);
    },
  };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the units: the chart options never change, only the renderer\'s own state.' });
  const { renderer, setUnits } = createUnitsRenderer();

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', key: 'month' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true } },
  });
  stage.own(mountChartRenderer(stage.box, { definition, renderer, height: stage.height > 200 ? 220 : 120, initialWidth: 560, ariaLabel: 'Bar coordinates as text' }));
  const units: readonly (readonly [Units, string])[] = [['px', 'pixels'], ['%', 'percent of the scene']];
  if (stage.bar) select(stage.bar, 'units', units, setUnits);
  else stage.cycle(units.map((u) => u[0]), 1800, setUnits);
  return () => stage.dispose();
};

export default mount;

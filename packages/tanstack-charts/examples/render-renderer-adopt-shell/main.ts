// Server markup then mount: the renderer keeps the shell element it finds in the container
import { barY, createChartScene, defineChart } from '@tanstack/charts';
import type { ChartRenderer, ChartScene, ChartSurface } from '@tanstack/charts';
import type { ChartRendererHost } from '@tanstack/charts';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const esc = (s: string): string => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** One line per top-level scene node: kind, key and position. */
function summary(scene: ChartScene): string {
  const lines = scene.nodes.slice(0, 9).map((n) => `${n.kind.padEnd(8)} ${n.key}`);
  return [`scene ${scene.width} x ${scene.height}, ${scene.nodes.length} nodes, ${scene.points.length} points`, ...lines, scene.nodes.length > 9 ? `... ${scene.nodes.length - 9} more` : ''].filter(Boolean).join('\n');
}

const textRenderer: ChartRenderer = {
  id: 'showcase-text',
  prerender: (scene, o) => `<pre class="text-chart" role="img" aria-roledescription="chart" aria-label="${esc(o.ariaLabel)}" tabindex="0" style="margin:0;white-space:pre-wrap">${esc(summary(scene))}</pre>`,
  mount(container) {
    let root = container.querySelector<HTMLElement>('.text-chart');
    if (!root) {
      root = document.createElement('pre');
      root.className = 'text-chart';
      root.style.margin = '0';
      container.append(root);
    }
    const el = root;
    const surface: ChartSurface = {
      renderer: textRenderer,
      get element() {
        return el;
      },
      render(scene, options) {
        el.setAttribute('aria-label', options.ariaLabel);
        el.textContent = summary(scene);
      },
      paintFocus() {},
      destroy: () => el.remove(),
    };
    return surface;
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The readout says whether the element in the page before mounting is the one the chart uses.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  let host: ChartRendererHost<{ month: string; revenue: number }, string, number> | null = null;

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true } },
  });
  const run = (withShell: boolean): void => {
    host?.destroy();
    stage.box.replaceChildren();
    const options = { definition, renderer: textRenderer, height: 180, initialWidth: 480, ariaLabel: 'Revenue as text' };
    let shell: Element | null = null;
    if (withShell) {
      // "Server" side: compile and prerender without any host.
      stage.box.innerHTML = textRenderer.prerender(createChartScene(definition, { width: 480, height: 180 }), { ariaLabel: options.ariaLabel });
      shell = stage.box.firstElementChild;
    }
    host = mountChartRenderer(stage.box, options);
    const same = shell !== null && stage.box.firstElementChild === shell;
    const text = withShell ? `prerendered shell inserted first\nsame element after mount: ${same ? 'yes, adopted' : 'no, replaced'}` : 'no shell: the renderer created its own element';
    if (readout) readout.textContent = text;
    else stage.say(text.replaceAll('\n', '; '));
  };
  stage.onDispose(() => host?.destroy());
  run(true);
  if (stage.bar) checkbox(stage.bar, 'insert the prerendered shell first', true, run);
  else stage.cycle([true, false], 2400, run);
  return () => stage.dispose();
};

export default mount;

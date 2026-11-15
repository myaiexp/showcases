// Prerender in the page, mount on top: the shell element survives, optionally with the same runtime
import { barY, createChartRuntime, defineChart, mountChart, renderChartSvg } from '@tanstack/charts';
import type { ChartHost } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The svg exists before mountChart runs; the readout compares the element before and after.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  let host: ChartHost<Revenue, string, number> | null = null;
  let runtime: ReturnType<typeof createChartRuntime<Revenue, string, number>> | null = null;
  stage.onDispose(() => {
    host?.destroy();
    runtime?.destroy();
  });

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  const idPrefix = stage.id('ssr');
  const run = (handoff: boolean): void => {
    host?.destroy();
    runtime?.destroy();
    stage.box.replaceChildren();
    // "Server": a runtime of its own, an explicit size, a string.
    runtime = createChartRuntime<Revenue, string, number>();
    const scene = runtime.render(definition, { width: 560, height: stage.height });
    stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: 'Revenue', idPrefix });
    const shell = stage.box.querySelector('svg');
    const nodesBefore = shell?.querySelectorAll('[data-ts-key]').length ?? 0;
    // "Browser": the same definition, size policy and idPrefix.
    host = mountChart(stage.box, { definition, height: stage.height, initialWidth: 560, ariaLabel: 'Revenue', idPrefix }, handoff ? runtime : undefined);
    if (handoff) runtime = null; // the host owns the runtime now and destroys it
    const text = `svg in the page before mount: ${nodesBefore} keyed nodes\nsame svg element after mount: ${stage.box.querySelector('svg') === shell ? 'yes' : 'no'}\nruntime handed to mountChart: ${handoff ? 'yes' : 'no'}`;
    if (readout) readout.textContent = text;
    else stage.say(text.replaceAll('\n', '; '));
  };
  run(true);
  if (stage.bar) checkbox(stage.bar, 'pass the prerender runtime to mountChart', true, run);
  else {
    stage.cycle([true, false], 2400, run);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;

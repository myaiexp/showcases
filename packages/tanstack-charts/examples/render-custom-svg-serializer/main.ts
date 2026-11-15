// renderSvg: the default serializer plus one extra keyed element, with the contract kept
import { barY, defineChart, mountChart, renderChartSvg } from '@tanstack/charts';
import type { ChartSvgRenderer } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The watermark is added by the custom serializer; hover a bar to check the tooltip still works.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  // Keep the root, the accessible name and data-ts-key identities; add one keyed node.
  const watermarked: ChartSvgRenderer<Revenue, string, number> = (scene, options) =>
    renderChartSvg(scene, options).replace('</svg>', `<text data-ts-key="watermark" x="${scene.width - 8}" y="${scene.height - 6}" text-anchor="end" font-size="11" fill="currentColor" fill-opacity="0.55">drawn by a custom serializer</text></svg>`);

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  const options = (custom: boolean) => ({ definition, height: stage.height, ariaLabel: 'Revenue with a watermark', renderSvg: custom ? watermarked : undefined });
  const host = stage.own(mountChart(stage.box, options(true)));
  const report = (custom: boolean): void => {
    const text = `serializer: ${custom ? 'custom (renderSvg)' : 'default'}\nwatermark in the DOM: ${stage.box.querySelector('[data-ts-key="watermark"]') ? 'yes' : 'no'}`;
    if (readout) readout.textContent = text;
    else stage.say(text.replace('\n', ', '));
  };
  const set = (v: boolean): void => {
    host.update(options(v));
    report(v);
  };
  report(true);
  if (stage.bar) checkbox(stage.bar, 'custom renderSvg', true, set);
  else {
    stage.cycle([true, false], 2400, set);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;

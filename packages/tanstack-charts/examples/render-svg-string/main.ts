// Static rendering: scene to SVG string to innerHTML, with no host mounted
import { barY, createChartScene, defineChart, lineY, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { clip, codeBox, pane } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The chart below is an SVG string assigned to innerHTML. Hovering does nothing: no host is mounted.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 34;
  const code = stage.preview ? null : codeBox(pane(stage, 'The string renderChartSvg returned'), '', 150);

  const definitions = [
    ['bars', () => defineChart({ marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#2563eb' })], scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } } })],
    ['line', () => defineChart({ marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#fb923c', strokeWidth: 2, points: true })], scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } } })],
  ] as const;

  const show = ([name, make]: (typeof definitions)[number]): void => {
    const scene = createChartScene(make(), { width: 640, height: stage.height });
    const markup = renderChartSvg(scene, { ariaLabel: `Revenue as ${name}`, ariaDescription: 'Revenue rose through the half year.', idPrefix: stage.id('svg') });
    stage.box.innerHTML = markup;
    if (code) code.textContent = clip(markup, 700);
    stage.say(`${name}: ${markup.length} characters, ${scene.nodes.length} top-level scene nodes`);
  };
  stage.cycle(definitions, 2200, show);
  if (stage.bar) select(stage.bar, 'definition', definitions.map((d) => [d, d[0]] as const), show);
  return () => stage.dispose();
};

export default mount;

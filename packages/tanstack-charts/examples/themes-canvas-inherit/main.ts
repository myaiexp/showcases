// Canvas marks resolve currentColor and CSS variables from the container and repaint when it changes
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2025-01-01', 400);
const values = walk(rng(19), 400, 50, 1.4);
const rows = dates.map((date, i) => ({ id: `d${i}`, date, value: values[i]! }));
const looks = [
  ['#e6edf7', '#4ade80', 'color #e6edf7, --ts-chart-3 green'],
  ['#fde68a', '#f472b6', 'color #fde68a, --ts-chart-3 pink'],
  ['#bae6fd', '#fb923c', 'color #bae6fd, --ts-chart-3 orange'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the container colors: the canvas layer repaints with them.' });
  // A canvas layer fills its container, so the container needs a definite height.
  stage.box.style.height = `${stage.height}px`;
  const definition = defineChart({
    marks: [
      areaY(rows, { x: 'date', y: 'value', fill: 'var(--ts-chart-3)', fillOpacity: 0.3, renderer: canvasChartRenderer }),
      lineY(rows, { x: 'date', y: 'value', stroke: 'currentColor', strokeWidth: 1.5, renderer: canvasChartRenderer }),
    ],
    scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Four hundred days of a random walk' }));
  const apply = (i: number): void => {
    const [color, accent, label] = looks[i]!;
    stage.box.style.color = color;
    stage.box.style.setProperty('--ts-chart-3', accent);
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'container', looks.map((l, i) => [i, l[2]] as const), apply);
  stage.cycle(looks, 2000, (_, i) => apply(i), stage.preview);
  return () => stage.dispose();
};

export default mount;

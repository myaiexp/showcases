// Axis title object form: typography, color and offset of the title; margins follow the measured size
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type Title = string | { text: string; fontSize?: number; fontWeight?: number; fill?: string; opacity?: number; offset?: number | 'auto' };
const titles: readonly (readonly [string, Title])[] = [
  ['string form', 'Revenue (USD)'],
  ['size 14, weight 700, blue', { text: 'Revenue (USD)', fontSize: 14, fontWeight: 700, fill: '#60a5fa', opacity: 0.95 }],
  ['size 18, weight 400', { text: 'Revenue (USD)', fontSize: 18, fontWeight: 400, opacity: 0.6 }],
  ['offset 30', { text: 'Revenue (USD)', fontSize: 12, offset: 30 }],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a title style: the left margin is re-measured each time.' });
  const build = (label: Title) =>
    defineChart({
      marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', points: true })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: { text: 'Month', fontSize: 12, fontWeight: 500 } } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label } },
      },
    });
  const options = (label: Title) => ({ definition: build(label), height: stage.height, ariaLabel: 'Monthly revenue' });
  const host = stage.own(mountChart(stage.box, options(titles[1]![1])));
  const apply = (i: number): void => {
    host.update(options(titles[i]![1]));
    stage.say(titles[i]![0]);
  };
  if (stage.bar) select(stage.bar, 'y title', titles.map((t, i) => [i, t[0]] as const), apply, 1);
  else stage.cycle(titles, 1800, (_, i) => apply(i));
  return () => stage.dispose();
};

export default mount;

// barY layout: stack() order, reverse and offset options
import { barY, colorLegend, defineChart, mountChart, stack } from '@tanstack/charts';
import type { StackOptions } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { sales } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const layouts: readonly (readonly [StackOptions, string])[] = [
  [{}, 'default (input order)'],
  [{ order: 'descending' }, "order: 'descending'"],
  [{ reverse: true }, 'reverse: true'],
  [{ order: ['West', 'East', 'South', 'North'] }, "order: ['West', 'East', ...]"],
  [{ offset: 'normalize' }, "offset: 'normalize'"],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (options: StackOptions) =>
    defineChart({
      svgAnimation: true,
      marks: [barY(sales, { x: 'quarter', y: 'revenue', color: 'region', layout: stack(options) })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      color: { legend: colorLegend() },
    });

  const options = { definition: chart({}), height: stage.height, initialWidth: 640, ariaLabel: 'Stacked bars with a chosen layout' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(layouts[i]![0]) });
    stage.say(layouts[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'layout', layouts.map((l, i) => [i, l[1]] as const), show);
    stage.say(layouts[0]![1]);
  } else stage.cycle(layouts.map((_, i) => i), 2000, show);
  return () => stage.dispose();
};

export default mount;

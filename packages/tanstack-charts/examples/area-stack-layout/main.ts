// areaY layout: stack() with offset and order options
import { areaY, defineChart, mountChart, stack } from '@tanstack/charts';
import type { StackOptions } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { threeSeries } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = threeSeries(30, 5);

const layouts: readonly (readonly [StackOptions, string])[] = [
  [{}, 'default (diverging)'],
  [{ offset: 'normalize' }, "offset: 'normalize'"],
  [{ offset: 'center' }, "offset: 'center'"],
  [{ order: 'descending' }, "order: 'descending'"],
  [{ reverse: true }, 'reverse: true'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (options: StackOptions) =>
    defineChart({
      svgAnimation: true,
      marks: [areaY(rows, { x: 'date', y: 'value', z: 'series', fillOpacity: 0.7, layout: stack(options) })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart({}), height: stage.height, initialWidth: 640, ariaLabel: 'Stacked areas with a chosen stack layout' };
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

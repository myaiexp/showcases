// Positive and negative values: stacks grow away from zero, the x axis line sits at value 0
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded, type Datum } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(30);
const DAYS = ['08-29', '08-30', '08-31', '09-01', '09-02'];
const next = (): Datum[] =>
  DAYS.flatMap((date) =>
    ['Cake', 'Bread', 'Tea'].flatMap((group) => [
      { date, group, value: Math.round(100 + rand() * 300) },
      { date, group: `${group} (last week)`, value: -Math.round(80 + rand() * 300) },
    ]),
  );

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'bar',
      data: [{ id: 'data', values: next() }],
      xField: 'date',
      yField: 'value',
      seriesField: 'group',
      stack: true,
      legends: { visible: !ctx.preview, orient: 'bottom' },
      axes: [
        { orient: 'left', title: { visible: !ctx.preview, text: 'Week on week (sales)' } },
        // The category axis line is drawn where the value axis is zero.
        { orient: 'bottom', domainLine: { onZero: true } },
      ],
    } as ISpec,
  });

export default mount;

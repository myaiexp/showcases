// FAQ: stacked bars with lines in one common chart; axes pick their series with seriesId
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const meals = DAYS.flatMap((x, i) => [
  { x, type: 'Breakfast', y: [15, 12, 15, 10, 13, 10, 12][i] },
  { x, type: 'Lunch', y: [25, 30, 24, 25, 20, 22, 19][i] },
]);
const drinks = DAYS.map((x, i) => ({ x, type: 'Drinks', y: [22, 43, 33, 22, 10, 30, 50][i] }));
const rate = DAYS.map((x, i) => ({ x, type: 'Rate %', y: [4, 7, 6, 8, 12, 9, 5][i] }));

interface S {
  rateAxis: 'left' | 'right';
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { rateAxis: 'right' },
    mode: 'rebuild',
    previewMs: 2500,
    step: (s) => ({ rateAxis: s.rateAxis === 'right' ? 'left' : 'right' }),
    controls: (bar, live) => {
      select(bar, 'Rate line follows the', ['right', 'left'], (v) => live.set({ rateAxis: v as S['rateAxis'] }));
    },
    build: (s): ISpec => ({
      type: 'common',
      data: [
        { id: 'meals', values: meals },
        { id: 'drinks', values: drinks },
        { id: 'rate', values: rate },
      ],
      series: [
        // stack: true on the bar series stacks Breakfast and Lunch.
        { id: 'bars', type: 'bar', dataId: 'meals', xField: 'x', yField: 'y', seriesField: 'type', stack: true },
        { id: 'drinks', type: 'line', dataId: 'drinks', xField: 'x', yField: 'y', seriesField: 'type' },
        { id: 'rate', type: 'line', dataId: 'rate', xField: 'x', yField: 'y', seriesField: 'type' },
      ],
      // Each axis lists the series it measures, so a line can sit on either side.
      axes: [
        { orient: 'left', seriesId: s.rateAxis === 'left' ? ['bars', 'drinks', 'rate'] : ['bars', 'drinks'] },
        { orient: 'right', seriesId: s.rateAxis === 'right' ? ['rate'] : ['drinks'], grid: { visible: false } },
        { orient: 'bottom', type: 'band' },
      ],
      legends: { visible: !ctx.preview, orient: 'top' },
    }),
  });

export default mount;

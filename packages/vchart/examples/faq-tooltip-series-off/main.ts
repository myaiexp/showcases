// FAQ: hide one series from the dimension tooltip of a combination chart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const r = rng(5);
const meals = DAYS.flatMap((x) => ['breakfast', 'lunch'].map((type) => ({ x, type, y: Math.round(10 + r() * 20) })));
const drinks = DAYS.map((x) => ({ x, type: 'drinks', y: Math.round(10 + r() * 40) }));

const build = (barInTooltip: boolean): ISpec =>
  ({
    type: 'common',
    seriesField: 'type',
    data: [
      { id: 'meals', values: meals },
      { id: 'drinks', values: drinks },
    ],
    series: [
      {
        type: 'bar',
        dataIndex: 0,
        seriesField: 'type',
        xField: ['x', 'type'],
        yField: 'y',
        // tooltip also lives on a series: turning its dimension tooltip off removes its rows.
        tooltip: { dimension: { visible: barInTooltip } },
      },
      { type: 'line', dataIndex: 1, seriesField: 'type', xField: 'x', yField: 'y', stack: false },
    ],
    axes: [
      { orient: 'left', seriesIndex: [0] },
      { orient: 'right', seriesIndex: [1], grid: { visible: false } },
      { orient: 'bottom', type: 'band' },
    ],
    legends: { visible: true, orient: 'bottom' },
    tooltip: { activeType: ['dimension'] },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  let on = false;
  let chart = createChart(el, ctx, build(on));
  const bar = ctx.preview ? null : controlBar(el);
  if (bar) {
    select(bar, 'bar series in the dimension tooltip', ['hidden', 'shown'], (v) => {
      chart.release();
      on = v === 'shown';
      chart = createChart(el, ctx, build(on));
    });
  }
  let i = 0;
  const stop = every(1300, () => {
    i += 1;
    chart.vchart.setDimensionIndex(pick(DAYS, i));
    // The card flips the switch too, so it shows both tooltips.
    if (ctx.preview && i % 6 === 0) {
      chart.release();
      on = !on;
      chart = createChart(el, ctx, build(on));
    }
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;

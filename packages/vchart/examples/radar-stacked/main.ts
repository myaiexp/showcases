// Stacked radar: stack: true adds each series on top of the previous one
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { monthRows, nudgeRows, rng } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const rows = monthRows(['A', 'B', 'C'], undefined, 23);
  const { vchart, release } = createChart(el, ctx, {
    type: 'radar',
    data: [{ id: 'months', values: rows }],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    stack: true,
    area: { visible: true },
    legends: { visible: true, orient: 'top' },
    axes: [
      { orient: 'radius', min: 0, domainLine: { visible: true }, label: { visible: !ctx.preview }, grid: { smooth: true } },
      { orient: 'angle', tick: { visible: false } },
    ],
  });
  const r = rng(8);
  let current = rows;
  const stop = every(2000, () => {
    current = nudgeRows(current, r);
    void vchart.updateData('months', current);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;

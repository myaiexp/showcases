// Percentage stacked radar: percent: true on top of stack normalises every month to 100%
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
    percent: true,
    area: { visible: true },
    legends: { visible: true, orient: 'top' },
    axes: [
      {
        orient: 'radius',
        min: 0,
        domainLine: { visible: true },
        label: { visible: !ctx.preview, formatMethod: (val) => `${Number(val) * 100}%` },
        grid: { smooth: false, style: { lineDash: [0] } },
      },
      { orient: 'angle', tick: { visible: false }, domainLine: { visible: false }, grid: { style: { lineDash: [0] } } },
    ],
  });
  const r = rng(15);
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

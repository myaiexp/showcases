// Grouped radar: a seriesField with several values draws one overlapping shape per group
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { monthRows, nudgeRows, rng } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const rows = monthRows(['A', 'B', 'C'], undefined, 17);
  const { vchart, release } = createChart(el, ctx, {
    type: 'radar',
    data: [{ id: 'months', values: rows }],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    legends: { visible: true, orient: 'top' },
    axes: [
      { orient: 'radius', grid: { smooth: true, style: { lineDash: [0] }, alternateColor: 'rgba(255,255,255,0.04)' }, label: { visible: !ctx.preview } },
      { orient: 'angle', tick: { visible: false }, domainLine: { visible: true }, grid: { style: { lineDash: [0] } } },
    ],
  });
  const r = rng(3);
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

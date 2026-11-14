// Stacked rose: stack: true piles the series of each month outward along the radius
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { monthRows, nudgeRows, rng } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const rows = monthRows(['0-3', '3-6', '6-9', '9-12'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], 31);
  const { vchart, release } = createChart(el, ctx, {
    type: 'rose',
    data: [{ id: 'wind', values: rows }],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    stack: true,
    outerRadius: 1,
    title: { visible: !ctx.preview, text: 'Wind speed statistics, first half of the year' },
    legends: { visible: !ctx.preview, orient: 'left', position: 'middle' },
    color: ['#FFB84C', '#F266AB', '#A459D1', '#2CD3E1'],
    axes: [
      { orient: 'angle', domainLine: { visible: true }, label: { visible: true }, tick: { visible: true }, grid: { visible: true }, bandPadding: 0.05 },
      { orient: 'radius', label: { visible: !ctx.preview }, grid: { visible: true, smooth: true } },
    ],
  });
  const r = rng(6);
  let current = rows;
  const stop = every(2000, () => {
    current = nudgeRows(current, r);
    void vchart.updateData('wind', current);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;

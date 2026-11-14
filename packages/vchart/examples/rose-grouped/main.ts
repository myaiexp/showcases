// Grouped rose: categoryField as an array splits each angle into side-by-side petals per series
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { monthRows, nudgeRows, rng } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const rows = monthRows(['sales', 'count'], ['2:00', '6:00', '10:00', '14:00', '18:00', '22:00'], 14);
  const { vchart, release } = createChart(el, ctx, {
    type: 'rose',
    data: [{ id: 'hours', values: rows }],
    // Two category fields: the hour sets the angle band, the type splits the band into groups.
    categoryField: ['month', 'type'],
    valueField: 'value',
    seriesField: 'type',
    outerRadius: 0.9,
    legends: { visible: !ctx.preview, orient: 'top' },
    axes: [
      { orient: 'angle', domainLine: { visible: true }, grid: { visible: true, alignWithLabel: false }, label: { visible: true } },
      { orient: 'radius', grid: { visible: true, smooth: true }, label: { visible: !ctx.preview } },
    ],
    crosshair: { categoryField: { visible: !ctx.preview, line: { type: 'rect' } } },
  });
  const r = rng(2);
  let current = rows;
  const stop = every(2000, () => {
    current = nudgeRows(current, r);
    void vchart.updateData('hours', current);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;

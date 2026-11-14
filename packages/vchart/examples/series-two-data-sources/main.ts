// A bar series and a line series, each bound to its own data entry through dataId
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const YEARS = ['1990', '1991', '1993', '1995'];
const rand = seeded(13);
const bars = (): { year: string; group: string; value: number }[] =>
  YEARS.flatMap((year) => ['18-34', '35-64'].map((group) => ({ year, group, value: Math.round((8 + rand() * 20) * 10) / 10 })));
const line = (): { year: string; avg: number }[] => YEARS.map((year) => ({ year, avg: Math.round((10 + rand() * 12) * 10) / 10 }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, {
    type: 'common',
    seriesField: 'type',
    data: [
      { id: 'dataBar', values: bars() },
      { id: 'dataLine', values: line() },
    ],
    series: [
      { type: 'bar', dataId: 'dataBar', xField: 'year', yField: 'value', seriesField: 'group' },
      { type: 'line', dataId: 'dataLine', xField: 'year', yField: 'avg' },
    ],
    axes: [{ orient: 'left' }, { orient: 'bottom', type: 'band' }],
    legends: { visible: !ctx.preview, orient: 'top' },
  });
  let alive = true;
  const update = (id: 'dataBar' | 'dataLine'): void => {
    if (alive) void vchart.updateData(id, id === 'dataBar' ? bars() : line());
  };
  const stop = every(ctx.preview ? 1800 : 4000, () => {
    update('dataBar');
    update('dataLine');
  });
  if (bar) {
    button(bar, 'Update dataBar', () => update('dataBar'));
    button(bar, 'Update dataLine', () => update('dataLine'));
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;

// One cartesian region, three series types (bar, line, scatter) sharing the same two axes
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const rows = (seed: number): { month: string; target: number; actual: number; low: number }[] => {
  const r = rng(seed);
  return MONTHS.map((month) => {
    const target = Math.round(40 + r() * 40);
    return { month, target, actual: Math.round(target + (r() - 0.5) * 30), low: Math.round(target * 0.6) };
  });
};

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'common',
    data: [{ id: 'sales', values: rows(1) }],
    series: [
      { type: 'bar', id: 'target', dataId: 'sales', xField: 'month', yField: 'target', bar: { style: { fillOpacity: 0.45 } } },
      { type: 'line', id: 'actual', dataId: 'sales', xField: 'month', yField: 'actual', point: { visible: true } },
      { type: 'scatter', id: 'low', dataId: 'sales', xField: 'month', yField: 'low', size: 10, point: { style: { fill: '#f4c95d' } } },
    ],
    // Without seriesId on the axes, every series reads the same left and bottom axis.
    axes: [{ orient: 'left' }, { orient: 'bottom', type: 'band' }],
    legends: { visible: !ctx.preview, orient: 'bottom' },
    tooltip: { visible: true },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 440 });

  let seed = 1;
  let released = false;
  const stop = every(2200, () => {
    if (!released) void vchart.updateData('sales', rows(++seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;

// A common chart with a bar series and a line series, each bound to its own value axis
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = (seed: number): { x: string; type: string; y: number }[] => {
  const r = rng(seed);
  return DAYS.flatMap((x) => ['breakfast', 'lunch'].map((type) => ({ x, type, y: Math.round(10 + r() * 20) })));
};
const drinks = (seed: number): { x: string; type: string; y: number }[] => {
  const r = rng(seed + 100);
  return DAYS.map((x) => ({ x, type: 'drinks', y: Math.round(10 + r() * 40) }));
};

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'common',
    seriesField: 'type',
    data: [
      { id: 'meals', values: meals(1) },
      { id: 'drinks', values: drinks(1) },
    ],
    series: [
      // dataIndex picks which entry of `data` a series reads.
      { type: 'bar', id: 'bar', dataIndex: 0, seriesField: 'type', xField: ['x', 'type'], yField: 'y', label: { visible: !ctx.preview } },
      { type: 'line', id: 'line', dataIndex: 1, seriesField: 'type', xField: 'x', yField: 'y', stack: false },
    ],
    axes: [
      // seriesIndex or seriesId says which series an axis belongs to: left for the bars, right for the line.
      { orient: 'left', seriesIndex: [0] },
      { orient: 'right', seriesId: ['line'], grid: { visible: false } },
      { orient: 'bottom', type: 'band', label: { visible: true } },
    ],
    legends: { visible: !ctx.preview, orient: 'bottom' },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 440 });

  let seed = 1;
  let released = false;
  const stop = every(2200, () => {
    if (released) return;
    seed += 1;
    void vchart.updateData('meals', meals(seed));
    void vchart.updateData('drinks', drinks(seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;

// A combined chart: a bar series and an area series in one region, each reading its own data
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const HOURS = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
const rand = seeded(5);
const barValues = (): { x: string; y: number; type: string }[] =>
  HOURS.map((x) => ({ x, y: Math.round(35 + rand() * 60), type: 'Product 1' }));
const areaValues = (): { x: string; y2: number; type: string }[] =>
  HOURS.map((x) => ({ x, y2: Math.round(12 + rand() * 28), type: 'Product 2' }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let areaStack = false;
  const spec = (): ISpec =>
    ({
    type: 'common',
    data: [
      { id: 'barData', values: barValues() },
      { id: 'areaData', values: areaValues() },
    ],
    series: [
      { type: 'bar', xField: 'x', yField: 'y', data: { fromDataId: 'barData' } },
      // Area series stack by default, so stack: false keeps it from stacking on the bars' scale.
      { type: 'area', xField: 'x', yField: 'y2', data: { fromDataId: 'areaData' }, stack: areaStack },
    ],
    axes: [{ orient: 'bottom' }, { orient: 'left' }, { orient: 'right' }],
    }) as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec());
  let alive = true;
  const refresh = (id: 'barData' | 'areaData'): void => {
    if (alive) void vchart.updateData(id, id === 'barData' ? barValues() : areaValues());
  };

  const stop = every(ctx.preview ? 1800 : 4000, () => {
    refresh('barData');
    refresh('areaData');
  });
  if (bar) {
    button(bar, 'New bar data', () => refresh('barData'));
    button(bar, 'New area data', () => refresh('areaData'));
    button(bar, 'Toggle area stack', () => {
      areaStack = !areaStack;
      if (alive) void vchart.updateModelSpec({ type: 'area', index: 0 }, { stack: areaStack });
    });
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;

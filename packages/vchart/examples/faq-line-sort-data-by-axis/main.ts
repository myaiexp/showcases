// FAQ: lines that double back on themselves, fixed by sortDataByAxis
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

// Points are listed out of x order, as they would arrive from two merged queries.
const r = rng(9);
const xs = [1, 7, 3, 9, 5, 2, 8, 4, 6, 10];
const values = ['A', 'B'].flatMap((c, k) => xs.map((x) => ({ x, y: Math.round(20 + x * 6 + k * 15 + r() * 25), c })));

const build = (sorted: boolean): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  // false: points join in array order (a zigzag). true: points are ordered along the axis first.
  sortDataByAxis: sorted,
  axes: [{ orient: 'bottom', type: 'linear', min: 1, max: 10 }, { orient: 'left' }],
  legends: { visible: true, orient: 'top' },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(false));
  let released = false;
  const apply = (v: boolean): void => {
    if (!released) void vchart.updateSpec(build(v));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'sortDataByAxis', ['false', 'true'], (v) => apply(v === 'true'));
  }
  let i = 0;
  const stop = every(2000, () => {
    i += 1;
    if (ctx.preview) apply(pick([false, true], i));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

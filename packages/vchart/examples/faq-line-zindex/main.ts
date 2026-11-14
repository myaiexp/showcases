// FAQ: choose which line is on top with a zIndex callback on the line mark
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const NAMES = ['Product A', 'Product B', 'Product C'];
const r = rng(12);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const values = NAMES.flatMap((type, k) => months.map((month) => ({ month, type, value: Math.round(40 + k * 4 + r() * 30) })));

const build = (top: string): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values }],
  xField: 'month',
  yField: 'value',
  seriesField: 'type',
  // By default the last group is drawn last (on top). zIndex lets the data decide instead.
  line: { style: { lineWidth: 6, zIndex: (datum: Record<string, string>) => (datum.type === top ? 10 : 1) } },
  point: { style: { zIndex: (datum: Record<string, string>) => (datum.type === top ? 11 : 2) } },
  legends: { visible: true, orient: 'top' },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('Product C'));
  let released = false;
  const apply = (v: string): void => {
    if (!released) void vchart.updateSpec(build(v));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'line on top', NAMES, apply).value = 'Product C';
  }
  let i = 0;
  const stop = every(1800, () => {
    i += 1;
    if (ctx.preview) apply(pick(NAMES, i));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

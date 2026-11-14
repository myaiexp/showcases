// FAQ: choose a colour for each series of a bar and line combination with the chart-level color scale
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const r = rng(41);
const meals = DAYS.flatMap((x) => ['Breakfast', 'Lunch'].map((type) => ({ x, type, y: Math.round(10 + r() * 20) })));
const drinks = DAYS.map((x) => ({ x, type: 'Beverage', y: Math.round(10 + r() * 40) }));
const PALETTES: Record<string, string[]> = {
  'pink, blue, purple': ['#f9a8d4', '#7dd3fc', '#a78bfa'],
  'traffic lights': ['#4ade80', '#facc15', '#f87171'],
  'greys and one accent': ['#94a3b8', '#cbd5e1', '#f97316'],
};
const NAMES = Object.keys(PALETTES);

const build = (palette: string): ISpec =>
  ({
    type: 'common',
    data: [
      { id: 'meals', values: meals },
      { id: 'drinks', values: drinks },
    ],
    // One ordinal scale colours bars and line alike: each domain value gets the range entry at its index.
    color: { type: 'ordinal', field: 'type', domain: ['Breakfast', 'Lunch', 'Beverage'], range: PALETTES[palette] },
    series: [
      { type: 'bar', id: 'bar', dataIndex: 0, seriesField: 'type', xField: ['x', 'type'], yField: 'y' },
      { type: 'line', id: 'line', dataIndex: 1, seriesField: 'type', xField: 'x', yField: 'y', stack: false, point: { style: { size: 9 } }, line: { style: { lineWidth: 3 } } },
    ],
    axes: [
      { orient: 'left', seriesIndex: [0] },
      { orient: 'right', seriesId: ['line'], grid: { visible: false } },
      { orient: 'bottom', type: 'band' },
    ],
    legends: { visible: true, orient: 'bottom' },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(NAMES[0] ?? ''));
  let released = false;
  const apply = (v: string): void => {
    if (!released) void vchart.updateSpec(build(v));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'color.range', NAMES, apply);
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

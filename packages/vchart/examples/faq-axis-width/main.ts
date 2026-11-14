// FAQ: give long axis labels room with axes[i].width
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const NAMES = [
  'Department of Marine Biology',
  'Institute for Applied Mathematics',
  'School of Computer Science',
  'Faculty of Medieval Literature',
  'Centre for Climate Research',
];
const rows = (seed: number): { dept: string; n: number }[] => {
  const r = rng(seed);
  return NAMES.map((dept) => ({ dept, n: Math.round(20 + r() * 80) }));
};

const build = (width: number | `${number}%` | undefined): ISpec => ({
  type: 'bar',
  direction: 'horizontal',
  data: [{ id: 'd', values: rows(3) }],
  xField: 'n',
  yField: 'dept',
  axes: [
    // A number is pixels, a percentage string is a share of the chart; labels that do not fit are truncated.
    { orient: 'left', type: 'band', width: width ?? 90 },
    { orient: 'bottom', type: 'linear' },
  ],
});

const OPTIONS: Record<string, number | `${number}%`> = { '90 px': 90, '160 px': 160, '240 px': 240, '50%': '50%' };

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(90));
  let released = false;
  const apply = (v: string): void => {
    if (!released) void vchart.updateSpec(build(OPTIONS[v]));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'left axis width', Object.keys(OPTIONS), apply);
  }
  let i = 0;
  const stop = every(1700, () => {
    i += 1;
    if (ctx.preview) apply(pick(Object.keys(OPTIONS), i));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

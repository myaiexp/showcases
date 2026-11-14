// Legend `data` callback: add a value to every legend item and align it right
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const CATEGORIES = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

const rows = (seed: number): { category: string; value: number }[] => {
  const r = rng(seed);
  return CATEGORIES.map((category) => ({ category, value: Math.round(2 + r() * 20) }));
};

/** The legend callback receives the default items; it returns them with `value` filled in. */
const build = (values: { category: string; value: number }[]): ISpec => {
  const total = values.reduce((sum, d) => sum + d.value, 0);
  const percent = new Map(values.map((d) => [d.category, `${((d.value / total) * 100).toFixed(1)}%`]));
  return {
    type: 'pie',
    data: [{ id: 'pie', values }],
    categoryField: 'category',
    valueField: 'value',
    legends: {
      visible: true,
      orient: 'right',
      data: (items) => items.map((item) => ({ ...item, value: percent.get(item.label) ?? '' })),
      item: {
        width: '15%',
        value: { alignRight: true, style: { fill: '#facc15', fontSize: 12 }, state: { unSelected: { fill: '#6b7280' } } },
      },
    },
  };
};

const mount: Mount = (el, ctx) => {
  let seed = 4;
  const { vchart, release } = createChart(el, ctx, build(rows(seed)));
  let released = false;

  // The callback closes over the percentages, so new data means a new spec.
  const stop = every(ctx.preview ? 2000 : 3000, () => {
    seed += 1;
    if (!released) void vchart.updateSpec(build(rows(seed)));
  });

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

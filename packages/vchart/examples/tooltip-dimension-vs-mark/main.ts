// Tooltip activeType: a mark tooltip for one bar, a dimension tooltip for the whole category
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const TYPES = {
  'mark only': ['mark'],
  'dimension only': ['dimension'],
  'both (default)': ['mark', 'dimension'],
} as const;

const build = (active: readonly ('mark' | 'dimension')[]): ISpec => ({
  type: 'bar',
  data: [{ id: 'sales', values: groupedRows(QUARTERS.slice(0, 4), ['North', 'South', 'East'], 12) }],
  xField: ['x', 'c'],
  yField: 'y',
  seriesField: 'c',
  legends: { visible: true, orient: 'top' },
  tooltip: {
    activeType: [...active],
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(['mark', 'dimension']));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    // Alternate the two kinds, showing each from code (showTooltip / setDimensionIndex).
    let i = 0;
    stop = every(1500, () => {
      i += 1;
      if (i % 2 === 0) {
        vchart.setDimensionIndex(pick(QUARTERS, i / 2), { tooltip: true });
      } else {
        vchart.showTooltip({ x: pick(QUARTERS, i), c: 'South' }, { activeType: 'mark', alwaysShow: true });
      }
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'activeType', Object.keys(TYPES), (v) => {
      if (!released) void vchart.updateSpec(build(TYPES[v as keyof typeof TYPES]));
    }).value = 'both (default)';
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

// Tooltip text: title.value and content key/value callbacks, for the mark and dimension types
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

type Datum = Record<string, string | number>;

const build = (formatted: boolean): ISpec => ({
  type: 'bar',
  data: [{ id: 'sales', values: groupedRows(QUARTERS.slice(0, 4), ['North', 'South', 'East'], 3) }],
  xField: ['x', 'c'],
  yField: 'y',
  seriesField: 'c',
  legends: { visible: true, orient: 'top' },
  tooltip: {
    ...(formatted
      ? {
          // A string is constant text; a function receives the datum behind the line.
          mark: {
            title: { value: (d?: Datum) => `Region ${d?.c}` },
            content: [{ key: 'Revenue', value: (d?: Datum) => `USD ${d?.y}k` }],
          },
          dimension: {
            title: { value: (d?: Datum) => `Quarter ${String(d?.x).replace('Q', '')}` },
            content: [{ key: (d?: Datum) => `${d?.c} region`, value: (d?: Datum) => `USD ${d?.y}k` }],
          },
        }
      : {}),
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(true));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i += 1;
      if (i % 2 === 0) vchart.setDimensionIndex(pick(QUARTERS, i / 2), { tooltip: true });
      else vchart.showTooltip({ x: pick(QUARTERS, i), c: 'East' }, { activeType: 'mark', alwaysShow: true });
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'text', ['formatted', 'default'], (v) => {
      if (!released) void vchart.updateSpec(build(v === 'formatted'));
    });
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

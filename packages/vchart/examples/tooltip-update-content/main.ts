// Tooltip updateContent / updateTitle: post-process the computed lines before they show
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const build = (processed: boolean): ISpec => ({
  type: 'bar',
  data: [{ id: 'sales', values: groupedRows(QUARTERS.slice(0, 5), ['North', 'South', 'East', 'West'], 19) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  stack: true,
  legends: { visible: true, orient: 'top' },
  tooltip: {
    activeType: ['dimension'],
    dimension: processed
      ? {
          // prev holds one computed line per series; return the array you want displayed.
          updateContent: (prev) => {
            const lines = [...(prev ?? [])].sort((a, b) => Number(b.value) - Number(a.value));
            const total = lines.reduce((sum, l) => sum + Number(l.value), 0);
            return [...lines, { key: 'Total', value: String(total), hasShape: false, isKeyAdaptive: false } as (typeof lines)[number]];
          },
          updateTitle: (prev) => (prev ? { ...prev, value: `Results for ${prev.value}` } : prev),
        }
      : {},
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(true));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1300, () => {
      i += 1;
      vchart.setDimensionIndex(pick(QUARTERS.slice(0, 5), i));
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'callbacks', ['updateContent + updateTitle', 'none'], (v) => {
      if (!released) void vchart.updateSpec(build(v !== 'none'));
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

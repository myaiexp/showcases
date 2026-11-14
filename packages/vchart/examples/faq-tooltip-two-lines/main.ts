// FAQ: several custom lines per tooltip item, from tooltip.dimension.content
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const VARIANTS = ['default', 'two lines per series', 'custom keys'] as const;

// One content entry is one tooltip row; key and value may be callbacks over the datum.
const content = (variant: string): NonNullable<NonNullable<ISpec['tooltip']>['dimension']>['content'] => {
  if (variant === 'two lines per series') {
    return [
      { key: 'value', value: (d) => String(d?.y) },
      { key: 'region', value: (d) => String(d?.c) },
    ];
  }
  if (variant === 'custom keys') {
    return [
      { key: (d) => `${d?.c} (${d?.x})`, value: (d) => `${d?.y} units` },
      { key: 'share of 100', hasShape: false, value: (d) => `${Math.round(((d?.y ?? 0) / 100) * 100)}%` },
    ];
  }
  return undefined;
};

const build = (variant: string): ISpec => {
  const spec: ISpec = {
    type: 'bar',
    data: [{ id: 'sales', values: groupedRows(QUARTERS.slice(0, 5), ['North', 'South'], 8) }],
    xField: 'x',
    yField: 'y',
    seriesField: 'c',
    legends: { visible: true, orient: 'top' },
    tooltip: { activeType: ['dimension'], dimension: { content: content(variant) } },
  };
  return spec;
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, build(ctx.preview ? 'two lines per series' : 'default'));
  let released = false;
  let step = 0;
  // Tooltips need a pointer, so the tour opens the dimension tooltip from code.
  const stop = every(1300, () => {
    step += 1;
    vchart.setDimensionIndex(pick(QUARTERS.slice(0, 5), step));
  });
  if (bar) {
    select(bar, 'tooltip content', VARIANTS, (v) => {
      if (!released) void vchart.updateSpec(build(v));
    });
  }
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

// FAQ: link two charts: dimensionHover on one drives setDimensionIndex on the other
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const r = rng(14);
const visits = DAYS.map((day) => ({ day, n: Math.round(100 + r() * 400) }));
const orders = DAYS.map((day) => ({ day, n: Math.round(10 + r() * 90) }));

const spec = (type: 'line' | 'bar', values: typeof visits, title: string): ISpec => ({
  type,
  data: [{ id: 'd', values }],
  xField: 'day',
  yField: 'n',
  title: { visible: true, text: title, textStyle: { fontSize: 13 } },
  crosshair: { xField: { visible: true, line: { type: 'rect' } } },
  tooltip: { activeType: ['dimension'] },
});

const mount: Mount = (el, ctx) => {
  const a = createChart(el, ctx, spec('line', visits, 'Visits'), { height: 220, previewHeight: 100 });
  const b = createChart(el, ctx, spec('bar', orders, 'Orders'), { height: 220, previewHeight: 100 });
  let alive = true;

  const link = (from: typeof a, to: typeof b): void => {
    from.vchart.on('dimensionHover', (e) => {
      const value = (e as { dimensionInfo?: { value?: string }[] }).dimensionInfo?.[0]?.value;
      // setDimensionIndex shows tooltip and crosshair on the other chart at the same category.
      if (alive && value !== undefined) to.vchart.setDimensionIndex(value);
    });
  };
  link(a, b);
  link(b, a);

  // Without a pointer (the card) a timer plays the hover: both charts are told the same category.
  let i = 0;
  const stop = every(1200, () => {
    i += 1;
    const day = pick(DAYS, i);
    if (ctx.preview || i < 3) {
      a.vchart.setDimensionIndex(day);
      b.vchart.setDimensionIndex(day);
    }
  });
  return () => {
    alive = false;
    stop();
    a.release();
    b.release();
  };
};

export default mount;

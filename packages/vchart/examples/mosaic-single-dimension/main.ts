// Mosaic with one dimension: proportional-width columns, no stacking
import type { Mount } from '@/types.ts';
import { registerMosaicChart } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec } from '../../shared/flow-data.ts';
import { rng } from '../../shared/components-data.ts';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const days = (seed: number): { month: string; sales: number }[] => {
  const r = rng(seed);
  return DAYS.map((month) => ({ month, sales: Math.round(10 + r() * 30) }));
};

// The mosaic chart is not in the default registration: register it once before creating a chart.
registerMosaicChart();

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'mosaic',
    data: [{ id: 'data', values: days(1) }],
    xField: 'month',
    yField: 'sales',
    label: [
      { visible: true, position: 'bottom', style: { fill: '#ddd', fontSize: ctx.preview ? 8 : 12 }, overlap: false, formatMethod: (_v: unknown, d: Record<string, string>) => d.month },
      { visible: true, position: 'top', style: { fill: '#ddd', fontSize: ctx.preview ? 8 : 12 }, overlap: false, formatMethod: (_v: unknown, d: Record<string, number>) => d.sales },
    ],
    // The default x axis labels are hidden already; this keeps the axis line out of the way too.
    axes: [{ orient: 'bottom', label: { visible: false } }],
  }));

  let seed = 1;
  let alive = true;
  const stop = every(2000, () => {
    if (alive) void vchart.updateData('data', days(++seed) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;

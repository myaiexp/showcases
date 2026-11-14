// Mosaic quick start: column width is the category share, stacked height the group share
import type { Mount } from '@/types.ts';
import { registerMosaicChart } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, mosaicRows } from '../../shared/flow-data.ts';

// The mosaic chart is not in the default registration: register it once before creating a chart.
registerMosaicChart();

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'mosaic',
    data: [{ id: 'data', values: mosaicRows() }],
    xField: 'region',
    yField: 'sales',
    seriesField: 'segment',
    percent: true,
    label: [
      // The category name under each column: only one label per region (the smallest stack).
      { visible: !ctx.preview, position: 'bottom', style: { fill: '#ddd' }, filterByGroup: { field: 'region', type: 'min' }, overlap: false, formatMethod: (_v: unknown, d: Record<string, string>) => d.region },
      // Centered share-of-column inside each block.
      { visible: true, position: 'center', smartInvert: true, style: { fontSize: ctx.preview ? 9 : 12 } },
    ],
    legends: { visible: !ctx.preview },
    axes: [{ orient: 'left', label: { formatMethod: (v: number) => `${Math.round(v * 100)}%` } }],
  }));

  let seed = 2;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('data', mosaicRows(++seed) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;

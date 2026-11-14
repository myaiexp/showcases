// Two regions in a grid layout: a pie on top spanning two columns, a line chart below with its axes
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const pieRows = (seed: number): { type: string; value: number }[] => {
  const r = rng(seed);
  return ['a', 'b'].map((type) => ({ type, value: Math.round(10 + r() * 40) }));
};
const lineRows = (seed: number): { x: string; y: number; type: string }[] => {
  const r = rng(seed + 50);
  return ['1', '2', '3', '4', '5'].flatMap((x) => ['a', 'b'].map((type) => ({ x, y: Math.round(10 + r() * 50), type })));
};

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'common',
    padding: { top: 10 },
    // A grid of 2 columns x 4 rows; every layout element is placed by its modelId.
    layout: {
      type: 'grid',
      col: 2,
      row: 4,
      elements: [
        { modelId: 'legend', col: 0, colSpan: 2, row: 0 },
        { modelId: 'pie-region', col: 0, colSpan: 2, row: 1 },
        { modelId: 'axis-left', col: 0, row: 2 },
        { modelId: 'line-region', col: 1, row: 2 },
        { modelId: 'axis-bottom', col: 1, row: 3 },
      ],
    },
    region: [{ id: 'pie-region', height: '40%' }, { id: 'line-region' }],
    legends: { id: 'legend', visible: !ctx.preview, orient: 'top', regionId: ['pie-region', 'line-region'] },
    series: [
      { regionId: 'pie-region', type: 'pie', valueField: 'value', categoryField: 'type', seriesField: 'type', data: { id: 'pie', values: pieRows(1) } },
      { regionId: 'line-region', type: 'line', xField: 'x', yField: 'y', seriesField: 'type', data: { id: 'line', values: lineRows(1) } },
    ],
    axes: [
      { id: 'axis-left', regionId: 'line-region', orient: 'left' },
      { id: 'axis-bottom', regionId: 'line-region', orient: 'bottom', type: 'band' },
    ],
    tooltip: { dimension: { visible: true } },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  let seed = 1;
  let released = false;
  const stop = every(2200, () => {
    if (released) return;
    seed += 1;
    void vchart.updateData('pie', pieRows(seed));
    void vchart.updateData('line', lineRows(seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;

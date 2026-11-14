// layout.type 'grid': legend, pie region, left axis, line region and bottom axis on a 2 x 4 grid
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const mount: Mount = (el, ctx) => {
  const r = rng(11);
  const pie = () => ['a', 'b', 'c'].map((type) => ({ type, value: Math.round(10 + r() * 40) }));
  const line = () => ['1', '2', '3', '4', '5'].flatMap((x) => ['a', 'b'].map((type) => ({ x, type, y: Math.round(10 + r() * 50) })));
  const { vchart, release } = createChart(el, ctx, {
    type: 'common',
    padding: { top: 10 },
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
    legends: { visible: true, orient: 'top', id: 'legend', regionId: ['pie-region', 'line-region'] },
    series: [
      { regionId: 'pie-region', type: 'pie', valueField: 'value', categoryField: 'type', seriesField: 'type', data: { id: 'pie', values: pie() } },
      { regionId: 'line-region', type: 'line', xField: 'x', yField: 'y', seriesField: 'type', data: { id: 'line', values: line() } },
    ],
    axes: [
      { id: 'axis-left', regionId: 'line-region', orient: 'left' },
      { id: 'axis-bottom', regionId: 'line-region', orient: 'bottom' },
    ],
  } as never);
  let alive = true;
  const stop = every(2200, () => {
    if (!alive) return;
    void vchart.updateData('pie', pie());
    void vchart.updateData('line', line());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;

// Two regions on a grid layout: a pie and a bar chart sharing one legend
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const rand = seeded(9);
const pieValues = (): { type: string; value: number }[] =>
  ['a', 'b', 'c'].map((type) => ({ type, value: Math.round(10 + rand() * 30) }));
const barValues = (): { x: string; y: number; type: string }[] =>
  ['1', '2', '3'].flatMap((x) => ['a', 'b'].map((type) => ({ x, y: Math.round(10 + rand() * 40), type })));

/** The grid has the legend row on top, then the pie, the bar's left axis and the bar. */
function specFor(pieSpan: number): ISpec {
  return {
    type: 'common',
    layout: {
      type: 'grid',
      col: pieSpan + 2,
      row: 3,
      elements: [
        { modelId: 'legend', col: 0, colSpan: pieSpan + 2, row: 0 },
        { modelId: 'pie-region', col: 0, colSpan: pieSpan, row: 1 },
        { modelId: 'axis-left', col: pieSpan, row: 1 },
        { modelId: 'bar-region', col: pieSpan + 1, row: 1 },
        { modelId: 'axis-bottom', col: pieSpan + 1, row: 2 },
      ],
    },
    region: [{ id: 'pie-region' }, { id: 'bar-region' }],
    legends: { visible: true, orient: 'top', id: 'legend', regionId: ['pie-region', 'bar-region'] },
    series: [
      { regionId: 'pie-region', type: 'pie', valueField: 'value', categoryField: 'type', seriesField: 'type', data: { id: 'pie', values: pieValues() } },
      { regionId: 'bar-region', type: 'bar', xField: ['x', 'type'], yField: 'y', seriesField: 'type', data: { id: 'bar', values: barValues() } },
    ],
    axes: [
      { id: 'axis-left', regionId: 'bar-region', orient: 'left' },
      { id: 'axis-bottom', regionId: 'bar-region', orient: 'bottom' },
    ],
  } as unknown as ISpec;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const chart = createChart(el, ctx, specFor(2));
  let alive = true;
  const stop = every(ctx.preview ? 1800 : 3500, () => {
    if (!alive) return;
    void chart.vchart.updateData('pie', pieValues());
    void chart.vchart.updateData('bar', barValues());
  });
  if (bar) {
    slider(bar, 'pie colSpan', [1, 4, 1], 2, (v) => {
      if (alive) void chart.vchart.updateSpec(specFor(v));
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;

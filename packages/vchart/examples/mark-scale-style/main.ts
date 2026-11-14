// Mark styles from scales: size and shape of two series bound to shared spec.scales
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const rand = seeded(2);
const data1 = (): { x: string; y: number; type: string }[] =>
  ['Q1', 'Q2', 'Q3'].flatMap((x) => ['typeA', 'typeB'].map((type) => ({ x, y: Math.round(rand() * 200), type })));
const data2 = (): { x: string; y: number; group: string }[] =>
  ['Q1', 'Q2', 'Q3'].flatMap((x) => ['typeC', 'typeD'].map((group) => ({ x, y: Math.round(-50 + rand() * 250), group })));

const specFor = (maxSize: number, preview: boolean): ISpec =>
  ({
    type: 'common',
    data: [
      { id: 'data1', values: data1() },
      { id: 'data2', values: data2() },
    ],
    series: [
      {
        type: 'scatter', xField: 'x', yField: 'y', dataId: 'data1', seriesField: 'type',
        point: { style: { size: { field: 'y', scale: 'sizeScale' }, shape: { field: 'type', scale: 'shapeScale' } } },
      },
      {
        type: 'line', xField: 'x', yField: 'y', dataId: 'data2', seriesField: 'group',
        point: { style: { size: { field: 'y', scale: 'sizeScale' }, shape: { field: 'group', scale: 'shapeScale' } } },
      },
    ],
    scales: [
      {
        id: 'shapeScale', type: 'ordinal',
        domain: [{ dataId: 'data1', fields: ['type'] }, { dataId: 'data2', fields: ['group'] }],
        range: ['circle', 'rect', 'triangle', 'diamond'],
      },
      {
        id: 'sizeScale', type: 'linear',
        domain: [{ dataId: 'data1', fields: ['y'] }, { dataId: 'data2', fields: ['y'] }],
        range: [6, maxSize],
      },
    ],
    axes: [{ orient: 'left' }, { orient: 'bottom' }],
    legends: { visible: !preview },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let maxSize = 30;
  const chart = createChart(el, ctx, specFor(maxSize, ctx.preview));
  let alive = true;
  const stop = every(ctx.preview ? 1800 : 3500, () => {
    if (!alive) return;
    void chart.vchart.updateData('data1', data1());
    void chart.vchart.updateData('data2', data2());
  });
  if (bar) {
    slider(bar, 'sizeScale range max', [10, 60, 2], maxSize, (v) => {
      maxSize = v;
      if (alive) void chart.vchart.updateSpec(specFor(v, ctx.preview));
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;

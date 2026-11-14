// series.morph { morphKey, morphElementKey }: a bar splits into scatter points and merges back
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const mount: Mount = (el, ctx) => {
  const r = rng(52);
  const points = (type: string) => Array.from({ length: 10 }, (_, x) => ({ x, y: 0.15 + r() * 0.75, type }));
  const a = points('A');
  const b = points('B');
  const avg = (d: { y: number }[]) => d.reduce((s, p) => s + p.y, 0) / d.length;
  const bars: ISpec = {
    type: 'common',
    series: [
      { type: 'bar', data: { values: [{ value: avg(a), type: 'A' }] }, xField: 'type', yField: 'value', morph: { morphKey: 'A' } },
      { type: 'bar', data: { values: [{ value: avg(b), type: 'B' }] }, xField: 'type', yField: 'value', morph: { morphKey: 'B' } },
    ],
    axes: [{ orient: 'left', type: 'linear', max: 1 }, { orient: 'bottom', type: 'band' }],
  };
  const dots: ISpec = {
    type: 'common',
    series: [
      { type: 'scatter', data: { values: a }, xField: 'x', yField: 'y', seriesField: 'type', morph: { morphKey: 'A', morphElementKey: 'type' } },
      { type: 'scatter', data: { values: b }, xField: 'x', yField: 'y', seriesField: 'type', morph: { morphKey: 'B', morphElementKey: 'type' } },
    ],
    axes: [{ orient: 'left', type: 'linear', zero: false, max: 1 }, { orient: 'bottom', type: 'band' }],
  };
  const chart = createChart(el, ctx, bars);
  let n = 0;
  let alive = true;
  const stop = every(3000, () => {
    if (alive) void chart.vchart.updateSpec(++n % 2 ? dots : bars);
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;

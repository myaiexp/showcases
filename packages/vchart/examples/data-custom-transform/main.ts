// A custom DataSet transform: topN registered once, then named in data.transforms
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider, VChart } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

interface Row { name: string; value: number }
// (data, options) => new data: the same shape as the built-in transforms.
VChart.registerDataSetTransform('showcaseTopN', (data: Row[], options?: { n?: number; field?: string }) => {
  const field = (options?.field ?? 'value') as keyof Row;
  return [...data].sort((a, b) => Number(b[field]) - Number(a[field])).slice(0, options?.n ?? 3);
});

const NAMES = ['Ada', 'Bo', 'Cy', 'Di', 'Ed', 'Flo', 'Gus', 'Hal', 'Ivy', 'Jo'];
const rand = seeded(19);
const make = (): Row[] => NAMES.map((name) => ({ name, value: Math.round(10 + rand() * 90) }));

const specFor = (n: number, values: Row[]): ISpec =>
  ({
    type: 'bar',
    direction: 'horizontal',
    data: [{ id: 'scores', values, transforms: [{ type: 'showcaseTopN', options: { n, field: 'value' } }] }],
    xField: 'value',
    yField: 'name',
    label: { visible: true },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let n = 5;
  let values = make();
  const chart = createChart(el, ctx, specFor(n, values));
  let alive = true;
  const apply = (): void => {
    if (alive) void chart.vchart.updateSpec(specFor(n, values));
  };
  const stop = every(ctx.preview ? 1800 : 4000, () => {
    values = make();
    if (ctx.preview) n = (n % 6) + 2;
    apply();
  });
  if (bar) slider(bar, 'topN n', [1, 10, 1], n, (v) => { n = v; apply(); });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;

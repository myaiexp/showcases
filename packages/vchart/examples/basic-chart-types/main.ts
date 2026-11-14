// One dataset, many chart types: only type and the field mapping change
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, type Chart } from '../../shared/chart.ts';

const VALUES = [
  { month: 'Monday', sales: 22 },
  { month: 'Tuesday', sales: 13 },
  { month: 'Wednesday', sales: 25 },
  { month: 'Thursday', sales: 29 },
  { month: 'Friday', sales: 38 },
];
const TYPES = ['bar', 'line', 'area', 'scatter', 'pie', 'rose', 'radar', 'funnel'] as const;
const POLAR = new Set<string>(['pie', 'rose', 'radar', 'funnel']);

function specFor(type: (typeof TYPES)[number]): ISpec {
  const mapping = POLAR.has(type)
    ? { categoryField: 'month', valueField: 'sales' }
    : { xField: 'month', yField: 'sales' };
  return { type, data: [{ id: 'd', values: VALUES }], ...mapping, title: { visible: true, text: `type: '${type}'` } } as ISpec;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let chart: Chart | null = null;
  let current = 0;
  const show = (i: number): void => {
    chart?.release();
    current = i;
    chart = createChart(el, ctx, specFor(TYPES[i] ?? 'bar'));
  };
  show(0);

  let stop = (): void => {};
  if (bar) {
    const sel = select(bar, 'type', TYPES, (v) => show(TYPES.indexOf(v as (typeof TYPES)[number])));
    sel.value = TYPES[current] ?? 'bar';
  } else {
    stop = every(1600, () => show((current + 1) % TYPES.length));
  }

  return () => {
    stop();
    chart?.release();
  };
};

export default mount;

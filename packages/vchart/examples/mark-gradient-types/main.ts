// Gradient types: linear on bars, radial on points, conical on pie sectors
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const CATS = ['A', 'B', 'C', 'D', 'E'];
const rows = CATS.map((c, i) => ({ c, v: [30, 52, 41, 66, 48][i] ?? 0 }));
const stops = [
  { offset: 0, color: '#ffd43b' },
  { offset: 0.5, color: '#ff922b' },
  { offset: 1, color: '#e03131' },
];
const TYPES = ['linear', 'radial', 'conical'] as const;
type Kind = (typeof TYPES)[number];

function specFor(kind: Kind): ISpec {
  if (kind === 'linear') {
    return {
      type: 'bar', data: [{ values: rows }], xField: 'c', yField: 'v',
      bar: { style: { fill: { gradient: 'linear', x0: 0, y0: 0, x1: 0, y1: 1, stops } } },
    } as unknown as ISpec;
  }
  if (kind === 'radial') {
    return {
      type: 'scatter', data: [{ values: rows }], xField: 'c', yField: 'v',
      point: { style: { size: 46, fill: { gradient: 'radial', x0: 0.5, y0: 0.5, r0: 0, x1: 0.5, y1: 0.5, r1: 0.5, stops } } },
    } as unknown as ISpec;
  }
  return {
    type: 'pie', data: [{ values: rows }], categoryField: 'c', valueField: 'v', outerRadius: 0.85, innerRadius: 0.4,
    pie: { style: { fill: { gradient: 'conical', startAngle: 0, endAngle: Math.PI * 2, stops } } },
  } as unknown as ISpec;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let chart = createChart(el, ctx, specFor('linear'));
  let kind: Kind = 'linear';
  const show = (k: Kind): void => {
    kind = k;
    chart.release();
    chart = createChart(el, ctx, specFor(k));
  };
  let stop = (): void => {};
  if (bar) select(bar, 'gradient', TYPES, (v) => show(v as Kind));
  else stop = every(1800, () => show(TYPES[(TYPES.indexOf(kind) + 1) % TYPES.length] ?? 'linear'));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;

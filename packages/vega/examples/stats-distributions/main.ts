// Distribution objects: pdf and cdf curves over a histogram of sample() draws
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { histogram, labelMark, linspace, seeded } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

interface Dist {
  sample(): number;
  pdf(v: number): number;
  cdf(v: number): number;
  icdf(p: number): number;
}
const makers: Record<string, () => Dist> = {
  'randomNormal(0, 1)': () => api.randomNormal(0, 1),
  'randomNormal(2, 0.5)': () => api.randomNormal(2, 0.5),
  'randomLogNormal(0, 0.6)': () => api.randomLogNormal(0, 0.6),
  'randomLogNormal(1, 0.3)': () => api.randomLogNormal(1, 0.3),
  'randomUniform(-1, 2)': () => api.randomUniform(-1, 2),
};
const names = Object.keys(makers);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const compute = (name: string): { curve: object[]; hist: object[]; label: string } => {
    const dist = (makers[name] ?? makers[names[0] ?? '']!)();
    const lo = dist.icdf(0.002);
    const hi = dist.icdf(0.998);
    const samples = seeded(5, () => Array.from({ length: 1500 }, () => dist.sample()));
    const bins = api.bin({ extent: [lo, hi], step: (hi - lo) / 32, nice: false });
    const curve = linspace(lo, hi, 140).map((x) => ({ x, pdf: dist.pdf(x), cdf: dist.cdf(x) }));
    return { curve, hist: histogram(samples, bins), label: `${name}   icdf(0.5) = ${dist.icdf(0.5).toFixed(3)}   sample() × 1500` };
  };
  const first = compute(names[0] ?? '');

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: { left: 8, right: 36, top: 22, bottom: 8 },
    signals: [{ name: 'label', value: first.label }],
    data: [{ name: 'curve', values: first.curve }, { name: 'hist', values: first.hist }],
    scales: [
      { name: 'x', type: 'linear', domain: { data: 'curve', field: 'x' }, range: 'width' },
      { name: 'y', type: 'linear', domain: { fields: [{ data: 'hist', field: 'd' }, { data: 'curve', field: 'pdf' }] }, nice: true, zero: true, range: 'height' },
      { name: 'p', type: 'linear', domain: [0, 1], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', title: 'density', tickCount: 4 },
      { orient: 'right', scale: 'p', title: 'cdf', tickCount: 4, grid: false },
    ],
    marks: [
      { type: 'rect', from: { data: 'hist' }, encode: { update: { x: { scale: 'x', field: 'x0' }, x2: { scale: 'x', field: 'x1' }, y: { scale: 'y', field: 'd' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.7 }, stroke: { value: '#0f1218' } } } },
      { type: 'line', from: { data: 'curve' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'pdf' }, stroke: { value: '#f59e0b' }, strokeWidth: { value: 2.5 } } } },
      { type: 'line', from: { data: 'curve' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'p', field: 'cdf' }, stroke: { value: '#7dd3fc' }, strokeDash: { value: [4, 3] }, strokeWidth: { value: 1.5 } } } },
      labelMark('label'),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (name: string): Promise<void> => {
    const r = compute(name);
    view.data('curve', r.curve).data('hist', r.hist).signal('label', r.label);
    await view.runAsync();
  };
  if (stage.bar) select(stage.bar, 'distribution', names, names[0] ?? '', (v) => void apply(v));
  if (stage.preview) stage.every(1700, (i) => apply(names[i % names.length] ?? ''));
  return () => stage.dispose();
};

export default mount;

// quartiles, quantiles and bootstrapCI summarise one skewed sample
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { normals, rng } from '../../shared/cards.ts';
import { slider } from '../../shared/controls.ts';
import { labelMark, seeded } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const gauss = normals(rng(17));
  const rand = rng(18);
  const sample = Array.from({ length: 70 }, () => Math.exp(1.2 + gauss() * 0.55));
  const dots = sample.map((v) => ({ v, j: rand() }));
  const [q1, med, q3] = api.quartiles(sample) as [number, number, number];
  const [p10, p90] = api.quantiles(sample, [0.1, 0.9]) as [number, number];
  const mean = sample.reduce((a, b) => a + b, 0) / sample.length;

  const compute = (alpha: number, samples: number): { ci: object[]; label: string } => {
    const [lo, hi] = seeded(2, () => api.bootstrapCI(sample, samples, alpha)) as [number, number];
    return { ci: [{ lo, hi }], label: `bootstrapCI(sample, ${samples}, ${alpha})  →  [${lo.toFixed(2)}, ${hi.toFixed(2)}]   mean ${mean.toFixed(2)}` };
  };
  const first = compute(0.05, 500);

  const spec: Spec = {
    width: 460,
    height: 160,
    padding: { left: 8, right: 8, top: 36, bottom: 8 },
    signals: [{ name: 'label', value: first.label }],
    data: [
      { name: 'dots', values: dots },
      { name: 'ci', values: first.ci },
      { name: 'q', values: [{ k: 'q1', v: q1 }, { k: 'median', v: med }, { k: 'q3', v: q3 }] },
      { name: 'p', values: [{ k: 'p10', v: p10 }, { k: 'p90', v: p90 }] },
    ],
    scales: [{ name: 'x', type: 'linear', domain: [0, Math.ceil(Math.max(...sample))], range: 'width', nice: true }],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [
      { type: 'symbol', from: { data: 'dots' }, encode: { update: { x: { scale: 'x', field: 'v' }, y: { signal: '8 + datum.j * 52' }, size: { value: 30 }, fill: { value: '#8b93a3' }, fillOpacity: { value: 0.7 } } } },
      { type: 'rule', from: { data: 'q' }, encode: { update: { x: { scale: 'x', field: 'v' }, y: { value: 0 }, y2: { value: 68 }, stroke: { value: 'steelblue' }, strokeWidth: { signal: "datum.k == 'median' ? 3 : 1.5" } } } },
      { type: 'text', from: { data: 'q' }, encode: { update: { x: { scale: 'x', field: 'v' }, y: { value: 82 }, align: { value: 'center' }, text: { signal: 'datum.k + " " + format(datum.v, ".2f")' }, fill: { value: 'steelblue' }, fontSize: { value: 10 } } } },
      { type: 'rule', from: { data: 'p' }, encode: { update: { x: { scale: 'x', field: 'v' }, y: { value: 0 }, y2: { value: 68 }, stroke: { value: '#7dd3fc' }, strokeDash: { value: [3, 3] } } } },
      { type: 'text', from: { data: 'p' }, encode: { update: { x: { scale: 'x', field: 'v' }, y: { value: 94 }, align: { value: 'center' }, text: { signal: 'datum.k' }, fill: { value: '#7dd3fc' }, fontSize: { value: 10 } } } },
      { type: 'rect', from: { data: 'ci' }, encode: { update: { x: { scale: 'x', field: 'lo' }, x2: { scale: 'x', field: 'hi' }, y: { value: 110 }, height: { value: 10 }, fill: { value: '#f59e0b' } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 134 }, text: { value: 'orange bar: bootstrapped interval for the mean' }, fill: { value: '#f59e0b' }, fontSize: { value: 10 } } } },
      labelMark('label', -20),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (alpha: number, samples: number): Promise<void> => {
    const r = compute(alpha, samples);
    view.data('ci', r.ci).signal('label', r.label);
    await view.runAsync();
  };
  let alpha = 0.05;
  let samples = 500;
  if (stage.bar) {
    slider(stage.bar, 'alpha', [0.01, 0.5, 0.01], alpha, (v) => void apply((alpha = v), samples));
    slider(stage.bar, 'samples', [20, 3000, 20], samples, (v) => void apply(alpha, (samples = v)));
  }
  if (stage.preview) {
    const as = [0.05, 0.3, 0.01, 0.15, 0.5];
    stage.every(1300, (i) => apply(as[i % as.length] ?? 0.05, 500));
  }
  return () => stage.dispose();
};

export default mount;

// randomMixture is the truth, randomKDE estimates it from draws; set the bandwidth
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { labelMark, linspace, seeded } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Two bumps, the second twice as likely: weights are normalised, so [1, 2] means 1/3 and 2/3.
  const mixture = api.randomMixture([api.randomNormal(-1.5, 0.6), api.randomNormal(1.8, 0.9)], [1, 2]);
  const samples = seeded(21, () => Array.from({ length: 120 }, () => mixture.sample()));
  const kde = api.randomKDE(samples);
  const auto = api.bandwidthNRD(samples);
  const xs = linspace(-4, 5, 150);
  const truth = xs.map((x) => ({ x, p: mixture.pdf(x) }));

  const estimate = (bw: number): { rows: object[]; label: string } => {
    kde.bandwidth(bw);
    const rows = xs.map((x) => ({ x, p: kde.pdf(x) }));
    const shown = kde.bandwidth();
    return { rows, label: `randomKDE(samples, ${bw || 0})  bandwidth ${shown.toFixed(3)}   (bandwidthNRD ${auto.toFixed(3)})` };
  };
  const first = estimate(0);

  const spec: Spec = {
    width: 440,
    height: 170,
    padding: { left: 8, right: 8, top: 22, bottom: 8 },
    signals: [{ name: 'label', value: first.label }],
    data: [{ name: 'truth', values: truth }, { name: 'kde', values: first.rows }, { name: 'rug', values: samples.map((x) => ({ x })) }],
    scales: [
      { name: 'x', type: 'linear', domain: [-4, 5], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 0.6], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 4, title: 'density' }],
    marks: [
      { type: 'rect', from: { data: 'rug' }, encode: { update: { x: { scale: 'x', field: 'x' }, width: { value: 1 }, y: { signal: 'height - 10' }, y2: { signal: 'height' }, fill: { value: '#8b93a3' } } } },
      { type: 'line', from: { data: 'truth' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'p' }, stroke: { value: '#f59e0b' }, strokeWidth: { value: 2 }, strokeDash: { value: [5, 3] } } } },
      { type: 'area', from: { data: 'kde' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'p' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.4 }, stroke: { value: 'steelblue' }, strokeWidth: { value: 1.5 } } } },
      labelMark('label'),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (bw: number): Promise<void> => {
    const r = estimate(bw);
    view.data('kde', r.rows).signal('label', r.label);
    await view.runAsync();
  };
  if (stage.bar) slider(stage.bar, 'bandwidth (0 = auto)', [0, 1.5, 0.02], 0, (v) => void apply(v));
  if (stage.preview) {
    const bws = [0, 0.08, 0.25, 0.6, 1.1, 0.4];
    stage.every(1300, (i) => apply(bws[i % bws.length] ?? 0));
  }
  return () => stage.dispose();
};

export default mount;

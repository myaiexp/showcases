// The function-style normal API: density, cumulative and quantile at a chosen mean
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { labelMark, linspace, seeded } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const compute = (mean: number, sd: number): { curve: object[]; band: object[]; dots: object[]; label: string } => {
    const q025 = api.quantileNormal(0.025, mean, sd);
    const q975 = api.quantileNormal(0.975, mean, sd);
    const curve = linspace(-6, 8, 160).map((x) => ({ x, d: api.densityNormal(x, mean, sd), c: api.cumulativeNormal(x, mean, sd) }));
    const band = curve.filter((r) => r.x >= q025 && r.x <= q975);
    // Five seeded draws from sampleNormal sit on the axis.
    const dots = seeded(3, () => Array.from({ length: 12 }, () => ({ x: api.sampleNormal(mean, sd) })));
    return {
      curve,
      band,
      dots,
      label: `mean ${mean.toFixed(1)}, sd ${sd.toFixed(2)}   quantileNormal(0.025) = ${q025.toFixed(2)}, (0.975) = ${q975.toFixed(2)}   cdf(mean) = ${api.cumulativeNormal(mean, mean, sd).toFixed(2)}`,
    };
  };
  const first = compute(1, 1);

  const spec: Spec = {
    width: 440,
    height: 180,
    padding: { left: 8, right: 36, top: 22, bottom: 8 },
    signals: [{ name: 'label', value: first.label }],
    data: [{ name: 'curve', values: first.curve }, { name: 'band', values: first.band }, { name: 'dots', values: first.dots }],
    scales: [
      { name: 'x', type: 'linear', domain: [-6, 8], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 1.4], range: 'height' },
      { name: 'p', type: 'linear', domain: [0, 1], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'densityNormal', tickCount: 4 }, { orient: 'right', scale: 'p', title: 'cumulativeNormal', tickCount: 4, grid: false }],
    marks: [
      { type: 'area', from: { data: 'band' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'd' }, y2: { scale: 'y', value: 0 }, fill: { value: '#f59e0b' }, fillOpacity: { value: 0.25 } } } },
      { type: 'line', from: { data: 'curve' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'd' }, stroke: { value: '#f59e0b' }, strokeWidth: { value: 2.5 } } } },
      { type: 'line', from: { data: 'curve' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'p', field: 'c' }, stroke: { value: '#7dd3fc' }, strokeDash: { value: [4, 3] }, strokeWidth: { value: 1.5 } } } },
      { type: 'symbol', from: { data: 'dots' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { signal: 'height' }, size: { value: 50 }, fill: { value: 'steelblue' } } } },
      labelMark('label'),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (mean: number, sd: number): Promise<void> => {
    const r = compute(mean, sd);
    view.data('curve', r.curve).data('band', r.band).data('dots', r.dots).signal('label', r.label);
    await view.runAsync();
  };
  let mean = 1;
  let sd = 1;
  if (stage.bar) {
    slider(stage.bar, 'mean', [-3, 5, 0.1], mean, (v) => void apply((mean = v), sd));
    slider(stage.bar, 'stdev', [0.3, 2.5, 0.05], sd, (v) => void apply(mean, (sd = v)));
  }
  if (stage.preview) {
    const steps: [number, number][] = [[1, 1], [-1.5, 0.5], [3, 1.6], [0, 2.2], [2, 0.4]];
    stage.every(1300, (i) => apply(...(steps[i % steps.length] ?? steps[0]!)));
  }
  return () => stage.dispose();
};

export default mount;

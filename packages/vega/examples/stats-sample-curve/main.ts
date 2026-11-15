// sampleCurve puts more points where the curve bends; minSteps, maxSteps bound it
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { labelMark, linspace } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

const f = (x: number): number => Math.sin(x * x * 0.9) * Math.exp(-x / 5) + 0.15 * x;
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const extent: [number, number] = [0, 6];
  const truth = linspace(0, 6, 800).map((x) => ({ x, y: f(x) }));

  const compute = (min: number, max: number): { pts: object[]; label: string } => {
    const pts = api.sampleCurve(f, extent, min, max).map(([x, y]) => ({ x, y }));
    return { pts, label: `sampleCurve(f, [0, 6], ${min}, ${max})  →  ${pts.length} points${min === max ? '  (uniform: no adaptive step)' : ''}` };
  };
  const first = compute(10, 120);

  const spec: Spec = {
    width: 460,
    height: 170,
    padding: { left: 8, right: 8, top: 22, bottom: 8 },
    signals: [{ name: 'label', value: first.label }],
    data: [{ name: 'truth', values: truth }, { name: 'pts', values: first.pts }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 6], range: 'width' },
      { name: 'y', type: 'linear', domain: [-1.2, 1.6], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [
      { type: 'line', from: { data: 'truth' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: '#6b7280' }, strokeWidth: { value: 1 } } } },
      { type: 'line', from: { data: 'pts' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: '#f59e0b' }, strokeWidth: { value: 1.5 } } } },
      { type: 'symbol', from: { data: 'pts' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, size: { value: 14 }, fill: { value: 'steelblue' } } } },
      labelMark('label'),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (min: number, max: number): Promise<void> => {
    const r = compute(min, Math.max(min, max));
    view.data('pts', r.pts).signal('label', r.label);
    await view.runAsync();
  };
  let min = 10;
  let max = 120;
  if (stage.bar) {
    slider(stage.bar, 'minSteps', [2, 80, 1], min, (v) => void apply((min = v), max));
    slider(stage.bar, 'maxSteps', [2, 300, 1], max, (v) => void apply(min, (max = v)));
  }
  if (stage.preview) {
    const combos: [number, number][] = [[10, 120], [6, 6], [25, 25], [6, 300], [40, 40], [8, 60]];
    stage.every(1400, (i) => apply(...(combos[i % combos.length] ?? combos[0]!)));
  }
  return () => stage.dispose();
};

export default mount;

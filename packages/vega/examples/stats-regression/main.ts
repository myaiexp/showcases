// The regression helpers on one scatter: coef, rSquared and predict curves
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { normals, rng } from '../../shared/cards.ts';
import { select } from '../../shared/controls.ts';
import { labelMark } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

type Pt = { x: number; y: number };
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Positive, curved data, so the log, exp and power forms are all legal fits.
  const gauss = normals(rng(4));
  const pts: Pt[] = Array.from({ length: 32 }, (_, i) => {
    const x = 1 + (i / 31) * 19;
    return { x: Math.round(x * 100) / 100, y: Math.max(0.5, Math.round((3 * Math.sqrt(x) + gauss() * 0.9) * 100) / 100) };
  });
  const gx = (d: Pt): number => d.x;
  const gy = (d: Pt): number => d.y;
  const extent: [number, number] = [1, 20];

  type Fit = { coef?: number[]; rSquared?: number; predict?: (x: number) => number };
  const models: Record<string, () => Fit | [number, number][]> = {
    'regressionLinear': () => api.regressionLinear(pts, gx, gy),
    'regressionLog': () => api.regressionLog(pts, gx, gy),
    'regressionExp': () => api.regressionExp(pts, gx, gy),
    'regressionPow': () => api.regressionPow(pts, gx, gy),
    'regressionQuad': () => api.regressionQuad(pts, gx, gy),
    'regressionPoly (order 3)': () => api.regressionPoly(pts, gx, gy, 3),
    'regressionLoess (0.3)': () => api.regressionLoess(pts, gx, gy, 0.3),
  };
  const names = Object.keys(models);

  const compute = (name: string): { line: Pt[]; label: string } => {
    const fit = (models[name] ?? models[names[0] ?? '']!)();
    if (Array.isArray(fit)) return { line: fit.map(([x, y]) => ({ x, y })), label: `${name}: ${fit.length} smoothed points, no coefficients` };
    // sampleCurve picks more points where the fitted curve bends.
    const line = api.sampleCurve((x: number) => fit.predict?.(x) ?? 0, extent, 12, 120).map(([x, y]) => ({ x, y }));
    const coef = (fit.coef ?? []).map((c) => c.toFixed(2)).join(', ');
    return { line, label: `${name}: coef [${coef}]   R² ${(fit.rSquared ?? 0).toFixed(3)}   (${line.length} curve points)` };
  };
  const first = compute(names[0] ?? '');

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: { left: 8, right: 8, top: 22, bottom: 8 },
    signals: [{ name: 'label', value: first.label }],
    data: [{ name: 'pts', values: pts }, { name: 'line', values: first.line }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 21], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 18], range: 'height', clamp: true },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [
      { type: 'symbol', from: { data: 'pts' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, size: { value: 36 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.8 } } } },
      { type: 'line', from: { data: 'line' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: '#f59e0b' }, strokeWidth: { value: 2.5 } } } },
      { type: 'symbol', from: { data: 'line' }, encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, size: { value: 8 }, fill: { value: '#fff' } } } },
      labelMark('label'),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (name: string): Promise<void> => {
    const r = compute(name);
    view.data('line', r.line).signal('label', r.label);
    await view.runAsync();
  };
  if (stage.bar) select(stage.bar, 'model', names, names[0] ?? '', (v) => void apply(v));
  if (stage.preview) stage.every(1500, (i) => apply(names[i % names.length] ?? ''));
  return () => stage.dispose();
};

export default mount;

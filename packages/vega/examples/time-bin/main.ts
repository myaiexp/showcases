// timeBin picks time units and a step for an extent; timeFloor then bins with them
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec, TimeUnit } from 'vega';
import type { Mount } from '@/types.ts';
import { normals, rng } from '../../shared/cards.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const spans: Record<string, number> = { '2 days': 2, '3 weeks': 21, '1 year': 365, '15 years': 5475 };
const spanKeys = Object.keys(spans);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const day = 864e5;
  const base = new Date(2010, 0, 1).getTime();
  const gauss = normals(rng(11));

  const compute = (span: string, maxbins: number): { rows: { t0: number; t1: number; n: number }[]; label: string } => {
    const length = (spans[span] ?? 21) * day;
    const mid = base + length / 2;
    const stamps = Array.from({ length: 400 }, () => mid + gauss() * length * 0.22).filter((t) => t >= base && t < base + length);
    const extent: [number, number] = [Math.min(...stamps), Math.max(...stamps)];
    const bin = api.timeBin({ extent, maxbins });
    const floor = api.timeFloor(bin.units as TimeUnit[], bin.step);
    const last = bin.units[bin.units.length - 1] as TimeUnit;
    const counts = new Map<number, number>();
    for (const t of stamps) counts.set(+floor(t), (counts.get(+floor(t)) ?? 0) + 1);
    const rows = [...counts].sort((x, y) => x[0] - y[0]).map(([t0, n]) => ({ t0, t1: +api.timeOffset(last, new Date(t0), bin.step), n }));
    return { rows, label: `timeBin({extent, maxbins: ${maxbins}})  →  units [${bin.units.join(', ')}], step ${bin.step}  (${rows.length} bins)` };
  };
  const first = compute('3 weeks', 20);

  const spec: Spec = {
    width: 470,
    height: 150,
    padding: 8,
    signals: [{ name: 'label', value: first.label }],
    data: [{ name: 'bins', values: first.rows }],
    scales: [
      { name: 'x', type: 'time', domain: { data: 'bins', fields: ['t0', 't1'] }, range: 'width' },
      { name: 'y', type: 'linear', domain: [0, { signal: 'max(10, extent(pluck(data("bins"), "n"))[1])' }], nice: true, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 7 }, { orient: 'left', scale: 'y', tickCount: 4 }],
    marks: [
      { type: 'rect', from: { data: 'bins' }, encode: { update: { x: { scale: 'x', field: 't0' }, x2: { scale: 'x', field: 't1' }, y: { scale: 'y', field: 'n' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, stroke: { value: '#0f1218' }, strokeWidth: { value: 1 } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: -4 }, text: { signal: 'label' }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 11 } } } },
    ],
  };
  const view = await stage.render(spec);

  const apply = async (span: string, maxbins: number): Promise<void> => {
    const r = compute(span, maxbins);
    view.data('bins', r.rows);
    view.signal('label', r.label);
    await view.runAsync();
  };
  let span = '3 weeks';
  let maxbins = 20;
  if (stage.bar) {
    select(stage.bar, 'extent', spanKeys, span, (v) => void apply((span = v), maxbins));
    slider(stage.bar, 'maxbins', [3, 60, 1], maxbins, (v) => void apply(span, (maxbins = v)));
  }
  if (stage.preview) {
    const steps: [string, number][] = [['3 weeks', 20], ['3 weeks', 6], ['1 year', 12], ['2 days', 24], ['15 years', 10]];
    stage.every(1600, (i) => apply(...(steps[i % steps.length] ?? steps[0]!)));
  }
  return () => stage.dispose();
};

export default mount;

// timeFloor and utcFloor snap each timestamp to the start of its unit
import { api } from '../../shared/vega-api.ts';
import type { Spec, TimeUnit } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Preset {
  units: TimeUnit[];
  step: number;
}
const presets: Record<string, Preset> = {
  "['year', 'month']": { units: ['year', 'month'], step: 1 },
  "['year', 'quarter']": { units: ['year', 'quarter'], step: 1 },
  "['year', 'week']": { units: ['year', 'week'], step: 1 },
  "['year', 'month', 'date'], 10": { units: ['year', 'month', 'date'], step: 10 },
  "['year', 'month', 'date', 'hours'], 12": { units: ['year', 'month', 'date', 'hours'], step: 12 },
};
const keys = Object.keys(presets);
const frames = ['timeFloor', 'utcFloor'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const t0 = new Date(2024, 0, 1).getTime();
  const t1 = new Date(2024, 4, 1).getTime();
  const rand = rng(7);
  const stamps = Array.from({ length: 40 }, () => Math.round(t0 + rand() * (t1 - t0 - 1))).sort((a, b) => a - b);

  const spec: Spec = {
    width: 460,
    height: 130,
    padding: 8,
    signals: [{ name: 'label', value: '' }],
    data: [{ name: 'dots', values: [] }],
    scales: [{ name: 'x', type: 'time', domain: [t0, t1], range: 'width' }],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 8 }],
    marks: [
      {
        type: 'rule',
        from: { data: 'dots' },
        encode: { update: { x: { scale: 'x', field: 't' }, y: { value: 20 }, x2: { scale: 'x', field: 'f' }, y2: { value: 100 }, stroke: { value: '#6b7280' } } },
      },
      { type: 'symbol', from: { data: 'dots' }, encode: { update: { x: { scale: 'x', field: 't' }, y: { value: 20 }, size: { value: 40 }, fill: { value: 'steelblue' } } } },
      { type: 'symbol', from: { data: 'dots' }, encode: { update: { x: { scale: 'x', field: 'f' }, y: { value: 100 }, shape: { value: 'square' }, size: { value: 50 }, fill: { value: '#f59e0b' } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: -2 }, text: { signal: 'label' }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 12 } } } },
    ],
  };
  const view = await stage.render(spec);

  const apply = async (key: string, frame: (typeof frames)[number]): Promise<void> => {
    const p = presets[key] ?? presets[keys[0] ?? '']!;
    const floor = api[frame](p.units, p.step);
    const rows = stamps.map((t) => ({ t, f: +floor(t) }));
    view.data('dots', rows);
    view.signal('label', `${frame}(${key})  →  ${new Set(rows.map((r) => r.f)).size} distinct floors`);
    await view.runAsync();
  };
  let key = keys[0] ?? '';
  let frame: (typeof frames)[number] = 'timeFloor';
  await apply(key, frame);
  if (stage.bar) {
    select(stage.bar, 'units, step', keys, key, (v) => void apply((key = v), frame));
    select(stage.bar, 'function', frames, frame, (v) => void apply(key, (frame = v)));
  }
  if (stage.preview) stage.every(1700, (i) => apply(keys[i % keys.length] ?? '', i % 2 ? 'utcFloor' : 'timeFloor'));
  return () => stage.dispose();
};

export default mount;

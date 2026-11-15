// vega.bin: the option set decides start, stop and step; the histogram follows
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { normals, rng } from '../../shared/cards.ts';
import { select } from '../../shared/controls.ts';
import { labelMark } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

type BinOptions = Parameters<typeof api.bin>[0];
const presets: Record<string, Omit<BinOptions, 'extent'>> = {
  '{maxbins: 10}': { maxbins: 10 },
  '{maxbins: 5}': { maxbins: 5 },
  '{maxbins: 20}': { maxbins: 20 },
  '{maxbins: 20, nice: false}': { maxbins: 20, nice: false },
  '{step: 7}': { step: 7 },
  '{steps: [4, 25]}': { steps: [4, 25] },
  '{maxbins: 20, minstep: 5}': { maxbins: 20, minstep: 5 },
  '{maxbins: 20, divide: [2]}': { maxbins: 20, divide: [2] },
  '{maxbins: 10, base: 2}': { maxbins: 10, base: 2 },
};
const names = Object.keys(presets);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const gauss = normals(rng(9));
  const values = Array.from({ length: 300 }, () => Math.min(97, Math.max(1.5, 46 + gauss() * 22)));
  const extent = vega.extent(values) as [number, number];

  const compute = (name: string): { rows: object[]; label: string } => {
    const b = api.bin({ extent, ...(presets[name] ?? {}) });
    const count = Math.ceil((b.stop - b.start) / b.step - 1e-9);
    const counts = new Array<number>(count).fill(0);
    for (const v of values) {
      const k = Math.min(count - 1, Math.floor((v - b.start) / b.step));
      if (k >= 0) counts[k] = (counts[k] ?? 0) + 1;
    }
    const rows = counts.map((n, k) => ({ x0: b.start + k * b.step, x1: b.start + (k + 1) * b.step, n }));
    return { rows, label: `bin({extent: [${extent.map((e) => e.toFixed(1)).join(', ')}], …${name.slice(1)}  →  start ${vega.extent([b.start])[0]}, stop ${Number(b.stop.toPrecision(5))}, step ${Number(b.step.toPrecision(5))}` };
  };
  const first = compute(names[0] ?? '');

  const spec: Spec = {
    width: 460,
    height: 170,
    padding: { left: 8, right: 8, top: 22, bottom: 8 },
    signals: [{ name: 'label', value: first.label }],
    data: [{ name: 'bins', values: first.rows }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 10 }, { orient: 'left', scale: 'y', tickCount: 5, title: 'count' }],
    marks: [
      { type: 'rect', from: { data: 'bins' }, encode: { update: { x: { scale: 'x', field: 'x0' }, x2: { scale: 'x', field: 'x1' }, y: { scale: 'y', field: 'n' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, stroke: { value: '#0f1218' }, strokeWidth: { value: 1 } } } },
      labelMark('label'),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (name: string): Promise<void> => {
    const r = compute(name);
    view.data('bins', r.rows).signal('label', r.label);
    await view.runAsync();
  };
  if (stage.bar) select(stage.bar, 'options', names, names[0] ?? '', (v) => void apply(v));
  if (stage.preview) stage.every(1400, (i) => apply(names[i % names.length] ?? ''));
  return () => stage.dispose();
};

export default mount;

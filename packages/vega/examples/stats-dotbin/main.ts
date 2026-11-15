// dotbin gives sorted values dot-plot bin locations; smoothing evens the stacks
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { normals, rng } from '../../shared/cards.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { labelMark } from '../../shared/stats-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const gauss = normals(rng(23));
  const sorted = Array.from({ length: 70 }, () => 50 + gauss() * 14).sort((a, b) => a - b);

  const compute = (step: number, smooth: boolean): { dots: object[]; label: string } => {
    const loc = api.dotbin(sorted, step, smooth);
    const level = new Map<number, number>();
    const dots = Array.from(loc, (x, i) => {
      const key = Math.round(x * 1e6);
      const l = level.get(key) ?? 0;
      level.set(key, l + 1);
      return { x, l, raw: sorted[i] ?? 0 };
    });
    return { dots, label: `dotbin(sorted, ${step}, ${smooth})  →  ${level.size} stacks, tallest ${Math.max(...level.values())}` };
  };
  const first = compute(4, false);

  const spec: Spec = {
    width: 460,
    height: 170,
    padding: { left: 8, right: 8, top: 22, bottom: 8 },
    signals: [{ name: 'step', value: 4 }, { name: 'label', value: first.label }],
    data: [{ name: 'dots', values: first.dots }],
    scales: [{ name: 'x', type: 'linear', domain: [10, 90], range: 'width' }],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 8 }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'dots' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { signal: 'height - 6 - (width / 80 * step) / 2 - datum.l * (width / 80 * step) * 0.92' },
            size: { signal: 'pow((width / 80 * step) * 0.86, 2)' },
            fill: { value: 'steelblue' },
            stroke: { value: '#0f1218' },
          },
        },
      },
      labelMark('label'),
    ],
  };
  const view = await stage.render(spec);

  const apply = async (step: number, smooth: boolean): Promise<void> => {
    const r = compute(step, smooth);
    view.data('dots', r.dots).signal('step', step).signal('label', r.label);
    await view.runAsync();
  };
  let step = 4;
  let smooth = false;
  if (stage.bar) {
    slider(stage.bar, 'step', [1, 10, 0.5], step, (v) => void apply((step = v), smooth));
    toggle(stage.bar, 'smooth', smooth, (v) => void apply(step, (smooth = v)));
  }
  if (stage.preview) {
    const combos: [number, boolean][] = [[4, false], [4, true], [2, false], [7, false], [7, true], [3, true]];
    stage.every(1400, (i) => apply(...(combos[i % combos.length] ?? combos[0]!)));
  }
  return () => stage.dispose();
};

export default mount;

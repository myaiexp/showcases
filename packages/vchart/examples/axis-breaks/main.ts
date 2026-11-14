// Axis breaks: breaks.range cuts a stretch out of a linear axis, breakSymbol marks the cut
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [35, 60, 42, 980, 1040, 55, 1120].map((v, i) => ({ k: `K${i + 1}`, v }));
interface State { on: boolean; from: number; to: number; gap: number }

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'k',
    yField: 'v',
    label: { visible: true },
    axes: [
      {
        orient: 'left',
        ...(s.on ? { breaks: [{ range: [s.from, Math.max(s.from + 10, s.to)], breakSymbol: { visible: true, gap: s.gap, style: { stroke: '#ffd43b' } } }] } : {}),
      },
      { orient: 'bottom', type: 'band' },
    ],
  }) as unknown as ISpec;

const SCENES: Partial<State>[] = [
  { on: false },
  { on: true, from: 100, to: 900, gap: 6 },
  { on: true, from: 200, to: 800, gap: 20 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { on: true, from: 100, to: 900, gap: 6 },
    build,
    mode: 'rebuild',
    previewMs: 1800,
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'breaks', ['true', 'false'], (v) => live.set({ on: v === 'true' }));
      slider(bar, 'range from', [70, 500, 10], 100, (v) => live.set({ from: v }));
      slider(bar, 'range to', [510, 960, 10], 900, (v) => live.set({ to: v }));
      slider(bar, 'gap', [0, 40, 2], 6, (v) => live.set({ gap: v }));
    },
  });

export default mount;

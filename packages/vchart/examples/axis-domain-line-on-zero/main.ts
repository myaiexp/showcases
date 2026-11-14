// Domain line on the zero tick: domainLine.onZero and style
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [24, -18, 36, -42, 15, -9, 48, -30].map((v, i) => ({ k: `K${i + 1}`, v }));
interface State { onZero: boolean; width: number; color: string }

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'k',
    yField: 'v',
    axes: [
      {
        orient: 'bottom',
        type: 'band',
        domainLine: {
          visible: true,
          onZero: s.onZero,
          style: { lineWidth: s.width, stroke: s.color },
        },
        label: { space: 8 },
      },
      { orient: 'left' },
    ],
  }) as unknown as ISpec;

const SCENES: Partial<State>[] = [
  { onZero: false, width: 1, color: '#adb5bd' },
  { onZero: true, width: 2, color: '#ffd43b' },
  { onZero: true, width: 4, color: '#ff6b6b' },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { onZero: true, width: 2, color: '#ffd43b' },
    build,
    mode: 'rebuild',
    previewMs: 1700,
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'onZero', ['true', 'false'], (v) => live.set({ onZero: v === 'true' }));
      slider(bar, 'lineWidth', [1, 6, 1], 2, (v) => live.set({ width: v }));
      select(bar, 'stroke', ['#ffd43b', '#ff6b6b', '#adb5bd'], (v) => live.set({ color: v }));
    },
  });

export default mount;

// Axis titles: title.text, position, space and background
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [31, 44, 38, 62, 55, 71].map((v, i) => ({ month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i], rain: v }));
const POSITIONS = ['start', 'middle', 'end'] as const;
interface State { text: string; position: (typeof POSITIONS)[number]; space: number; background: boolean }

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'month',
    yField: 'rain',
    axes: [
      { orient: 'bottom', type: 'band', title: { visible: true, text: 'Month of 2024' } },
      {
        orient: 'left',
        title: {
          visible: true,
          text: s.text,
          position: s.position,
          space: s.space,
          style: { fontSize: 14, fill: '#ffd43b' },
          background: { visible: s.background, style: { fill: '#364fc7', cornerRadius: 4 } },
          padding: s.background ? 4 : 0,
        },
      },
    ],
  }) as unknown as ISpec;

const SCENES: Partial<State>[] = [
  { position: 'middle', space: 8, background: false },
  { position: 'start', space: 8, background: true },
  { position: 'end', space: 24, background: true },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { text: 'Rainfall (mm)', position: 'middle', space: 8, background: false },
    build,
    mode: 'rebuild',
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'text', ['Rainfall (mm)', 'Precipitation per month (millimetres)', 'mm'], (v) => live.set({ text: v }));
      select(bar, 'position', POSITIONS, (v) => live.set({ position: v as State['position'] })).value = 'middle';
      slider(bar, 'space', [0, 60, 2], 8, (v) => live.set({ space: v }));
      select(bar, 'background', ['false', 'true'], (v) => live.set({ background: v === 'true' }));
    },
  });

export default mount;

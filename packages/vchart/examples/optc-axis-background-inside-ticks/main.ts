// Axis background panel, plus label.inside, tick.inside and label.space
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { DAYS } from '../../shared/cartesian-data.ts';

interface S { background: boolean; inside: boolean; space: number }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { background: true, inside: false, space: 4 },
    previewMs: 1500,
    step: (s, i) => ({ background: i % 4 !== 3, inside: i % 2 === 1, space: i % 3 === 2 ? 14 : 4 }),
    build: (s) => ({
      type: 'line',
      data: [{ id: 'd', values: DAYS.map((d, i) => ({ d, v: [12, 30, 22, 48, 41, 60, 52][i] })) }],
      xField: 'd',
      yField: 'v',
      axes: [
        {
          orient: 'bottom',
          background: { visible: s.background, style: { fill: 'rgba(251,191,36,0.18)', cornerRadius: 4 } },
          label: { inside: s.inside, space: s.space, style: { fill: '#fbbf24' } },
          tick: { visible: true, inside: s.inside, tickSize: 8 },
        },
        { orient: 'left', background: { visible: s.background, style: { fill: 'rgba(125,211,252,0.15)' } } },
      ],
    }),
    controls: (bar, live) => {
      select(bar, 'background', ['true', 'false'], (v) => live.set({ background: v === 'true' }));
      select(bar, 'inside', ['false', 'true'], (v) => live.set({ inside: v === 'true' }));
      slider(bar, 'label.space', [0, 24, 2], live.state.space, (v) => live.set({ space: v }));
    },
  });

export default mount;

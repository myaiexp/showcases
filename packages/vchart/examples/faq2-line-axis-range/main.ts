// FAQ: axes.zero false and tick.tickMode 'd3' make a line's y axis follow its data
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00'].map((time, i) => ({
  time,
  value: [80, 90, 85, 84, 96, 97, 97, 93][i],
}));

interface S {
  zero: boolean;
  mode: 'average' | 'd3';
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { zero: true, mode: 'average' },
    previewMs: 1800,
    step: (s, i) => ({ zero: i % 4 < 2 ? s.zero : !s.zero, mode: i % 2 ? 'd3' : 'average' }),
    controls: (bar, live) => {
      select(bar, 'zero', ['true', 'false'], (v) => live.set({ zero: v === 'true' }));
      select(bar, 'tickMode', ['average', 'd3'], (v) => live.set({ mode: v as S['mode'] }));
    },
    build: (s): ISpec => ({
      type: 'line',
      data: [{ id: 'line', values }],
      xField: 'time',
      yField: 'value',
      point: { visible: false },
      axes: [{ orient: 'left', zero: s.zero, tick: { tickMode: s.mode } }],
    }),
  });

export default mount;

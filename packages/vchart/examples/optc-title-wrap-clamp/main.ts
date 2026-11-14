// title.maxWidth with textStyle.wordBreak and lineClamp: a long title wrapped and clamped
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface S { width: number; clamp: number; wordBreak: string }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { width: 260, clamp: 3, wordBreak: 'break-word' },
    previewMs: 1300,
    step: (_s, i) => ({ width: [150, 220, 320][i % 3] as number, clamp: [1, 2, 3][(i + 1) % 3] as number }),
    build: (s) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: [{ x: 'A', y: 30 }, { x: 'B', y: 55 }, { x: 'C', y: 42 }] }],
        xField: 'x',
        yField: 'y',
        title: {
          visible: true,
          orient: 'top',
          text: 'Quarterly revenue by region after adjusting for currency effects and one-off items',
          subtext: 'Source: internal finance dashboard, unaudited figures for the three largest markets',
          maxWidth: s.width,
          textStyle: { wordBreak: s.wordBreak, lineClamp: s.clamp, fill: '#fbbf24', fontSize: 14, fontWeight: 'bold' },
          subtextStyle: { wordBreak: s.wordBreak, lineClamp: s.clamp, fill: '#9aa3b2', fontSize: 11 },
        },
      }) as never,
    controls: (bar, live) => {
      slider(bar, 'maxWidth', [120, 520, 10], live.state.width, (v) => live.set({ width: v }));
      slider(bar, 'lineClamp', [1, 4, 1], live.state.clamp, (v) => live.set({ clamp: v }));
      select(bar, 'wordBreak', ['break-word', 'break-all', 'keep-all'], (v) => live.set({ wordBreak: v }));
    },
  });

export default mount;

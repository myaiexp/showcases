// Ramp legend options: label, ticks, tickFormat, tickSize, width and height
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const FORMATS = ['d', '.0%', '+d', '$d'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ ticks: number; tickFormat: (typeof FORMATS)[number]; tickSize: number; height: number }>(el, ctx, {
    initial: { ticks: 5, tickFormat: 'd', tickSize: 6, height: 44 },
    render: ({ ticks, tickFormat, tickSize, height }, { width }) =>
      Plot.legend({
        width: Math.min(width, 420),
        height,
        label: 'Score',
        ticks,
        tickSize,
        marginLeft: 20,
        marginRight: 20,
        tickFormat: tickFormat === '.0%' ? (d: number) => `${d}%` : tickFormat,
        color: { type: 'linear' as const, scheme: 'viridis' as const, domain: [0, 100] },
      }),
    step: (_s, i) => ({ ticks: 3 + (i % 6), tickFormat: FORMATS[i % FORMATS.length], tickSize: 2 + (i % 4) * 3, height: 44 + (i % 3) * 12 }),
    previewMs: 1500,
    controls: (bar, live) => {
      slider(bar, 'ticks', [2, 12, 1], live.state.ticks, (ticks) => live.set({ ticks }));
      select(bar, 'tickFormat', FORMATS, live.state.tickFormat, (tickFormat) => live.set({ tickFormat }));
      slider(bar, 'tickSize', [0, 16, 1], live.state.tickSize, (tickSize) => live.set({ tickSize }));
      slider(bar, 'height', [30, 100, 1], live.state.height, (height) => live.set({ height }));
    },
  });

export default mount;

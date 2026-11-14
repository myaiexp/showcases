// bollingerY on an array of closes, restyled with color and opacity
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const COLORS = ['currentColor', 'orange', 'seagreen', 'orchid'] as const;

const mount: Mount = async (el, ctx) => {
  const closes = (await csv('aapl.csv')).map((d) => d.Close as number);
  return mountPlot<{ color: string; opacity: number; strokeWidth: number }>(el, ctx, {
    initial: { color: 'currentColor', opacity: 0.2, strokeWidth: 1.5 },
    render: ({ color, opacity, strokeWidth }, { width, height }) =>
      // x is the zero-based index: trading days since May 13, 2013.
      Plot.bollingerY(closes, { color, opacity, strokeWidth }).plot({ width, height }),
    step: (_s, i) => ({ color: COLORS[i % COLORS.length], opacity: [0.2, 0.4, 0.2, 0.5][i % 4], strokeWidth: [1.5, 3, 1, 2][i % 4] }),
    controls: (bar, live) => {
      select(bar, 'color', COLORS, 'currentColor', (color) => live.set({ color }));
      select(bar, 'opacity', ['0.1', '0.2', '0.4', '0.6'] as const, '0.2', (o) => live.set({ opacity: Number(o) }));
      select(bar, 'strokeWidth', ['1', '1.5', '3'] as const, '1.5', (w) => live.set({ strokeWidth: Number(w) }));
    },
  });
};

export default mount;

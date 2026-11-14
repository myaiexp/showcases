// Interval transform on barY: a number turns each y into a span
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const recent = aapl.slice(-40);
  return mountPlot<{ interval: number }>(el, ctx, {
    initial: { interval: 5e6 },
    render: ({ interval }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginBottom: preview ? undefined : 80,
        x: { type: 'band', axis: preview ? null : 'bottom' },
        y: { grid: true, transform: (d: number) => d / 1e6, label: 'Daily trade volume (millions)' },
        marks: [Plot.barY(recent, { x: 'Date', y: 'Volume', interval }), Plot.ruleY([0])],
      }),
    step: (_s, i) => ({ interval: [5e6, 10e6, 2e6, 20e6][i % 4] ?? 5e6 }),
    controls: (bar, live) => {
      slider(bar, 'interval (millions)', [1, 30, 1], live.state.interval / 1e6, (m) => live.set({ interval: m * 1e6 }));
    },
  });
};

export default mount;

// Undefined y values leave gaps; filtering the data draws straight bridges instead
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const modes = ['NaN gaps', 'filter interpolates'] as const;
type Mode = (typeof modes)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  // The first three months of each year have no value.
  const gappy = Plot.lineY(aapl, { x: 'Date', y: (d) => (d.Date.getUTCMonth() < 3 ? NaN : d.Close) });
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: modes[0] },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks:
          mode === modes[0]
            ? [gappy]
            : [Plot.lineY(aapl, { filter: (d) => d.Date.getUTCMonth() >= 3, x: 'Date', y: 'Close', strokeOpacity: 0.3 }), gappy],
      }),
    step: ({ mode }) => ({ mode: mode === modes[0] ? modes[1] : modes[0] }),
    previewMs: 3200,
    controls: (bar, live) => {
      select(bar, 'missing data', modes, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;

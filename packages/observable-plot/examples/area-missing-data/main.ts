// Gaps from NaN values versus a filter that interpolates straight across
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

type Mode = 'NaN values' | 'filter';
const modes: Mode[] = ['NaN values', 'filter'];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const quarter = (d: { Date: Date }): boolean => d.Date.getUTCMonth() < 3;
  return mountPlot(el, ctx, {
    initial: { mode: 'NaN values' as Mode },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks:
          mode === 'NaN values'
            ? // An invalid y breaks the area into segments: a gap each January to March.
              [Plot.areaY(aapl, { x: 'Date', y: (d) => (quarter(d) ? NaN : d.Close), line: true }), Plot.ruleY([0])]
            : // Filtering the rows removes them, so the area joins its neighbours with straight lines.
              [
                Plot.areaY(aapl, { filter: (d) => !quarter(d), x: 'Date', y: 'Close', fillOpacity: 0.3 }),
                Plot.lineY(aapl, { x: 'Date', y: (d) => (quarter(d) ? NaN : d.Close) }),
                Plot.ruleY([0]),
              ],
      }),
    step: ({ mode }) => ({ mode: mode === 'filter' ? modes[0] : modes[1] }),
    previewMs: 2800,
    controls: (bar, live) => select(bar, 'hide Jan-Mar by', modes, live.state.mode, (mode) => live.set({ mode })),
  });
};

export default mount;

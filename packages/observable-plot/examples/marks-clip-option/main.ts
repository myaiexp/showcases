// The mark clip option: true, false or frame on a dot mark
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const MODES = ['clip: true', 'clip: false', 'clip: "frame"'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { domain: [60, 90], grid: true },
        marks: [
          Plot.frame(),
          // The mark option decides; the plot-level clip is not set here.
          Plot.dot(aapl, { x: 'Date', y: 'Close', r: 2, clip: mode === 'clip: false' ? false : mode === 'clip: true' ? true : 'frame' }),
        ],
      }),
    step: ({ mode }) => ({ mode: after(MODES, mode) }),
    controls: (bar, live) => {
      select(bar, 'dot mark', MODES, MODES[0], (mode) => live.set({ mode }));
    },
  });
};

export default mount;

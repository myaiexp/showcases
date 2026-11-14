// The top-level clip option: marks that overflow the frame, clipped or not
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ clip: boolean }>(el, ctx, {
    initial: { clip: true },
    render: ({ clip }, { width, height }) =>
      Plot.plot({
        width,
        height,
        // Pinning the y domain pushes part of the line outside the frame.
        y: { domain: [60, 90], grid: true },
        clip,
        // Frame, grid and axis marks never clip by default, whatever the plot says.
        marks: [Plot.frame(), Plot.lineY(aapl, { x: 'Date', y: 'Close' })],
      }),
    step: ({ clip }) => ({ clip: !clip }),
    controls: (bar, live) => {
      toggle(bar, 'clip', true, (clip) => live.set({ clip }));
    },
  });
};

export default mount;

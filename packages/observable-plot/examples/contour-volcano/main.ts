// Contour of a gridded array: isolines versus filled, colour-coded bands
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { volcano } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['stroked', 'filled'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const v = await volcano();
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'stroked' },
    render: ({ mode }, { width, height, preview }) => {
      if (mode === 'stroked') {
        return Plot.contour(v.values, { width: v.width, height: v.height }).plot({ width, height });
      }
      return Plot.plot({
        width,
        height,
        color: { legend: !preview, label: 'Elevation (m)' },
        marks: [Plot.contour(v.values, { width: v.width, height: v.height, fill: Plot.identity, stroke: 'black' })],
      });
    },
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'contours', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;

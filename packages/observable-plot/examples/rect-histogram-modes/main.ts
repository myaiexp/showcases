// Rect: one histogram stacked, overlapped (y2 opts out of stack) or faceted
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['stacked', 'overlapping', 'faceted'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 4) : all;
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'stacked' },
    render: ({ mode }, { width, height, preview }) => {
      const color = { legend: !preview };
      const marks: Record<Mode, Plot.Markish[]> = {
        // fill makes rectY stack the two sexes within each bin.
        stacked: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex' })), Plot.ruleY([0])],
        // y2 instead of y: naming a y bound turns the implicit stack off, so rects overlap.
        overlapping: [
          Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y2: 'count' }, { x: 'weight', fill: 'sex', mixBlendMode: 'screen' })),
          Plot.ruleY([0]),
        ],
        faceted: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fy: 'sex' })), Plot.ruleY([0])],
      };
      return Plot.plot({ width, height, round: true, color: mode === 'faceted' ? undefined : color, marks: marks[mode] });
    },
    step: (_s, i) => ({ mode: MODES[i % MODES.length] ?? 'stacked' }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'histogram', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;

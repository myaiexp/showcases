// Rect: round chosen sides (ry1, ry2) or chosen corners (rx1y2, rx1y1)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['sides: ry2 and ry1', 'corners: rx1y2 and rx1y1'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        color: { legend: !preview },
        marks: [
          Plot.rectY(
            olympians,
            // A positive ry2 with a negative ry1 rounds the top of each stacked rect and
            // leaves the "wings" below zero, which clip: "frame" hides.
            Plot.binX<Plot.RectYOptions>(
              { y: 'count' },
              mode === MODES[0]
                ? { x: 'weight', fill: 'sex', ry2: 4, ry1: -4, clip: 'frame' }
                : { x: 'weight', fill: 'sex', rx1y2: 10, rx1y1: -10, clip: 'frame' },
            ),
          ),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ mode: MODES[i % 2] ?? MODES[0] }),
    controls: (bar, live) => {
      select(bar, 'rounding', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;

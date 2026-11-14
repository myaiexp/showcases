// Axis on both sides: axis "both" scale option versus two explicit axisX marks
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['axis: both', 'explicit axis marks'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height }) =>
      mode === 'axis: both'
        ? Plot.plot({
            width,
            height,
            x: { percent: true, grid: true, axis: 'both' },
            marks: [Plot.barX(alphabet, { x: 'frequency', y: 'letter' }), Plot.ruleX([0])],
          })
        : Plot.plot({
            width,
            height,
            x: { percent: true },
            marks: [
              Plot.axisX({ anchor: 'top' }),
              Plot.axisX({ anchor: 'bottom', label: null }),
              Plot.barX(alphabet, { x: 'frequency', y: 'letter' }),
              // interval: 1 draws a grid line at each whole percent, atop the bars.
              Plot.gridX({ interval: 1, stroke: 'var(--plot-background)', strokeOpacity: 0.5 }),
              Plot.ruleX([0]),
            ],
          }),
    step: ({ mode }) => ({ mode: mode === MODES[0] ? MODES[1] : MODES[0] }),
    controls: (bar, live) => {
      select(bar, 'axes', MODES, MODES[0], (mode) => live.set({ mode }));
    },
  });
};

export default mount;

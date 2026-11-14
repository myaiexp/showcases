// Axis ticks by count, pixel spacing (tickSpacing) or interval
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['ticks', 'tickSpacing', 'interval'] as const;
type State = { mode: (typeof MODES)[number]; value: number };
const RANGE = { ticks: [2, 30, 1], tickSpacing: [20, 200, 10], interval: [1, 20, 1] } as const;
const START = { ticks: 10, tickSpacing: 80, interval: 5 };

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: { mode: 'ticks', value: START.ticks },
    render: ({ mode, value }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? 90,
        x: { domain: [0, 100] },
        marks: [Plot.axisX({ [mode]: value, label: `${mode}: ${value}` }), Plot.gridX({ [mode]: value })],
      }),
    step: ({ mode }) => {
      const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length] ?? 'ticks';
      return { mode: next, value: START[next] };
    },
    controls: (bar, live) => {
      const range = slider(bar, 'value', RANGE.ticks, START.ticks, (value) => live.set({ value }));
      select(bar, 'option', MODES, 'ticks', (mode) => {
        const [min, max, step] = RANGE[mode];
        Object.assign(range, { min, max, step, value: START[mode] });
        if (range.nextElementSibling) range.nextElementSibling.textContent = String(START[mode]);
        live.set({ mode, value: START[mode] });
      });
    },
  });

export default mount;

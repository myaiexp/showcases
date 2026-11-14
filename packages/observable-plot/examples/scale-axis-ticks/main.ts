// Implicit axis options: ticks, tickSpacing, size, padding, rotate
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

interface State {
  bySpacing: boolean;
  ticks: number;
  spacing: number;
  size: number;
  padding: number;
  rotate: number;
}
const presets: Partial<State>[] = [
  { bySpacing: false, ticks: 10, size: 6, padding: 3, rotate: 0 },
  { ticks: 4, size: 12, padding: 8 },
  { bySpacing: true, spacing: 40, size: 3, rotate: 0 },
  { bySpacing: false, ticks: 20, size: 6, padding: 3, rotate: -45 },
];

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<State>(el, ctx, {
    initial: { bySpacing: false, ticks: 10, spacing: 80, size: 6, padding: 3, rotate: 0 },
    render: ({ bySpacing, ticks, spacing, size, padding, rotate }, { width, height }) => {
      const axis = { tickSize: size, tickPadding: padding, ...(bySpacing ? { tickSpacing: spacing } : { ticks }) };
      return Plot.plot({
        width,
        height,
        x: { ...axis, tickRotate: rotate },
        y: { ...axis, grid: true },
        marks: [Plot.lineY(gistemp, { x: 'Date', y: 'Anomaly' })],
      });
    },
    step: (_s, i) => presets[i % presets.length] ?? {},
    previewMs: 1800,
    controls: (bar, live) => {
      toggle(bar, 'use tickSpacing ', live.state.bySpacing, (bySpacing) => live.set({ bySpacing }));
      slider(bar, 'ticks ', [1, 30, 1], live.state.ticks, (ticks) => live.set({ ticks }));
      slider(bar, 'tickSpacing ', [20, 200, 5], live.state.spacing, (spacing) => live.set({ spacing }));
      slider(bar, 'tickSize ', [0, 20, 1], live.state.size, (size) => live.set({ size }));
      slider(bar, 'tickPadding ', [0, 20, 1], live.state.padding, (padding) => live.set({ padding }));
      slider(bar, 'x tickRotate ', [-90, 90, 5], live.state.rotate, (rotate) => live.set({ rotate }));
    },
  });
};

export default mount;

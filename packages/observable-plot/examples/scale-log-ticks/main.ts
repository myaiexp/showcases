// A log x scale: SI ticks, a plain tickFormat, base 2
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const formats = ['default', ','] as const;
type Format = (typeof formats)[number];
interface State {
  base: number;
  format: Format;
  ticks: number;
}
const presets: State[] = [
  { base: 10, format: 'default', ticks: 10 },
  { base: 10, format: ',', ticks: 10 },
  { base: 2, format: 'default', ticks: 20 },
];

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: presets[0] as State,
    render: ({ base, format, ticks }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: {
          type: 'log',
          base,
          domain: base === 10 ? [1e0, 1e5] : [1e0, 1e4],
          ticks,
          ...(format === 'default' ? {} : { tickFormat: format }),
          grid: true,
        },
      }),
    step: (_s, i) => presets[i % 3] as State,
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'base ', ['10', '2'], String(live.state.base), (b) => live.set({ base: Number(b) }));
      select(bar, 'tickFormat ', formats, live.state.format, (format) => live.set({ format }));
      slider(bar, 'ticks ', [2, 30, 1], live.state.ticks, (ticks) => live.set({ ticks }));
    },
  });

export default mount;

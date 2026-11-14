// Axis tickFormat, tickRotate, tickSize and tickPadding on a 0 to 1 scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const FORMATS = ['.1f', '.0%', '+.2f', 'e'] as const;
type State = { format: (typeof FORMATS)[number]; rotate: number; size: number; padding: number };

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: { format: '.1f', rotate: 0, size: 6, padding: 3 },
    render: ({ format, rotate, size, padding }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? 110,
        x: { domain: [0, 1] },
        marks: [
          Plot.axisX({
            tickFormat: format,
            tickRotate: rotate,
            tickSize: size,
            tickPadding: padding,
            marginBottom: 60,
            label: 'value',
          }),
        ],
      }),
    step: (_s, i) => ({
      format: FORMATS[i % FORMATS.length],
      rotate: [0, -45, 45, 90][i % 4],
      size: [6, 14, 2, 10][i % 4],
      padding: [3, 8, 3, 6][i % 4],
    }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'tickFormat', FORMATS, '.1f', (format) => live.set({ format }));
      slider(bar, 'tickRotate', [-90, 90, 15], 0, (rotate) => live.set({ rotate }));
      slider(bar, 'tickSize', [0, 20, 1], 6, (size) => live.set({ size }));
      slider(bar, 'tickPadding', [0, 20, 1], 3, (padding) => live.set({ padding }));
    },
  });

export default mount;

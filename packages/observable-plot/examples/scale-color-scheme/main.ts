// The color scale scheme option on a 40-step ramp
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const schemes = [
  ...['blues', 'greens', 'greys', 'purples', 'reds', 'oranges'],
  ...['turbo', 'viridis', 'magma', 'inferno', 'plasma', 'cividis', 'cubehelix', 'warm', 'cool'],
  ...['bugn', 'bupu', 'gnbu', 'orrd', 'pubugn', 'pubu', 'purd', 'rdpu', 'ylgnbu', 'ylgn', 'ylorbr', 'ylorrd'],
  ...['rainbow', 'sinebow'],
] as Plot.ColorScheme[];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { scheme: 'turbo' as Plot.ColorScheme },
    render: ({ scheme }, { width, height }) =>
      Plot.plot({
        width,
        height,
        axis: null,
        padding: 0,
        color: { scheme },
        marks: [Plot.cell(d3.range(40), { x: Plot.identity, fill: Plot.identity, inset: -0.5 })],
      }),
    step: (_s, i) => ({ scheme: schemes[(6 + i) % schemes.length] }),
    previewMs: 1200,
    controls: (bar, live) => select(bar, 'scheme ', schemes, live.state.scheme, (scheme) => live.set({ scheme })),
  });

export default mount;

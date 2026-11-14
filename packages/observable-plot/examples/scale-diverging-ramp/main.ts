// A diverging scheme splits at the pivot; type linear does not
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const schemes = ['brbg', 'prgn', 'piyg', 'puor', 'rdbu', 'rdgy', 'rdylbu', 'rdylgn', 'spectral', 'burd', 'buylrd'] as Plot.ColorScheme[];
const types = ['diverging', 'linear'] as const;
type Type = (typeof types)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { scheme: 'rdbu' as Plot.ColorScheme, type: 'diverging' as Type, pivot: 0 },
    render: ({ scheme, type, pivot }, { width, height }) =>
      Plot.plot({
        width,
        height,
        axis: null,
        padding: 0,
        color: { type, scheme, ...(type === 'diverging' ? { pivot } : {}) },
        marks: [Plot.cell(d3.range(-20, 20), { x: Plot.identity, fill: Plot.identity, inset: -0.5 })],
      }),
    step: (_s, i) => ({ scheme: schemes[i % schemes.length], pivot: [0, -10, 10][i % 3] }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'scheme ', schemes, live.state.scheme, (scheme) => live.set({ scheme }));
      select(bar, 'type ', types, live.state.type, (type) => live.set({ type }));
      slider(bar, 'pivot ', [-19, 19, 1], live.state.pivot, (pivot) => live.set({ pivot }));
    },
  });

export default mount;

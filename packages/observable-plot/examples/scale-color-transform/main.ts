// Color scales take sqrt, pow, log and symlog like position scales
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const types = ['linear', 'sqrt', 'pow', 'log', 'symlog'] as const;
type Type = (typeof types)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { type: 'linear' as Type },
    render: ({ type }, { width, height }) =>
      Plot.plot({
        width,
        height,
        axis: null,
        padding: 0,
        color: { type, scheme: 'viridis', ...(type === 'pow' ? { exponent: 2 } : {}) },
        marks: [Plot.cell(d3.range(1, 101), { x: Plot.identity, fill: Plot.identity, inset: -0.5 })],
      }),
    step: (_s, i) => ({ type: types[i % types.length] }),
    previewMs: 1500,
    controls: (bar, live) => select(bar, 'color type ', types, live.state.type, (type) => live.set({ type })),
  });

export default mount;

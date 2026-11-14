// Linear, sqrt and pow scales on the same dots; pow takes an exponent
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const types = ['linear', 'sqrt', 'pow'] as const;
type Type = (typeof types)[number];
const exponents = [1 / 3, 2, 0.75];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { type: 'sqrt' as Type, exponent: 1 / 3 },
    render: ({ type, exponent }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { type, ...(type === 'pow' ? { exponent } : {}), domain: [0, 100], grid: true },
        marks: [Plot.dot(d3.range(0, 101, 10), { x: Plot.identity })],
      }),
    step: (_s, i) => ({ type: types[i % 3], exponent: exponents[i % 3] }),
    previewMs: 2000,
    controls: (bar, live) => {
      select(bar, 'type ', types, live.state.type, (type) => live.set({ type }));
      slider(bar, 'exponent (pow) ', [0.1, 3, 0.05], live.state.exponent, (exponent) => live.set({ exponent }));
    },
  });

export default mount;

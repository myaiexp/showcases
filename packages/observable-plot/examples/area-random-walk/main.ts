// Area of a seeded random walk: an array of numbers as data, no accessors
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { seed: 1 },
    render: ({ seed }, { width, height }) => {
      const normal = d3.randomNormal.source(d3.randomLcg(seed))();
      // x defaults to the index and y to the identity, so numbers are all areaY needs.
      return Plot.areaY(d3.cumsum(Array.from({ length: 600 }, normal))).plot({ width, height });
    },
    step: ({ seed }) => ({ seed: seed + 1 }),
    previewMs: 2600,
    controls: (bar, live) => button(bar, 'new walk', () => live.set({ seed: live.state.seed + 1 })),
  });

export default mount;

// Rect: rectY with the bin transform bins raw values and adds a 1px inset
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const SIZES = ['100', '1000', '10000'] as const;

const mount: Mount = (el, ctx) => {
  return mountPlot<{ n: (typeof SIZES)[number] }>(el, ctx, {
    initial: { n: '1000' },
    render: ({ n }, { width, height }) => {
      const values = d3.range(Number(n)).map(d3.randomNormal.source(d3.randomLcg(7))());
      return Plot.rectY(values, Plot.binX()).plot({ width, height });
    },
    step: (_s, i) => ({ n: SIZES[i % SIZES.length] ?? '1000' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'sample size', SIZES, live.state.n, (n) => live.set({ n }));
    },
  });
};

export default mount;

// A channel given as a transform method, run once on all the data
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const MODES = ['identity', 'cumulative sum', 'sorted'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const random = d3.randomNormal.source(d3.randomLcg(3))(0, 1);
  const numbers = d3.range(60).map(() => random());
  // Each transform receives the mark's entire data array once and returns one value per datum.
  const transforms: Record<Mode, (data: number[]) => ArrayLike<number>> = {
    identity: (data) => data,
    'cumulative sum': (data) => Float64Array.from(d3.cumsum(data)),
    sorted: (data) => Float64Array.from(data).sort(),
  };
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'identity' },
    render: ({ mode }, { width, height }) =>
      Plot.dot(numbers, { x: { transform: transforms[mode] as (data: any) => any }, y: (_d, i) => i }).plot({
        width,
        height,
        y: { label: 'index' },
        x: { label: mode, grid: true },
      }),
    step: ({ mode }) => ({ mode: after(MODES, mode) }),
    controls: (bar, live) => {
      select(bar, 'x transform', MODES, 'identity', (mode) => live.set({ mode }));
    },
  });
};

export default mount;

// nice and zero as top-level shorthand for every scale
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const random = d3.randomLcg(7);
const data = d3.range(30).map(() => ({ x: 3.2 + random() * 84.5, y: 14.7 + random() * 61.3 }));

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { nice: false, zero: false },
    render: ({ nice, zero }, { width, height }) =>
      Plot.plot({ width, height, nice, zero, grid: true, marks: [Plot.dot(data, { x: 'x', y: 'y' })] }),
    step: (_s, i) => ({ nice: i % 4 === 1 || i % 4 === 3, zero: i % 4 >= 2 }),
    previewMs: 1800,
    controls: (bar, live) => {
      toggle(bar, 'nice ', live.state.nice, (nice) => live.set({ nice }));
      toggle(bar, 'zero ', live.state.zero, (zero) => live.set({ zero }));
    },
  });

export default mount;

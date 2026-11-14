// Plot.indexOf and Plot.identity as channels over a plain array of numbers
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) => {
  const walk = (n: number): number[] => {
    const rand = d3.randomNormal.source(d3.randomLcg(42))(0, 1);
    return Array.from(d3.cumsum(d3.range(n), () => rand()));
  };
  return mountPlot(el, ctx, {
    initial: { n: 60 },
    render: ({ n }, { width, height }) => {
      const numbers = walk(n);
      return Plot.plot({
        width,
        height,
        marks: [
          // indexOf is 0, 1, 2, … and identity is each number itself.
          Plot.lineY(numbers, { x: Plot.indexOf, y: Plot.identity }),
          Plot.dot(numbers, { x: Plot.indexOf, y: Plot.identity, fill: 'currentColor', r: 2 }),
        ],
      });
    },
    step: (_s, i) => ({ n: 20 + ((i * 20) % 100) }),
    previewMs: 1500,
    controls: (bar, live) => {
      slider(bar, 'n', [10, 200, 1], live.state.n, (n) => live.set({ n }));
    },
  });
};

export default mount;

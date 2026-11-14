// pointerX across several series: x picks the date, y breaks ties between lines
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [Plot.ruleY([0]), Plot.lineY(industries, { x: 'date', y: 'unemployed', stroke: 'industry', tip: 'x' })],
      }),
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.2 + 0.6 * Math.abs(Math.sin(t * Math.PI * 3))], 6000) : undefined,
  });
};

export default mount;

// Links as diagonal reference lines for the gender gap in median income
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const income = await csv('income-gender.csv');
  const ratios = [0.6, 0.7, 0.8, 0.9, 1];
  const label = (k: number): string => (k === 1 ? 'Equal' : d3.format('+.0%')(k - 1));
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      aspectRatio: 1,
      marginRight: 40,
      x: { label: 'Median annual income (men, thousands)', transform: (d: number) => d / 1000, tickSpacing: 60 },
      y: { label: 'Median annual income (women, thousands)', transform: (d: number) => d / 1000, tickSpacing: 60 },
      marks: [
        // A rule must be horizontal or vertical; a link can run along any slope.
        Plot.link(ratios, {
          x1: 0,
          y1: 0,
          x2: 102000,
          y2: (k) => 102000 * k,
          strokeOpacity: (k) => (k === 1 ? 1 : 0.2),
        }),
        preview ? null : Plot.text(ratios, { x: 102000, y: (k) => 102000 * k, text: label, textAnchor: 'start', dx: 6 }),
        Plot.dot(income, { x: 'm', y: 'f' }),
      ],
    }),
  );
};

export default mount;

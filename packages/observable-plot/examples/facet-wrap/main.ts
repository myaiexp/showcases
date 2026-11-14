// Wrapped facets: fx and fy computed from an index make a three-column grid
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  const n = 3; // number of facet columns
  const keys = Array.from(d3.union(industries.map((d) => d.industry)));
  const index = new Map(keys.map((key, i) => [key, i]));
  const fx = (key: string): number => index.get(key)! % n;
  const fy = (key: string): number => Math.floor(index.get(key)! / n);
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height ?? 300,
      axis: null,
      y: { insetTop: 10 },
      fx: { padding: 0.03 },
      marks: [
        Plot.areaY(industries, Plot.normalizeY('extent', { x: 'date', y: 'unemployed', fx: (d) => fx(d.industry), fy: (d) => fy(d.industry) })),
        Plot.text(keys, { fx, fy, frameAnchor: 'top-left', dx: 6, dy: 6, fontSize: ctx.preview ? 7 : 10 }),
        Plot.frame(),
      ],
    }),
  );
};

export default mount;

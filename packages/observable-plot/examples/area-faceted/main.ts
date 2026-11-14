// Small-multiple areas: fy facets one area per industry, with a label and frame
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height ?? 720,
      axis: null,
      marks: [
        Plot.areaY(industries, { x: 'date', y: 'unemployed', fy: 'industry' }),
        Plot.text(industries, Plot.selectFirst({ text: 'industry', fy: 'industry', frameAnchor: 'top-left', dx: 6, dy: 6 })),
        Plot.frame(),
      ],
    }),
  );
};

export default mount;

// Overlapping areas: y2 instead of y skips the implicit stack, z groups series
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marks: [
        Plot.areaY(industries, { x: 'date', y2: 'unemployed', z: 'industry', fillOpacity: 0.1 }),
        Plot.lineY(industries, { x: 'date', y: 'unemployed', z: 'industry', strokeWidth: 1 }),
      ],
    }),
  );
};

export default mount;

// A ribbon chart: value order sorts each stack independently so ranks can cross
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const riaa = await csv('riaa-us-revenue.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      y: { grid: true, label: 'Annual revenue (billions, adj.)', transform: (d: number) => d / 1000 },
      marks: [Plot.areaY(riaa, { x: 'year', y: 'revenue', z: 'format', fill: 'group', order: 'value' }), Plot.ruleY([0])],
    }),
  );
};

export default mount;

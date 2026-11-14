// stackX bars by year with stackX2 dots on each right edge
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('riaa-us-revenue.csv');
  const rows = all.filter((d: Row) => d.year.getUTCFullYear() >= 2010);
  const year = (d: Row) => d.year.getUTCFullYear();
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginLeft: 40,
      x: { grid: true, label: 'Annual revenue (millions, adj.)' },
      y: { label: null, tickFormat: String },
      color: { legend: !preview },
      marks: [
        Plot.barX(rows, Plot.stackX({ y: year, x: 'revenue', z: 'format', fill: 'group', insetTop: 1, insetBottom: 1 })),
        Plot.dot(rows, Plot.stackX2({ y: year, x: 'revenue', z: 'format', r: 2, fill: 'white' })),
        Plot.ruleX([0]),
      ],
    }),
  );
};

export default mount;

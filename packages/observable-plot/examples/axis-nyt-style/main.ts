// Inset tick labels above dashed grid lines, with a unit on the last tick
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

// Plot calls tickFormat(d, i, ticks) but types it as (d, i) only, hence the cast.
const lastWithDollar = ((d: number, i: number, ticks: unknown[]) =>
  i === ticks.length - 1 ? '$' + d : String(d)) as unknown as (d: number, i: number) => string;

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      round: true,
      marginLeft: 0, // no left margin needed: the labels are inset
      x: { label: null, insetLeft: 36 }, // reserve room for the inset labels
      marks: [
        Plot.gridY({
          strokeDasharray: '0.75,2', // dashed
          strokeOpacity: 1, // opaque
        }),
        Plot.axisY({
          tickSize: 0, // no ticks
          dx: 38, // offset right
          dy: -6, // offset up
          lineAnchor: 'bottom', // labels sit above the grid lines
          tickFormat: lastWithDollar,
        }),
        Plot.ruleY([0]),
        Plot.line(aapl, { x: 'Date', y: 'Close', markerEnd: 'dot' }),
      ],
    }),
  );
};

export default mount;

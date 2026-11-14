// Axis and grid placed by data: each y tick sits where the line reaches it
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  // The data of an axis or grid mark are tick values, so x can be a function of the tick.
  const firstReached = (y: number): Date | undefined => aapl.find((d) => d.Close >= y)?.Date;
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marginRight: 0,
      marks: [
        Plot.ruleY([0]),
        Plot.line(aapl, { x: 'Date', y: 'Close' }),
        Plot.gridY({ x: firstReached, insetLeft: -6 }),
        Plot.axisY({ x: firstReached, insetLeft: -6, textStroke: 'var(--plot-background)' }),
      ],
    }),
  );
};

export default mount;

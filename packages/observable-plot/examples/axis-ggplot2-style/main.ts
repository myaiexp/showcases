// A ggplot2-style panel: filled frame and opaque white grid lines
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      inset: 10,
      marks: [
        Plot.frame({ fill: '#eaeaea' }),
        Plot.gridY({ stroke: 'white', strokeOpacity: 1 }),
        Plot.gridX({ stroke: 'white', strokeOpacity: 1 }),
        Plot.line(aapl, { x: 'Date', y: 'Close', stroke: 'black' }),
      ],
    }),
  );
};

export default mount;

// Window reduce: rolling minimum, maximum and median of the daily low
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      y: { grid: true, label: 'Temperature (°F)' },
      marks: [
        Plot.lineY(sftemp, { x: 'date', y: 'low', strokeOpacity: 0.3 }),
        Plot.lineY(sftemp, Plot.windowY({ k: 28, reduce: 'min' }, { x: 'date', y: 'low', stroke: 'blue' })),
        Plot.lineY(sftemp, Plot.windowY({ k: 28, reduce: 'max' }, { x: 'date', y: 'low', stroke: 'red' })),
        Plot.lineY(sftemp, Plot.windowY({ k: 28, reduce: 'median' }, { x: 'date', y: 'low' })),
      ],
    }),
  );
};

export default mount;

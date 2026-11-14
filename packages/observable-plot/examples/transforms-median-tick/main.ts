// Raw ticks per location with a groupY median tick on top, sorted by median
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const traffic = await csv('traffic.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginLeft: preview ? 100 : 120,
      x: { label: 'Vehicles per hour (thousands)', transform: (x: number) => x / 1000 },
      y: { label: null },
      marks: [
        Plot.ruleX([0]),
        Plot.tickX(traffic, { x: 'vehicles', y: 'location', strokeOpacity: 0.3 }),
        // groupY collapses each location to one median tick; sort orders y by that x.
        Plot.tickX(
          traffic,
          Plot.groupY({ x: 'median' }, { x: 'vehicles', y: 'location', stroke: 'red', strokeWidth: 4, sort: { y: 'x' } }),
        ),
      ],
    }),
  );
};

export default mount;

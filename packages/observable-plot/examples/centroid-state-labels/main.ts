// Text labels placed on each state by the centroid transform
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { topojson, usTopology } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const statemesh = topojson.mesh(us, us.objects.states);
  const states = topojson.feature(us, us.objects.states).features;
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      projection: 'albers-usa',
      marks: [
        Plot.geo(statemesh),
        // centroid reads each GeoJSON feature after projection and sets x and y.
        Plot.text(states, Plot.centroid({ text: (d) => d.properties.name, fontSize: preview ? 5 : undefined, fill: 'currentColor', stroke: 'var(--plot-background)' })),
      ],
    }),
  );
};

export default mount;

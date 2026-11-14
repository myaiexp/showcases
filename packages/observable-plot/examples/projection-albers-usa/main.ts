// The albers-usa projection: nation outline and state borders, Alaska inset
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { topojson, usTopology } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const nation = topojson.feature(us, us.objects.nation);
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      projection: 'albers-usa',
      marks: [Plot.geo(nation), Plot.geo(statemesh, { strokeOpacity: 0.2 })],
    }),
  );
};

export default mount;

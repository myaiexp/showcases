// Map small multiples: Walmart openings per decade, fx with an interval
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { topojson, tsv, usTopology } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [us, walmarts] = await Promise.all([usTopology(), tsv('walmarts.tsv')]);
  const nation = topojson.feature(us, us.objects.nation);
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marginLeft: 0,
      marginRight: 0,
      projection: 'albers',
      // The fx interval bins the dates into decades, one map per decade.
      fx: { interval: '10 years', tickFormat: (d: Date) => `${d.getUTCFullYear()}’s`, label: null },
      marks: [
        Plot.geo(statemesh, { strokeOpacity: 0.1 }),
        Plot.geo(nation),
        Plot.dot(walmarts, { fx: 'date', x: 'longitude', y: 'latitude', r: 1, fill: 'currentColor' }),
      ],
    }),
  );
};

export default mount;

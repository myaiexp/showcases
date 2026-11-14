// A map series: registerMap with GeoJSON, then a linear colour scale on valueField colours each country
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { COUNTRY_NAMES, WORLD_GEO, countryValues, registerWorldMaps } from '../../shared/world.ts';

const mount: Mount = (el, ctx) => {
  // VChart.registerMap(WORLD_GEO, geojson, { type: 'geojson' }) runs once per page inside registerWorldMaps.
  registerWorldMaps();
  const spec = {
    type: 'map',
    map: WORLD_GEO,
    nameField: 'name',
    valueField: 'value',
    data: [{ id: 'countries', values: countryValues(COUNTRY_NAMES, 1) }],
    // Without a seriesField every region shares one colour, so map `value` through a linear colour scale.
    color: { type: 'linear', range: ['#2b2f5a', '#3f7fd0', '#f4c95d', '#ef5a4c'] },
    area: {
      style: {
        fill: { scale: 'color', field: 'value', changeDomain: 'replace' },
        stroke: 'rgba(255,255,255,0.3)',
        lineWidth: 0.5,
      },
    },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  // Fresh numbers every two seconds: the regions are keyed by name, so the colours morph in place.
  let seed = 1;
  let released = false;
  const stop = every(2200, () => {
    if (!released) void vchart.updateData('countries', countryValues(COUNTRY_NAMES, ++seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;

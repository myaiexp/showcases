// A common chart with a map series and a scatter series sharing one geo region
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { WORLD_GEO, registerWorldMaps } from '../../shared/world.ts';

const CITIES: [string, number, number][] = [
  ['Tokyo', 139.7, 35.7], ['Delhi', 77.2, 28.6], ['Cairo', 31.2, 30.0], ['Sao Paulo', -46.6, -23.5],
  ['Mexico City', -99.1, 19.4], ['New York', -74.0, 40.7], ['London', -0.1, 51.5], ['Lagos', 3.4, 6.5],
  ['Sydney', 151.2, -33.9], ['Moscow', 37.6, 55.8], ['Jakarta', 106.8, -6.2], ['Los Angeles', -118.2, 34.1],
];
const cityRows = (seed: number): { name: string; lon: number; lat: number; value: number }[] => {
  const r = rng(seed);
  return CITIES.map(([name, lon, lat]) => ({ name, lon, lat, value: Math.round(10 + r() * 90) }));
};

const mount: Mount = (el, ctx) => {
  registerWorldMaps();
  const spec = {
    type: 'common',
    // coordinate 'geo' puts every series of the region on the map; the fields name the position columns.
    region: [{ coordinate: 'geo', roam: !ctx.preview, longitudeField: 'lon', latitudeField: 'lat', projection: { type: 'equirectangular' } }],
    series: [
      { type: 'map', id: 'base', map: WORLD_GEO, nameField: 'name', valueField: 'value', data: { id: 'empty', values: [] }, defaultFillColor: 'rgba(255,255,255,0.14)', area: { style: { stroke: 'rgba(255,255,255,0.25)', lineWidth: 0.5 } } },
      {
        type: 'scatter',
        id: 'cities',
        regionIndex: 0,
        data: { id: 'cities', values: cityRows(1) },
        xField: 'name',
        yField: 'value',
        sizeField: 'value',
        size: { type: 'linear', range: [8, 34] },
        point: { style: { fill: '#f4c95d', fillOpacity: 0.75, stroke: '#fff', lineWidth: 1 } },
      },
    ],
    tooltip: { mark: { title: { value: (d: { name: string }) => d.name } } },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  let seed = 1;
  let released = false;
  const stop = every(2000, () => {
    if (!released) void vchart.updateData('cities', cityRows(++seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;

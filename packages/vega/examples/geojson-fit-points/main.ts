// geojson: points gathered into one GeoJSON collection that a projection fits to
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'east', value: -90, bind: { input: 'range', min: -112, max: -66, step: 1 } },
    ],
    projections: [
      // fit uses the geodata signal that the geojson transform below produces.
      { name: 'projection', type: 'mercator', fit: { signal: 'geodata' }, extent: { signal: '[[24, 24], [width - 24, height - 24]]' } },
    ],
    data: [
      { name: 'states', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' }, transform: [{ type: 'filter', expr: 'datum.id < 57 && datum.id != 2 && datum.id != 15' }] },
      {
        name: 'capitals',
        url: 'data/us-state-capitals.json',
        transform: [
          { type: 'filter', expr: 'datum.lon > -130 && datum.lon < east' },
          // Collects every (lon, lat) pair into one FeatureCollection and publishes it as a signal.
          { type: 'geojson', fields: ['lon', 'lat'], signal: 'geodata' },
          { type: 'geopoint', projection: 'projection', fields: ['lon', 'lat'] },
        ],
      },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'states' },
        encode: { update: { fill: { value: '#2f5d50' }, stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.5 } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'symbol',
        from: { data: 'capitals' },
        encode: { update: { x: { field: 'x' }, y: { field: 'y' }, size: { value: 50 }, fill: { value: '#f0b060' }, stroke: { value: '#222' } } },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'capitals west of ' + east + '°: the projection fits to them'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'east', [-90, -112, -100, -75, -66, -105], 1500);
  return () => stage.dispose();
};

export default mount;

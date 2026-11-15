// geopath pointRadius: an expression sets each point feature's radius from its properties
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
      { name: 'grow', value: 1, bind: { input: 'range', min: 0.3, max: 2.5, step: 0.05 } },
    ],
    projections: [{ name: 'projection', type: 'albersUsa', scale: 500, translate: [220, 125] }],
    data: [
      { name: 'states', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' }, transform: [{ type: 'geopath', projection: 'projection' }] },
      {
        name: 'capitals',
        url: 'data/us-state-capitals.json',
        transform: [
          // A GeoJSON Point feature whose properties carry the numbers the radius is computed from.
          { type: 'formula', as: 'geo', expr: "{type: 'Feature', properties: {lon: datum.lon}, geometry: {type: 'Point', coordinates: [datum.lon, datum.lat]}}" },
          // datum is the GeoJSON feature here: the radius grows toward the east coast.
          { type: 'geopath', projection: 'projection', field: 'geo', pointRadius: { expr: 'grow * (2 + (datum.properties.lon + 125) / 9)' }, as: 'dot' },
        ],
      },
    ],
    marks: [
      {
        type: 'path',
        from: { data: 'states' },
        encode: { update: { path: { field: 'path' }, fill: { value: '#2f5d50' }, stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.5 } } },
      },
      {
        type: 'path',
        from: { data: 'capitals' },
        // as: 'dot' renamed the output field from the default, path.
        encode: { update: { path: { field: 'dot' }, fill: { value: '#f0b060' }, fillOpacity: { value: 0.8 }, stroke: { value: '#222' }, strokeWidth: { value: 0.5 } } },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'radius = ' + format(grow, '.2f') + ' x (2 + (lon + 125) / 9)'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'grow', [1, 0.5, 1.6, 2.4, 1.2], 1200);
  return () => stage.dispose();
};

export default mount;

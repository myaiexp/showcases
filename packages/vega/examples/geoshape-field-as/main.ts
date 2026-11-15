// geoshape field and as: two shapes from two GeoJSON fields of the same rows
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
      { name: 'half', value: 2, bind: { input: 'range', min: 0.5, max: 6, step: 0.25 } },
    ],
    projections: [{ name: 'projection', type: 'albersUsa', scale: 500, translate: [220, 125], pointRadius: 3 }],
    data: [
      { name: 'states', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' } },
      {
        name: 'capitals',
        url: 'data/us-state-capitals.json',
        transform: [
          // Two GeoJSON values per row: the capital itself and a square of `half` degrees around it.
          { type: 'formula', as: 'point', expr: "{type: 'Point', coordinates: [datum.lon, datum.lat]}" },
          { type: 'formula', as: 'box', expr: "{type: 'Polygon', coordinates: [[[datum.lon - half, datum.lat - half], [datum.lon - half, datum.lat + half], [datum.lon + half, datum.lat + half], [datum.lon + half, datum.lat - half], [datum.lon - half, datum.lat - half]]]}" },
          // geoshape applies its field to the scenegraph item at draw time, so it reads datum.box; as names
          // the field of this data set that gets the shape instance (the default, shape, is for mark-level use).
          { type: 'geoshape', projection: 'projection', field: 'datum.box', as: 'square' },
          { type: 'geoshape', projection: 'projection', field: 'datum.point', as: 'dot' },
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
        type: 'shape',
        from: { data: 'capitals' },
        // The shape channel picks the shape instance that geoshape wrote to the square field.
        encode: { update: { shape: { field: 'square' }, fill: { value: '#f0b060' }, fillOpacity: { value: 0.25 }, stroke: { value: '#f0b060' }, strokeWidth: { value: 0.7 } } },
      },
      {
        type: 'shape',
        from: { data: 'capitals' },
        encode: { update: { shape: { field: 'dot' }, fill: { value: '#fff' } } },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'boxes of ±' + half + '° around each capital'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'half', [2, 0.8, 4, 6, 3], 1200);
  return () => stage.dispose();
};

export default mount;

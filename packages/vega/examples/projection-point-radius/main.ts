// pointRadius: how big GeoJSON Point features are drawn
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'radius', value: 4.5, bind: { input: 'range', min: 1, max: 14, step: 0.5 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'albersUsa',
        scale: 500,
        translate: [220, 125],
        // The radius in pixels of every Point and MultiPoint the projection draws (default 4.5).
        pointRadius: { signal: 'radius' },
      },
    ],
    data: [
      { name: 'world', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' } },
      {
        name: 'capitals',
        url: 'data/us-state-capitals.json',
        // Wrap each row as a GeoJSON Point feature; geoshape projects it and applies pointRadius.
        transform: [
          { type: 'formula', as: 'geo', expr: "{type: 'Feature', geometry: {type: 'Point', coordinates: [datum.lon, datum.lat]}}" },
        ],
      },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'world' },
        encode: { update: { stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.4 }, fill: { value: '#2f5d50' } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'shape',
        from: { data: 'capitals' },
        // On a shape mark the transform sees scenegraph items, so the field is 'datum.geo', not 'geo'.
        encode: { update: { fill: { value: '#f0b060' }, fillOpacity: { value: 0.85 }, stroke: { value: '#222' }, strokeWidth: { value: 0.5 } } },
        transform: [{ type: 'geoshape', projection: 'projection', field: 'datum.geo' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'pointRadius: ' + radius" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'radius', [1.5, 4.5, 9, 14, 6], 1000);
  return () => stage.dispose();
};

export default mount;

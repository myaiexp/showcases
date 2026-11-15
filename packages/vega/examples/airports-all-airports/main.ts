// airports.csv projected with geopoint, unprojectable rows filtered out
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // The tutorial's spec, with the map and text recoloured for the dark page
  // (states #dedede on white, black routes and title in the original).
  const spec: Spec = {
    width: 900,
    height: 560,
    padding: { top: 0, left: 0, right: 0, bottom: 0 },
    autosize: 'none',
    data: [
      {
        name: 'states',
        url: 'data/us-10m.json',
        format: { type: 'topojson', feature: 'states' },
        transform: [{ type: 'geopath', projection: 'projection' }],
      },
      {
        name: 'airports',
        url: 'data/airports.csv',
        format: { type: 'csv', parse: 'auto' },
        transform: [
          { type: 'geopoint', projection: 'projection', fields: ['longitude', 'latitude'] },
          { type: 'filter', expr: 'datum.x != null && datum.y != null' },
        ],
      },
    ],
    projections: [
      {
        name: 'projection',
        type: 'albersUsa',
        scale: 1200,
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    marks: [
      {
        type: 'path',
        from: { data: 'states' },
        encode: {
          enter: { fill: { value: '#2c3444' }, stroke: { value: '#141820' } },
          update: { path: { field: 'path' } },
        },
      },
      {
        type: 'symbol',
        from: { data: 'airports' },
        encode: {
          enter: {
            size: { value: 16 },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.8 },
            stroke: { value: 'white' },
            strokeWidth: { value: 1.5 },
          },
          update: { x: { field: 'x' }, y: { field: 'y' } },
        },
      },
    ],
  };

  await stage.render(spec);
  return () => stage.dispose();
};

export default mount;

// geopoint: longitude and latitude fields projected to pixel fields of your choice
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const types = ['albersUsa', 'albers', 'mercator', 'equirectangular', 'equalEarth', 'naturalEarth1'];
  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'type', value: 'albers', bind: { input: 'select', options: types } },
    ],
    projections: [
      // The same capitals are projected by whichever type is chosen; fit keeps the lower 48 in view.
      { name: 'projection', type: { signal: 'type' }, fit: { signal: "data('states')" }, extent: { signal: '[[10, 22], [width - 10, height - 6]]' } },
    ],
    data: [
      { name: 'states', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' }, transform: [{ type: 'filter', expr: 'datum.id < 57 && datum.id != 2 && datum.id != 15' }] },
      {
        name: 'capitals',
        url: 'data/us-state-capitals.json',
        transform: [
          { type: 'filter', expr: 'datum.lon > -130' },
          // fields are [longitude, latitude]. as renames the output pair (the default is x and y),
          // useful when the rows already have x and y of their own.
          { type: 'geopoint', projection: 'projection', fields: ['lon', 'lat'], as: ['px', 'py'] },
        ],
      },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'states' },
        encode: { update: { fill: { value: '#2a4f44' }, stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.5 } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'symbol',
        from: { data: 'capitals' },
        encode: { update: { x: { field: 'px' }, y: { field: 'py' }, size: { value: 40 }, fill: { value: '#f0b060' }, stroke: { value: '#222' }, strokeWidth: { value: 0.5 } } },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: 'type' } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'type', types, 1500);
  return () => stage.dispose();
};

export default mount;

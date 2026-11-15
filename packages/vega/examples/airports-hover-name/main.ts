// A hover signal holds the airport under the pointer; a title signal shows its name
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { tourAirports } from '../../shared/airports-tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // The tutorial's spec, with the map and text recoloured for the dark page
  // (states #dedede on white, black routes and title in the original).
  const spec: Spec = {
    width: 900,
    height: 560,
    padding: { top: 25, left: 0, right: 0, bottom: 0 },
    autosize: 'none',
    signals: [
      {
        name: 'hover',
        value: null,
        on: [
          { events: 'symbol:mouseover', update: 'datum' },
          { events: 'symbol:mouseout', update: 'null' },
        ],
      },
      {
        name: 'title',
        value: 'U.S. Airports, 2008',
        update: "hover ? hover.name + ' (' + hover.iata + ')' : 'U.S. Airports, 2008'",
      },
    ],
    data: [
      {
        name: 'states',
        url: 'data/us-10m.json',
        format: { type: 'topojson', feature: 'states' },
        transform: [{ type: 'geopath', projection: 'projection' }],
      },
      {
        name: 'traffic',
        url: 'data/flights-airport.csv',
        format: { type: 'csv', parse: 'auto' },
        transform: [
          { type: 'aggregate', groupby: ['origin'], fields: ['count'], ops: ['sum'], as: ['flights'] },
        ],
      },
      {
        name: 'airports',
        url: 'data/airports.csv',
        format: { type: 'csv', parse: 'auto' },
        transform: [
          { type: 'lookup', from: 'traffic', key: 'origin', fields: ['iata'], as: ['traffic'] },
          { type: 'filter', expr: 'datum.traffic != null' },
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
    scales: [
      {
        name: 'size',
        type: 'linear',
        domain: { data: 'traffic', field: 'flights' },
        range: [16, 1000],
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
            size: { scale: 'size', field: 'traffic.flights' },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.8 },
            stroke: { value: 'white' },
            strokeWidth: { value: 1.5 },
          },
          update: { x: { field: 'x' }, y: { field: 'y' } },
        },
      },
      {
        type: 'text',
        interactive: false,
        encode: {
          enter: {
            x: { signal: 'width', offset: -5 },
            y: { value: 0 },
            fill: { value: '#e6e8ee' },
            fontSize: { value: 20 },
            align: { value: 'right' },
          },
          update: { text: { signal: 'title' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: a pretend pointer visits the busiest airports.
  if (stage.preview) tourAirports(stage, view);
  return () => stage.dispose();
};

export default mount;

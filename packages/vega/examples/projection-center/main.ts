// center: the longitude and latitude that lands on the translate point
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'cLon', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } },
      { name: 'cLat', value: 0, bind: { input: 'range', min: -80, max: 80, step: 1 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'mercator',
        scale: 170,
        // The point named by center is drawn at translate, here the middle of the view (the cross).
        center: [{ signal: 'cLon' }, { signal: 'cLat' }],
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule' }] },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'graticule' },
        encode: { update: { stroke: { value: '#58627a' }, strokeWidth: { value: 0.6 }, fill: { value: null } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'shape',
        from: { data: 'world' },
        encode: { update: { stroke: { value: '#9db4d6' }, strokeWidth: { value: 0.4 }, fill: { value: '#2d4a73' } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'symbol',
        encode: { update: { x: { signal: 'width / 2' }, y: { signal: 'height / 2' }, shape: { value: 'cross' }, size: { value: 220 }, stroke: { value: '#f0b060' }, strokeWidth: { value: 1.5 }, fill: { value: null } } },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'center: [' + cLon + ', ' + cLat + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  // Cards: the map slides from city to city, always centred on the cross.
  cycleSteps(stage, view, [
    { cLon: 0, cLat: 0 }, { cLon: 2.35, cLat: 48.85 }, { cLon: 139.7, cLat: 35.7 },
    { cLon: -74, cLat: 40.7 }, { cLon: 151.2, cLat: -33.9 }, { cLon: 18.4, cLat: -33.9 },
  ], 1400);
  return () => stage.dispose();
};

export default mount;

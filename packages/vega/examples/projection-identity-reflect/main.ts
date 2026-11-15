// identity with reflectX and reflectY: plain plane coordinates, flipped on demand
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'flipX', value: false, bind: { input: 'checkbox', name: 'reflectX' } },
      { name: 'flipY', value: false, bind: { input: 'checkbox', name: 'reflectY' } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'identity',
        // identity does no cartography: longitude is x and latitude is y, so with y pointing
        // down the map starts upside down. reflectY turns it north up.
        reflectX: { signal: 'flipX' },
        reflectY: { signal: 'flipY' },
        fit: { signal: "data('world')" },
        size: [{ signal: 'width' }, { signal: 'height' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' }, transform: [{ type: 'filter', expr: 'datum.id < 57 && datum.id != 2 && datum.id != 15' }] },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'world' },
        encode: { update: { stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.4 }, fill: { value: '#2f5d50' } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'reflectX: ' + flipX + ', reflectY: ' + flipY" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { flipX: false, flipY: false }, { flipX: false, flipY: true }, { flipX: true, flipY: true }, { flipX: true, flipY: false },
  ], 1300);
  return () => stage.dispose();
};

export default mount;

// scale and translate: size and position of the map in the view
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
      { name: 's', value: 70, bind: { input: 'range', min: 30, max: 200, step: 1 } },
      { name: 'tx', value: 220, bind: { input: 'range', min: 0, max: 440, step: 1 } },
      { name: 'ty', value: 120, bind: { input: 'range', min: 0, max: 240, step: 1 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'equalEarth',
        // scale grows the map; translate moves the projection's centre (the cross) around the view.
        scale: { signal: 's' },
        translate: [{ signal: 'tx' }, { signal: 'ty' }],
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
        encode: { update: { x: { signal: 'tx' }, y: { signal: 'ty' }, shape: { value: 'cross' }, size: { value: 220 }, stroke: { value: '#f0b060' }, strokeWidth: { value: 1.5 }, fill: { value: null } } },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'scale ' + s + ', translate [' + tx + ', ' + ty + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { s: 70, tx: 220, ty: 120 }, { s: 130, tx: 140, ty: 150 }, { s: 45, tx: 330, ty: 90 }, { s: 100, tx: 260, ty: 60 },
  ], 1300);
  return () => stage.dispose();
};

export default mount;

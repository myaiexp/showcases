// graticule step: the spacing of meridians and parallels in degrees
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
      { name: 'sx', value: 20, bind: { input: 'range', min: 5, max: 60, step: 1 } },
      { name: 'sy', value: 20, bind: { input: 'range', min: 5, max: 60, step: 1 } },
    ],
    // step sets the major and the minor spacing together: [longitude, latitude] degrees.
    projections: [
      {
        name: 'projection',
        type: 'equalEarth',
        scale: 80,
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule', step: { signal: '[sx, sy]' } }] },
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
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'step: [' + sx + ', ' + sy + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { sx: 20, sy: 20 }, { sx: 10, sy: 10 }, { sx: 45, sy: 15 }, { sx: 15, sy: 45 }, { sx: 60, sy: 30 },
  ], 1200);
  return () => stage.dispose();
};

export default mount;

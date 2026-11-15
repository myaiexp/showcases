// graticule stepMajor and stepMinor: two grid spacings, major lines reaching the poles
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
      { name: 'major', value: 45, bind: { input: 'range', min: 15, max: 120, step: 15 } },
      { name: 'minor', value: 15, bind: { input: 'range', min: 5, max: 30, step: 5 } },
      { name: 'lat', value: -60, bind: { input: 'range', min: -90, max: 90, step: 1 } },
    ],
    // Minor lines stop at 80 degrees of latitude; the major meridians continue to the poles. Look at the pole.
    projections: [
      {
        name: 'projection',
        type: 'orthographic',
        scale: 105,
        rotate: [-20, { signal: 'lat' }, 0],
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule', stepMajor: { signal: '[major, 360]' }, stepMinor: { signal: '[minor, minor]' } }] },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'stepMajor: [' + major + ', 360], stepMinor: [' + minor + ', ' + minor + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { major: 45, minor: 15 }, { major: 90, minor: 10 }, { major: 30, minor: 30 }, { major: 120, minor: 5 },
  ], 1300);
  return () => stage.dispose();
};

export default mount;

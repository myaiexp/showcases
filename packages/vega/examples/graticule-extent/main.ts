// graticule extent: restricting the grid of meridians and parallels to a box
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
      { name: 'lon0', value: -60, bind: { input: 'range', min: -180, max: 0, step: 1 } },
      { name: 'lon1', value: 60, bind: { input: 'range', min: 0, max: 180, step: 1 } },
      { name: 'lat0', value: -40, bind: { input: 'range', min: -90, max: 0, step: 1 } },
      { name: 'lat1', value: 50, bind: { input: 'range', min: 0, max: 90, step: 1 } },
    ],
    // extent sets both the major and the minor extent: the grid is drawn only inside the box.
    projections: [
      {
        name: 'projection',
        type: 'equirectangular',
        scale: 68,
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule', step: [10, 10], extent: { signal: '[[lon0, lat0], [lon1, lat1]]' } }] },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'extent: [[' + lon0 + ', ' + lat0 + '], [' + lon1 + ', ' + lat1 + ']]'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { lon0: -60, lon1: 60, lat0: -40, lat1: 50 }, { lon0: -180, lon1: 180, lat0: -90, lat1: 90 },
    { lon0: -20, lon1: 150, lat0: 0, lat1: 70 }, { lon0: -150, lon1: -30, lat0: -60, lat1: 20 },
  ], 1400);
  return () => stage.dispose();
};

export default mount;

// parallels: the two standard parallels that shape a conic map
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
      { name: 'p0', value: 20, bind: { input: 'range', min: -80, max: 80, step: 1 } },
      { name: 'p1', value: 50, bind: { input: 'range', min: -80, max: 80, step: 1 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'conicEqualArea',
        scale: 60,
        rotate: [-10, 0],
        center: [0, 30],
        translate: [220, 150],
        // The two latitudes where the cone cuts the globe; the cone's shape depends on both.
        parallels: [{ signal: 'p0' }, { signal: 'p1' }],
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
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'parallels: [' + p0 + ', ' + p1 + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { p0: 20, p1: 50 }, { p0: 0, p1: 0 }, { p0: 40, p1: 40 }, { p0: -20, p1: 60 }, { p0: 10, p1: 75 },
  ], 1400);
  return () => stage.dispose();
};

export default mount;

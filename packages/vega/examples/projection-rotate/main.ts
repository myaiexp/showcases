// rotate: a globe turning about its three axes
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'yaw', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } },
      { name: 'pitch', value: -20, bind: { input: 'range', min: -90, max: 90, step: 1 } },
      { name: 'roll', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'orthographic',
        scale: 105,
        // [lambda, phi, gamma]: yaw, pitch and roll in degrees. gamma is optional.
        rotate: [{ signal: 'yaw' }, { signal: 'pitch' }, { signal: 'roll' }],
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
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'rotate: [' + round(yaw) + ', ' + pitch + ', ' + roll + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  // Cards: the globe spins about its vertical axis and slowly rocks.
  if (stage.preview) {
    stage.every(60, (i) => {
      view.signal('yaw', ((i * 3) % 360) - 180).signal('roll', Math.round(12 * Math.sin(i / 20)));
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;

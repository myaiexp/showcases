// clipAngle: a small circle around the centre cuts the world off
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'angle', value: 90, bind: { input: 'range', min: 10, max: 170, step: 1 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'azimuthalEquidistant',
        scale: 36,
        // Geometry further than this many degrees from the projection centre is clipped away.
        clipAngle: { signal: 'angle' },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'clipAngle: ' + angle" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'angle', [30, 60, 90, 120, 150, 170, 120, 60], 1000);
  return () => stage.dispose();
};

export default mount;

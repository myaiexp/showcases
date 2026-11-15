// graticule precision: how finely each line is cut, from curved to straight chords
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
      { name: 'prec', value: 2.5, bind: { input: 'range', min: 0.5, max: 90, step: 0.5 } },
    ],
    // precision is the angular spacing, in degrees, of the points along each graticule line (default 2.5).
    projections: [
      {
        name: 'projection',
        type: 'orthographic',
        scale: 105,
        rotate: [-30, -25, 0],
        // The projection's own resampling would smooth the straight chords away; turn it off.
        precision: 100,
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule', precision: { signal: 'prec' } }] },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'precision: ' + prec + '°'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'prec', [2.5, 10, 30, 60, 90, 30, 10], 1000);
  return () => stage.dispose();
};

export default mount;

// precision: the adaptive resampling threshold, from smooth to faceted
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
      { name: 'precision', value: 0.7, bind: { input: 'range', min: 0.1, max: 60, step: 0.1 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'azimuthalEqualArea',
        scale: 54,
        rotate: [-10, -30, 0],
        // Segments are subdivided until they bend by less than this many pixels. A big value
        // leaves long straight edges that show the planar polygons under the curves.
        precision: { signal: 'precision' },
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule', precision: 10 }] },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'precision: ' + format(precision, '.1f')" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'precision', [0.7, 8, 25, 55, 25, 8], 1000);
  return () => stage.dispose();
};

export default mount;

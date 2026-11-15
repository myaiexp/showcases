// Fourteen of the projection types, cycled on one world map
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const types = [
  'albers', 'azimuthalEqualArea', 'azimuthalEquidistant', 'conicEqualArea', 'conicEquidistant',
  'equalEarth', 'equirectangular', 'gnomonic', 'mercator', 'mollweide',
  'naturalEarth1', 'orthographic', 'stereographic', 'transverseMercator',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'type', value: 'equalEarth', bind: { input: 'select', options: types } },
      // Scale factors are not comparable across projections, so each type gets its own.
      {
        name: 'scales',
        value: {
          albers: 62, azimuthalEqualArea: 58, azimuthalEquidistant: 48, conicEqualArea: 62, conicEquidistant: 48, equalEarth: 82, equirectangular: 68,
          gnomonic: 55, mercator: 38, mollweide: 85, naturalEarth1: 76, orthographic: 105,
          stereographic: 40, transverseMercator: 36,
        },
      },
      { name: 'label', update: 'type' },
    ],
    projections: [
      {
        name: 'projection',
        type: { signal: 'type' },
        scale: { signal: 'scales[type]' },
        // Cones are drawn from their apex, so they sit higher in the frame.
        translate: [{ signal: 'width / 2' }, { signal: "height / 2 - (indexof(type, 'conic') === 0 || type === 'albers' ? 45 : 0)" }],
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
        encode: {
          update: {
            x: { value: 4 },
            y: { value: 12 },
            text: { signal: 'label' },
            fontSize: { value: 14 },
            fill: { value: '#f0b060' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  // Cards step through the whole list; the full view has the select.
  cycle(stage, view, 'type', types, 1300);
  return () => stage.dispose();
};

export default mount;

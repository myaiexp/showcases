// Six whole-world projections side by side, each fitted into its own cell
import type { Projection, ProjectionType, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

// Six projections of the world, each fitted to a 150 x 110 cell with `fit` and `extent`.
const cells = [
  { name: 'equirectangular', col: 0, row: 0 },
  { name: 'mercator', col: 1, row: 0 },
  { name: 'transverseMercator', col: 2, row: 0 },
  { name: 'equalEarth', col: 0, row: 1 },
  { name: 'naturalEarth1', col: 1, row: 1 },
  { name: 'mollweide', col: 2, row: 1 },
];
const W = 150;
const H = 112;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: W * 3,
    height: H * 2 + 10,
    autosize: 'none',
    padding: 5,
    // One rotation shared by all six: each map slides the seam of the world to a new longitude.
    signals: [{ name: 'lon', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } }],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule', step: [30, 30] }] },
    ],
    // Each projection is told which part of the view to fill; fit works out scale and translate.
    projections: cells.map((c): Projection => ({
      name: c.name,
      type: c.name as ProjectionType,
      rotate: [{ signal: 'lon' }, 0],
      fit: { signal: "data('world')" },
      extent: [
        [c.col * W + 6, c.row * (H + 10) + 14],
        [(c.col + 1) * W - 6, c.row * (H + 10) + H],
      ],
    })),
    marks: cells.flatMap((c) => [
      {
        type: 'shape' as const,
        from: { data: 'graticule' },
        encode: { update: { stroke: { value: '#58627a' }, strokeWidth: { value: 0.5 }, fill: { value: null } } },
        transform: [{ type: 'geoshape' as const, projection: c.name }],
      },
      {
        type: 'shape' as const,
        from: { data: 'world' },
        encode: { update: { stroke: { value: '#9db4d6' }, strokeWidth: { value: 0.3 }, fill: { value: '#2d4a73' } } },
        transform: [{ type: 'geoshape' as const, projection: c.name }],
      },
      {
        type: 'text' as const,
        encode: {
          update: {
            x: { value: c.col * W + W / 2 },
            y: { value: c.row * (H + 10) + 8 },
            align: { value: 'center' },
            text: { value: c.name },
            fontSize: { value: 10 },
            fill: { value: '#f0b060' },
          },
        },
      },
    ]),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'lon', [0, 60, 120, 180, -120, -60], 1100);
  return () => stage.dispose();
};

export default mount;

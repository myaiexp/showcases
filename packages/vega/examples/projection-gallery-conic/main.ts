// The conic projections, albersUsa and identity, each fitted to the lower 48 states
import type { Projection, ProjectionType, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const W = 150;
const H = 112;
// The plain conic types need the US framed by hand: rotate puts the central meridian (96°W) in the middle and
// center moves the cone's axis to 38°N. albers and albersUsa come pre-configured for it.
const framing: Partial<Projection> = { rotate: [{ signal: 'lon' }, 0], center: [0, 38] };
const cells = [
  { name: 'albers', col: 0, row: 0, extra: {} as Partial<Projection> },
  { name: 'albersUsa', col: 1, row: 0, extra: {} as Partial<Projection> },
  { name: 'conicEqualArea', col: 2, row: 0, extra: framing },
  { name: 'conicConformal', col: 0, row: 1, extra: framing },
  { name: 'conicEquidistant', col: 1, row: 1, extra: framing },
  // identity draws the longitude and latitude numbers as plane x and y; reflectY turns north up.
  { name: 'identity', col: 2, row: 1, extra: { reflectY: true } as Partial<Projection> },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: W * 3,
    height: H * 2 + 10,
    autosize: 'none',
    padding: 5,
    // The central meridian of the three plain cones; turning it tilts them against the fixed map.
    signals: [{ name: 'lon', value: 96, bind: { input: 'range', min: 60, max: 130, step: 1 } }],
    data: [
      { name: 'states', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' },
        // Alaska and Hawaii (fips 02 and 15) and the territories (above 56) are not in the lower 48.
        transform: [{ type: 'filter', expr: "datum.id < 57 && datum.id != 2 && datum.id != 15" }] },
    ],
    projections: cells.map((c): Projection => ({
      name: c.name,
      type: c.name as ProjectionType,
      ...c.extra,
      fit: { signal: "data('states')" },
      extent: [
        [c.col * W + 8, c.row * (H + 10) + 18],
        [(c.col + 1) * W - 8, c.row * (H + 10) + H],
      ],
    })),
    marks: cells.flatMap((c) => [
      {
        type: 'shape' as const,
        from: { data: 'states' },
        encode: {
          update: {
            stroke: { value: '#9ad6bf' },
            strokeWidth: { value: 0.5 },
            fill: { value: '#2f5d50' },
          },
        },
        transform: [{ type: 'geoshape' as const, projection: c.name }],
      },
      {
        type: 'text' as const,
        encode: {
          update: {
            x: { value: c.col * W + W / 2 },
            y: { value: c.row * (H + 10) + 10 },
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
  cycle(stage, view, 'lon', [96, 110, 96, 82], 1100);
  return () => stage.dispose();
};

export default mount;

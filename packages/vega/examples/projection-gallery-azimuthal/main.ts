// Azimuthal projections around the same centre, spun together by one rotation signal
import type { Projection, ProjectionType, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const W = 150;
const H = 122;
// Scale factors differ per type; these put each disc at about the same size.
const cells = [
  { name: 'orthographic', scale: 52, col: 0, row: 0 },
  { name: 'stereographic', scale: 30, col: 1, row: 0, id: 'stereographic', clip: 120 },
  { name: 'gnomonic', scale: 22, col: 2, row: 0, id: 'gnomonic', clip: 60 },
  { name: 'azimuthalEqualArea', scale: 26, col: 0, row: 1 },
  { name: 'azimuthalEquidistant', scale: 17, col: 1, row: 1 },
  // The same type as the first cell, with clipAngle opened up to show the far side as well.
  { name: 'orthographic', scale: 52, col: 2, row: 1, id: 'orthographic-wide', clip: 90 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: W * 3,
    height: H * 2,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'lon', value: -20, bind: { input: 'range', min: -180, max: 180, step: 1 } },
      { name: 'lat', value: 25, bind: { input: 'range', min: -90, max: 90, step: 1 } },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'land' } },
      { name: 'graticule', transform: [{ type: 'graticule', step: [30, 30] }] },
    ],
    projections: cells.map((c): Projection => ({
      name: c.id ?? c.name,
      type: c.name as ProjectionType,
      scale: c.scale,
      translate: [c.col * W + W / 2, c.row * H + H / 2 + 8],
      rotate: [{ signal: 'lon' }, { signal: '-lat' }, 0],
      ...(c.clip ? { clipAngle: c.clip } : {}),
    })),
    marks: cells.flatMap((c) => [
      {
        type: 'shape' as const,
        from: { data: 'graticule' },
        encode: { update: { stroke: { value: '#58627a' }, strokeWidth: { value: 0.5 }, fill: { value: null } } },
        transform: [{ type: 'geoshape' as const, projection: c.id ?? c.name }],
      },
      {
        type: 'shape' as const,
        from: { data: 'world' },
        encode: { update: { stroke: { value: '#9db4d6' }, strokeWidth: { value: 0.4 }, fill: { value: '#2d4a73' } } },
        transform: [{ type: 'geoshape' as const, projection: c.id ?? c.name }],
      },
      {
        type: 'text' as const,
        encode: {
          update: {
            x: { value: c.col * W + W / 2 },
            y: { value: c.row * H + 8 },
            align: { value: 'center' },
            text: { value: c.clip ? `${c.name}, clipAngle ${c.clip}` : c.name },
            fontSize: { value: 10 },
            fill: { value: '#f0b060' },
          },
        },
      },
    ]),
  };

  const view = await stage.render(spec);
  if (stage.preview) stage.every(100, (i) => view.signal('lon', ((i * 5) % 360) - 180).runAsync().then(() => undefined));
  return () => stage.dispose();
};

export default mount;

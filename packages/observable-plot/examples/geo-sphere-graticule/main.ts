// Sphere and graticule helpers under different projections and rotations
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const PROJECTIONS = ['orthographic', 'equal-earth', 'azimuthal-equidistant', 'stereographic'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ type: (typeof PROJECTIONS)[number]; lambda: number }>(el, ctx, {
    initial: { type: 'orthographic', lambda: 0 },
    render: ({ type, lambda }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 2,
        projection: { type, rotate: [lambda, -30, 20] },
        marks: [Plot.sphere({ fill: 'var(--plot-background)', stroke: 'currentColor' }), Plot.graticule({ strokeOpacity: 0.3 })],
      }),
    step: ({ lambda }) => ({ lambda: (lambda + 30) % 360 }),
    previewMs: 600,
    controls: (bar, live) => {
      select(bar, 'projection', PROJECTIONS, live.state.type, (type) => live.set({ type }));
      slider(bar, 'rotate λ', [0, 360, 5], live.state.lambda, (lambda) => live.set({ lambda }));
    },
  });

export default mount;

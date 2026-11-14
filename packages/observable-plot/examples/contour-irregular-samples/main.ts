// Contour interpolating scattered samples, with blur and interpolate options
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const VIEWS = ['dots', 'contours', 'blurred contours'] as const;
type View = (typeof VIEWS)[number];
const INTERPOLATORS = ['nearest', 'barycentric', 'random-walk'] as const;
type Interp = (typeof INTERPOLATORS)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('ca55-south.csv');
  const ca55 = ctx.preview ? thin(all, 4) : all;
  return mountPlot<{ view: View; blur: number; interpolate: Interp }>(el, ctx, {
    initial: { view: 'dots', blur: 4, interpolate: 'nearest' },
    render: ({ view, blur, interpolate }, { width, height }) => {
      const color = { type: 'diverging' } as const;
      if (view === 'dots') {
        return Plot.dot(ca55, { x: 'LONGITUDE', y: 'LATITUDE', fill: 'MAG_IGRF90' }).plot({ width, height, color });
      }
      return Plot.contour(ca55, {
        x: 'LONGITUDE',
        y: 'LATITUDE',
        fill: 'MAG_IGRF90',
        blur: view === 'contours' ? 0 : blur,
        interpolate,
      }).plot({ width, height, color });
    },
    step: ({ view }) => ({ view: VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length] }),
    previewMs: 3200,
    controls: (bar, live) => {
      select(bar, 'view', VIEWS, live.state.view, (view) => live.set({ view }));
      slider(bar, 'blur', [0, 12, 1], live.state.blur, (blur) => live.set({ blur }));
      select(bar, 'interpolate', INTERPOLATORS, live.state.interpolate, (interpolate) => live.set({ interpolate }));
    },
  });
};

export default mount;

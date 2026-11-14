// The rotate option takes two or three Euler angles: lambda, phi and gamma
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot(el, ctx, {
    initial: { lambda: 0, phi: -30, gamma: 0 },
    render: ({ lambda, phi, gamma }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? Math.min(width, 520),
        projection: { type: 'orthographic', rotate: [lambda, phi, gamma] },
        marks: [Plot.graticule(), Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.4 }), Plot.sphere()],
      }),
    step: (_s, i) => ({ lambda: (i * 30) % 360, phi: -30 + 30 * Math.sin(i * 0.5), gamma: 40 * Math.sin(i * 0.3) }),
    previewMs: 600,
    controls: (bar, live) => {
      slider(bar, 'lambda', [-180, 180, 1], live.state.lambda, (lambda) => live.set({ lambda }));
      slider(bar, 'phi', [-90, 90, 1], live.state.phi, (phi) => live.set({ phi }));
      slider(bar, 'gamma', [-180, 180, 1], live.state.gamma, (gamma) => live.set({ gamma }));
    },
  });
};

export default mount;

// Conic projections take standard parallels: move them and the US reshapes
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { topojson, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const nation = topojson.feature(us, us.objects.nation);
  const states = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  return mountPlot(el, ctx, {
    initial: { south: 29.5, north: 45.5 },
    render: ({ south, north }, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: { type: 'conic-equal-area', parallels: [south, north], rotate: [96, 0], domain: nation, inset: 8 },
        marks: [Plot.graticule(), Plot.geo(nation, { fillOpacity: 0.3 }), Plot.geo(states, { strokeOpacity: 0.3 })],
      }),
    step: (_s, i) => ({ south: 29.5 + 25 * Math.abs(Math.sin(i * 0.5)), north: 45.5 + 20 * Math.abs(Math.sin(i * 0.8)) }),
    previewMs: 600,
    controls: (bar, live) => {
      slider(bar, 'south parallel', [0, 60, 0.5], live.state.south, (south) => live.set({ south }));
      slider(bar, 'north parallel', [20, 80, 0.5], live.state.north, (north) => live.set({ north }));
    },
  });
};

export default mount;

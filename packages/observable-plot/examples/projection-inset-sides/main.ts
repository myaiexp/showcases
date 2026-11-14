// Projection inset, insetLeft and insetBottom pad the fitted domain
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
    initial: { inset: 10, insetLeft: 10, insetBottom: 10 },
    render: ({ inset, insetLeft, insetBottom }, { width, height }) =>
      Plot.plot({
        width,
        height,
        // insetLeft and insetBottom override inset on their own side.
        projection: { type: 'albers', domain: nation, inset, insetLeft, insetBottom },
        marks: [Plot.frame({ strokeOpacity: 0.4 }), Plot.geo(nation, { fillOpacity: 0.3 }), Plot.geo(states, { strokeOpacity: 0.3 })],
      }),
    step: (_s, i) => ({ inset: 10, insetLeft: 10 + 50 * Math.abs(Math.sin(i * 0.6)), insetBottom: 10 + 30 * Math.abs(Math.sin(i * 0.9)) }),
    previewMs: 600,
    controls: (bar, live) => {
      slider(bar, 'inset', [0, 60, 1], live.state.inset, (inset) => live.set({ inset }));
      slider(bar, 'insetLeft', [0, 150, 1], live.state.insetLeft, (insetLeft) => live.set({ insetLeft }));
      slider(bar, 'insetBottom', [0, 100, 1], live.state.insetBottom, (insetBottom) => live.set({ insetBottom }));
    },
  });
};

export default mount;

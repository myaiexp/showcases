// Two links from San Francisco to Paris: a straight projected line and a geodesic
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const xy = { x1: -122.4194, y1: 37.7749, x2: 2.3522, y2: 48.8566 };

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot<{ linear: boolean; geodesic: boolean }>(el, ctx, {
    initial: { linear: true, geodesic: true },
    render: ({ linear, geodesic }, { width }) =>
      Plot.plot({
        width, // no height: the projection sets it, so the globe is not cropped in a card
        projection: 'equal-earth',
        marks: [
          Plot.sphere(),
          Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.3 }),
          // The default auto curve follows the sphere; linear joins the projected points.
          linear ? Plot.link({ length: 1 }, { curve: 'linear', stroke: 'red', ...xy }) : null,
          geodesic ? Plot.link({ length: 1 }, { markerStart: 'dot', markerEnd: 'arrow', strokeWidth: 1.5, ...xy }) : null,
        ],
      }),
    step: ({ linear, geodesic }) => (linear && geodesic ? { linear: false } : linear ? { linear: false, geodesic: true } : { linear: true, geodesic: true }),
    previewMs: 2600,
    controls: (bar, live) => {
      toggle(bar, 'curve: "linear" (red)', live.state.linear, (linear) => live.set({ linear }));
      toggle(bar, 'geodesic (auto curve)', live.state.geodesic, (geodesic) => live.set({ geodesic }));
    },
  });
};

export default mount;

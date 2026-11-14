// The Beagle voyage as a geodesic line on a projection, plain or coloured by order
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { text, topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const strokes = ['red', 'varies by order'] as const;
const curves = ['auto', 'linear'] as const;
type Stroke = (typeof strokes)[number];
type Curve = (typeof curves)[number];

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  // beagle.csv has no header: [lon, lat] rows.
  const beagle = d3.csvParseRows(await text('beagle.csv')).map((r) => d3.autoType(r) as [number, number]);
  return mountPlot<{ stroke: Stroke; curve: Curve }>(el, ctx, {
    initial: { stroke: strokes[0], curve: curves[0] },
    render: ({ stroke, curve }, { width }) =>
      Plot.plot({
        width, // no height: the projection sets it, so the globe is not cropped in a card
        projection: 'equirectangular',
        marks: [
          Plot.geo(land),
          // z: null forces one line, so the stroke can vary along it.
          stroke === strokes[0]
            ? Plot.line(beagle, { stroke: 'red', curve })
            : Plot.line(beagle, { stroke: (_d, i) => i, z: null, curve }),
          Plot.geo({ type: 'Point', coordinates: [-0.13, 51.5] }, { fill: 'red' }), // London
        ],
      }),
    step: ({ stroke }) => ({ stroke: stroke === strokes[0] ? strokes[1] : strokes[0] }),
    previewMs: 3200,
    controls: (bar, live) => {
      select(bar, 'stroke', strokes, live.state.stroke, (stroke) => live.set({ stroke }));
      select(bar, 'curve', curves, live.state.curve, (curve) => live.set({ curve }));
    },
  });
};

export default mount;

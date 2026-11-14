// Hexbin on a projected map: r counts Walmart stores, fill is the first year
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { topojson, tsv, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [us, walmarts] = await Promise.all([usTopology(), tsv('walmarts.tsv')]);
  const nation = topojson.feature(us, us.objects.nation);
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  return mountPlot<{ fillOn: boolean }>(el, ctx, {
    initial: { fillOn: true },
    render: ({ fillOn }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers',
        r: { range: [0, preview ? 9 : 16] },
        color: { scheme: 'spectral', label: 'First year opened', legend: !preview && fillOn },
        marks: [
          Plot.geo(statemesh, { strokeOpacity: 0.5 }),
          Plot.geo(nation),
          Plot.dot(
            walmarts,
            Plot.hexbin(
              fillOn ? { r: 'count', fill: 'min' } : { r: 'count' },
              fillOn ? { x: 'longitude', y: 'latitude', fill: 'date' } : { x: 'longitude', y: 'latitude' },
            ),
          ),
        ],
      }),
    step: ({ fillOn }) => ({ fillOn: !fillOn }),
    controls: (bar, live) => {
      toggle(bar, 'fill: first opening (min date)', live.state.fillOn, (fillOn) => live.set({ fillOn }));
    },
  });
};

export default mount;

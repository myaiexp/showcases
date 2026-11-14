// Tip: state names at geoCentroid positions on a map, with textPadding
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { topojson, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const states = topojson.feature(us, us.objects.states).features;
  return mountPlot<{ padding: number }>(el, ctx, {
    initial: { padding: 3 },
    render: ({ padding }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers-usa',
        marks: [
          Plot.geo(states),
          Plot.tip(
            states,
            Plot.geoCentroid({
              title: (d) => d.properties.name,
              anchor: 'bottom',
              textPadding: padding,
              fontSize: preview ? 5 : undefined,
              pointerSize: preview ? 4 : undefined,
            }),
          ),
        ],
      }),
    step: (_s, i) => ({ padding: [3, 0, 8][i % 3] ?? 3 }),
    controls: (bar, live) => {
      slider(bar, 'textPadding (px)', [0, 16, 1], live.state.padding, (padding) => live.set({ padding }));
    },
  });
};

export default mount;

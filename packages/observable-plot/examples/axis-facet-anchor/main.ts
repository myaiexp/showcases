// facetAnchor and anchor: which facets of a penguin grid repeat the x axis
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['bottom', 'top'] as const;
const FACET_ANCHORS = ['auto', 'bottom-empty', 'bottom', 'top-empty', 'top', 'null'] as const;
type State = { anchor: (typeof ANCHORS)[number]; facetAnchor: (typeof FACET_ANCHORS)[number] };

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<State>(el, ctx, {
    initial: { anchor: 'bottom', facetAnchor: 'auto' },
    render: ({ anchor, facetAnchor }, { width, height }) =>
      Plot.plot({
        width,
        height,
        facet: { marginRight: 80 },
        grid: true,
        marks: [
          Plot.frame(),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'sex', fy: 'species' }),
          Plot.axisX({
            color: 'red',
            anchor,
            facetAnchor: facetAnchor === 'auto' ? undefined : facetAnchor === 'null' ? null : facetAnchor,
          }),
          // The fx axis goes opposite the x axis.
          Plot.axisFx({ color: 'dodgerblue', anchor: anchor === 'top' ? 'bottom' : 'top' }),
        ],
      }),
    step: (s, i) => ({
      anchor: i % 2 ? 'top' : 'bottom',
      facetAnchor: FACET_ANCHORS[i % FACET_ANCHORS.length],
    }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'anchor', ANCHORS, 'bottom', (anchor) => live.set({ anchor }));
      select(bar, 'facetAnchor', FACET_ANCHORS, 'auto', (facetAnchor) => live.set({ facetAnchor }));
    },
  });
};

export default mount;

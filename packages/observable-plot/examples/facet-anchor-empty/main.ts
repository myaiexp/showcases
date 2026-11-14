// facetAnchor places a mark on non-empty, empty or edge facets
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['empty', 'null', 'top', 'bottom', 'top-empty', 'right-empty'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ anchor: (typeof ANCHORS)[number] }>(el, ctx, {
    initial: { anchor: 'empty' },
    render: ({ anchor }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        marginRight: 60,
        facet: { label: null },
        marks: [
          Plot.frame(),
          // Each species lives on few islands, so some island-by-species facets are empty.
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'island', fy: 'species', r: 2 }),
          Plot.text([`anchor: ${anchor}`], { frameAnchor: 'middle', facetAnchor: anchor === 'null' ? null : anchor, fill: 'red', fontSize: 11 }),
        ],
      }),
    step: ({ anchor }) => ({ anchor: ANCHORS[(ANCHORS.indexOf(anchor) + 1) % ANCHORS.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'facetAnchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor }));
    },
  });
};

export default mount;

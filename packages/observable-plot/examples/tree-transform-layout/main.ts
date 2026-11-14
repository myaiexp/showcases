// Tree layout options: treeLayout, treeAnchor, treeSort, treeSeparation
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const paths = [
  'Chaos/Gaia/Mountains',
  'Chaos/Gaia/Pontus',
  'Chaos/Gaia/Uranus',
  'Chaos/Eros',
  'Chaos/Erebus/Aether',
  'Chaos/Erebus/Hemera',
  'Chaos/Tartarus',
];
const LAYOUTS = ['tree', 'cluster'] as const;
const ANCHORS = ['left', 'right'] as const;
interface State {
  layout: (typeof LAYOUTS)[number];
  anchor: (typeof ANCHORS)[number];
  sorted: boolean;
  uniform: boolean;
}

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: { layout: 'tree', anchor: 'left', sorted: false, uniform: false },
    render: ({ layout, anchor, sorted, uniform }, { width, height }) => {
      const options = {
        treeLayout: layout === 'tree' ? d3.tree : d3.cluster,
        treeAnchor: anchor,
        treeSort: sorted ? 'node:name' : null,
        treeSeparation: uniform ? () => 1 : undefined,
      };
      return Plot.plot({
        width,
        height: height ?? 280,
        axis: null,
        margin: 16,
        marginLeft: anchor === 'left' ? 16 : 100,
        marginRight: anchor === 'left' ? 100 : 16,
        marks: [
          Plot.link(paths, Plot.treeLink(options)),
          Plot.dot(paths, Plot.treeNode(options)),
          Plot.text(paths, Plot.treeNode({ ...options, text: 'node:name', dx: anchor === 'left' ? 6 : -6 })),
        ],
      });
    },
    step: (s, i) => ({ layout: i % 2 ? 'cluster' : 'tree', anchor: i % 4 > 1 ? 'right' : 'left', sorted: s.sorted }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'treeLayout', LAYOUTS, live.state.layout, (layout) => live.set({ layout }));
      select(bar, 'treeAnchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor }));
      toggle(bar, 'treeSort node:name', live.state.sorted, (sorted) => live.set({ sorted }));
      toggle(bar, 'treeSeparation uniform', live.state.uniform, (uniform) => live.set({ uniform }));
    },
  });

export default mount;

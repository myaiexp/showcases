// treeLayout: the default tidy tree, d3.cluster, and a custom indented layout
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

// A custom treeLayout assigns node.x and node.y: here depth across and visit order down.
function indent() {
  return (root: { eachBefore(f: (node: { x: number; y: number; depth: number }, i: number) => void): void }) => {
    root.eachBefore((node, i) => {
      node.y = node.depth;
      node.x = i;
    });
  };
}

const LAYOUTS = ['tree', 'cluster', 'indent'] as const;
type Layout = (typeof LAYOUTS)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('flare.csv');
  // Cards plot only the flare.animate package; the full tree is thousands of pixels tall.
  const flare = ctx.preview ? all.filter((d) => d.name === 'flare' || d.name.startsWith('flare.animate')) : all;
  return mountPlot(el, ctx, {
    initial: { layout: 'tree' as Layout },
    render: ({ layout }, { width, height }) => {
      const h = height ?? (layout === 'indent' ? 3600 : layout === 'cluster' ? 2400 : 1800);
      if (layout === 'indent') {
        return Plot.plot({
          width,
          height: ctx.preview ? h : Math.round(flare.length * 14.2),
          axis: null,
          inset: 10,
          insetRight: 120,
          round: true,
          marks: [Plot.tree(flare, { path: 'name', delimiter: '.', treeLayout: indent as never, strokeWidth: 1, curve: 'step-before', textStroke: 'none' })],
        });
      }
      const options = { path: 'name', delimiter: '.', textStroke: 'var(--plot-background)' };
      return Plot.plot({
        width,
        height: h,
        axis: null,
        margin: 10,
        marginLeft: 30,
        marginRight: 160,
        marks: [layout === 'cluster' ? Plot.cluster(flare, { ...options, treeSort: 'node:height' }) : Plot.tree(flare, options)],
      });
    },
    step: ({ layout }) => ({ layout: LAYOUTS[(LAYOUTS.indexOf(layout) + 1) % LAYOUTS.length] ?? 'tree' }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'layout', LAYOUTS, live.state.layout, (layout) => live.set({ layout }));
    },
  });
};

export default mount;

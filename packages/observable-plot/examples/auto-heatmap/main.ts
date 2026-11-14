// A colour reducer makes a heatmap: bins on two numbers, or bins by a category
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ys = ['height', 'sex'] as const;
type Y = (typeof ys)[number];

const mount: Mount = async (el, ctx) => {
  const athletes = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(athletes, 6) : athletes;
  return mountPlot(el, ctx, {
    initial: { y: 'height' as Y },
    render: ({ y }, { width, height }) =>
      // color: "count" is a reducer, so x and y become inputs; a categorical y switches rect to bar.
      Plot.auto(olympians, { x: 'weight', y, color: 'count' }).plot({ width, height }),
    step: ({ y }) => ({ y: y === 'height' ? ys[1] : ys[0] }),
    previewMs: 2800,
    controls: (bar, live) => select(bar, 'y', ys, live.state.y, (y) => live.set({ y })),
  });
};

export default mount;

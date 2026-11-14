// A dot heatmap: bin centres as x and y, r by count, optionally split by sex
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { bySex: false },
    render: ({ bySex }, { width, height }) =>
      Plot.plot({
        width,
        height,
        r: { range: [0, 6] },
        color: { legend: !height && bySex },
        marks: [
          Plot.dot(olympians, Plot.bin<Plot.DotOptions>({ r: 'count' }, bySex ? { x: 'weight', y: 'height', stroke: 'sex' } : { x: 'weight', y: 'height' })),
        ],
      }),
    step: ({ bySex }) => ({ bySex: !bySex }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'stroke by sex', live.state.bySex, (bySex) => live.set({ bySex }));
    },
  });
};

export default mount;

// A categorical color scale with legend: true gets a swatches legend
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 5) : all;
  return mountPlot(el, ctx, {
    initial: { legend: true },
    render: ({ legend }, { width, height }) =>
      Plot.plot({
        width,
        height: height && height - 62, // leaves room for the legend in a card
        color: { legend },
        marks: [Plot.dot(olympians, { x: 'weight', y: 'height', stroke: 'sex' })],
      }),
    step: ({ legend }) => ({ legend: !legend }),
    previewMs: 2200,
    controls: (bar, live) => {
      toggle(bar, 'color legend', live.state.legend, (legend) => live.set({ legend }));
    },
  });
};

export default mount;

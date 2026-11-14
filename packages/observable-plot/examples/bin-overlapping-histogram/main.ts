// Overlapping histograms: y2 skips the stack, mixBlendMode shows the overlap
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { overlap: true },
    render: ({ overlap }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          overlap
            ? Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y2: 'count' }, { x: 'weight', fill: 'sex', mixBlendMode: 'screen' }))
            : Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex' })),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ overlap }) => ({ overlap: !overlap }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'overlap (y2, screen blend)', live.state.overlap, (overlap) => live.set({ overlap }));
    },
  });
};

export default mount;

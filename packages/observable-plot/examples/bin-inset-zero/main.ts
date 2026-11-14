// Bin insets: the default one pixel gap, or inset 0 with a rounded x scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { touching: true },
    render: ({ touching }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { round: touching },
        y: { grid: true },
        marks: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, touching ? { x: 'weight', inset: 0 } : { x: 'weight' })), Plot.ruleY([0])],
      }),
    step: ({ touching }) => ({ touching: !touching }),
    previewMs: 2200,
    controls: (bar, live) => {
      toggle(bar, 'inset: 0 and x.round', live.state.touching, (touching) => live.set({ touching }));
    },
  });
};

export default mount;

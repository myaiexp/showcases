// facet: super draws one mark across the whole facet grid, as a decoration
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { superFrame: true },
    render: ({ superFrame }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        marginRight: 60,
        facet: { label: null },
        marks: [
          // A super mark may not use position scales: only decorations such as a frame.
          Plot.frame(superFrame ? { facet: 'super', stroke: 'red', strokeWidth: 3 } : {}),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'sex', fy: 'species', r: 2 }),
        ],
      }),
    step: ({ superFrame }) => ({ superFrame: !superFrame }),
    previewMs: 2200,
    controls: (bar, live) => {
      toggle(bar, 'one super frame (else a frame per facet)', live.state.superFrame, (superFrame) => live.set({ superFrame }));
    },
  });
};

export default mount;

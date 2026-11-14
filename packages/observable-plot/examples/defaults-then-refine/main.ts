// A default scatterplot, then the same data refined option by option
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { refined: false },
    render: ({ refined }, { width, height, preview }) =>
      refined
        ? Plot.plot({
            width,
            height,
            grid: true,
            aspectRatio: 1,
            inset: 10,
            x: { tickSpacing: 80, label: 'Culmen length (mm)' },
            y: { tickSpacing: 80, label: 'Culmen depth (mm)' },
            color: { legend: !preview },
            marks: [Plot.frame(), Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' })],
          })
        : // Only data and encodings: Plot chooses everything else.
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' }).plot({ width, height }),
    step: ({ refined }) => ({ refined: !refined }),
    previewMs: 2800,
    controls: (bar, live) => {
      toggle(bar, 'refined (grid, aspectRatio, inset, frame, labels, legend)', live.state.refined, (refined) =>
        live.set({ refined }),
      );
    },
  });
};

export default mount;

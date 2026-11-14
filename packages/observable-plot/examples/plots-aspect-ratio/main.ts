// Aspect ratio: aspectRatio 1 makes one unit of x as long as one unit of y
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ fixed: boolean }>(el, ctx, {
    initial: { fixed: true },
    render: ({ fixed }, { width, height, preview }) =>
      Plot.plot({
        width,
        // A fixed ratio computes the height itself; a card only pins it for the free state.
        height: fixed ? undefined : height,
        grid: true,
        inset: 10,
        aspectRatio: fixed ? 1 : undefined,
        color: { legend: !preview },
        marks: [Plot.frame(), Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' })],
      }),
    step: ({ fixed }) => ({ fixed: !fixed }),
    controls: (bar, live) => {
      toggle(bar, 'use fixed aspect ratio', true, (fixed) => live.set({ fixed }));
    },
  });
};

export default mount;

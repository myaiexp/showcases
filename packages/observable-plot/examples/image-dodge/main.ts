// Image with dodgeY: a beeswarm of circular portraits that never overlap
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { portrait } from '../../shared/image-portraits.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const presidents = (await csv('us-president-favorability.csv')).map((d) => ({ ...d, portrait: portrait(d.Name) }));
  return mountPlot<{ r: number }>(el, ctx, {
    initial: { r: 20 },
    render: ({ r }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 280,
        inset: 20,
        marks: [
          Plot.image(
            presidents,
            Plot.dodgeY({
              x: 'First Inauguration Date',
              r: preview ? r / 2 : r, // clip to a circle
              preserveAspectRatio: 'xMidYMin slice', // try not to clip heads
              src: 'portrait',
              title: 'Name',
            }),
          ),
        ],
      }),
    step: ({ r }) => ({ r: r >= 28 ? 12 : r + 8 }),
    controls: (bar, live) => slider(bar, 'r', [8, 30, 1], live.state.r, (r) => live.set({ r })),
  });
};

export default mount;

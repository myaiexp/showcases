// A plot over a CSS background image set through the style option, no image mark
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { iceBackdrop } from '../../shared/image-portraits.ts';
import { mountPlot } from '../../shared/plot.ts';

const SIZES = ['cover', 'contain', '100% 100%'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  const ice = iceBackdrop(); // a drawn stand-in for the docs' sea-ice photograph
  return mountPlot<{ size: (typeof SIZES)[number] }>(el, ctx, {
    initial: { size: 'cover' },
    render: ({ size }, { width, height }) =>
      Plot.plot({
        width,
        height,
        margin: 30,
        inset: 10,
        grid: true,
        style: { padding: '10px', color: 'black', background: `url("${ice}")`, backgroundSize: size },
        marks: [Plot.frame(), Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'white', stroke: 'black' })],
      }),
    step: ({ size }) => ({ size: SIZES[(SIZES.indexOf(size) + 1) % SIZES.length] }),
    controls: (bar, live) => select(bar, 'backgroundSize', SIZES, live.state.size, (size) => live.set({ size })),
  });
};

export default mount;

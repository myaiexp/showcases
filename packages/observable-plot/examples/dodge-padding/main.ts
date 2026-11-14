// dodgeY padding: extra pixels of space kept between neighbouring dots
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ padding: number }>(el, ctx, {
    initial: { padding: 2 },
    render: ({ padding }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 180,
        marks: [Plot.dot(cars, Plot.dodgeY({ x: 'weight (lb)', padding, fill: 'currentColor', r: preview ? 1.5 : undefined }))],
      }),
    step: (_s, i) => ({ padding: [-1, 0, 1, 2][i % 4] ?? 2 }),
    previewMs: 1800,
    controls: (bar, live) => slider(bar, 'padding', [-1, 5, 0.1], live.state.padding, (padding) => live.set({ padding })),
  });
};

export default mount;

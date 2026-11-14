// Image imageRendering: smooth interpolation against pixelated on an enlarged icon
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pixelFace } from '../../shared/image-portraits.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['auto', 'pixelated'] as const;

const mount: Mount = (el, ctx) => {
  const src = pixelFace(); // an 8x8 raster, drawn in code
  const rnd = d3.randomLcg(5);
  const points = d3.range(8).map((i) => ({ x: i, y: Math.sin(i / 1.4) + rnd() * 0.5, size: 20 + i * 6 }));
  return mountPlot<{ mode: (typeof MODES)[number] }>(el, ctx, {
    initial: { mode: 'auto' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 40,
        marks: [Plot.image(points, { x: 'x', y: 'y', src, width: 'size', imageRendering: mode })],
      }),
    step: ({ mode }) => ({ mode: mode === 'auto' ? 'pixelated' : 'auto' }),
    controls: (bar, live) => select(bar, 'imageRendering', MODES, live.state.mode, (mode) => live.set({ mode })),
  });
};

export default mount;

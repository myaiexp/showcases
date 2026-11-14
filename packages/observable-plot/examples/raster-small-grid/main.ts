// A 10x10 multiplication grid as text, then as raster pixels under the text
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const layers = ['text only', 'raster under text'] as const;
type Layers = (typeof layers)[number];

const mount: Mount = (el, ctx) => {
  const grid = { width: 10, height: 10, values: d3.cross(d3.range(10), d3.range(10), (x, y) => x * y) };
  // Grid points are pixel centres, so the labels sit half a pixel in from the corner.
  const cx = (_d: number, i: number): number => (i % grid.width) + 0.5;
  const cy = (_d: number, i: number): number => Math.floor(i / grid.width) + 0.5;
  return mountPlot<{ layers: Layers; pixelated: boolean }>(el, ctx, {
    initial: { layers: layers[1], pixelated: true },
    render: ({ layers: shown, pixelated }, { width, height }) =>
      shown === layers[0]
        ? Plot.plot({
            width,
            height,
            grid: true,
            x: { domain: [0, grid.width], label: 'column' },
            y: { domain: [0, grid.height], label: 'row' },
            marks: [Plot.text(grid.values, { text: Plot.identity, fill: Plot.identity, x: cx, y: cy })],
          })
        : Plot.plot({
            width,
            height,
            marks: [
              Plot.raster(grid.values, {
                width: grid.width,
                height: grid.height,
                imageRendering: pixelated ? 'pixelated' : 'auto',
              }),
              Plot.text(grid.values, { text: Plot.identity, fill: 'white', x: cx, y: cy }),
            ],
          }),
    step: ({ layers: shown, pixelated }, i) =>
      shown === layers[0] ? { layers: layers[1], pixelated: true } : i % 2 ? { pixelated: !pixelated } : { layers: layers[0] },
    previewMs: 2600,
    controls: (bar, live) => {
      select(bar, 'layers', layers, live.state.layers, (l) => live.set({ layers: l }));
      toggle(bar, 'imageRendering: pixelated', live.state.pixelated, (pixelated) => live.set({ pixelated }));
    },
  });
};

export default mount;

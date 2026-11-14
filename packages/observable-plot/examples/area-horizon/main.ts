// Horizon chart: one area repeated per band, clipped, shaded by band index
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  const max = d3.max(industries, (d) => d.unemployed);
  return mountPlot(el, ctx, {
    initial: { bands: 7 },
    render: ({ bands }, { width, height }) => {
      const step = max / bands;
      return Plot.plot({
        width,
        height: height ?? 720,
        axis: null,
        y: { domain: [0, step] },
        color: { scheme: 'viridis' },
        facet: { data: industries, y: 'industry' },
        marks: [
          // Band i is the same area shifted down by i steps; clip hides what leaves the facet.
          d3.range(bands).map((i) => Plot.areaY(industries, { x: 'date', y: (d) => d.unemployed - i * step, fill: i, clip: true })),
          Plot.text(industries, Plot.selectFirst({ text: 'industry', frameAnchor: 'top-left', dx: 6, dy: 6 })),
          Plot.frame(),
        ],
      });
    },
    step: ({ bands }) => ({ bands: bands === 7 ? 3 : bands + 2 }),
    previewMs: 2200,
    controls: (bar, live) => slider(bar, 'bands', [2, 12, 1], live.state.bands, (bands) => live.set({ bands })),
  });
};

export default mount;

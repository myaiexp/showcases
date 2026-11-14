// One series, many fills: z null lets fill vary by Volume along a single area
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: { flat: false },
    render: ({ flat }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        color: { type: 'log', legend: !preview },
        // With z: null the fill varies along one series instead of splitting it.
        marks: [Plot.areaY(aapl, { x: 'Date', y: 'Close', fill: flat ? 'Open' : 'Volume', z: null }), Plot.ruleY([0])],
      }),
    step: ({ flat }) => ({ flat: !flat }),
    previewMs: 2800,
    controls: (bar, live) => toggle(bar, 'fill: "Open" (price)', live.state.flat, (flat) => live.set({ flat })),
  });
};

export default mount;

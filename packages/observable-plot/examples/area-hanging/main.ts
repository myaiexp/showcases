// Hanging area: reversing the y scale makes the area grow down from y = 0
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: { reverse: true },
    render: ({ reverse }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { label: null },
        y: { grid: true, reverse },
        marks: [Plot.areaY(aapl, { x: 'Date', y: 'Close', line: true }), Plot.ruleY([0])],
      }),
    step: ({ reverse }) => ({ reverse: !reverse }),
    previewMs: 2800,
    controls: (bar, live) => toggle(bar, 'y: {reverse}', live.state.reverse, (reverse) => live.set({ reverse })),
  });
};

export default mount;

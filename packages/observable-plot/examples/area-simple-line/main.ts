// Area chart of AAPL closes, with the line option stroking the topline
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: { line: false },
    render: ({ line }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        // line: true strokes only the topline and lowers fillOpacity to 0.3.
        marks: [Plot.areaY(aapl, { x: 'Date', y: 'Close', line }), Plot.ruleY([0])],
      }),
    step: ({ line }) => ({ line: !line }),
    previewMs: 2800,
    controls: (bar, live) => toggle(bar, 'line', live.state.line, (line) => live.set({ line })),
  });
};

export default mount;

// Text: direct labels above bars, with dy and lineAnchor "bottom"
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ dy: number }>(el, ctx, {
    initial: { dy: -6 },
    render: ({ dy }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        label: null,
        y: { grid: true, label: 'Frequency (%)', percent: true },
        marks: [
          Plot.barY(alphabet, { x: 'letter', y: 'frequency' }),
          Plot.text(alphabet, {
            x: 'letter',
            y: 'frequency',
            text: (d) => (d.frequency * 100).toFixed(1),
            dy,
            lineAnchor: 'bottom',
            fontSize: preview ? 7 : undefined,
          }),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ dy: [-6, 8, -10][i % 3] ?? -6 }),
    controls: (bar, live) => {
      slider(bar, 'dy', [-20, 20, 1], live.state.dy, (dy) => live.set({ dy }));
    },
  });
};

export default mount;

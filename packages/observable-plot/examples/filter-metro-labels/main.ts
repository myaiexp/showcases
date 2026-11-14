// Labels on a scatterplot: the filter option keeps highlighted metros
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['filter: "highlight"', 'no filter', 'text null instead'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const metros = await csv('metros.csv');
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'filter: "highlight"' },
    render: ({ mode }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        x: { type: 'log' },
        marks: [
          Plot.dot(metros, { x: 'POP_2015', y: 'R90_10_2015' }),
          Plot.text(metros, {
            // filter drops rows from the mark; the tip alternative nulls the text instead.
            filter: mode === 'filter: "highlight"' ? 'highlight' : null,
            x: 'POP_2015',
            y: 'R90_10_2015',
            text: mode === 'text null instead' ? (d) => (d.highlight ? d.nyt_display : null) : 'nyt_display',
            fontSize: preview ? 7 : undefined,
            frameAnchor: 'bottom',
            dy: -6,
          }),
        ],
      }),
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] ?? MODES[0] }),
    previewMs: 2200,
    controls: (bar, live) => select(bar, 'labels', MODES, live.state.mode, (mode) => live.set({ mode })),
  });
};

export default mount;

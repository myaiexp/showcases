// A quick bar chart from an array of numbers, with orientation and rx
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const ORIENTATIONS = ['barY', 'barX'] as const;
type State = { mark: (typeof ORIENTATIONS)[number]; rx: number };

// Seeded so the bars are the same on every visit.
const random = d3.randomLcg(7);
const values = Array.from({ length: 14 }, () => Math.round(10 + random() * 90));

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: { mark: 'barY', rx: 0 },
    render: ({ mark, rx }, { width, height }) => {
      // With no options, the array is y2 (barY) or x2 (barX) and the index is the ordinal.
      const m = mark === 'barY' ? Plot.barY(values, { rx, inset: 1 }) : Plot.barX(values, { rx, inset: 1 });
      return m.plot({ width, height });
    },
    step: (_s, i) => ({ mark: i % 2 ? 'barX' : 'barY', rx: [0, 8, 0, 8][i % 4] }),
    controls: (bar, live) => {
      select(bar, 'mark', ORIENTATIONS, 'barY', (mark) => live.set({ mark }));
      slider(bar, 'rx', [0, 20, 1], 0, (rx) => live.set({ rx }));
    },
  });

export default mount;

// Image mark scatterplot: generated portraits at x, y with width and draw order
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { portrait } from '../../shared/image-portraits.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  // The docs load photos from the web; each portrait here is drawn in code instead.
  const presidents = (await csv('us-president-favorability.csv')).map((d) => ({ ...d, portrait: portrait(d.Name) }));
  return mountPlot<{ width: number; reverse: boolean }>(el, ctx, {
    initial: { width: 40, reverse: false },
    render: ({ width: w, reverse }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 20,
        x: { label: 'First inauguration date' },
        y: { grid: true, label: 'Net favorability (%)', tickFormat: '+f' },
        marks: [
          Plot.ruleY([0]),
          Plot.image(presidents, {
            x: 'First Inauguration Date',
            y: (d: Row) => d['Very Favorable %'] + d['Somewhat Favorable %'] - d['Very Unfavorable %'] - d['Somewhat Unfavorable %'],
            src: 'portrait',
            width: w,
            title: 'Name',
            // Images draw in input order, last on top; reverse flips that.
            reverse,
          }),
        ],
      }),
    step: (_s, i) => ({ width: [40, 28, 40, 52][i % 4], reverse: i % 2 === 1 }),
    controls: (bar, live) => {
      slider(bar, 'width', [16, 70, 2], live.state.width, (width) => live.set({ width }));
      toggle(bar, 'reverse draw order', live.state.reverse, (reverse) => live.set({ reverse }));
    },
  });
};

export default mount;

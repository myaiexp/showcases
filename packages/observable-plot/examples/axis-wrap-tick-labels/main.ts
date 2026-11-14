// Axis tick labels wrapped with lineWidth, with marginBottom to make room
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const responses = [
  { name: 'Family in feud with Zucker­bergs', value: 0.17 },
  { name: 'Committed 671 birthdays to memory', value: 0.19 },
  { name: 'Ex is doing too well', value: 0.1 },
  { name: 'High school friends all dead now', value: 0.15 },
  { name: 'Discovered how to “like” things mentally', value: 0.27 },
  { name: 'Not enough politics', value: 0.12 },
];

const mount: Mount = (el, ctx) =>
  mountPlot<{ lineWidth: number }>(el, ctx, {
    initial: { lineWidth: ctx.preview ? 7 : 8 },
    render: ({ lineWidth }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        y: { percent: true },
        marks: [
          Plot.axisX({ label: null, lineWidth, marginBottom: preview ? 70 : 40 }),
          Plot.axisY({ label: 'Responses (%)' }),
          Plot.barY(preview ? responses.slice(0, 3) : responses, { x: 'name', y: 'value' }),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ lineWidth }) => ({ lineWidth: lineWidth === 7 ? 5 : 7 }),
    controls: (bar, live) => {
      slider(bar, 'lineWidth (ems)', [4, 14, 1], 8, (lineWidth) => live.set({ lineWidth }));
    },
  });

export default mount;

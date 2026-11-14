// From shorthand to a finished chart: the same series, options added one by one
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { timeSeries } from '../../shared/shorthand-data.ts';

type S = { dots: boolean; grid: boolean; labels: boolean };
const STAGES: S[] = [
  { dots: false, grid: false, labels: false },
  { dots: true, grid: false, labels: false },
  { dots: true, grid: true, labels: false },
  { dots: true, grid: true, labels: true },
];

const mount: Mount = (el, ctx) =>
  mountPlot<S>(el, ctx, {
    initial: STAGES[0] as S,
    render: ({ dots, grid, labels }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid, label: labels ? '↑ Opening price (USD)' : undefined },
        x: { label: labels ? 'Date →' : undefined },
        marks: [
          Plot.line(timeSeries, labels ? { stroke: 'steelblue', strokeWidth: 2, curve: 'monotone-x' } : {}),
          dots ? Plot.dot(timeSeries, { fill: 'steelblue', r: 2.5 }) : null,
          labels ? Plot.text(timeSeries.filter((_d, i) => i % 13 === 0), { text: (d) => d[1].toFixed(0), dy: -10, fontSize: 10 }) : null,
        ],
      }),
    step: (_s, i) => STAGES[i % STAGES.length] as S,
    previewMs: 1800,
    controls: (bar, live) => {
      toggle(bar, 'dots', live.state.dots, (dots) => live.set({ dots }));
      toggle(bar, 'grid', live.state.grid, (grid) => live.set({ grid }));
      toggle(bar, 'labels, colour, curve', live.state.labels, (labels) => live.set({ labels }));
    },
  });

export default mount;

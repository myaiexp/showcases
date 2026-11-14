// Arrows from 1980 to 2015 per US metro, bent and coloured by change
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const metros = await csv('metros.csv');
  return mountPlot(el, ctx, {
    initial: { bend: 22.5 },
    render: ({ bend }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        inset: 10,
        x: { type: 'log', label: 'Population' },
        y: { label: 'Inequality', ticks: 4 },
        color: { scheme: 'BuRd', label: 'Change in inequality from 1980 to 2015', legend: !preview, tickFormat: '+f' },
        marks: [
          Plot.arrow(metros, {
            x1: 'POP_1980',
            y1: 'R90_10_1980',
            x2: 'POP_2015',
            y2: 'R90_10_2015',
            bend,
            stroke: (d) => d.R90_10_2015 - d.R90_10_1980,
          }),
          // filter: "highlight" keeps the rows whose highlight field is truthy.
          Plot.text(metros, {
            x: 'POP_2015',
            y: 'R90_10_2015',
            filter: 'highlight',
            text: 'nyt_display',
            fill: 'currentColor',
            stroke: 'var(--plot-background)',
            dy: -6,
          }),
        ],
      }),
    step: ({ bend }) => ({ bend: bend === 22.5 ? 0 : bend === 0 ? -45 : 22.5 }),
    previewMs: 2400,
    controls: (bar, live) => slider(bar, 'bend (degrees)', [-90, 90, 2.5], live.state.bend, (bend) => live.set({ bend })),
  });
};

export default mount;

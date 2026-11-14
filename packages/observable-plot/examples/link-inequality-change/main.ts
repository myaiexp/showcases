// Links from each metro's 1980 point to its 2015 point, coloured by the change
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const metros = await csv('metros.csv');
  return mountPlot<{ arrows: boolean }>(el, ctx, {
    initial: { arrows: true },
    render: ({ arrows }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        inset: 10,
        x: { type: 'log', label: 'Population' },
        y: { label: 'Inequality', ticks: 4 },
        color: { scheme: 'BuRd', label: 'Change in inequality from 1980 to 2015', legend: !preview, tickFormat: '+f' },
        marks: [
          Plot.link(metros, {
            x1: 'POP_1980',
            y1: 'R90_10_1980',
            x2: 'POP_2015',
            y2: 'R90_10_2015',
            stroke: (d) => d.R90_10_2015 - d.R90_10_1980,
            markerEnd: arrows ? 'arrow' : undefined,
          }),
          Plot.text(metros, {
            x: 'POP_2015',
            y: 'R90_10_2015',
            filter: 'highlight',
            text: 'nyt_display',
            fill: 'currentColor',
            stroke: 'var(--plot-background)',
            dy: -8,
          }),
        ],
      }),
    step: ({ arrows }) => ({ arrows: !arrows }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'markerEnd: "arrow"', live.state.arrows, (arrows) => live.set({ arrows }));
    },
  });
};

export default mount;

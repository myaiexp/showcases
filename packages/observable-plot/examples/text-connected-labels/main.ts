// Text: label every nth year on a connected scatterplot with the filter option
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const STEPS = [5, 2, 10] as const;

const mount: Mount = async (el, ctx) => {
  const driving = await csv('driving.csv');
  return mountPlot<{ every: number }>(el, ctx, {
    initial: { every: 5 },
    render: ({ every }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        inset: 10,
        grid: true,
        x: { label: 'Miles driven (per person-year)' },
        y: { label: 'Cost of gasoline ($ per gallon)' },
        marks: [
          Plot.line(driving, { x: 'miles', y: 'gas', curve: 'catmull-rom', marker: true }),
          Plot.text(driving, {
            filter: (d) => d.year % every === 0,
            x: 'miles',
            y: 'gas',
            text: (d) => `${d.year}`,
            dy: -6,
            lineAnchor: 'bottom',
            fontSize: preview ? 8 : undefined,
          }),
        ],
      }),
    step: ({ every }, i) => ({ every: STEPS[i % STEPS.length] ?? every }),
    controls: (bar, live) => {
      slider(bar, 'label every n years', [1, 15, 1], live.state.every, (every) => live.set({ every }));
    },
  });
};

export default mount;

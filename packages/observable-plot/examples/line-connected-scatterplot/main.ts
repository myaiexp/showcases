// Connected scatterplot of driving against gas prices, with catmull-rom and markers
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const driving = await csv('driving.csv');
  return mountPlot<{ smooth: boolean }>(el, ctx, {
    initial: { smooth: true },
    render: ({ smooth }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        inset: 10,
        grid: true,
        x: { label: 'Miles driven (per person-year)' },
        y: { label: 'Cost of gasoline ($ per gallon)' },
        marks: [
          // Neither variable depends on the other: the line follows the data in year order.
          Plot.line(driving, { x: 'miles', y: 'gas', curve: smooth ? 'catmull-rom' : 'linear', marker: true }),
          Plot.text(driving, {
            filter: (d) => d.year % 5 === 0,
            x: 'miles',
            y: 'gas',
            text: (d) => `${d.year}`,
            dy: preview ? -6 : -8,
          }),
        ],
      }),
    step: ({ smooth }) => ({ smooth: !smooth }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'catmull-rom curve', live.state.smooth, (smooth) => live.set({ smooth }));
    },
  });
};

export default mount;

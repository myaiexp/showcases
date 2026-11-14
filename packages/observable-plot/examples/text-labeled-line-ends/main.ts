// Text: label only the first point of each series with the selectFirst transform
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const travelers = await csv('travelers.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      y: {
        grid: true,
        label: 'Travelers per day (millions)',
        transform: (d: number) => d / 1e6, // convert to millions
      },
      marks: [
        Plot.ruleY([0]),
        Plot.line(travelers, { x: 'date', y: 'previous', strokeOpacity: 0.5 }),
        Plot.line(travelers, { x: 'date', y: 'current' }),
        // The data runs newest first, so "first" is the most recent day.
        Plot.text(travelers, Plot.selectFirst({ x: 'date', y: 'previous', text: ['2019'], fillOpacity: 0.5, lineAnchor: 'bottom', dy: -6 })),
        Plot.text(travelers, Plot.selectFirst({ x: 'date', y: 'current', text: ['2020'], lineAnchor: 'top', dy: 6 })),
      ],
    }),
  );
};

export default mount;

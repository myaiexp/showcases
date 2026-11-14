// Cell heatmap of Simpsons IMDb ratings by season and episode
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const simpsons = await csv('simpsons.csv');
  return mountPlot<{ labels: boolean }>(el, ctx, {
    // Card: 700 tiny numbers are noise at 200px, so cards show the colours alone.
    initial: { labels: !ctx.preview },
    render: ({ labels }, { width, height }) =>
      Plot.plot({
        width,
        height,
        padding: 0,
        grid: true,
        x: { axis: 'top', label: 'Season' },
        y: { label: 'Episode' },
        color: { type: 'linear', scheme: 'PiYG' },
        marks: [
          Plot.cell(simpsons, { x: 'season', y: 'number_in_season', fill: 'imdb_rating', inset: 0.5 }),
          labels
            ? Plot.text(simpsons, {
                x: 'season',
                y: 'number_in_season',
                text: (d) => d.imdb_rating?.toFixed(1),
                fill: 'black',
                title: 'title',
              })
            : null,
        ],
      }),
    controls: (bar, live) => {
      toggle(bar, 'rating labels', live.state.labels, (labels) => live.set({ labels }));
    },
  });
};

export default mount;

// Cell and its cellX / cellY shorthands on one-dimensional data
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const VIEWS = ['cell: letters', 'cellX: ratings', 'cellY: ratings'] as const;
type View = (typeof VIEWS)[number];

const mount: Mount = async (el, ctx) => {
  const [alphabet, simpsons] = await Promise.all([csv('alphabet.csv'), csv('simpsons.csv')]);
  const ratings = simpsons.map((d) => d.imdb_rating);
  // An ordinal axis labels every episode; label every hundredth.
  const ticks = d3.range(0, ratings.length, 100);
  return mountPlot<{ view: View }>(el, ctx, {
    initial: { view: 'cell: letters' },
    render: ({ view }, { width, height }) => {
      if (view === 'cell: letters') return Plot.cell(alphabet, { x: 'letter', fill: 'frequency' }).plot({ width, height });
      // cellX defaults x to 0, 1, 2, … and fill to the values themselves.
      if (view === 'cellX: ratings') return Plot.cellX(ratings).plot({ width, height, x: { ticks }, color: { scheme: 'PiYG' } });
      return Plot.cellY(ratings).plot({ width, height, y: { ticks }, color: { scheme: 'PiYG' } });
    },
    step: ({ view }) => ({ view: VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length] }),
    previewMs: 2600,
    controls: (bar, live) => {
      select(bar, 'mark', VIEWS, live.state.view, (view) => live.set({ view }));
    },
  });
};

export default mount;

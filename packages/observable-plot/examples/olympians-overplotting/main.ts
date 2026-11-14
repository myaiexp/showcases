// Three answers to overplotting: dots, binned rects, density contours
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const VIEWS = ['dots', 'bin into rects', 'density'] as const;
type View = (typeof VIEWS)[number];

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ view: View }>(el, ctx, {
    initial: { view: 'dots' },
    render: ({ view }, { width, height }) => {
      if (view === 'dots') {
        return Plot.dot(olympians, { x: 'weight', y: 'height', stroke: 'sex' }).plot({ width, height });
      }
      if (view === 'bin into rects') {
        // Bin by weight and height (and sex); opacity encodes how many athletes share a bin.
        return Plot.rect(olympians, Plot.bin<Plot.RectOptions>({ fillOpacity: 'count' }, { x: 'weight', y: 'height', fill: 'sex', inset: 0 })).plot({
          width,
          height,
        });
      }
      return Plot.density(olympians, { x: 'weight', y: 'height', stroke: 'sex' }).plot({ width, height });
    },
    step: ({ view }) => ({ view: VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length] }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'view', VIEWS, live.state.view, (view) => live.set({ view }));
    },
  });
};

export default mount;

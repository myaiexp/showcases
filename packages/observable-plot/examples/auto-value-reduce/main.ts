// An object channel with value and reduce: mean height by birth date, per sex
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const reducers = ['mean', 'median', 'max', 'min'] as const;
type Reduce = (typeof reducers)[number];

const mount: Mount = async (el, ctx) => {
  const athletes = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(athletes, 4) : athletes;
  return mountPlot(el, ctx, {
    initial: { reduce: 'mean' as Reduce },
    render: ({ reduce }, { width, height, preview }) =>
      Plot.auto(olympians, { x: 'date_of_birth', y: { value: 'height', reduce }, color: 'sex', mark: 'line' }).plot({
        width,
        height,
        color: { legend: !preview },
      }),
    step: (_s, i) => ({ reduce: reducers[i % reducers.length] }),
    previewMs: 2400,
    controls: (bar, live) => select(bar, 'y reduce', reducers, live.state.reduce, (reduce) => live.set({ reduce })),
  });
};

export default mount;

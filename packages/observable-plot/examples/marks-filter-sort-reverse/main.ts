// Transform options: filter, sort and reverse reorder what draws on top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SORTS = ['none', 'body_mass_g', 'flipper_length_mm'] as const;
type SortBy = (typeof SORTS)[number];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ sort: SortBy; reverse: boolean; filter: boolean }>(el, ctx, {
    initial: { sort: 'none', reverse: false, filter: false },
    render: ({ sort, reverse, filter }, { width, height }) =>
      Plot.dot(penguins, {
        x: 'culmen_length_mm',
        y: 'culmen_depth_mm',
        r: 9,
        fill: 'species',
        stroke: 'white',
        // Marks later in the data draw on top, so sort and reverse decide who is visible.
        sort: sort === 'none' ? undefined : sort,
        reverse,
        filter: filter ? (d: Row) => d.species !== 'Adelie' : undefined,
      }).plot({ width, height, grid: true, color: { legend: !ctx.preview } }),
    step: (_s, i) => ({ sort: SORTS[i % 3], reverse: i % 2 === 1, filter: i % 5 === 4 }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'sort', SORTS, 'none', (sort) => live.set({ sort }));
      toggle(bar, 'reverse', false, (reverse) => live.set({ reverse }));
      toggle(bar, 'filter out Adelie', false, (filter) => live.set({ filter }));
    },
  });
};

export default mount;

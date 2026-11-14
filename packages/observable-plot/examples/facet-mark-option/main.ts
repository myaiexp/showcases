// The mark facet option: include, exclude, or null for the same gray dots
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['exclude', 'include', 'null'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ mode: (typeof MODES)[number] }>(el, ctx, {
    initial: { mode: 'exclude' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        marginRight: 60,
        facet: { label: null },
        marks: [
          Plot.frame(),
          // exclude: the dots outside this facet; include: inside; null: all, repeated.
          Plot.dot(penguins, {
            x: 'culmen_length_mm',
            y: 'culmen_depth_mm',
            fx: 'sex',
            fy: 'species',
            facet: mode === 'null' ? null : mode,
            fill: '#aaa',
            r: 1.5,
          }),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'sex', fy: 'species', stroke: 'species' }),
        ],
      }),
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'gray dots facet', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;

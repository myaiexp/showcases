// The waffle unit option: athletes per cell, faceted by birth year interval
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const UNITS = ['1', '2', '5', '10', '25', '50', '100'] as const;

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot(el, ctx, {
    initial: { unit: ctx.preview ? '25' : '10' },
    render: ({ unit }, { width, height }) =>
      Plot.waffleY(olympians, Plot.groupZ({ y: 'count' }, { fx: 'date_of_birth', unit: Number(unit) })).plot({
        width,
        height,
        fx: { interval: '5 years', label: null },
      }),
    step: ({ unit }) => ({ unit: ['25', '50', '100', '10'][(['25', '50', '100', '10'].indexOf(unit) + 1) % 4] ?? '25' }),
    previewMs: 2400,
    controls: (bar, live) => {
      select(bar, 'unit', UNITS, live.state.unit, (unit) => live.set({ unit }));
    },
  });
};

export default mount;

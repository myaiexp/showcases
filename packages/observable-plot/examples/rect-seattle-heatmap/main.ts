// Rect: day-by-month heatmap; interval: 1 turns each number into a unit cell
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const FIELDS = ['temp_max', 'temp_min', 'wind'] as const;

const mount: Mount = async (el, ctx) => {
  const seattle = (await csv('seattle-weather.csv')).filter((d) => d.date.getUTCFullYear() === 2015);
  return mountPlot<{ field: (typeof FIELDS)[number] }>(el, ctx, {
    initial: { field: 'temp_max' },
    render: ({ field }, { width, height }) =>
      Plot.plot({
        width,
        height,
        aspectRatio: 1,
        y: { ticks: 12, tickFormat: Plot.formatMonth('en', 'narrow') },
        marks: [
          Plot.rect(seattle, {
            x: (d) => d.date.getUTCDate(),
            y: (d) => d.date.getUTCMonth(),
            interval: 1,
            fill: field,
            inset: 0.5,
          }),
        ],
      }),
    step: ({ field }, i) => ({ field: FIELDS[i % FIELDS.length] ?? field }),
    controls: (bar, live) => {
      select(bar, 'fill', FIELDS, live.state.field, (field) => live.set({ field }));
    },
  });
};

export default mount;

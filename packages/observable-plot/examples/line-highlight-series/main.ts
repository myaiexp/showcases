// Highlight one group of lines in red; sort puts them on top of the grey ones
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  // Cards draw every other month: the series keep their shape and render faster.
  const all = await csv('bls-metro-unemployment.csv');
  const bls = ctx.preview ? thin(all, 2) : all;
  return mountPlot<{ sort: boolean }>(el, ctx, {
    initial: { sort: true },
    render: ({ sort }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Unemployment (%)' },
        color: { domain: [false, true], range: ['#ccc', 'red'] },
        marks: [
          Plot.ruleY([0]),
          Plot.line(bls, {
            x: 'date',
            y: 'unemployment',
            z: 'division',
            stroke: (d) => /, MI /.test(d.division),
            // Series draw in input order; sorting by the stroke channel moves red to the end.
            sort: sort ? { channel: 'stroke' } : undefined,
          }),
        ],
      }),
    step: ({ sort }) => ({ sort: !sort }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'sort: {channel: "stroke"}', live.state.sort, (sort) => live.set({ sort }));
    },
  });
};

export default mount;

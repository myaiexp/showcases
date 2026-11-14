// Many lines from tidy data: the z channel groups rows into series
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  // Cards draw every other month: the series keep their shape and render faster.
  const all = await csv('bls-metro-unemployment.csv');
  const bls = ctx.preview ? thin(all, 2) : all;
  return mountPlot<{ grouped: boolean }>(el, ctx, {
    initial: { grouped: true },
    render: ({ grouped }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Unemployment (%)' },
        marks: [
          Plot.ruleY([0]),
          // Without z every row joins one series, so the lines run into each other.
          Plot.line(bls, { x: 'date', y: 'unemployment', z: grouped ? 'division' : undefined }),
        ],
      }),
    step: ({ grouped }) => ({ grouped: !grouped }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'z: "division"', live.state.grouped, (grouped) => live.set({ grouped }));
    },
  });
};

export default mount;

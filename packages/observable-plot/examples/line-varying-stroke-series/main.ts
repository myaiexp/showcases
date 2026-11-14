// Lines segmented by a stroke channel that varies within each series
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  // Cards draw every other month: the series keep their shape and render faster.
  const all = await csv('bls-metro-unemployment.csv');
  const bls = ctx.preview ? thin(all, 2) : all;
  return mountPlot<{ vary: boolean }>(el, ctx, {
    initial: { vary: true },
    render: ({ vary }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { label: null },
        y: { grid: true, label: 'Unemployment (%)' },
        marks: [
          Plot.ruleY([0]),
          // z names the series; stroke then changes colour along each of them.
          Plot.line(bls, { x: 'date', y: 'unemployment', z: 'division', stroke: vary ? 'unemployment' : undefined }),
        ],
      }),
    step: ({ vary }) => ({ vary: !vary }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'stroke: "unemployment"', live.state.vary, (vary) => live.set({ vary }));
    },
  });
};

export default mount;

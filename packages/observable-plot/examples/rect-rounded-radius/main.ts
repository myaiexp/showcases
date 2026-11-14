// Rect: the r option rounds every corner; large radii reduce to a pill shape
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ r: number }>(el, ctx, {
    initial: { r: 4 },
    render: ({ r }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', r, thresholds: 10 })), Plot.ruleY([0])],
      }),
    step: (_s, i) => ({ r: [0, 4, 12, 25][i % 4] ?? 0 }),
    previewMs: 1600,
    controls: (bar, live) => {
      slider(bar, 'r', [0, 25, 0.2], live.state.r, (r) => live.set({ r }));
    },
  });
};

export default mount;

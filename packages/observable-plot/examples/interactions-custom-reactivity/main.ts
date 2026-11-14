// Re-rendering instead of updating: a new plot per sport and bin count
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SPORTS = ['all', 'athletics', 'aquatics', 'football', 'rowing', 'cycling', 'judo', 'wrestling'];

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { sport: 'all', bins: 30 },
    render: ({ sport, bins }, { width, height }) => {
      const data = sport === 'all' ? olympians : olympians.filter((d) => d.sport === sport);
      // Plot has no incremental update: each input change builds a whole new plot.
      return Plot.plot({
        width,
        height,
        x: { domain: [30, 170] },
        marks: [Plot.rectY(data, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex', thresholds: bins })), Plot.ruleY([0])],
      });
    },
    step: (_s, i) => ({ sport: SPORTS[i % SPORTS.length], bins: 15 + ((i * 7) % 30) }),
    previewMs: 1400,
    controls: (bar, live) => {
      select(bar, 'sport', SPORTS, live.state.sport, (sport) => live.set({ sport }));
      slider(bar, 'bins', [5, 60, 1], live.state.bins, (bins) => live.set({ bins }));
    },
  });
};

export default mount;

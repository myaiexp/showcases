// Cumulative histograms: weight or less (1), or weight or more (-1)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['+1', '-1'] as const;

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { cumulative: '+1' as (typeof MODES)[number] },
    render: ({ cumulative }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginLeft: 60,
        y: { grid: true },
        marks: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', cumulative: Number(cumulative) })), Plot.ruleY([0])],
      }),
    step: ({ cumulative }) => ({ cumulative: MODES[cumulative === '+1' ? 1 : 0] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'cumulative', MODES, live.state.cumulative, (cumulative) => live.set({ cumulative }));
    },
  });
};

export default mount;

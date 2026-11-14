// A histogram binned by hand with d3.bin, then the same one with binX
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  const bins = d3.bin<(typeof olympians)[number], number>().thresholds(80).value((d) => d.weight)(olympians);
  return mountPlot(el, ctx, {
    initial: { byHand: true },
    render: ({ byHand }, { width, height }) =>
      byHand
        ? // Pre-binned {x0, x1, length} objects go to the x1, x2 and y2 channels.
          Plot.rectY(bins, { x1: 'x0', x2: 'x1', y2: 'length' }).plot({ width, height })
        : Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', thresholds: 80 })).plot({ width, height }),
    step: ({ byHand }) => ({ byHand: !byHand }),
    previewMs: 2200,
    controls: (bar, live) => {
      toggle(bar, 'binned by hand (d3.bin)', live.state.byHand, (byHand) => live.set({ byHand }));
    },
  });
};

export default mount;

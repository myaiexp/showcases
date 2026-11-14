// A custom color ramp: range plus an interpolate option
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const modes = ['rgb', 'lab', 'hcl', 'hsl', 'rgb-gamma', 'angry-rainbow'] as const;
type Mode = (typeof modes)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { mode: 'rgb' as Mode },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        axis: null,
        padding: 0,
        color: {
          type: 'linear',
          ...((mode === 'angry-rainbow'
            ? { interpolate: (t: number) => `hsl(${t * 360},100%,50%)` }
            : mode === 'rgb-gamma'
              ? { range: ['steelblue', 'orange'], interpolate: d3.interpolateRgb.gamma(2) }
              : { range: ['steelblue', 'orange'], interpolate: mode }) as Plot.ScaleOptions),
        },
        marks: [Plot.cell(d3.range(40), { x: Plot.identity, fill: Plot.identity, inset: -0.5 })],
      }),
    step: (_s, i) => ({ mode: modes[i % modes.length] }),
    previewMs: 1500,
    controls: (bar, live) => select(bar, 'interpolate ', modes, live.state.mode, (mode) => live.set({ mode })),
  });

export default mount;

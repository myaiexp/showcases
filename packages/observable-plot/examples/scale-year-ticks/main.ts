// Year-like ticks skip thousand separators; tickFormat overrides
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const scales = ['linear', 'band'] as const;
const formats = ['default', 'd', ',d'] as const;
type Scale = (typeof scales)[number];
type Format = (typeof formats)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { scale: 'linear' as Scale, format: 'default' as Format },
    render: ({ scale, format }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: {
          ...(scale === 'linear' ? { domain: [1992, 2003] } : { type: 'band' as const, domain: d3.range(1992, 2003) }),
          ...(format === 'default' ? {} : { tickFormat: format }),
          grid: true,
        },
      }),
    step: (_s, i) => ({ scale: scales[Math.floor(i / 3) % 2], format: formats[i % 3] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'type ', scales, live.state.scale, (scale) => live.set({ scale }));
      select(bar, 'tickFormat ', formats, live.state.format, (format) => live.set({ format }));
    },
  });

export default mount;

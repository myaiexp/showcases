// Plot.legend draws a legend on its own: default turbo ramp, then wider
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const WIDTHS = ['default', '320'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ width: (typeof WIDTHS)[number] }>(el, ctx, {
    initial: { width: 'default' },
    render: ({ width }) =>
      width === 'default' ? Plot.legend({ color: { type: 'linear' } }) : Plot.legend({ width: 320, color: { type: 'linear' } }),
    step: ({ width }) => ({ width: width === 'default' ? '320' : 'default' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'width', WIDTHS, live.state.width, (width) => live.set({ width }));
    },
  });

export default mount;

// A continuous x scale: domain [0, 100], [100, 0], or reverse
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const modes = ['domain [0, 100]', 'domain [100, 0]', 'domain [0, 100] + reverse'] as const;
type Mode = (typeof modes)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { mode: modes[0] as Mode },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x:
          mode === 'domain [0, 100]'
            ? { domain: [0, 100], grid: true }
            : mode === 'domain [100, 0]'
              ? { domain: [100, 0], grid: true }
              : { domain: [0, 100], reverse: true, grid: true },
      }),
    step: (_s, i) => ({ mode: modes[i % 3] }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'x scale ', modes, live.state.mode, (mode) => live.set({ mode })),
  });

export default mount;

// Date domains: UTC default, type utc on ms, type time local
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const modes = ['Date domain (utc default)', 'type utc, ms domain', 'type time, local dates', 'Date domain, 1880 to 2016'] as const;
type Mode = (typeof modes)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { mode: modes[0] as Mode },
    render: ({ mode }, { width, height }) => {
      const x =
        mode === 'Date domain (utc default)'
          ? { domain: [new Date('2021-01-01'), new Date('2022-01-01')], grid: true }
          : mode === 'type utc, ms domain'
            ? { type: 'utc' as const, domain: [1609459200000, 1640995200000], grid: true }
            : mode === 'type time, local dates'
              ? { type: 'time' as const, domain: [new Date(2021, 0, 1), new Date(2022, 0, 1)], grid: true }
              : { domain: [new Date('1880-01-01'), new Date('2016-11-01')] };
      return Plot.plot({ width, height, x });
    },
    step: (_s, i) => ({ mode: modes[i % modes.length] }),
    previewMs: 2000,
    controls: (bar, live) => select(bar, 'x scale ', modes, live.state.mode, (mode) => live.set({ mode })),
  });

export default mount;

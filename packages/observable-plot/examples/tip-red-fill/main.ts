// Tip: fill, stroke and fontFamily style the tip box and its text
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const FILLS = ['red', 'gold', 'seagreen', 'rebeccapurple'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ fill: (typeof FILLS)[number]; mono: boolean }>(el, ctx, {
    initial: { fill: 'red', mono: false },
    render: ({ fill, mono }, { width, height }) =>
      Plot.tip([`Danger! This tip is ${fill}.`], { anchor: 'bottom', frameAnchor: 'bottom', fill, monospace: mono }).plot({ width, height }),
    step: ({ fill }, i) => ({ fill: FILLS[i % FILLS.length] ?? fill, mono: i % 2 === 1 }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'fill', FILLS, live.state.fill, (fill) => live.set({ fill }));
      select(bar, 'monospace', ['false', 'true'] as const, 'false', (v) => live.set({ mono: v === 'true' }));
    },
  });

export default mount;

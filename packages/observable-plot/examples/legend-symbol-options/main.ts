// Symbol legend options: fill, stroke, r and strokeWidth, or the color scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const SPECIES = ['Adelie', 'Chinstrap', 'Gentoo'];
const FILLS = ['none', 'color', 'currentColor'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ fill: (typeof FILLS)[number]; r: number; strokeWidth: number }>(el, ctx, {
    initial: { fill: 'color', r: 8, strokeWidth: 1.5 },
    render: ({ fill, r, strokeWidth }) =>
      Plot.legend({
        // fill "color" applies the color scale: the symbol scale is a redundant encoding.
        color: { domain: SPECIES },
        symbol: { domain: SPECIES },
        fill: fill === 'none' ? undefined : fill,
        stroke: fill === 'none' ? 'color' : fill === 'color' ? 'color' : 'currentColor',
        r,
        strokeWidth,
        fillOpacity: 0.6,
      }),
    step: (_s, i) => ({ fill: FILLS[i % 3], r: 6 + (i % 4) * 2, strokeWidth: 1 + (i % 3) }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'fill', FILLS, live.state.fill, (fill) => live.set({ fill }));
      slider(bar, 'r', [2, 16, 0.5], live.state.r, (r) => live.set({ r }));
      slider(bar, 'strokeWidth', [0.5, 5, 0.5], live.state.strokeWidth, (strokeWidth) => live.set({ strokeWidth }));
    },
  });

export default mount;

// Ordinal color: categorical or ordinal type with any scheme
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const schemes = [
  ...['Accent', 'Category10', 'Dark2', 'Observable10', 'Paired', 'Pastel1', 'Pastel2', 'Set1', 'Set2', 'Set3', 'Tableau10'],
  ...['blues', 'greens', 'oranges', 'turbo', 'viridis', 'magma', 'cividis', 'ylgnbu', 'rainbow', 'sinebow'],
] as Plot.ColorScheme[];
const types = ['ordinal', 'categorical'] as const;
type Type = (typeof types)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { scheme: 'Observable10' as Plot.ColorScheme, type: 'ordinal' as Type },
    render: ({ scheme, type }, { width, height }) =>
      Plot.plot({
        width,
        height,
        color: { type, scheme },
        marks: [Plot.cell('ABCDEFGHIJ', { x: Plot.identity, fill: Plot.identity })],
      }),
    step: (_s, i) => ({ scheme: schemes[i % schemes.length] }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'scheme ', schemes, live.state.scheme, (scheme) => live.set({ scheme }));
      select(bar, 'type ', types, live.state.type, (type) => live.set({ type }));
    },
  });

export default mount;

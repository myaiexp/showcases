// Swatch legend options: columns, swatchSize, swatchWidth, opacity and width
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const FRUIT = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { columns: 3, swatchSize: 15, swatchWidth: 15, opacity: 1 },
    render: ({ columns, swatchSize, swatchWidth, opacity }, { width }) =>
      Plot.legend({
        width: Math.min(width, 420),
        columns: String(columns),
        swatchSize,
        swatchWidth,
        opacity,
        tickFormat: (d: string) => d.toUpperCase(),
        color: { type: 'categorical' as const, domain: FRUIT, scheme: 'tableau10' as const },
      }),
    step: (_s, i) => ({ columns: 1 + (i % 4), swatchSize: 12 + (i % 3) * 4, swatchWidth: 12 + ((i * 2) % 3) * 8, opacity: 1 - 0.3 * (i % 2) }),
    previewMs: 1500,
    controls: (bar, live) => {
      slider(bar, 'columns', [1, 6, 1], live.state.columns, (columns) => live.set({ columns }));
      slider(bar, 'swatchSize', [8, 40, 1], live.state.swatchSize, (swatchSize) => live.set({ swatchSize }));
      slider(bar, 'swatchWidth', [8, 80, 1], live.state.swatchWidth, (swatchWidth) => live.set({ swatchWidth }));
      slider(bar, 'opacity', [0.1, 1, 0.1], live.state.opacity, (opacity) => live.set({ opacity }));
    },
  });

export default mount;

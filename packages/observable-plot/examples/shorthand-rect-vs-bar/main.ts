// rectY and barY over the same numbers: a linear x axis against a band x axis
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const MARKS = ['rectY', 'barY'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ mark: (typeof MARKS)[number] }>(el, ctx, {
    initial: { mark: 'rectY' },
    render: ({ mark }, { width, height, preview }) =>
      // rectY applies the interval transform (x from i to i + 1); barY makes x ordinal.
      (mark === 'rectY' ? Plot.rectY(numbers) : Plot.barY(numbers)).plot({ width, height, marginTop: 24, title: preview ? `Plot.${mark}(numbers)` : undefined }),
    step: (_s, i) => ({ mark: MARKS[i % 2] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'mark', MARKS, 'rectY', (mark) => live.set({ mark }));
    },
  });

export default mount;

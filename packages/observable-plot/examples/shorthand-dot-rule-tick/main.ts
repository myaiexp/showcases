// dotX, ruleX and tickX: the same numbers as a one-dimensional distribution
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const MARKS = ['dotX', 'ruleX', 'tickX'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ mark: (typeof MARKS)[number] }>(el, ctx, {
    initial: { mark: 'dotX' },
    render: ({ mark }, { width, height, preview }) =>
      // With no y channel, ruleX and tickX draw the same thing.
      Plot[mark](numbers).plot({ width, height, marginTop: 24, title: preview ? `Plot.${mark}(numbers)` : undefined }),
    step: (_s, i) => ({ mark: MARKS[i % 3] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'mark', MARKS, 'dotX', (mark) => live.set({ mark }));
    },
  });

export default mount;

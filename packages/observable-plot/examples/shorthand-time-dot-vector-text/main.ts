// dot, vector and text over [date, value] pairs: a scatterplot three ways
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { timeSeries } from '../../shared/shorthand-data.ts';

const MARKS = ['dot', 'vector', 'text'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ mark: (typeof MARKS)[number] }>(el, ctx, {
    initial: { mark: 'dot' },
    render: ({ mark }, { width, height, preview }) =>
      // text labels each point with its zero-based index in the data.
      Plot[mark](timeSeries).plot({ width, height, marginTop: 24, title: preview ? `Plot.${mark}(timeSeries)` : undefined }),
    step: (_s, i) => ({ mark: MARKS[i % 3] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'mark', MARKS, 'dot', (mark) => live.set({ mark }));
    },
  });

export default mount;

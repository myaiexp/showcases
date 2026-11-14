// line and area from [date, value] pairs: x is time, the gaps are weekends
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { timeSeries } from '../../shared/shorthand-data.ts';

const MARKS = ['line', 'area'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ mark: (typeof MARKS)[number] }>(el, ctx, {
    initial: { mark: 'line' },
    render: ({ mark }, { width, height, preview }) =>
      (mark === 'line' ? Plot.line(timeSeries) : Plot.area(timeSeries)).plot({ width, height, marginTop: 24, title: preview ? `Plot.${mark}(timeSeries)` : undefined }),
    step: (_s, i) => ({ mark: MARKS[i % 2] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'mark', MARKS, 'line', (mark) => live.set({ mark }));
    },
  });

export default mount;

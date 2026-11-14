// vectorX and textX: little up arrows or value labels at every number
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const MARKS = ['vectorX', 'textX'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ mark: (typeof MARKS)[number] }>(el, ctx, {
    initial: { mark: 'vectorX' },
    render: ({ mark }, { width, height, preview }) =>
      Plot[mark](numbers).plot({ width, height, marginTop: 24, title: preview ? `Plot.${mark}(numbers)` : undefined }),
    step: (_s, i) => ({ mark: MARKS[i % 2] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'mark', MARKS, 'vectorX', (mark) => live.set({ mark }));
    },
  });

export default mount;

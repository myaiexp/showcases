// lineY and areaY from a bare array of numbers: x is the index
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const MARKS = ['lineY', 'areaY'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ mark: (typeof MARKS)[number] }>(el, ctx, {
    initial: { mark: 'lineY' },
    render: ({ mark }, { width, height, preview }) =>
      // The area's baseline is implicitly y = 0, so its y axis starts there.
      (mark === 'lineY' ? Plot.lineY(numbers) : Plot.areaY(numbers)).plot({ width, height, marginTop: 24, title: preview ? `Plot.${mark}(numbers)` : undefined }),
    step: (_s, i) => ({ mark: MARKS[i % 2] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'mark', MARKS, 'lineY', (mark) => live.set({ mark }));
    },
  });

export default mount;

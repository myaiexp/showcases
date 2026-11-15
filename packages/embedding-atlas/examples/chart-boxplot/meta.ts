// embedding-atlas example: rect layers with y1/y2 quantiles make a box plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Box plot from three rect layers",
  summary:
    "A box plot built only from the spec grammar: a thin rect from min to max (y1, y2), a wide one from the 25th to the 75th percentile, and a one-pixel-high rect at the median. Variants change the grouping and the measured column.",
  section: "Charts",
  tags: ['mark: rect', 'y1', 'y2', 'aggregate: quantile', 'aggregate: median', 'width', 'height', 'clampToRatio'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/chart_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

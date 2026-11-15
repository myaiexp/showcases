// embedding-atlas example: scale.color range for nominal and quantitative
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Color scale",
  summary:
    "A histogram of words stacked by source takes its colors from scale.color.range: the default palette, a custom list, and the same list reversed. The last variant colors a heatmap with a two-color range.",
  section: "Charts",
  tags: ['scale', 'color', 'range', 'encoding.color'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

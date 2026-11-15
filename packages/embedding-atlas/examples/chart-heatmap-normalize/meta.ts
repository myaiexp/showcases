// embedding-atlas example: encoding.color.normalize by x or y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Normalized heatmap",
  summary:
    "The color encoding of a topic by source heatmap with normalize: \"x\" scales each column to sum to one, normalize: \"y\" does the same per row. Without it, color is the raw count.",
  section: "Charts",
  tags: ['normalize', 'aggregate: count', 'mark: rect', 'encoding.color'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// embedding-atlas example: a point mark with size encoding and an xy brush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bubble chart with size",
  summary:
    "One bubble per topic: x is the mean word count, y the mean score, size the number of documents and color the topic. The brush encodes xy, and the variants preset a rectangle that the count plot beside it follows.",
  section: "Charts",
  tags: ['mark: point', 'encoding.size', 'encoding.color', 'encoding.group', 'selection: xy', '$encoding'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/chart_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// embedding-atlas example: the layer size option for point marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fixed point size",
  summary:
    "The layer-level size is the area of a point mark, 100 by default. Six topic averages are drawn with size 30, 100 and 400, with no size encoding so every point stays equal.",
  section: "Charts",
  tags: ['mark: point', 'size', 'encoding.group', 'encoding.color'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// embedding-atlas example: parallel-coordinates: fields, color, brushes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Parallel coordinates",
  summary:
    "One line per document across the words, score, rating and published axes, colored by topic. The variants change opacity and the color scale range; ParallelCoordinatesState brush entries ([from, to] in 0 to 1, 0 at the top) preset axis brushes.",
  section: "Charts",
  tags: ['parallel-coordinates', 'data.fields', 'data.color', 'opacity', 'scales.color', 'width', 'height', 'brush'],
  docs: [
    'repo/packages/viewer/src/charts/parallel_coordinates/types.ts',
    'repo/packages/viewer/src/charts/chart_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

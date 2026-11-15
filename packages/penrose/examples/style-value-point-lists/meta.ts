// penrose example: Point lists as matrices, lists and unknowns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point lists as matrices, lists and unknowns',
  summary:
    'A polygon takes its `points` as a list of points. They may be written as a matrix of vectors, `((x, y), …)`, or as a list of lists, `[[x, y], …]`, and any number can be `?`. The first two tabs draw the same triangle, and the third leaves the apex x unknown so every resample draws another triangle.',
  section: 'Style: Expressions',
  tags: ['value types', 'matrix', 'list of lists', 'Polygon', 'unknown'],
  docs: ['repo/packages/docs-site/docs/ref/style/value-types.md', 'repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

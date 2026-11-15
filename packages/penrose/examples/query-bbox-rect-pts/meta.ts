// penrose example: bboxPts and rectPts on rotated shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'bboxPts and rectPts on rotated shapes',
  summary:
    '`rectPts` returns the four corners of a rotated rectangle, marked in blue where the sampled rotation has turned them. `bboxPts` returns the corners of the axis-aligned box that bounds any shape: the dashed red box around the tilted rectangle and around the triangle.',
  section: 'Computation: Geometry Queries',
  tags: ['rectPts', 'bboxPts', 'Rectangle', 'Polygon'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

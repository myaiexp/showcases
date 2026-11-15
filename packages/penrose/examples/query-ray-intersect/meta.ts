// penrose example: rayIntersect and its per-shape forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rayIntersect and its per-shape forms',
  summary:
    'Three rays leave one point at sampled angles. `rayIntersect(shape, p, v)` gives the first point the ray hits on any shape; when the ray misses, it returns the start point `p` itself, so a red dot left on the origin means a miss. The second tab calls the per-shape forms `rayIntersectCircle`, `rayIntersectRect` and `rayIntersectPoly` with raw numbers instead.',
  section: 'Computation: Geometry Queries',
  tags: ['rayIntersect', 'rayIntersectCircle', 'rayIntersectRect', 'rayIntersectPoly', 'bboxPts'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Queries.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

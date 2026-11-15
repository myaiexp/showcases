// penrose example: lineLineIntersection of two infinite lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'lineLineIntersection of two infinite lines',
  summary:
    '`lineLineIntersection(a0, a1, b0, b1)` is where the line through `a0` and `a1` crosses the line through `b0` and `b1`, even beyond the segments. Each line is drawn solid between its two sampled points and dashed on beyond them; the red ring sits where they meet.',
  section: 'Computation: Geometry Queries',
  tags: ['lineLineIntersection', 'ptOnLine'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

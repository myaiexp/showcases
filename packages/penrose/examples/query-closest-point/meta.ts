// penrose example: closestPoint on a circle, a rectangle and an ellipse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'closestPoint on a circle, a rectangle and an ellipse',
  summary:
    'Each shape has its own sampled query point (grey). `closestPoint(shape, p)` takes the shape itself, whatever its kind, and returns the point of its outline nearest to `p`, shown in red at the end of the dashed line.',
  section: 'Computation: Geometry Queries',
  tags: ['closestPoint', 'Circle', 'Rectangle', 'Ellipse'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

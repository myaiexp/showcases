// penrose example: circularArc between two sampled angles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'circularArc between two sampled angles',
  summary:
    '`circularArc(pathType, center, r, theta0, theta1)` draws the part of the circle `center + r (cos t, sin t)` between two sampled angles in radians, counterclockwise from the blue end to the green one. "closed" joins the ends with a chord and fills the segment.',
  section: 'Computation: Paths & Curves',
  tags: ['circularArc', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

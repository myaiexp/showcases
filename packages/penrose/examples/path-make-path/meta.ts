// penrose example: makePath: a bowed arrow between two points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'makePath: a bowed arrow between two points',
  summary:
    'Two sampled points are joined by `makePath(start, end, curveHeight, padding)`: a quadratic curve whose control point sits `curveHeight` to the side of the midpoint, trimmed `padding` short of both ends so the arrowhead clears the rings. A negative height bows the other way.',
  section: 'Computation: Paths & Curves',
  tags: ['makePath', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

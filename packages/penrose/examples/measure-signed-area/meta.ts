// penrose example: signedArea and the order of the points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'signedArea and the order of the points',
  summary:
    '`signedArea` of a closed point list is the polygon\'s area, positive when the points run counterclockwise and negative when they run clockwise. The square beside the polygon has exactly that area; it is blue for a counterclockwise list and red for the same polygon with its points listed in reverse.',
  section: 'Computation: Curve Measures',
  tags: ['signedArea', 'sign', 'abs', 'Polygon'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Curves.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

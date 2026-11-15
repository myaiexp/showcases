// penrose example: firstPoint, lastPoint and averagePoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'firstPoint, lastPoint and averagePoint',
  summary:
    'Six sampled points form a polyline. `firstPoint` is ringed in green, `lastPoint` in red, and `averagePoint`, the mean of all six, is the blue disc inside the shape; each variation draws new points and the three marks follow.',
  section: 'Computation: Paths & Curves',
  tags: ['firstPoint', 'lastPoint', 'averagePoint', 'Polyline'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

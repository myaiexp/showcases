// penrose example: get, oneBasedElement and averagePoint on a point list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'get, oneBasedElement and averagePoint on a point list',
  summary:
    'Five sampled points make a polyline. `pts[1]` counts from zero and hits the second point, `oneBasedElement(pts, 1)` counts from one and hits the first, and `get(xs, 3)` reads the x coordinate list to put a vertical line through the fourth point. The star is `sumVectors(pts)` divided by `count(xs)` (`count` takes a plain number list, not a point list).',
  section: 'Computation: Math',
  tags: ['get', 'oneBasedElement', 'sumVectors', 'count'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

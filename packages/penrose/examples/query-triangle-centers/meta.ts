// penrose example: barycenter, circumcenter and incenter of a triangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'barycenter, circumcenter and incenter of a triangle',
  summary:
    'A sampled triangle with its three centres: `barycenter` (red, where the medians meet), `circumcenter` (blue, equidistant from the corners) and `incenter` (green, equidistant from the sides). In a flat triangle they drift apart; in a regular one they coincide.',
  section: 'Computation: Geometry Queries',
  tags: ['barycenter', 'circumcenter', 'incenter'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Queries.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

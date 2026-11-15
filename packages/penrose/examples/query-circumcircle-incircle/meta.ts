// penrose example: circumradius and inradius: the two circles of a triangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'circumradius and inradius: the two circles of a triangle',
  summary:
    'For a sampled triangle, a circle at `circumcenter` with radius `circumradius` passes through all three corners, and a circle at `incenter` with radius `inradius` touches all three sides from inside.',
  section: 'Computation: Geometry Queries',
  tags: ['circumcenter', 'circumradius', 'incenter', 'inradius'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Queries.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

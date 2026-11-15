// penrose example: rayIntersectNormal: the surface normal at a ray hit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rayIntersectNormal: the surface normal at a ray hit',
  summary:
    '`rayIntersectNormal` returns the outward unit normal of the shape at the point where the ray first strikes it, or (0, 0) when there is no hit. The green arrows are those normals scaled up; a ray that misses leaves no arrow.',
  section: 'Computation: Geometry Queries',
  tags: ['rayIntersectNormal', 'rayIntersect'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Queries.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

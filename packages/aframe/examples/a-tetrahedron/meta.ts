// aframe example: <a-tetrahedron>: four faces and detail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-tetrahedron>: four faces and detail',
  summary:
    '<a-tetrahedron> maps radius and detail to the tetrahedron geometry. The plain solid has four triangles, the fewest of any solid. Left to right: detail 0 and 1 with flat-shading, then detail 3 with smooth shading; the wireframe in front shows the plain faces.',
  section: 'Primitives',
  tags: ['a-tetrahedron', 'radius', 'detail', 'flat-shading', 'wireframe'],
  docs: ['repo/docs/primitives/a-tetrahedron.md', 'repo/docs/components/geometry.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

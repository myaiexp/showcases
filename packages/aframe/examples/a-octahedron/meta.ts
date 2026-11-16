// aframe example: <a-octahedron>: eight faces and detail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-octahedron>: eight faces and detail',
  summary:
    '<a-octahedron> maps radius and detail to the octahedron geometry. The plain solid has eight triangular faces. Left to right: detail 0 and 1 with flat-shading, then detail 3 with smooth shading; the wireframe in front shows the plain faces.',
  section: 'Primitives',
  tags: ['a-octahedron', 'radius', 'detail', 'flat-shading', 'wireframe'],
  docs: ['repo/docs/primitives/a-octahedron.md', 'repo/docs/components/geometry.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

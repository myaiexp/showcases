// aframe example: <a-dodecahedron>: twelve faces and detail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-dodecahedron>: twelve faces and detail',
  summary:
    '<a-dodecahedron> maps radius and detail to the dodecahedron geometry. The plain solid has twelve pentagonal faces. Left to right: detail 0 and 1 with flat-shading, then detail 3 with smooth shading; the wireframe in front shows the plain faces.',
  section: 'Primitives',
  tags: ['a-dodecahedron', 'radius', 'detail', 'flat-shading', 'wireframe'],
  docs: ['repo/docs/primitives/a-dodecahedron.md', 'repo/docs/components/geometry.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

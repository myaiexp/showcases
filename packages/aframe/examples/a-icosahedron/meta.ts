// aframe example: <a-icosahedron>: twenty faces and detail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-icosahedron>: twenty faces and detail',
  summary:
    '<a-icosahedron> maps radius and detail to the icosahedron geometry. The plain solid has twenty triangles; a few detail levels make it a sphere. Left to right: detail 0 and 1 with flat-shading, then detail 3 with smooth shading; the wireframe in front shows the plain faces.',
  section: 'Primitives',
  tags: ['a-icosahedron', 'radius', 'detail', 'flat-shading', 'wireframe'],
  docs: ['repo/docs/primitives/a-icosahedron.md', 'repo/docs/components/geometry.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

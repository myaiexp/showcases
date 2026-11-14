// babylon-js example: Polyhedra, geodesics and icospheres
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polyhedra, geodesics and icospheres',
  summary:
    'All fifteen CreatePolyhedron types, tetrahedron (0) to elongated pentagonal cupola (14), each with a faceColors array of one Color4 per face. Below them, a CreateGeodesic with m and n sliders and a flat CreateIcoSphere with a subdivisions slider.',
  section: 'Mesh',
  tags: ['CreatePolyhedron', 'CreateGeodesic', 'CreateIcoSphere', 'faceColors'],
  docs: [
    'repo/content/features/featuresDeepDive/mesh/creation/polyhedra.md',
    'repo/content/features/featuresDeepDive/mesh/creation/polyhedra/polyhedra_by_numbers.md',
    'repo/content/features/featuresDeepDive/mesh/creation/polyhedra/geodesic_poly.md',
    'repo/content/features/featuresDeepDive/mesh/creation/polyhedra/icosphere.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

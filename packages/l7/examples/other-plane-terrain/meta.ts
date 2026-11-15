// l7 example: PlaneGeometry 3D terrain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PlaneGeometry 3D terrain',
  summary:
    'terrainTexture makes the plane a 3D surface: L7 reads a height map, rgb2height turns each pixel\'s colour into a height, and widthSegments and heightSegments set how finely the mesh is cut.',
  section: 'Other Layers',
  tags: ['GeometryLayer', 'shape(\'plane\')', 'terrainTexture', 'mapTexture', 'rgb2height', 'widthSegments', 'heightSegments'],
  docs: [
    'repo/site/docs/api/other/plane.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

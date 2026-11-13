// Three.js example: the same shape in the five lit material types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Basic, Lambert, Phong, Standard, Physical',
  summary:
    'One sphere in each of the manual materials, ordered fastest to slowest. Basic ignores light, Lambert and Phong use simple shading, Standard and Physical are physically based. Toggle flatShading and tune shininess and roughness.',
  section: 'Fundamentals',
  tags: ['MeshBasicMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial', 'MeshStandardMaterial', 'MeshPhysicalMaterial', 'flatShading'],
  docs: [
    'repo/manual/pages/materials.html',
    'repo/docs/pages/MeshBasicMaterial.html.md',
    'repo/docs/pages/MeshLambertMaterial.html.md',
    'repo/docs/pages/MeshPhongMaterial.html.md',
    'repo/docs/pages/MeshStandardMaterial.html.md',
    'repo/docs/pages/MeshPhysicalMaterial.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

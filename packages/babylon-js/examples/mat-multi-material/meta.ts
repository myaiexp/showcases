// babylon-js example: Multi-material with submeshes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multi-material with submeshes',
  summary:
    'A MultiMaterial holding a red, a wireframe blue and an emissive purple StandardMaterial on one sphere. releaseSubMeshes, then three SubMesh objects each take an index range and a materialIndex into subMaterials; the sliders move the boundaries between the bands.',
  section: 'Materials',
  tags: ['MultiMaterial', 'subMaterials', 'SubMesh', 'releaseSubMeshes'],
  docs: ['repo/content/features/featuresDeepDive/materials/using/multiMaterials.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

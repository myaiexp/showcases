// babylon-js example: village of mesh instances
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Village of mesh instances',
  summary:
    'Two house meshes, one detached and one semi-detached, are copied into a village from a table of rotations and positions. Switch between createInstance, which shares the source geometry and material, and clone, which makes independent meshes.',
  section: 'Introduction',
  tags: ['Mesh.createInstance', 'Mesh.clone', 'Mesh.MergeMeshes', 'DynamicTexture'],
  docs: [
    'repo/content/features/introductionToFeatures/chap2/copies.md',
    'repo/content/features/introductionToFeatures/chap2/combine.md',
    'repo/content/features/introductionToFeatures/chap2/placement.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

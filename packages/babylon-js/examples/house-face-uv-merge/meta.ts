// babylon-js example: per-face house texture and merged roof
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-face house texture and merged roof',
  summary:
    'A box gets one panel of a generated texture strip on each side through the faceUV option and wrap, a prism roof is added with CreateCylinder, and Mesh.MergeMeshes joins them into one house. Toggle multiMultiMaterials to see why the last parameter matters.',
  section: 'Introduction',
  tags: ['MeshBuilder.CreateBox', 'faceUV', 'DynamicTexture', 'CreateCylinder', 'Mesh.MergeMeshes'],
  docs: [
    'repo/content/features/introductionToFeatures/chap2/face_material.md',
    'repo/content/features/introductionToFeatures/chap2/variation.md',
    'repo/content/features/introductionToFeatures/chap2/combine.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

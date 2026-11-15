// galacean example: Blend shape on a SkinnedMeshRenderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blend shape on a SkinnedMeshRenderer",
  summary:
    "A flat grid with a BlendShape whose single frame lifts the middle into a dome. addBlendShape stores it on the ModelMesh and SkinnedMeshRenderer.blendShapeWeights morphs the mesh toward it.",
  section: "Mesh",
  tags: ['BlendShape', 'addFrame', 'addBlendShape', 'SkinnedMeshRenderer', 'blendShapeWeights'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
    'repo/docs/en/graphics/renderer/skinnedMeshRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

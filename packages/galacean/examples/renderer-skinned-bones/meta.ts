// galacean example: SkinnedMeshRenderer: rootBone and localBounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SkinnedMeshRenderer: rootBone and localBounds",
  summary:
    "A cylinder skinned to two bones: bone weights fade from one to the other along its height, so turning the upper bone folds it like an elbow. rootBone names the skeleton and localBounds is set for the skinned box.",
  section: "Renderer",
  tags: ['SkinnedMeshRenderer', 'rootBone', 'localBounds', 'Skin', 'setBoneWeights', 'setBoneIndices'],
  docs: [
    'repo/docs/en/graphics/renderer/skinnedMeshRenderer.mdx',
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

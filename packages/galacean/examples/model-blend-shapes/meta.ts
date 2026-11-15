// galacean example: Model: blend shape weights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: blend shape weights",
  summary:
    "glTF morph targets (Cube and Spikes) arrive as BlendShapes; SkinnedMeshRenderer.blendShapeWeights mixes them by hand.",
  section: "Model",
  tags: ['BlendShape','blendShapeWeights','SkinnedMeshRenderer'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

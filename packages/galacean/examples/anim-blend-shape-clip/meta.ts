// galacean example: Animation: your own blend shape clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: your own blend shape clip",
  summary:
    "An AnimationFloatArrayCurve on blendShapeWeights, built in code, mixes the blob's two morph targets over four seconds.",
  section: "Animation",
  tags: ['AnimationFloatArrayCurve','blendShapeWeights','SkinnedMeshRenderer'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

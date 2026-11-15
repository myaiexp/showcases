// galacean example: Blend shape with several frames
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blend shape with several frames",
  summary:
    "A BlendShape can hold several keyframes, each a weight plus delta positions. This one has a dent at weight 0.5 and a spike at 1.0, so sweeping the weight passes through both rather than blending a straight line.",
  section: "Mesh",
  tags: ['BlendShape', 'addFrame', 'BlendShapeFrame', 'blendShapeWeights'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

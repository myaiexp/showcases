// galacean example: Mixing two blend shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mixing two blend shapes",
  summary:
    "A cylinder carries two blend shapes, Bulge and Bend, and blendShapeWeights holds one weight per shape so both can apply at once. The card sweeps the weights out of phase; the full view has a slider for each.",
  section: "Mesh",
  tags: ['BlendShape', 'blendShapeWeights', 'addBlendShape', 'getBlendShapeName'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

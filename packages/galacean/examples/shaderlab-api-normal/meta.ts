// galacean example: ShaderLab normal mapping API
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab normal mapping API",
  summary: "Normal.glsl builds a tangent frame from screen-space derivatives (getTBNByDerivatives) for meshes without tangents, then getNormalByNormalTexture applies a painted bump map. A slider scales the intensity.",
  section: "ShaderLab",
  tags: ['Normal.glsl','getTBNByDerivatives','getNormalByNormalTexture'],
  docs: [
    'repo/docs/en/graphics/material/shaderAPI.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

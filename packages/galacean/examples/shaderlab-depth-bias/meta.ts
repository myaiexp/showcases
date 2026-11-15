// galacean example: ShaderLab depth bias
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab depth bias",
  summary: "Two coplanar plane pairs drawn in the same order, blue then red: with no bias the later red plane covers the blue one, while a positive DepthBias in a RasterState pushes the red plane back so the blue one shows. Real coplanar surfaces z-fight; the bias is how you settle it.",
  section: "ShaderLab",
  tags: ['RasterState','DepthBias','SlopeScaledDepthBias'],
  docs: [
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// galacean example: PBR iridescence thickness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR iridescence thickness",
  summary: "Iridescent spheres with different iridescenceThicknessRange values, then one using iridescenceThicknessTexture to vary the film thickness and one masked by iridescenceTexture.",
  section: "Material",
  tags: ['PBRMaterial','iridescenceThicknessRange','iridescenceThicknessTexture','iridescenceTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

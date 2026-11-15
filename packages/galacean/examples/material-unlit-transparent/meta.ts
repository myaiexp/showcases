// galacean example: Unlit transparency
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Unlit transparency",
  summary: "Unlit shapes with isTransparent on blend by baseColor alpha over a patterned wall; the card swings the alpha, and the full view switches between Normal and Additive blending.",
  section: "Material",
  tags: ['UnlitMaterial','isTransparent','blendMode','alphaCutoff'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/unlit.mdx',
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

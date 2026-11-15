// galacean example: PBR blend mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR blend mode",
  summary: "Transparent spheres drawn with BlendMode.Normal and BlendMode.Additive over a bright wall: normal blending covers it with the sphere colour, additive adds light on top and glows.",
  section: "Material",
  tags: ['PBRMaterial','blendMode','BlendMode','isTransparent'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

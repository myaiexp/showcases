// galacean example: PBR emissive texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR emissive texture",
  summary: "An emissive texture of glowing grid lines on a dark sphere: with no lights the lines still shine, tinted by emissiveColor. The card cycles the tint.",
  section: "Material",
  tags: ['PBRMaterial','emissiveTexture','emissiveColor'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

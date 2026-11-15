// galacean example: PBR transmission texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR transmission texture",
  summary: "One glass sphere whose transmissionTexture (red channel stripes) makes it see-through in bands and solid between them, over a patterned wall.",
  section: "Material",
  tags: ['PBRMaterial','transmissionTexture','transmission'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
